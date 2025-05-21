import { useState } from 'react';
import './App.css'; 

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <header>
        <h2 style={{ margin: 0 }}>Doughnut Shop</h2>

        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

        <ul className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </header>
            
      <main style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <textarea
            placeholder="Message"
            required
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ padding: '0.5rem', fontSize: '1rem', height: '100px' }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              backgroundColor: '#ff4081',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
