import { boostPrompt } from "@/lib/boost/orchestrator";

export async function POST(req: Request) {
  const { prompt, agentId, targetModel } = await req.json();

  if (!prompt || !agentId || !targetModel) {
    return new Response("Missing required fields", { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of boostPrompt({ prompt, agentId, targetModel })) {
          const data = JSON.stringify({
            type: event.type,
            ...(event.type === "iteration"
              ? {
                  iteration: event.data.iteration,
                  score: event.data.score,
                  feedback: event.data.feedback,
                  revisedPrompt: event.data.revisedPrompt,
                }
              : {
                  finalPrompt: event.data.finalPrompt,
                  finalScore: event.data.finalScore,
                }),
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
      } catch (error) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", message: String(error) })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
