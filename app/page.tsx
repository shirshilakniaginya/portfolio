import { AboutSlider } from "@/components/about-slider";
import { HeroGuides } from "@/components/hero-guides";
import { WorkGallery } from "@/components/work-gallery";
import { heroContent } from "@/lib/portfolio-content";
import Link from "next/link";

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="main-container site-header__inner">
        <div className="site-brand">
          <span className="site-brand__mark">AV</span>
          <span className="site-brand__label">WEB &amp; UI/UX DESIGNER</span>
        </div>

        <nav aria-label="Primary" className="site-nav">
          <Link className="site-nav__link is-active" href="#work">
            Work
          </Link>
          <Link className="site-nav__link" href="#about">
            About
          </Link>
          <Link className="site-nav__link" href="#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

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
        <SiteHeader />

        <section className="hero-section">
          <div className="main-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{heroContent.eyebrow}</p>
              <h1>{heroContent.title}</h1>
              <p className="lead">{heroContent.lead}</p>

              <div className="hero-actions">
                <Link className="btn btn-dark" href="#work">
                  <span className="btn__face btn__face--front">{heroContent.ctaPrimary}</span>
                  <span className="btn__face btn__face--back">{heroContent.ctaPrimary}</span>
                </Link>
                <Link className="btn btn-light" href="#contact">
                  <span className="btn__face btn__face--front">{heroContent.ctaSecondary}</span>
                  <span className="btn__face btn__face--back">{heroContent.ctaSecondary}</span>
                </Link>
              </div>

              <div className="hero-availability">
                <span className="hero-availability__dot" />
                <span>{heroContent.availability}</span>
              </div>
            </div>

            <HeroGuides />
          </div>
        </section>

        <AboutSlider />
        <WorkGallery />

        <section className="contact-section reveal-block" id="contact">
          <div className="main-container contact-grid">
            <div className="contact-col-left">
              <h2 className="contact-title">Давай обсудим<br />формат, объем и<br />структуру проекта.</h2>
              <p className="contact-desc">Пришли нишу, основную цель и референсы —<br />я предложу структуру и подход,<br />которые дадут результат.</p>
            </div>

            <div className="contact-col-middle">
              <div className="contact-buttons">
                <a href="mailto:hello@portfolio.dev" className="btn btn-dark">
                  <span className="btn__face btn__face--front">Написать на почту</span>
                  <span className="btn__face btn__face--back">Написать на почту</span>
                </a>
                <a href="https://t.me/" className="btn btn-light" rel="noreferrer" target="_blank">
                  <span className="btn__face btn__face--front">Telegram</span>
                  <span className="btn__face btn__face--back">Telegram</span>
                </a>
                <a href="#about" className="btn btn-light">
                  <span className="btn__face btn__face--front">Скачать CV</span>
                  <span className="btn__face btn__face--back">Скачать CV</span>
                </a>
              </div>
              <div className="contact-status">
                <span className="status-dot"></span> Быстрый ответ в течение 24 часов
              </div>
            </div>

            <div className="contact-col-right">
              <div className="contact-card">
                <div className="contact-card-label">С ЧЕГО ЛУЧШЕ НАЧАТЬ</div>
                <p className="contact-card-text">Лучше всего подойдут<br />для портфолио, экспертных<br />сайтов и лендингов с<br />акцентом на конверсию<br />и сильную структуру.</p>
                <div className="contact-card-image"></div>
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
