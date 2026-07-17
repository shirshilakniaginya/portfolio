export type ContactPayload = {
  name: string;
  contact: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; kind: "invalid" | "spam" };

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

function cleanText(value: string): string {
  return value.normalize("NFC").replace(CONTROL_CHARACTERS, "").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readField(
  source: Record<string, unknown>,
  field: string,
  minLength: number,
  maxLength: number,
): string | null {
  const value = source[field];
  if (typeof value !== "string") return null;

  const cleaned = cleanText(value);
  if (cleaned.length < minLength || cleaned.length > maxLength) return null;
  return cleaned;
}

export function validateContactPayload(input: unknown): ValidationResult {
  if (!isRecord(input)) return { ok: false, kind: "invalid" };

  const website = input.website;
  if (typeof website !== "string") return { ok: false, kind: "invalid" };
  if (cleanText(website).length > 0) return { ok: false, kind: "spam" };

  const name = readField(input, "name", 3, 120);
  const contact = readField(input, "contact", 3, 160);
  const message = readField(input, "message", 20, 1600);

  if (!name || !contact || !message) return { ok: false, kind: "invalid" };

  return {
    ok: true,
    data: { name, contact, message },
  };
}
