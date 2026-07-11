// Yandex.Metrika counter id (metrika.yandex.ru, счётчик «SHTTQ Портфолио»).
export const METRIKA_ID = 110600617;

type YmFn = (id: number, action: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    ym?: YmFn;
  }
}

// Safe wrapper: no-op on server and when the counter script is blocked.
export function reachGoal(goal: string) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(METRIKA_ID, "reachGoal", goal);
  }
}
