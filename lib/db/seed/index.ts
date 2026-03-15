import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql as rawSql } from "drizzle-orm";
import { modelConfigs, promptDatasets } from "../schema";
import { modelConfigsSeed } from "./model-configs";
import { imagePromptsSeed } from "./image-prompts";
import { textPromptsSeed } from "./text-prompts";
import { videoPromptsSeed } from "./video-prompts";
import { researchVeo31Prompts } from "./research-veo31-prompts";
import { researchKling30Prompts } from "./research-kling30-prompts";
import { researchSeedreamPrompts } from "./research-seedream-prompts";
import { researchNanaBananaProPrompts } from "./research-nanabananapro-prompts";
import { researchFluxPrompts } from "./research-flux-prompts";
import { researchSeedancePrompts } from "./research-seedance-prompts";
import { loadResearchNewPrompts } from "./research-new-prompts";
import { generateEmbeddings } from "../../embeddings/gemini";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set.");
    process.exit(1);
  }

  console.log("Connecting to database...");
  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  // ─── Model Configs ──────────────────────────────────────────
  console.log("Seeding model configs...");
  for (const config of modelConfigsSeed) {
    await db
      .insert(modelConfigs)
      .values(config)
      .onConflictDoUpdate({
        target: modelConfigs.id,
        set: {
          category: config.category,
          name: config.name,
          provider: config.provider,
          promptFormat: config.promptFormat,
          supportedSizes: config.supportedSizes,
          qualityOptions: config.qualityOptions,
          stylePresets: config.stylePresets,
          supportsNegativePrompt: config.supportsNegativePrompt,
          maxPromptLength: config.maxPromptLength,
          documentationUrl: config.documentationUrl,
          specificRules: config.specificRules,
          isActive: config.isActive,
        },
      });
  }
  console.log(`Seeded ${modelConfigsSeed.length} model configs successfully.`);

  // ─── Prompt Datasets ────────────────────────────────────────
  const researchNewEnvRaw = process.env.RESEARCH_NEW_PER_MODEL?.trim();
  let researchNewPerModelLimit: number | undefined;

  if (researchNewEnvRaw) {
    const parsed = Number.parseInt(researchNewEnvRaw, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      researchNewPerModelLimit = parsed;
    } else {
      console.warn(
        `[seed] Ignoring invalid RESEARCH_NEW_PER_MODEL="${researchNewEnvRaw}" (expected positive integer). Loading ALL research_new prompts.`
      );
    }
  }

  const researchNewPrompts = researchNewPerModelLimit
    ? loadResearchNewPrompts({ perModelLimit: researchNewPerModelLimit })
    : loadResearchNewPrompts();
  const effectiveResearchNewLimit = researchNewPerModelLimit ?? "ALL";
  console.log(
    `Loaded ${researchNewPrompts.length} research_new prompts (RESEARCH_NEW_PER_MODEL=${effectiveResearchNewLimit}).`
  );

  const allPrompts = [
    ...imagePromptsSeed,
    ...textPromptsSeed,
    ...videoPromptsSeed,
    ...researchVeo31Prompts,
    ...researchKling30Prompts,
    ...researchSeedreamPrompts,
    ...researchNanaBananaProPrompts,
    ...researchFluxPrompts,
    ...researchSeedancePrompts,
    ...researchNewPrompts,
  ];
  console.log(`Seeding ${allPrompts.length} prompt datasets...`);

  // Generate embeddings for all prompts
  const textsForEmbedding = allPrompts.map((p) => {
    const parts = [p.prompt];
    if ("description" in p && p.description) parts.push(p.description);
    if ("domain" in p && p.domain) parts.push(`domain: ${p.domain}`);
    if ("styleSet" in p && p.styleSet) parts.push(`style: ${p.styleSet}`);
    if ("whyItWorks" in p && p.whyItWorks) parts.push(`why: ${p.whyItWorks}`);
    return parts.join(" | ");
  });

  console.log("Generating embeddings via Gemini Embedding 2 (768d)...");
  const embeddings = await generateEmbeddings(textsForEmbedding);
  console.log(`Generated ${embeddings.length} Gemini embeddings.`);

  // Clear existing prompt datasets and insert fresh
  await db.delete(promptDatasets);

  const esc = (s: string) => s.replace(/'/g, "''");
  const sqlStr = (s: string | undefined | null) => s ? `'${esc(s)}'` : 'NULL';

  for (let i = 0; i < allPrompts.length; i++) {
    const p = allPrompts[i];
    const pr = p as Record<string, unknown>;
    const vectorLiteral = `[${embeddings[i].join(",")}]`;

    await db.execute(rawSql.raw(`
      INSERT INTO prompt_datasets (category, target_model, prompt, negative_prompt, tags, quality, source, domain, style_set, description, usage_context, why_it_works, model_notes, rating, embedding_v2)
      VALUES (
        ${sqlStr(p.category)},
        ${sqlStr(p.targetModel)},
        ${sqlStr(p.prompt)},
        ${sqlStr(pr.negativePrompt as string)},
        ${p.tags ? `'${esc(JSON.stringify(p.tags))}'::jsonb` : 'NULL'},
        ${p.quality ?? 'NULL'},
        ${sqlStr(p.source)},
        ${sqlStr(("domain" in p ? p.domain : "general") as string)},
        ${sqlStr(pr.styleSet as string)},
        ${sqlStr(pr.description as string)},
        'example',
        ${sqlStr(pr.whyItWorks as string)},
        ${sqlStr(pr.modelNotes as string)},
        ${pr.rating != null ? pr.rating : 'NULL'},
        '${vectorLiteral}'::vector(768)
      )
    `));
  }

  console.log(`Seeded ${allPrompts.length} prompt datasets with embeddings.`);
}

seed()
  .then(() => {
    console.log("Seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
