import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  real,
  serial,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Sessions ────────────────────────────────────────────────────────────────

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: varchar("agent_id", { length: 50 }).notNull(),
  targetModel: varchar("target_model", { length: 100 }),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sessionsRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
  generatedPrompts: many(generatedPrompts),
}));

// ─── Messages ────────────────────────────────────────────────────────────────

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  attachments: jsonb("attachments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.sessionId],
    references: [sessions.id],
  }),
}));

// ─── Generated Prompts ──────────────────────────────────────────────────────

export const generatedPrompts = pgTable("generated_prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").references(() => sessions.id, {
    onDelete: "set null",
  }),
  agentId: varchar("agent_id", { length: 50 }).notNull(),
  targetModel: varchar("target_model", { length: 100 }).notNull(),
  prompt: text("prompt").notNull(),
  negativePrompt: text("negative_prompt"),
  parameters: jsonb("parameters"),
  boostScore: real("boost_score"),
  boostIterations: integer("boost_iterations").default(0).notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatedPromptsRelations = relations(
  generatedPrompts,
  ({ one, many }) => ({
    session: one(sessions, {
      fields: [generatedPrompts.sessionId],
      references: [sessions.id],
    }),
    boostResults: many(boostResults),
  })
);

// ─── Boost Results ──────────────────────────────────────────────────────────

export const boostResults = pgTable("boost_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  promptId: uuid("prompt_id")
    .notNull()
    .references(() => generatedPrompts.id, { onDelete: "cascade" }),
  iteration: integer("iteration").notNull(),
  score: real("score").notNull(),
  feedback: text("feedback"),
  revisedPrompt: text("revised_prompt"),
  resultUrl: text("result_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const boostResultsRelations = relations(boostResults, ({ one }) => ({
  prompt: one(generatedPrompts, {
    fields: [boostResults.promptId],
    references: [generatedPrompts.id],
  }),
}));

// ─── Prompt Datasets ────────────────────────────────────────────────────────

export const promptDatasets = pgTable("prompt_datasets", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 20 }).notNull(),
  targetModel: varchar("target_model", { length: 100 }),
  prompt: text("prompt").notNull(),
  negativePrompt: text("negative_prompt"),
  tags: jsonb("tags"),
  quality: real("quality"),
  source: varchar("source", { length: 200 }),
  domain: varchar("domain", { length: 50 }).default("general"),
  styleSet: varchar("style_set", { length: 100 }),
  description: text("description"),
  usageContext: varchar("usage_context", { length: 50 }).default("example"),
  whyItWorks: text("why_it_works"),
  modelNotes: text("model_notes"),
  rating: real("rating"),
  // embedding vector(1024) — managed via raw SQL migration (Drizzle lacks pgvector support)
});

// ─── Usage Stats ────────────────────────────────────────────────────────────

export const usageStats = pgTable("usage_stats", {
  id: serial("id").primaryKey(),
  provider: varchar("provider", { length: 50 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  inputTokens: integer("input_tokens").default(0).notNull(),
  outputTokens: integer("output_tokens").default(0).notNull(),
  costUsd: real("cost_usd").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Settings ───────────────────────────────────────────────────────────────

export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ─── Model Configs ──────────────────────────────────────────────────────────

export const modelConfigs = pgTable("model_configs", {
  id: varchar("id", { length: 100 }).primaryKey(),
  category: varchar("category", { length: 20 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  provider: varchar("provider", { length: 50 }).notNull(),
  promptFormat: varchar("prompt_format", { length: 20 }).notNull(),
  supportedSizes: jsonb("supported_sizes"),
  qualityOptions: jsonb("quality_options"),
  stylePresets: jsonb("style_presets"),
  supportsNegativePrompt: boolean("supports_negative_prompt")
    .default(false)
    .notNull(),
  maxPromptLength: integer("max_prompt_length"),
  documentationUrl: text("documentation_url"),
  specificRules: text("specific_rules"),
  isActive: boolean("is_active").default(true).notNull(),
});

// ─── Type Exports ───────────────────────────────────────────────────────────

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type GeneratedPrompt = typeof generatedPrompts.$inferSelect;
export type NewGeneratedPrompt = typeof generatedPrompts.$inferInsert;
export type BoostResult = typeof boostResults.$inferSelect;
export type NewBoostResult = typeof boostResults.$inferInsert;
export type PromptDataset = typeof promptDatasets.$inferSelect;
export type NewPromptDataset = typeof promptDatasets.$inferInsert;
export type UsageStat = typeof usageStats.$inferSelect;
export type NewUsageStat = typeof usageStats.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type ModelConfig = typeof modelConfigs.$inferSelect;
export type NewModelConfig = typeof modelConfigs.$inferInsert;
