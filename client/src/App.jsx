import { useState } from 'react';
import './App.css';
import heroImage from './assets/generated/doughnut-hero.png';

const doughnuts = [
  {
    name: 'Raspberry Pistachio',
    description: 'Pink berry glaze, crushed pistachio, freeze-dried raspberry.',
    price: '$4.75',
    tag: 'House favorite',
    accent: 'berry',
  },
  {
    name: 'Midnight Chocolate',
    description: 'Dark cocoa ganache, chocolate curls, sea salt finish.',
    price: '$4.50',
    tag: 'Rich',
    accent: 'cocoa',
  },
  {
    name: 'Vanilla Crumb Brulee',
    description: 'Madagascar vanilla glaze, toasted crumb, caramelized sugar.',
    price: '$4.25',
    tag: 'Classic',
    accent: 'vanilla',
  },
  {
    name: 'Strawberry Cream Bomb',
    description: 'Whipped cream filling, strawberry jam, powdered sugar.',
    price: '$5.25',
    tag: 'Filled',
    accent: 'cream',
  },
  {
    name: 'Brown Butter Maple',
    description: 'Maple glaze, brown butter crumble, roasted pecans.',
    price: '$4.95',
    tag: 'Weekend',
    accent: 'maple',
  },
  {
    name: 'Lemon Meringue Cloud',
    description: 'Lemon curd, toasted meringue, citrus sugar sparkle.',
    price: '$5.00',
    tag: 'Bright',
    accent: 'lemon',
  },
];

const boxes = [
  'Half dozen signature box',
  'Office dozen with coffee traveler',
  'Mini doughnut party tray',
];

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus(data.message || 'Thanks! We will be in touch soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.message || 'Could not send right now. Please call the shop.');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Doughnut Shop home">
          <span className="brand-mark">DS</span>
          <span>
            <strong>Doughnut Shop</strong>
            <small>Small-batch bakery</small>
          </span>
        </a>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#boxes" onClick={closeMenu}>Boxes</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a className="nav-cta" href="#contact">Order ahead</a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home" aria-label="Fresh artisan doughnuts">
          <img src={heroImage} alt="Assorted artisan doughnuts on a bakery counter" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Baked fresh every morning</p>
            <h1>Joyful doughnuts with a grown-up bakery finish.</h1>
            <p className="hero-copy">
              Small batches, real glazes, seasonal fillings, and coffee that keeps up.
              Swing by for one or build a box that disappears before lunch.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#menu">View menu</a>
              <a className="button secondary" href="#contact">Plan a pickup</a>
            </div>
          </div>
          <div className="hero-card" aria-label="Today's bakery details">
            <span>Today&apos;s drop</span>
            <strong>Raspberry Pistachio</strong>
            <small>Available until sold out</small>
          </div>
        </section>

        <section className="intro-section" aria-label="Shop highlights">
          <div>
            <p className="eyebrow">Why regulars stop in</p>
            <h2>Bright flavors, soft dough, crisp edges, no sleepy pastry case.</h2>
          </div>
          <div className="stats">
            <span><strong>6:30</strong> first trays</span>
            <span><strong>18</strong> daily flavors</span>
            <span><strong>24h</strong> custom box notice</span>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Signature menu</p>
            <h2>Pick your mood.</h2>
          </div>

          <div className="menu-grid">
            {doughnuts.map((item) => (
              <article className={`menu-card ${item.accent}`} key={item.name}>
                <div className="donut-visual" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <div className="card-topline">
                    <span>{item.tag}</span>
                    <strong>{item.price}</strong>
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
            <p className="eyebrow">Boxes & catering</p>
            <h2>Built for birthdays, morning meetings, and “I brought treats.”</h2>
          </div>
          <ul>
            {boxes.map((box) => (
              <li key={box}>{box}</li>
            ))}
          </ul>
          <a className="button primary" href="#contact">Start an order</a>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Visit or write</p>
            <h2>We will save you the good ones.</h2>
            <p>
              Tell us what you need, when you need it, and whether this is a
              casual craving or a full-box occasion.
            </p>

            <div className="shop-details">
              <span><strong>Hours</strong> Tue-Sun, 6:30 AM-2:00 PM</span>
              <span><strong>Phone</strong> (555) 014-1999</span>
              <span><strong>Pickup</strong> 24 Sprinkle Ave, Sweet City</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange('name')}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={handleChange('email')}
              />
            </label>
            <label>
              Message
              <textarea
                placeholder="Tell us about your order or question"
                required
                value={form.message}
                onChange={handleChange('message')}
              />
            </label>
            <button className="button primary form-button" type="submit">Send message</button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
