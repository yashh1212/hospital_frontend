import React, { useEffect, useState } from "react";
import Hospital_subnavbar from "./hospital_subnavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/manage_apt.css";

export default function Manage_apt() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("hs_token");
    if (!token) {
      toast.error("Please login first! Redirecting to login page...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/hospital_login");
      }, 2000);
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hospital-backend-vri9.vercel.app/hospital/appointment-list",
        {
          headers: {
            token: sessionStorage.getItem("hs_token"),
          },
        }
      );
      const data = await response.json();
      setAppointmentData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://hospital-backend-vri9.vercel.app/hospital/delete-appointment?id=${id}`,
        {
          method: "DELETE",
          headers: {
            token: sessionStorage.getItem("hs_token"),
          },
        }
      );
      if (response.status === 200) {
        setAppointmentData(
          appointmentData.filter(
            (appointment) => appointment.appointment_no !== id
          )
        );
        toast.success("Appointment canceled successfully");
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const filteredAppointments = selectedDoctor
    ? appointmentData.filter(
        (appointment) => appointment.doctor_id === selectedDoctor
      )
    : appointmentData;

  return (
    <div className="container_manage_apt">
      {loading && (
        <div className="dot-spinner">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="dot-spinner__dot"></div>
          ))}
        </div>
      )}

      <Hospital_subnavbar />
      <div className="at_table manage_apt">
        <div className="doctor-select">
          <label htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={handleDoctorChange}
          >
            <option value="">All Doctors</option>
            <option value="667d2fe9172cad6196450d63">Yash</option>
            <option value="667d2fe9172cad6196450d5b">Yash1</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p>No appointments available</p>
        ) : (
          <table id="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient Email</th>
                <th>Patient Phone</th>
                <th>Patient Gender</th>
                <th>Appointment Date</th>
                <th>Appointment Slot</th>
                <th>Doctor ID</th>
                <th>Appointment No</th>
                <th>User ID</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="table_data_row">
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.patient_email}</td>
                  <td>{appointment.patient_phone}</td>
                  <td>{appointment.patient_gender}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_slot}</td>
                  <td>{appointment.doctor_id}</td>
                  <td>{appointment._id}</td>
                  <td>{appointment.user_id}</td>
                  <td>
                    <button
                      className="delete_button"
                      onClick={() => handleDeleteAppointment(appointment._id)}
                    >
                      Delete Apt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
