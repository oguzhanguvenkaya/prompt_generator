import { eq, desc, asc, and, SQL } from "drizzle-orm";
import { db } from "./index";
import {
  sessions,
  messages,
  generatedPrompts,
  boostResults,
  modelConfigs,
  settings,
  type NewGeneratedPrompt,
  type NewBoostResult,
} from "./schema";

// ─── Sessions ────────────────────────────────────────────────────────────────

export async function createSession(
  agentId: string,
  targetModel?: string,
  title?: string
) {
  const [session] = await db
    .insert(sessions)
    .values({ agentId, targetModel, title })
    .returning();
  return session;
}

export async function getSession(id: string) {
  return db.query.sessions.findFirst({
    where: eq(sessions.id, id),
    with: { messages: true },
  });
}

export async function getSessions(agentId?: string) {
  const conditions: SQL[] = [];
  if (agentId) {
    conditions.push(eq(sessions.agentId, agentId));
  }

  return db.query.sessions.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    orderBy: [desc(sessions.updatedAt)],
  });
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function addMessage(
  sessionId: string,
  role: string,
  content: string
) {
  const [message] = await db
    .insert(messages)
    .values({ sessionId, role, content })
    .returning();

  // Touch session updatedAt
  await db
    .update(sessions)
    .set({ updatedAt: new Date() })
    .where(eq(sessions.id, sessionId));

  return message;
}

export async function getMessages(sessionId: string) {
  return db.query.messages.findMany({
    where: eq(messages.sessionId, sessionId),
    orderBy: [asc(messages.createdAt)],
  });
}

// ─── Generated Prompts ──────────────────────────────────────────────────────

export async function savePrompt(data: NewGeneratedPrompt) {
  const [prompt] = await db
    .insert(generatedPrompts)
    .values(data)
    .returning();
  return prompt;
}

export async function getPrompts(filters?: {
  agentId?: string;
  targetModel?: string;
  isFavorite?: boolean;
}) {
  const conditions: SQL[] = [];

  if (filters?.agentId) {
    conditions.push(eq(generatedPrompts.agentId, filters.agentId));
  }
  if (filters?.targetModel) {
    conditions.push(eq(generatedPrompts.targetModel, filters.targetModel));
  }
  if (filters?.isFavorite !== undefined) {
    conditions.push(eq(generatedPrompts.isFavorite, filters.isFavorite));
  }

  return db.query.generatedPrompts.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    orderBy: [desc(generatedPrompts.createdAt)],
  });
}

export async function getRecentPrompts(limit: number = 10) {
  return db.query.generatedPrompts.findMany({
    orderBy: [desc(generatedPrompts.createdAt)],
    limit,
  });
}

// ─── Boost Results ──────────────────────────────────────────────────────────

export async function saveBoostResult(data: NewBoostResult) {
  const [result] = await db
    .insert(boostResults)
    .values(data)
    .returning();
  return result;
}

export async function getBoostResults(promptId: string) {
  return db.query.boostResults.findMany({
    where: eq(boostResults.promptId, promptId),
    orderBy: [asc(boostResults.iteration)],
  });
}

// ─── Model Configs ──────────────────────────────────────────────────────────

export async function getModelConfig(id: string) {
  return db.query.modelConfigs.findFirst({
    where: eq(modelConfigs.id, id),
  });
}

export async function getModelConfigs(category?: string) {
  return db.query.modelConfigs.findMany({
    where: category ? eq(modelConfigs.category, category) : undefined,
    orderBy: [asc(modelConfigs.name)],
  });
}

// ─── Settings ───────────────────────────────────────────────────────────────

export async function updateSetting(key: string, value: string) {
  const [result] = await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    })
    .returning();
  return result;
}

export async function getSetting(key: string) {
  const result = await db.query.settings.findFirst({
    where: eq(settings.key, key),
  });
  return result?.value ?? null;
}
