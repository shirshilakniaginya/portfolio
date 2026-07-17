"use client";

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { reachGoal } from "@/lib/metrika";
import styles from "./contact.module.css";

const TG_HANDLE_URL = "https://t.me/DSVRandom";
const CONTACT_ENDPOINT = "/api/contact";
const REQUEST_TIMEOUT_MS = 10_000;

const MIN_READY_MS = 3000;
const MAX_LINKS = 2;
const MIN_NICHE_LENGTH = 3;
const MAX_NICHE_LENGTH = 120;
const MIN_TASK_LENGTH = 20;
const MAX_TASK_LENGTH = 1600;
const MIN_CONTACT_LENGTH = 3;
const MAX_CONTACT_LENGTH = 160;
const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<]+/gi;
const SHOW_BRIEF_FORM = true;

type Status = "idle" | "sending" | "sent" | "error";

type Fields = {
  niche: string;
  task: string;
  contact: string;
  website: string;
};

function countLinks(value: string) {
  return value.match(URL_PATTERN)?.length ?? 0;
}

const CONNECT = [
  { label: "Kwork", href: "https://kwork.ru/user/dmitrydezign" },
  { label: "Dribbble", href: "https://dribbble.com/Shtutik" },
] as const;

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefForm({ onSent }: { onSent: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({
    niche: "",
    task: "",
    contact: "",
    website: "",
  });
  const openedAtRef = useRef(0);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const set =
    (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = e.target.value;
      setFields((prev) => ({ ...prev, [key]: nextValue }));

      if (status === "error") {
        setStatus("idle");
      }

      if (validationError) {
        setValidationError(null);
      }
    };

  const validateFields = () => {
    const niche = fields.niche.trim();
    const task = fields.task.trim();
    const contact = fields.contact.trim();

    if (fields.website.trim()) return "Проверка не пройдена.";
    if (Date.now() - openedAtRef.current < MIN_READY_MS) {
      return "Подождите 3 секунды перед отправкой формы.";
    }
    if (niche.length < MIN_NICHE_LENGTH) {
      return "Укажите, чем вы занимаетесь и какой сайт нужен.";
    }
    if (niche.length > MAX_NICHE_LENGTH) {
      return "Сократите описание направления до 120 символов.";
    }
    if (task.length < MIN_TASK_LENGTH) {
      return "Кратко опишите, какую задачу должен решить сайт.";
    }
    if (task.length > MAX_TASK_LENGTH) {
      return "Сократите описание задачи до 1200 символов.";
    }
    if (contact.length < MIN_CONTACT_LENGTH) {
      return "Укажите, как с вами связаться.";
    }
    if (contact.length > MAX_CONTACT_LENGTH) {
      return "Сократите контактные данные до 160 символов.";
    }

    const totalLinks = countLinks([niche, task, contact].join("\n"));
    if (totalLinks > MAX_LINKS) {
      return "Слишком много ссылок. Оставьте не больше двух.";
    }

    return null;
  };

  const submitBrief = async () => {
    setValidationError(null);
    setStatus("sending");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.niche.trim(),
          contact: fields.contact.trim(),
          message: fields.task.trim(),
          website: fields.website,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error("send failed");
      }

      setStatus("sent");
      reachGoal("lead");
      onSent();
    } catch {
      setValidationError("Не удалось отправить бриф. Попробуйте ещё раз или напишите в Telegram.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const fieldsError = validateFields();
    if (fieldsError) {
      setValidationError(fieldsError);
      setStatus("error");
      return;
    }

    void submitBrief();
  };

  if (status === "sent") {
    return (
      <div className={styles.formState}>
        <div className={styles.formSuccessCard}>
          <div className={styles.formSuccess}>
            <span className={styles.formSuccessIcon}>
              <CheckIcon />
            </span>
            <strong className={styles.formSuccessTitle}>Бриф получен</strong>
            <p className={styles.formSuccessText}>Отвечу в течение 24 часов.</p>
          </div>
        </div>
        <div className={styles.formFeedback} aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div aria-hidden="true" className={styles.botField}>
          <label htmlFor="website">Не заполняйте это поле</label>
          <input
            autoComplete="off"
            id="website"
            name="website"
            onChange={set("website")}
            tabIndex={-1}
            type="text"
            value={fields.website}
          />
        </div>

        <div className={`${styles.field} ${styles.fieldNiche}`}>
          <label className={styles.fieldLabel} htmlFor="niche">
            Чем вы занимаетесь и какой сайт нужен
          </label>
          <input
            className={styles.fieldInput}
            id="niche"
            maxLength={MAX_NICHE_LENGTH}
            name="niche"
            onChange={set("niche")}
            placeholder="Например: услуги юриста, нужен лендинг"
            type="text"
            value={fields.niche}
          />
        </div>

        <div className={`${styles.field} ${styles.fieldTask}`}>
          <label className={styles.fieldLabel} htmlFor="task">
            Что нужно сделать
          </label>
          <textarea
            className={styles.fieldTextarea}
            id="task"
            maxLength={MAX_TASK_LENGTH}
            name="task"
            onChange={set("task")}
            placeholder="Например: создать сайт с нуля или обновить текущий"
            rows={3}
            value={fields.task}
          />
        </div>

        <div className={`${styles.field} ${styles.fieldContact}`}>
          <label className={styles.fieldLabel} htmlFor="contact-method">
            Куда вам ответить
          </label>
          <input
            className={styles.fieldInput}
            id="contact-method"
            maxLength={MAX_CONTACT_LENGTH}
            name="contact"
            onChange={set("contact")}
            placeholder="@username в Telegram или email"
            type="text"
            value={fields.contact}
          />
        </div>

        <button
          className={styles.formSubmit}
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending"
            ? "Отправляю..."
            : "Отправить бриф"}
        </button>
      </form>

      <div className={styles.formFeedback} aria-live="polite">
        {status === "error" && (
          <p className={styles.formError}>
            {validationError ?? (
              <>
                Не отправилось. Напишите напрямую в{" "}
                <a
                  className={styles.formErrorLink}
                  href={TG_HANDLE_URL}
                  onClick={() => reachGoal("tg_click")}
                  rel="noreferrer"
                  target="_blank"
                >
                  Telegram
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>

    </>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.label}>
            <span className={styles.kicker}>{"// 03 Контакт"}</span>
            <h2 className={styles.kickerSub}>Расскажите о задаче</h2>
          </div>

          <div className={styles.copyColumn}>
            <div className={styles.statement}>
              <p>Напишите, чем занимаетесь и какой сайт нужен. Если сайт уже есть — пришлите ссылку.</p>
              <p>Я задам несколько вопросов и назову предварительный состав работы, срок и диапазон стоимости.</p>
            </div>

            <div className={styles.contactChannels}>
              <div className={styles.connect}>
                <span className="d-label">Профили</span>
                <ul className={styles.connectList}>
                  {CONNECT.map((item) => (
                    <li key={item.label}>
                      <a
                        className={styles.connectLink}
                        href={item.href}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        <span className={styles.connectLabel}>{item.label}</span>
                        <span className={styles.connectArrow} aria-hidden="true">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {SHOW_BRIEF_FORM && (
            <div className={styles.formWrap}>
              {!sent && <h3 className={styles.noteTitle}>Пришлите задачу</h3>}
              <BriefForm onSent={() => setSent(true)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
