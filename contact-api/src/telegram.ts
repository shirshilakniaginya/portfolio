import type { ContactPayload } from "./validation.js";

const TELEGRAM_TIMEOUT_MS = 8_000;

function formatMessage(payload: ContactPayload): string {
  return [
    "Новая заявка с сайта",
    "",
    `Имя / ниша: ${payload.name}`,
    `Контакт: ${payload.contact}`,
    "",
    "Сообщение:",
    payload.message,
  ].join("\n");
}

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  payload: ContactPayload,
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(payload),
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("Telegram request failed");

    const result = await response.json() as { ok?: boolean };
    if (result.ok !== true) throw new Error("Telegram request failed");
  } finally {
    clearTimeout(timeoutId);
  }
}
