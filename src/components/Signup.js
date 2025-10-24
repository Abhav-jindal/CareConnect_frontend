import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (localStorage.getItem('user_' + email)) {
      alert('An account with this email already exists!');
      return;
    }

    const userData = { fullName, email, password };
    localStorage.setItem('user_' + email, JSON.stringify(userData));
    alert('Signup successful! You can now login.');
    navigate('/login');
  };

  return (
    <main className="auth-container index-page" style={{
      background: "url('/assets/img/hero-bg.jpg') no-repeat center center/cover",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'var(--default-font)',
    }}>
      <div className="auth-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{
          fontFamily: 'var(--heading-font)',
          fontWeight: 700,
          marginBottom: '20px',
          textAlign: 'center',
          color: '#333',
        }}>Signup for CareConnect</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="form-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value.trim())}
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
          <button
            type="submit"
            className="btn"
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: '#0d6efd',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Signup
          </button>
        </form>
        <p className="switch-link" style={{
          marginTop: '15px',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          Already have an account? <NavLink to="/login" style={{
            color: '#0d6efd',
            textDecoration: 'none',
            fontWeight: 500,
          }}>Login here</NavLink>
        </p>
      </div>
    </main>
  );
}

export default Signup;