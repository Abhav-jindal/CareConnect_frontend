import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = JSON.parse(localStorage.getItem('adminAccount'));
    if (admin && email === admin.email && password === admin.password) {
      localStorage.setItem('userName', admin.name);
      localStorage.setItem('userEmail', admin.email);
      localStorage.setItem('userPassword', admin.password);
      setUser({ email: admin.email, name: admin.name });
      navigate('/admin-dashboard');
      return;
    }

    const savedUser = localStorage.getItem('user_' + email);
    if (!savedUser) {
      alert('No account found with this email!');
      return;
    }

    const userData = JSON.parse(savedUser);
    if (userData.password === password) {
      localStorage.setItem('userName', userData.fullName);
      localStorage.setItem('userEmail', email);
      setUser({ email, name: userData.fullName });
      navigate('/make-appointment');
    } else {
      alert('Invalid password!');
    }
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
        }}>Login to CareConnect</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="switch-link" style={{
          marginTop: '15px',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          Don’t have an account? <NavLink to="/signup" style={{
            color: '#0d6efd',
            textDecoration: 'none',
            fontWeight: 500,
          }}>Sign up here</NavLink>
        </p>
      </div>
    </main>
  );
}

export default Login;