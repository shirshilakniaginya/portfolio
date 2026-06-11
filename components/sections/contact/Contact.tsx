"use client";

import { type FormEvent, useState } from "react";
import styles from "./contact.module.css";

const TG_HANDLE_URL = "https://t.me/DSVRandom";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

function KworkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5h-3v-5h3v5zm0-7h-3V7.5h3V9.5z"/>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.665 4.717L17.93 18.191C17.724 19.145 17.188 19.379 16.385 18.93L11.95 15.66L9.808 17.721C9.572 17.957 9.374 18.156 8.917 18.156L9.235 13.638L17.458 6.208C17.816 5.89 17.38 5.712 16.903 6.03L6.737 12.433L2.36 11.064C1.409 10.767 1.39 10.113 2.558 9.656L19.684 3.056C20.478 2.758 21.173 3.234 20.665 4.717Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 4.7a8.05 8.05 0 0 1 1.8 4.44c-1.39-.28-2.8-.36-4.22-.24a23.6 23.6 0 0 0-1.32-3.03 14.97 14.97 0 0 0 3.74-1.17zm-1.73-1.66a12.8 12.8 0 0 1-3.14 1.22 21.38 21.38 0 0 0-2.4-3.43c.19-.01.38-.03.57-.03a8.04 8.04 0 0 1 4.97 2.24zM9.1 3.3c.84.9 1.77 2.13 2.44 3.63C9.26 7.66 6.8 7.74 4.56 7.68A8.16 8.16 0 0 1 9.1 3.3zM3.84 9.48h.26c2.82 0 6.02-.22 10.01-1.18.32.67.62 1.37.89 2.06l-.42.12c-4.12 1.26-6.3 3.77-7.02 4.81A8.06 8.06 0 0 1 3.84 9.48zm5.34 9.57c.49-.83 2.35-3.58 6.3-4.92.14-.05.29-.1.44-.14.56 1.88.95 3.88 1.09 5.96A8.06 8.06 0 0 1 9.18 19.05zm9.62-.74a29.04 29.04 0 0 0-1.02-5.21 11.07 11.07 0 0 1 3.28.25 8.02 8.02 0 0 1-2.26 4.96z"/>
    </svg>
  );
}

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

type Status = "idle" | "sending" | "sent" | "error";

function BriefForm({ onSent }: { onSent: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [fields, setFields] = useState({ niche: "", task: "", contact: "" });

  const set = (key: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    if (!fields.niche.trim()) return "Укажите нишу и тип проекта.";
    if (!fields.task.trim()) return "Опишите задачу.";
    if (!fields.contact.trim()) return "Укажите, как с вами связаться.";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldsError = validate();
    if (fieldsError) {
      setValidationError(fieldsError);
      setStatus("error");
      return;
    }
    if (!WEB3FORMS_KEY) {
      setValidationError(null);
      setStatus("error");
      return;
    }
    setValidationError(null);
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Новая заявка с портфолио",
          from_name: "Портфолио — форма брифа",
          "Ниша": fields.niche,
          "Задача": fields.task,
          "Контакт": fields.contact,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("send failed");
      setStatus("sent");
      onSent();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.formSuccess}>
        <span className={styles.formSuccessIcon}><CheckIcon /></span>
        <strong className={styles.formSuccessTitle}>Бриф получен</strong>
        <p className={styles.formSuccessText}>Отвечу в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="niche">Ниша и тип проекта</label>
        <input
          className={styles.fieldInput}
          id="niche"
          name="niche"
          onChange={set("niche")}
          placeholder="Лендинг, корп. сайт, SaaS"
          type="text"
          value={fields.niche}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="task">Задача</label>
        <textarea
          className={styles.fieldTextarea}
          id="task"
          name="task"
          onChange={set("task")}
          placeholder="Дизайн с нуля, редизайн, правки"
          rows={5}
          value={fields.task}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="contact-method">Как связаться</label>
        <input
          className={styles.fieldInput}
          id="contact-method"
          name="contact"
          onChange={set("contact")}
          placeholder="@username или email"
          type="text"
          value={fields.contact}
        />
      </div>

      {status === "error" && (
        <p className={styles.formError}>
          {validationError ?? (
            <>
              Не отправилось. Напишите напрямую в{" "}
              <a className={styles.formErrorLink} href={TG_HANDLE_URL} rel="noreferrer" target="_blank">
                Telegram
              </a>
              .
            </>
          )}
        </p>
      )}

      <button
        className={styles.formSubmit}
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Отправляю..." : "Отправить бриф"}
      </button>
    </form>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h2 className={styles.title}>
            РАССКАЖИ О ПРОЕКТЕ
            <br />
            ОБСУДИМ СТРУКТУРУ
          </h2>
          <p className={styles.description}>
            Пришли нишу, задачу и референсы — мы обсудим структуру и найдём подход под конкретную страницу.
          </p>
        </div>

        <div className={styles.actions}>
          <a
            className={styles.contactAction}
            href="https://kwork.ru/user/dmitrydezign"
            rel="noreferrer"
            target="_blank"
          >
            <span className={styles.contactActionMeta}>Заказы и отзывы</span>
            <strong className={styles.contactActionTitle}>Kwork</strong>
            <span aria-hidden="true" className={styles.contactActionIcon}>
              <KworkIcon />
            </span>
          </a>

          <a
            className={styles.contactAction}
            href={TG_HANDLE_URL}
            rel="noreferrer"
            target="_blank"
          >
            <span className={styles.contactActionMeta}>Быстрый чат</span>
            <strong className={styles.contactActionTitle}>Telegram</strong>
            <span aria-hidden="true" className={styles.contactActionIcon}>
              <TelegramIcon />
            </span>
          </a>

          <a
            className={styles.contactAction}
            href="https://dribbble.com/Shtutik"
            rel="noreferrer"
            target="_blank"
          >
            <span className={styles.contactActionMeta}>Портфолио</span>
            <strong className={styles.contactActionTitle}>Dribbble</strong>
            <span aria-hidden="true" className={styles.contactActionIcon}>
              <DribbbleIcon />
            </span>
          </a>
        </div>

        <div className={styles.note}>
          {!sent && <h3 className={styles.noteTitle}>Пришлите задачу</h3>}
          <BriefForm onSent={() => setSent(true)} />
        </div>
      </div>
    </section>
  );
}
