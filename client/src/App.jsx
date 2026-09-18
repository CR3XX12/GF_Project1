import { useEffect, useState } from 'react';
import './App.css';
import heroImage from './assets/generated/doughnut-hero.png';
import en from './locales/en.json';
import es from './locales/es.json';

const translations = { en, es };

const products = [
  { price: '$4.75', accent: 'berry' },
  { price: '$4.50', accent: 'cocoa' },
  { price: '$4.25', accent: 'vanilla' },
  { price: '$5.25', accent: 'cream' },
  { price: '$4.95', accent: 'maple' },
  { price: '$5.00', accent: 'lemon' },
];

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('');
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(t.form.sending);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus(t.form.success);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus(t.form.error);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setStatus('');
    closeMenu();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label={t.brand.homeLabel}>
          <span className="brand-mark">DS</span>
          <span>
            <strong>{t.brand.name}</strong>
            <small>{t.brand.tagline}</small>
          </span>
        </a>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={t.nav.label}>
          <a href="#menu" onClick={closeMenu}>{t.nav.menu}</a>
          <a href="#boxes" onClick={closeMenu}>{t.nav.boxes}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
        </nav>

        <div className="language-toggle" role="group" aria-label={t.language.label}>
          <button
            className={language === 'en' ? 'is-active' : ''}
            type="button"
            aria-pressed={language === 'en'}
            onClick={() => changeLanguage('en')}
          >
            <span className="language-long">{t.language.english}</span>
            <span className="language-short">EN</span>
          </button>
          <button
            className={language === 'es' ? 'is-active' : ''}
            type="button"
            aria-pressed={language === 'es'}
            onClick={() => changeLanguage('es')}
          >
            <span className="language-long">{t.language.spanish}</span>
            <span className="language-short">ES</span>
          </button>
        </div>

        <a className="nav-cta" href="#contact">{t.nav.order}</a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={t.nav.toggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home" aria-label={t.hero.sectionLabel}>
          <img src={heroImage} alt={t.hero.imageAlt} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-copy">{t.hero.copy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#menu">{t.hero.viewMenu}</a>
              <a className="button secondary" href="#contact">{t.hero.pickup}</a>
            </div>
          </div>
          <div className="hero-card" aria-label={t.hero.cardLabel}>
            <span>{t.hero.drop}</span>
            <strong>{t.hero.featured}</strong>
            <small>{t.hero.availability}</small>
          </div>
        </section>

        <section className="intro-section" aria-label={t.intro.label}>
          <div>
            <p className="eyebrow">{t.intro.eyebrow}</p>
            <h2>{t.intro.title}</h2>
          </div>
          <div className="stats">
            {t.intro.stats.map((stat) => (
              <span key={stat.value}><strong>{stat.value}</strong> {stat.label}</span>
            ))}
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">{t.menu.eyebrow}</p>
            <h2>{t.menu.title}</h2>
          </div>

          <div className="menu-grid">
            {t.menu.items.map((item, index) => (
              <article className={`menu-card ${products[index].accent}`} key={products[index].accent}>
                <div className="donut-visual" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <div className="card-topline">
                    <span>{item.tag}</span>
                    <strong>{products[index].price}</strong>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="order-band" id="boxes">
          <div>
            <p className="eyebrow">{t.boxes.eyebrow}</p>
            <h2>{t.boxes.title}</h2>
          </div>
          <ul>
            {t.boxes.items.map((box) => (
              <li key={box}>{box}</li>
            ))}
          </ul>
          <a className="button primary" href="#contact">{t.boxes.action}</a>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.copy}</p>

            <div className="shop-details">
              <span><strong>{t.contact.hours}</strong> {t.contact.hoursValue}</span>
              <span><strong>{t.contact.phone}</strong> (555) 014-1999</span>
              <span><strong>{t.contact.pickup}</strong> {t.contact.address}</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {t.form.name}
              <input
                type="text"
                placeholder={t.form.namePlaceholder}
                required
                value={form.name}
                onChange={handleChange('name')}
              />
            </label>
            <label>
              {t.form.email}
              <input
                type="email"
                placeholder={t.form.emailPlaceholder}
                required
                value={form.email}
                onChange={handleChange('email')}
              />
            </label>
            <label>
              {t.form.message}
              <textarea
                placeholder={t.form.messagePlaceholder}
                required
                value={form.message}
                onChange={handleChange('message')}
              />
            </label>
            <button className="button primary form-button" type="submit">{t.form.submit}</button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
