import assert from "node:assert/strict";
import test from "node:test";
import { validateContactPayload } from "../dist/validation.js";

const validPayload = {
  name: "Студия интерьеров",
  contact: "@example",
  message: "Нужен лендинг для новой услуги студии.",
  website: "",
};

test("accepts and cleans a valid payload", () => {
  const result = validateContactPayload({
    ...validPayload,
    name: "  Студия\u0000 интерьеров  ",
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      name: "Студия интерьеров",
      contact: "@example",
      message: "Нужен лендинг для новой услуги студии.",
    },
  });
});

test("rejects missing, incorrectly typed, and oversized fields", () => {
  assert.deepEqual(validateContactPayload({ ...validPayload, contact: 123 }), {
    ok: false,
    kind: "invalid",
  });
  assert.deepEqual(validateContactPayload({ ...validPayload, message: "x".repeat(1601) }), {
    ok: false,
    kind: "invalid",
  });
});

test("classifies a filled honeypot as spam", () => {
  assert.deepEqual(validateContactPayload({ ...validPayload, website: "https://spam.test" }), {
    ok: false,
    kind: "spam",
  });
});
