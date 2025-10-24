import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

  useEffect(() => {
    const adminEmail = localStorage.getItem('userEmail');
    const adminPass = localStorage.getItem('userPassword');
    if (adminEmail !== 'admin@careconnect.com' || adminPass !== 'admin123') {
      alert('Only admin allowed!');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <header style={{
        background: 'var(--primary-color, #2a7ae2)',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}>
        <h1 className="sitename">Care-Connect Admin</h1>
      </header>
      <main style={{
        maxWidth: '1000px',
        margin: '2rem auto',
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ textAlign: 'center' }}>All Appointments</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Phone</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Time</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Department</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Doctor</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', background: '#f4f4f4' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', border: '1px solid #ccc', padding: '8px' }}>
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((a, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.phone}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.date}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.time}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.department}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.doctor}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{a.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default AdminDashboard;