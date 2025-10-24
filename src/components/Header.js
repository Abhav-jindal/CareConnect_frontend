import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

function Header() {
  const { user } = React.useContext(AuthContext);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="Logo" />
          <h1>CareConnect</h1>
        </a>
        <i className="mobile-nav-toggle bi bi-list d-xl-none"></i>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/appointments" className="nav-link">Appointments</Link></li>
            <li><Link to="/make-appointment" className="nav-link">Make Appointment</Link></li>
            {user?.email ? (
              <>
                <li><Link to="/check-appointments" className="nav-link">Check Appointments</Link></li>
                {user.email === 'admin@careconnect.com' && (
                  <li><Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link></li>
                )}
                <li>
                  <a href="#" className="nav-link" onClick={() => {
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userName');
                    window.location.href = '/';
                  }}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
