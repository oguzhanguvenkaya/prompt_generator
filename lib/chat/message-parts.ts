import type { UIMessage } from "@ai-sdk/react";

type MessagePart = UIMessage["parts"][number];

export interface StoredAttachment {
  type: "file";
  mediaType: string;
  url: string;
  filename?: string;
}

function isTextPart(part: MessagePart): part is Extract<MessagePart, { type: "text"; text: string }> {
  return part.type === "text" && typeof part.text === "string";
}

function isStoredAttachment(value: unknown): value is StoredAttachment {
  if (!value || typeof value !== "object") return false;

  const attachment = value as Record<string, unknown>;
  return (
    attachment.type === "file" &&
    typeof attachment.mediaType === "string" &&
    typeof attachment.url === "string" &&
    (attachment.filename === undefined || typeof attachment.filename === "string")
  );
}

export function getMessageText(parts: MessagePart[]): string {
  return parts.filter(isTextPart).map((part) => part.text).join("");
}

export function getMessageAttachments(parts: MessagePart[]): StoredAttachment[] {
  return parts
    .filter((part): part is Extract<MessagePart, { type: "file"; mediaType: string; url: string; filename?: string }> => {
      return (
        part.type === "file" &&
        typeof part.mediaType === "string" &&
        typeof part.url === "string"
      );
    })
    .map((part) => ({
      type: "file",
      mediaType: part.mediaType,
      url: part.url,
      ...(part.filename ? { filename: part.filename } : {}),
    }));
}

export function buildMessageParts(content: string, attachments?: unknown[]): MessagePart[] {
  const fileParts = Array.isArray(attachments)
    ? attachments
        .filter(isStoredAttachment)
        .map((attachment) => ({
          type: "file" as const,
          mediaType: attachment.mediaType,
          url: attachment.url,
          ...(attachment.filename ? { filename: attachment.filename } : {}),
        }))
    : [];

  if (!content) {
    return fileParts;
  }

  return [...fileParts, { type: "text" as const, text: content }];
}
