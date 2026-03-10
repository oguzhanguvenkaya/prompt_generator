import { AgentGrid } from "@/components/dashboard/agent-grid";
import { RecentPrompts } from "@/components/dashboard/recent-prompts";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz</h1>
        <p className="text-muted-foreground">
          Uzman ajanlarla AI modelleri için mükemmel promptlar üretin.
        </p>
      </div>
      <AgentGrid />
      <RecentPrompts />
    </div>
  );
}
