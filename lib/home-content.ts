// Single source of content for the redesigned homepage.

export type ProjectMock = "site" | "dashboard";

export type Project = {
  index: string;
  name: string;
  kind: string; // small lockup next to the name, e.g. "design / dev"
  summary: string;
  role: string;
  team: string;
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
    kind: "studio site",
    summary:
      "Сайт архитектурной студии с жёсткой типографикой, монументальной подачей и выстроенным ритмом секций. Проект держится на атмосфере, материальности и сильной визуальной системе.",
    role: "Концепт, визуальная система, фронтенд",
    team: "соло",
    tags: ["Арт-дирекшн", "Лендинг", "Фронтенд", "Адаптив"],
    href: "/cases/formwork/",
    previewUrl: "shtq.pro/cases/formwork",
    previewImage: "/previews/formwork-hero.webp",
    mock: "site",
  },
  {
    index: "02",
    name: "VOIDHEIR",
    kind: "game landing",
    summary:
      "Промо-сайт для dark sci-fi action RPG, где атмосфера продаёт игру через мир, системы, сюжетные развилки и один чёткий CTA. Визуал построен на лоре, драме и кинематографичной подаче.",
    role: "Концепт, айдентика, фронтенд",
    team: "соло",
    tags: ["Game", "Промо", "Фронтенд", "Атмосфера"],
    href: "/cases/voidheir/",
    previewUrl: "shtq.pro/cases/voidheir",
    previewImage: "/previews/voidheir.webp",
    mock: "site",
  },
  {
    index: "03",
    name: "Motion Club",
    kind: "fitness landing",
    summary:
      "Лендинг персонального тренера с плотной hero-сценой, сильным контрастом и упором на понятную ценность услуги. Сайт быстро объясняет формат работы, программы и результат для клиента.",
    role: "UX/UI, структура, фронтенд",
    team: "соло",
    tags: ["Фитнес", "Лендинг", "Фронтенд", "CTA"],
    href: "/cases/motion-club/",
    previewUrl: "shtq.pro/cases/motion-club",
    previewImage: "/previews/motion-club.webp",
    mock: "site",
  },
  {
    index: "04",
    name: "Торнадо",
    kind: "horse club",
    summary:
      "Лендинг конного клуба с мягкой премиальной подачей, природной палитрой и акцентом на впечатление от прогулок и занятий. Интерфейс строится вокруг доверия, спокойствия и визуального комфорта.",
    role: "UX/UI, лендинг, фронтенд",
    team: "соло",
    tags: ["HoReCa", "Лендинг", "Фронтенд", "Premium"],
    href: "/cases/horseschool/live/",
    previewUrl: "shtq.pro/cases/horseschool/live",
    previewImage: "/previews/horseschool.webp",
    mock: "site",
  },
  {
    index: "05",
    name: "Citydog",
    kind: "pet care",
    summary:
      "Сайт кинологического центра с услугами дрессировки, груминга и ухода за собаками. Структура помогает быстро выбрать направление, познакомиться со специалистами и записаться на занятие.",
    role: "UX/UI, структура, фронтенд",
    team: "соло",
    tags: ["Pet care", "Лендинг", "Фронтенд", "Сервис"],
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
    "Проектирую сайты как системы — от структуры и пути пользователя до чистого фронтенда, который легко растёт вместе с проектом.",
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
