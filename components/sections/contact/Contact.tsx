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
const SHOW_BRIEF_FORM = false;

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

const CONNECT = [
  { label: "Telegram", href: TG_HANDLE_URL },
  { label: "Kwork", href: "https://kwork.ru/user/dmitrydezign" },
  { label: "Dribbble", href: "https://dribbble.com/Shtutik" },
  { label: "Behance", href: "#" },
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
        <div className={styles.topGrid}>
          <div className={styles.label}>
            <span className={styles.kicker}>{"// 03 Контакт"}</span>
            <span className={styles.kickerSub}>На связи</span>
          </div>

          <div className={styles.statement}>
            <p>Напиши, нужен ли сайт с нуля, редизайн или правки.</p>
            <p>Разберём задачу, структуру и найдём формат под вашу цель.</p>
          </div>

          <div className={styles.direct}>
            <div className={styles.directItem}>
              <span className="d-label">Telegram</span>
              <a className={styles.directLink} href={TG_HANDLE_URL} rel="noreferrer" target="_blank">
                @DSVRandom
              </a>
            </div>

            <div className={styles.directItem}>
              <span className="d-label">Ответ</span>
              <span className={styles.response}>
                В течение 24 часов
                <i className={styles.responseDot} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className={styles.connect}>
            <span className="d-label">Связи</span>
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
                    {item.label}
                    <span className={styles.connectArrow} aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {SHOW_BRIEF_FORM && (
          <div className={styles.formWrap}>
            {!sent && <h3 className={styles.noteTitle}>Пришлите задачу</h3>}
            <BriefForm onSent={() => setSent(true)} />
          </div>
        )}
      </div>
    </section>
  );
}
