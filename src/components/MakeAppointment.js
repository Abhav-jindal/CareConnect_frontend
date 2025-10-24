// src/components/MakeAppointment.jsx
import React, { useEffect, useState } from "react";
import "../css/main.css";
import Papa from "papaparse";

const MakeAppointment = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      setUserName(storedName);
      setUserEmail(storedEmail);
    } else {
      alert("User not logged in!");
      window.location.href = "/login";
    }

    // Load doctors.csv using PapaParse
    fetch("/assets/data/doctors.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // first row is header
          skipEmptyLines: true,
          complete: (results) => {
            setDoctorsData(results.data);
          },
        });
      });
  }, []);

  const filteredDoctors = doctorsData.filter(
    (doc) =>
      doc.Field &&
      doc.Field.trim().toLowerCase() === department.toLowerCase()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      alert("Please select a doctor before submitting.");
      return;
    }

    const appointment = {
      userName,
      userEmail,
      phone,
      date,
      time,
      department,
      doctor: selectedDoctor,
      message,
    };

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment submitted successfully!");
    setPhone("");
    setDate("");
    setTime("");
    setDepartment("");
    setMessage("");
    setSelectedDoctor("");

    window.location.href = "/check-appointments";
  };

  return (
    <div>
      <style>{`
        /* Inline CSS from your HTML */
        body { font-family: var(--font-primary, Arial, sans-serif); background: var(--background-color, #f9f9f9); color: var(--default-color, #333); margin:0; padding:0; }
        header { background: var(--primary-color, #2a7ae2); color: #fff; padding:1rem 2rem; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 6px rgba(0,0,0,0.1);}
        header img { height:100px; width:auto; }
        main { max-width:700px; margin:2rem auto; background:#fff; padding:2rem; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.08);}
        form label { display:block; font-weight:600; margin-top:1rem; margin-bottom:0.5rem;}
        form input, form select, form textarea { width:100%; padding:0.75rem; border:1px solid #ccc; border-radius:8px; font-size:1rem; transition:border-color 0.3s ease; }
        form input:focus, form select:focus, form textarea:focus { border-color: var(--primary-color, #2a7ae2); outline:none;}
        form button { margin-top:1.5rem; padding:0.75rem 1.5rem; background: var(--primary-color, #2a7ae2); color:#fff; font-size:1rem; border:none; border-radius:8px; cursor:pointer; transition: background 0.3s ease;}
        form button:hover { background: var(--accent-color, #1e5cb3);}
        #checkAppointmentsBtn { margin-top:10px; background-color:#4CAF50; color:#fff; border:none; padding:0.75rem 1.5rem; border-radius:8px; cursor:pointer; font-size:1rem;}
        #checkAppointmentsBtn:hover { background-color:#45a049;}
        table { width:100%; border-collapse: collapse; margin-top:20px;}
        table th, table td { border:1px solid #ccc; padding:8px; text-align:left;}
        table th { background:#f4f4f4;}
      `}</style>

      <header>
        <h1 className="sitename">Care-Connect</h1>
        <img src="/assets/img/logo.png" alt="CareConnect Logo" />
      </header>

      <main>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Book Your Appointment
        </h2>

        <form id="appointmentForm" onSubmit={handleSubmit}>
          <input type="hidden" id="name" value={userName} />
          <input type="hidden" id="email" value={userEmail} />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="date">Preferred Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="time">Preferred Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">-- Select Department --</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="hepatology">Hepatology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="eye care">Eye Care</option>
            <option value="dermatology">Dermatology</option>
          </select>

          <div id="doctorsTable">
            {filteredDoctors.length === 0 && department && <p>No doctors available for this department.</p>}
            {filteredDoctors.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Experience</th>
                    <th>Contact</th>
                    <th>Information</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doc, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          type="radio"
                          name="selectedDoctor"
                          value={doc.Name}
                          checked={selectedDoctor === doc.Name}
                          onChange={() => setSelectedDoctor(doc.Name)}
                          required
                        />
                      </td>
                      <td>{doc.Name}</td>
                      <td>{doc.Experience}</td>
                      <td>{doc["Contact Number"]}</td>
                      <td>{doc.Information}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <label htmlFor="message">Additional Notes:</label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Submit Appointment</button>
        </form>

        <button
          type="button"
          id="checkAppointmentsBtn"
          onClick={() => (window.location.href = "/check-appointments")}
        >
          Check Appointments
        </button>
      </main>
    </div>
  );
};

export default MakeAppointment;
