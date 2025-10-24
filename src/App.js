import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/main.css'; 
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Departments from './components/Departments';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Appointments from './components/Appointments';
import MakeAppointment from './components/MakeAppointment';
import CheckAppointments from './components/CheckAppointments';
import AdminDashboard from './components/AdminDashboard';

export const AuthContext = React.createContext();

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [user, setUser] = useState({ email: localStorage.getItem('userEmail'), name: localStorage.getItem('userName') });

  useEffect(() => {
    const adminAccount = { email: 'admin@careconnect.com', password: 'admin123', name: 'Admin' };
    localStorage.setItem('adminAccount', JSON.stringify(adminAccount));

    const checkAndInit = () => {
      // AOS initialization
      if (window.AOS) {
        window.AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
      }
      // GLightbox initialization
      if (window.GLightbox) {
        window.GLightbox({ selector: '.glightbox' });
      }
      // PureCounter initialization
      if (window.PureCounter) {
        new window.PureCounter();
      }
    };

    // Toggle scrolled class on body
    const toggleScrolled = () => {
      const body = document.querySelector('body');
      const header = document.querySelector('#header');
      if (!body || !header || (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top'))) return;
      window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
      setIsScrolled(window.scrollY > 100);
    };

    // Mobile nav toggle
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const mobileNavToogle = () => {
      const body = document.querySelector('body');
      if (body) body.classList.toggle('mobile-nav-active');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
    };
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    } else {
      console.warn('Mobile nav toggle button not found');
    }

    // Hide mobile nav on link click
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    // Preloader removal with timeout as fallback
    const removePreloader = () => {
      setShowPreloader(false);
    };
    const timer = setTimeout(removePreloader, 2000); // Fallback to remove preloader after 2 seconds

    // Scroll top button
    const scrollTop = document.querySelector('.scroll-top');
    const toggleScrollTop = () => {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    };
    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Swiper initialization (handled by Testimonials.js, no need to duplicate here)

    // Hash link scroll
    const handleHashScroll = () => {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
            window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Navmenu scrollspy
    const navmenuScrollspy = () => {
      const navmenulinks = document.querySelectorAll('.navmenu a');
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        const section = document.querySelector(navmenulink.hash);
        if (!section) return;
        const position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      });
    };

    // Initial script check and event listeners
    checkAndInit(); // Initial call
    const scriptTimer = setInterval(checkAndInit, 100); // Poll until scripts load
    window.addEventListener('load', () => {
      clearInterval(scriptTimer); // Stop polling on load
      checkAndInit();
      toggleScrolled();
      removePreloader();
      handleHashScroll();
      navmenuScrollspy();
    });
    window.addEventListener('scroll', toggleScrolled);
    window.addEventListener('scroll', navmenuScrollspy);
    window.addEventListener('scroll', toggleScrollTop);

    return () => {
      if (mobileNavToggleBtn) mobileNavToggleBtn.removeEventListener('click', mobileNavToogle);
      if (scrollTop) scrollTop.removeEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      window.removeEventListener('scroll', toggleScrolled);
      window.removeEventListener('scroll', navmenuScrollspy);
      window.removeEventListener('scroll', toggleScrollTop);
      window.removeEventListener('load', toggleScrolled);
      window.removeEventListener('load', removePreloader);
      window.removeEventListener('load', handleHashScroll);
      window.removeEventListener('load', navmenuScrollspy);
      clearTimeout(timer);
      clearInterval(scriptTimer);
    };
  }, []);

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className={`App ${isScrolled ? 'scrolled' : ''}`}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main className="main">
                  <Hero />
                  <About />
                  <Services />
                  <Departments />
                  <Testimonials />
                </main>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/make-appointment" element={<MakeAppointment />} />
            <Route path="/check-appointments" element={<CheckAppointments />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
          <button
            id="scroll-top"
            className={`scroll-top d-flex align-items-center justify-content-center ${isScrolled ? 'active' : ''}`}
            onClick={handleScrollTop}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <i className="bi bi-arrow-up-short"></i>
          </button>
          {showPreloader && <div id="preloader"></div>}
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;