import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { modelConfigs } from "../schema";
import { modelConfigsSeed } from "./model-configs";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set.");
    process.exit(1);
  }

  console.log("Connecting to database...");
  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  console.log("Seeding model configs...");

  // Upsert model configs: insert or update on conflict
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
