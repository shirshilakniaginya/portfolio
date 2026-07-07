"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import styles from "./contact.module.css";

const TG_HANDLE_URL = "https://t.me/DSVRandom";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const WEB3FORMS_HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const MIN_READY_MS = 3000;
const MAX_LINKS = 2;
const MIN_NICHE_LENGTH = 3;
const MAX_NICHE_LENGTH = 120;
const MIN_TASK_LENGTH = 20;
const MAX_TASK_LENGTH = 1600;
const MIN_CONTACT_LENGTH = 3;
const MAX_CONTACT_LENGTH = 160;
const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<]+/gi;

type Status = "idle" | "verifying" | "sending" | "sent" | "error";

type Fields = {
  niche: string;
  task: string;
  contact: string;
  botcheck: string;
};

function countLinks(value: string) {
  return value.match(URL_PATTERN)?.length ?? 0;
}

function KworkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5h-3v-5h3v5zm0-7h-3V7.5h3V9.5z" />
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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 4.7a8.05 8.05 0 0 1 1.8 4.44c-1.39-.28-2.8-.36-4.22-.24a23.6 23.6 0 0 0-1.32-3.03 14.97 14.97 0 0 0 3.74-1.17zm-1.73-1.66a12.8 12.8 0 0 1-3.14 1.22 21.38 21.38 0 0 0-2.4-3.43c.19-.01.38-.03.57-.03a8.04 8.04 0 0 1 4.97 2.24zM9.1 3.3c.84.9 1.77 2.13 2.44 3.63C9.26 7.66 6.8 7.74 4.56 7.68A8.16 8.16 0 0 1 9.1 3.3zM3.84 9.48h.26c2.82 0 6.02-.22 10.01-1.18.32.67.62 1.37.89 2.06l-.42.12c-4.12 1.26-6.3 3.77-7.02 4.81A8.06 8.06 0 0 1 3.84 9.48zm5.34 9.57c.49-.83 2.35-3.58 6.3-4.92.14-.05.29-.1.44-.14.56 1.88.95 3.88 1.09 5.96A8.06 8.06 0 0 1 9.18 19.05zm9.62-.74a29.04 29.04 0 0 0-1.02-5.21 11.07 11.07 0 0 1 3.28.25 8.02 8.02 0 0 1-2.26 4.96z" />
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

