import React, { useState, useEffect } from 'react';
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/appointment_history.css';
import Subnavbar from './subnavbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import { Navigate, useNavigate } from "react-router-dom";


export default function Appointment_history(props) {
  const [appointmentData, setAppointmentData] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
     const token = sessionStorage.getItem("token");
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
         navigate("/user_login");
       }, 1000);
     }
    async function fetchData() {
      console.log("efwfr", props.login_id);
      const response = await fetch(
        `https://hospital-backend-vri9.vercel.app/appointment/appointment-history`,{
          headers:{
            'token':sessionStorage.getItem('token')
          }
        }
      );
      const data = await response.json();
      console.log(typeof(data));
      console.log(data);
      setAppointmentData(data);
    }

    fetchData();
  }, [props.login_id]);

  return (
    <div className='main_container_appointment'>
      <ToastContainer/>
      <div>
        <Subnavbar/>
      </div>
      <div className='display'>
        <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2024-01/eye_banner.png?VersionId=EgFBCwbFrqpQyDaCdjhyVzeIfNTA_GDD" alt="banner" />
        <h1>Your Previous appointments</h1>
      </div>
      <div className='at_table' id='at_table'>
        <table id='table'>
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
            </tr>
          </thead>
          <tbody>
          {appointmentData.length > 0 ? (
              appointmentData.map((appointment, index) => (
                <tr key={index} className="table_data_row">
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.patient_email}</td>
                  <td>{appointment.patient_phone}</td>
                  <td>{appointment.patient_gender}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_slot}</td>
                  <td>{appointment.doctor_id}</td>
                  <td>{appointment._id}</td>
                  <td>{appointment.user_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Appointment Details Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
