import { AboutSlider } from "@/components/about-slider";
import { HeroGuides } from "@/components/hero-guides";
import { WorkGallery } from "@/components/work-gallery";
import { contactFacts } from "@/lib/portfolio-content";

export default function Home() {
  return (
    <div className="page-shell">
      <aside className="side-rail">
        <div className="side-rail__line" />
        <div className="side-rail__copy">
          <span>Portfolio</span>
          <span>Calm editorial websites and systems</span>
        </div>
      </aside>

      <main className="page-content">
        <header className="site-header">
          <div className="main-container site-header__inner">
            <div className="site-brand">
              <span className="site-brand__mark">AV</span>
              <span className="site-brand__label">WEB &amp; UI/UX DESIGNER</span>
            </div>

            <nav aria-label="Primary" className="site-nav">
              <a className="site-nav__link is-active" href="#work">
                Work
              </a>
              <a className="site-nav__link" href="#about">
                About
              </a>
              <a className="site-nav__link" href="#contact">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <section className="hero-section">
          <div className="main-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">САЙТ-ПОРТФОЛИО / UI-UX ДИЗАЙНЕР</p>
              <h1>Дизайню сайты, портфолио и лендинги.</h1>
              <p className="lead">
                Для экспертов, сервисных бизнесов и премиальных предложений. Цель не просто в красивой странице,
                а в более ясном оффере, сильном сценарии чтения, доверии и фронтенде, который можно развивать
                дальше без хаоса.
              </p>

              <div className="hero-actions">
                <a className="btn btn-dark" href="#work">
                  <span className="btn__face btn__face--front">Смотреть кейсы</span>
                  <span className="btn__face btn__face--back">Смотреть кейсы</span>
                </a>
                <a className="btn btn-light" href="#contact">
                  <span className="btn__face btn__face--front">Обсудить проект</span>
                  <span className="btn__face btn__face--back">Обсудить проект</span>
                </a>
              </div>

              <div className="hero-availability">
                <span className="hero-availability__dot" />
                <span>Available for new projects</span>
              </div>
            </div>

            <HeroGuides />
          </div>
        </section>

        <AboutSlider />
        <WorkGallery />

        <section className="contact-section reveal-block" id="contact">
          <div className="main-container contact-grid">
            <div className="contact-copy">
              <p className="contact-eyebrow">CONTACT / PROJECT</p>
              <h2>Давай обсудим формат, объем и структуру проекта.</h2>
            </div>

            <div className="contact-text">
              <p>
                Пришли нишу, основную цель и референсы, которые тебе нравятся. Я отвечу с предложением по
                структуре, направлению и объему работ.
              </p>
            </div>

            <div className="contact-actions-panel">
              <div className="contact-actions-row">
                <a className="btn btn-primary contact-btn contact-btn--wide" href="mailto:hello@portfolio.dev">
                  <span className="btn__face btn__face--front">Написать на почту</span>
                  <span className="btn__face btn__face--back">Написать на почту</span>
                </a>
                <a className="btn btn-light contact-btn" href="https://t.me/" rel="noreferrer" target="_blank">
                  <span className="btn__face btn__face--front">Telegram</span>
                  <span className="btn__face btn__face--back">Telegram</span>
                </a>
                <a className="btn btn-light contact-btn" href="#about">
                  <span className="btn__face btn__face--front">Скачать CV</span>
                  <span className="btn__face btn__face--back">Скачать CV</span>
                </a>
              </div>

              <div className="contact-note-card">
                <div>
                  <span>С чего лучше начать</span>
                  <p>{contactFacts[0]}</p>
                </div>
                <div className="contact-note-card__image" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="main-container site-footer__inner">
            <span>© 2026 Portfolio designer</span>
            <div className="site-footer__links">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