function BriefForm({ onSent }: { onSent: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({
    niche: "",
    task: "",
    contact: "",
    botcheck: "",
  });
  const openedAtRef = useRef(0);
  const captchaRef = useRef<HCaptcha>(null);
  const pendingSubmitRef = useRef(false);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const resetCaptcha = () => {
    captchaRef.current?.resetCaptcha();
  };

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

    if (fields.botcheck.trim()) return "Проверка не пройдена.";
    if (Date.now() - openedAtRef.current < MIN_READY_MS) {
      return "Подождите 3 секунды перед отправкой формы.";
    }
    if (niche.length < MIN_NICHE_LENGTH) {
      return "Укажите нишу и тип проекта.";
    }
    if (niche.length > MAX_NICHE_LENGTH) {
      return "Поле с нишей слишком длинное.";
    }
    if (task.length < MIN_TASK_LENGTH) {
      return "Опишите задачу чуть подробнее.";
    }
    if (task.length > MAX_TASK_LENGTH) {
      return "Описание задачи слишком длинное.";
    }
    if (contact.length < MIN_CONTACT_LENGTH) {
      return "Укажите, как с вами связаться.";
    }
    if (contact.length > MAX_CONTACT_LENGTH) {
      return "Контактные данные слишком длинные.";
    }

    const totalLinks = countLinks([niche, task, contact].join("\n"));
    if (totalLinks > MAX_LINKS) {
      return "Слишком много ссылок. Оставьте не больше двух.";
    }

    return null;
  };

  const submitBrief = async (token: string) => {
    if (!WEB3FORMS_KEY) {
      setValidationError("Форма временно недоступна. Напишите напрямую в Telegram.");
      setStatus("error");
      pendingSubmitRef.current = false;
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
          subject: "Новая заявка на сайт",
          from_name: "SHTQ - форма заявки на сайт",
          botcheck: fields.botcheck,
          "h-captcha-response": token,
          Ниша: fields.niche.trim(),
          Задача: fields.task.trim(),
          Контакт: fields.contact.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "send failed");
      }

      pendingSubmitRef.current = false;
      resetCaptcha();
      setStatus("sent");
      onSent();
    } catch {
      pendingSubmitRef.current = false;
      resetCaptcha();
      setValidationError("Не отправилось. Попробуйте ещё раз или напишите в Telegram.");
      setStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fieldsError = validateFields();
    if (fieldsError) {
      setValidationError(fieldsError);
      setStatus("error");
      return;
    }

    if (!captchaRef.current) {
      setValidationError("Проверка captcha не загрузилась. Попробуйте ещё раз.");
      setStatus("error");
      return;
    }

    pendingSubmitRef.current = true;
    setValidationError(null);
    setStatus("verifying");
    void captchaRef.current.execute();
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
          <label htmlFor="botcheck">Не заполняйте это поле</label>
          <input
            autoComplete="off"
            id="botcheck"
            name="botcheck"
            onChange={set("botcheck")}
            tabIndex={-1}
            type="text"
            value={fields.botcheck}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="niche">
            Ниша и тип проекта
          </label>
          <input
            className={styles.fieldInput}
            id="niche"
            maxLength={MAX_NICHE_LENGTH}
            name="niche"
            onChange={set("niche")}
            placeholder="Лендинг, корп. сайт, SaaS"
            type="text"
            value={fields.niche}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="task">
            Задача
          </label>
          <textarea
            className={styles.fieldTextarea}
            id="task"
            maxLength={MAX_TASK_LENGTH}
            name="task"
            onChange={set("task")}
            placeholder="Дизайн с нуля, редизайн, правки"
            rows={5}
            value={fields.task}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="contact-method">
            Как связаться
          </label>
          <input
            className={styles.fieldInput}
            id="contact-method"
            maxLength={MAX_CONTACT_LENGTH}
            name="contact"
            onChange={set("contact")}
            placeholder="@username или email"
            type="text"
            value={fields.contact}
          />
        </div>

        <button
          className={styles.formSubmit}
          disabled={status === "sending" || status === "verifying"}
          type="submit"
        >
          {status === "sending"
            ? "Отправляю..."
            : status === "verifying"
              ? "Проверяю..."
              : "Отправить бриф"}
        </button>
      </form>

      <div className={styles.formFeedback} aria-live="polite">
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
      </div>

      <div aria-hidden="true" className={styles.captchaHidden}>
        <HCaptcha
          ref={captchaRef}
          onError={() => {
            pendingSubmitRef.current = false;
            setValidationError("Ошибка captcha. Попробуйте ещё раз.");
            setStatus("error");
          }}
          onExpire={() => {
            pendingSubmitRef.current = false;
            setValidationError("Проверка истекла. Нажмите отправку ещё раз.");
            setStatus("error");
          }}
          onVerify={(token) => {
            if (!pendingSubmitRef.current) {
              resetCaptcha();
              return;
            }
            void submitBrief(token);
          }}
          reCaptchaCompat={false}
          sitekey={WEB3FORMS_HCAPTCHA_SITE_KEY}
          size="invisible"
          theme="dark"
        />
      </div>
    </>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Давай обсудим
            <br />
            ваш сайт
          </h2>
          <p className={styles.description}>
            Напиши, нужен ли сайт с нуля, редизайн или правки. Разберём задачу,
            структуру и найдём формат под вашу цель.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.channels}>
            <span className={styles.channelsLabel}>Контакты</span>

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

            <a className={styles.contactAction} href={TG_HANDLE_URL} rel="noreferrer" target="_blank">
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

          <div className={styles.formWrap}>
            {!sent && <h3 className={styles.noteTitle}>Пришлите задачу</h3>}
            <BriefForm onSent={() => setSent(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}
