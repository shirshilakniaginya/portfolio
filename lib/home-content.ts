// Single source of content for the redesigned homepage.

export type ProjectMock = "site" | "dashboard";

export type Project = {
  index: string;
  name: string;
  kind: string; // small lockup next to the name, e.g. "design / dev"
  summary: string;
  role: string;
  tags: string[];
  href: string;
  previewUrl: string;
  previewImage: string;
  mock: ProjectMock;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Formwork Studio",
    kind: "сайт студии",
    summary:
      "Сайт архитектурной студии с жёсткой типографикой и монументальной подачей. Сетка и ритм секций подчёркивают характер архитектуры.",
    role: "Концепт, визуальная система, фронтенд",
    tags: ["Арт-дирекшн", "Лендинг", "Фронтенд", "Адаптив"],
    href: "/cases/formwork/",
    previewUrl: "shtq.pro/cases/formwork",
    previewImage: "/previews/formwork-hero.webp",
    mock: "site",
  },
  {
    index: "02",
    name: "VOIDHEIR",
    kind: "игровой промо-сайт",
    summary:
      "Промо-сайт мрачной научно-фантастической RPG. Мир, боевые системы и сюжетные развилки знакомят с игрой через кинематографичную подачу.",
    role: "Концепт, айдентика, фронтенд",
    tags: ["Игры", "Промо", "Фронтенд", "Атмосфера"],
    href: "/cases/voidheir/",
    previewUrl: "shtq.pro/cases/voidheir",
    previewImage: "/previews/voidheir.webp",
    mock: "site",
  },
  {
    index: "03",
    name: "Motion Club",
    kind: "сайт тренера",
    summary:
      "Лендинг персонального тренера. Первый экран объясняет ценность услуги, а структура помогает понять формат работы и выбрать программу.",
    role: "UX/UI, структура, фронтенд",
    tags: ["Фитнес", "Лендинг", "Фронтенд", "CTA"],
    href: "/cases/motion-club/",
    previewUrl: "shtq.pro/cases/motion-club",
    previewImage: "/previews/motion-club.webp",
    mock: "site",
  },
  {
    index: "04",
    name: "Торнадо",
    kind: "сайт конного клуба",
    summary:
      "Лендинг конного клуба с природной палитрой и спокойной премиальной подачей. Структура помогает выбрать прогулку или занятие и перейти к записи.",
    role: "UX/UI, лендинг, фронтенд",
    tags: ["Конный клуб", "Лендинг", "Фронтенд", "Премиум"],
    href: "/cases/horseschool/live/",
    previewUrl: "shtq.pro/cases/horseschool/live",
    previewImage: "/previews/horseschool.webp",
    mock: "site",
  },
  {
    index: "05",
    name: "Citydog",
    kind: "кинологический центр",
    summary:
      "Сайт кинологического центра: дрессировка, груминг и уход за собаками. Структура помогает выбрать услугу, познакомиться со специалистами и записаться.",
    role: "UX/UI, структура, фронтенд",
    tags: ["Уход за собаками", "Лендинг", "Фронтенд", "Сервис"],
    href: "/cases/citydog/",
    previewUrl: "shtq.pro/cases/citydog",
    previewImage: "/previews/citydog-hero.webp",
    mock: "site",
  },
];

// Identity shown at the top of the fixed left column (name swappable).
export const profile = {
  name: "Дмитрий",
  role: "Веб-дизайн · Фронтенд",
  about:
    "Проектирую сайт как систему: от структуры и пути пользователя до чистого фронтенда, который можно развивать вместе с проектом.",
};

export const skills = [
  "UX/UI дизайн",
  "Веб-дизайн",
  "Фронтенд",
  "Проектирование",
  "Системный подход",
];

export const heroTags = ["системный дизайн", "чистый код", "осознанный подход"];

// Real channels kept; placeholders marked. Swap href when profiles exist.
export const socials = [
  { label: "Dribbble", href: "https://dribbble.com/Shtutik", external: true },
  { label: "Behance", href: "#", external: true },
  { label: "GitHub", href: "#", external: true },
  { label: "VK", href: "#", external: true },
];
