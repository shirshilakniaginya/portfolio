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
    kind: "сайт архитектурной студии",
    summary:
      "Сайт архитектурной студии. Крупная типографика, чёрно-белая палитра и акцент на проектах студии.",
    role: "Концепция, дизайн, фронтенд",
    tags: ["Структура", "Веб-дизайн", "Вёрстка", "Адаптив"],
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
      "Промо-сайт научно-фантастической RPG. На странице показаны мир игры, способности героя, сюжетные развилки и варианты финала.",
    role: "Концепция, дизайн, фронтенд",
    tags: ["Концепция", "Веб-дизайн", "Анимация", "Вёрстка"],
    href: "/cases/voidheir/",
    previewUrl: "shtq.pro/cases/voidheir",
    previewImage: "/previews/voidheir.webp",
    mock: "site",
  },
  {
    index: "03",
    name: "Motion Club",
    kind: "сайт персонального тренера",
    summary:
      "Лендинг персонального тренера: программы, формат занятий, результаты клиентов и запись на тренировку.",
    role: "UX/UI, структура, фронтенд",
    tags: ["Структура", "Веб-дизайн", "Вёрстка", "Адаптив"],
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
      "Сайт конного клуба: программы занятий, маршруты, цены и запись.",
    role: "UX/UI, лендинг, фронтенд",
    tags: ["Структура", "Веб-дизайн", "Вёрстка", "Запись"],
    href: "/cases/horseschool/live/",
    previewUrl: "shtq.pro/cases/horseschool/live",
    previewImage: "/previews/horseschool.webp",
    mock: "site",
  },
  {
    index: "05",
    name: "Citydog",
    kind: "сайт кинологического центра",
    summary:
      "Сайт кинологического центра: услуги, специалисты, отзывы и запись.",
    role: "UX/UI, структура, фронтенд",
    tags: ["Структура", "Веб-дизайн", "Вёрстка", "Форма заявки"],
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
    "Я Дмитрий. Сам продумываю структуру, рисую дизайн и собираю сайт — без передачи проекта между несколькими специалистами.",
};

export const skills = [
  "UX/UI дизайн",
  "Веб-дизайн",
  "Фронтенд",
  "Проектирование",
  "Адаптивная вёрстка",
];

export const heroTags = ["структура", "веб-дизайн", "фронтенд"];

// Real channels kept; placeholders marked. Swap href when profiles exist.
export const socials = [
  { label: "Dribbble", href: "https://dribbble.com/Shtutik", external: true },
  { label: "Behance", href: "#", external: true },
  { label: "GitHub", href: "#", external: true },
  { label: "VK", href: "#", external: true },
];
