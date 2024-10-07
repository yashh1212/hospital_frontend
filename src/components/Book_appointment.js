import React, { useState } from "react";
import find_doctor from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/find-doctors-icon.svg";
import "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/find_doctor.css";
import banner_doctor from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/banner-doctor-listing.jpg";
import { useEffect } from "react";
import Doctor_search from "./doctor_search";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Book_appointment({ callback,setloading}) {
  const [apidata, setapidata] = useState([]);
  const [doctor_found, setdoctor_found] = useState(false);

  const navigate = useNavigate(); 

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
    else if (doctor_found) {
      setdoctor_found(false);
    }
  }, [doctor_found]);

  const search_doctor = async (event) => {
    event.preventDefault();
    setloading(true);

    const speciality = document.getElementById("speciality").value;
    const doctor_name = document.getElementById("input").value;

    const data={doctor_name,speciality}

    const response = await fetch(
      `https://hospital-backend-vri9.vercel.app/doctor/search_doctor?speciality=${speciality}&doctor_name=${doctor_name}`,
      {
        method: "get",
        headers: {
          token: sessionStorage.getItem("token"),
          "content-type": "application/json",
        },
      }
    );
    const fetch_data = await response.json();
    console.log(fetch_data);
    if(response.status ===404){
      setloading(false);
       toast.error("doctor not found");
    }
    else if(fetch_data.length > 0) {
      console.log(typeof fetch_data);
      setapidata(fetch_data);
      callback(fetch_data);

      console.log("api data is ", apidata);
      setloading(false);
      setdoctor_found(true);
    } else {
      setloading(false);
      toast.error("doctor not found");
    }
  };
  return (
    <div>
      {doctor_found ? <Navigate to={"/Doctor_search"} /> : null}
      <div className="search_container">
        <img className="img_searchdoctor" src={banner_doctor} />
        <img className="find-doctor-logo1" src={find_doctor} />
        <h2>Book An Appointment</h2>
        <p>Choose your doctor across specialties</p>
      </div>
      <form action="" onSubmit={search_doctor}>
        <div className="search_doctor">
          <div className="inputfield">
            <input
              className="inputfield_input"
              placeholder="Search Doctors By Name"
              id="input"
              type="text"
            />
            <button>
              {" "}
              <img
                src="https://www.hindujahospital.com/assets/images/listing/search_icon.svg"
                alt=""
              />
            </button>
          </div>
          <div className="Speciality">
            <span className="filter_span">FILTER BY</span>
            <select
              aria-label="Search filter"
              name="Search_by_filter"
              id="speciality"
              className="form-control"
            >
              <option value="">Speciality</option>
              <option value="Adult Immunization Clinic">
                Adult Immunization Clinic
              </option>
              <option value="Allergy Clinic">Allergy Clinic</option>
              <option value="Anaesthesiology">Anaesthesiology</option>
              <option value="Blood Bank">Blood Bank</option>
              <option value="Blood Centre">Blood Centre</option>
              <option value="Bone Marrow Transplantation">
                Bone Marrow Transplantation
              </option>
              <option value="Cardiologist">cardiologist</option>
              <option value="Cardiovascular and Thoracic Surgery">
                Cardiovascular and Thoracic Surgery
              </option>
              <option value="Centre for Cancer Care">
                Centre for Cancer Care
              </option>
              <option value="Centre for Cardiac Care">
                Centre for Cardiac Care
              </option>
              <option value="Centre for Neuro Care">
                Centre for Neuro Care
              </option>
              <option value="Centre for Orthopedic Care">
                Centre for Orthopedic Care
              </option>
              <option value="Child Development Centre">
                Child Development Centre
              </option>
              <option value="Clinical Chemistry and Immunology">
                Clinical Chemistry and Immunology
              </option>
              <option value="Clinical Genetics">Clinical Genetics</option>
              <option value="Clinical Hematology">Clinical Hematology</option>
              <option value="Clinical Nutrition">Clinical Nutrition</option>
              <option value="Clinical Psychology">Clinical Psychology</option>
              <option value="Collagen and Lung Clinic">
                Collagen and Lung Clinic
              </option>
              <option value="Dental">Dental</option>
              <option value="Dental Implant Clinic">
                Dental Implant Clinic
              </option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT">ENT</option>
              <option value="Emergency">Emergency</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Evening Consultations Clinic">
                Evening Consultations Clinic
              </option>
              <option value="Fitness Clinic">Fitness Clinic</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Gastroenterology &amp; Liver Care">
                Gastroenterology &amp; Liver Care
              </option>
              <option value="Gastroenterology Surgery">
                Gastroenterology Surgery
              </option>
              <option value="General Medicine / Internal Medicine">
                General Medicine / Internal Medicine
              </option>
              <option value="General Surgery">General Surgery</option>{" "}
              <option value="Gynecology">Gynecology</option>
              <option value="Heart Valve Clinic">Heart Valve Clinic</option>
              <option value="Hematology">Hematology</option>
              <option value="Histopathology &amp; Cytopathology">
                Histopathology &amp; Cytopathology
              </option>
              <option value="IVF &amp; Infertility">
                IVF &amp; Infertility
              </option>
              <option value="Imaging">Imaging</option>
              <option value="Immunoserology">Immunoserology</option>
              <option value="Infectious Disesases">Infectious Disesases</option>
              <option value="Interventional Radiology">
                Interventional Radiology
              </option>
              <option value="Irritable Bowel Disease Clinic">
                Irritable Bowel Disease Clinic
              </option>
              <option value="Lab Medicine">Lab Medicine</option>
              <option value="Lupus Clinic">Lupus Clinic</option>
              <option value="Medical Oncology">Medical Oncology</option>
              <option value="Microbiology &amp; Serology">
                Microbiology &amp; Serology
              </option>
              <option value="Minimal Access Surgery">
                Minimal Access Surgery
              </option>
              <option value="Nephrology">Nephrology</option>
              <option value="Neurology">Neurology</option>
              <option value="Neurosurgery">Neurosurgery</option>
              <option value="Nuclear Medicine">Nuclear Medicine</option>
              <option value="Nutrition &amp; Dieticics">
                Nutrition &amp; Dieticics
              </option>
              <option value="Ocular Immunology Clinic">
                Ocular Immunology Clinic
              </option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="Paediatric Care">Paediatric Care</option>
              <option value="Paediatric Ophthalmology">
                Paediatric Ophthalmology
              </option>
              <option value="Paediatric Ophthalmology">
                Paediatric Ophthalmology
              </option>
              <option value="Pain Management">Pain Management</option>
              <option value="Pain Management Clinic">
                Pain Management Clinic
              </option>
              <option value="Palliative Care">Palliative Care</option>
              <option value="Palliative Care">Palliative Care</option>
              <option value="Patient Support Groups">
                Patient Support Groups
              </option>
              <option value="Pediatric Nephrology">Pediatric Nephrology</option>
              <option value="Pediatric Neuro-Rehabilitation">
                Pediatric Neuro-Rehabilitation
              </option>
              <option value="Pediatric Neurology">Pediatric Neurology</option>
              <option value="Pediatric Neurology">Pediatric Neurology</option>
              <option value="Pediatric Surgery">Pediatric Surgery</option>
              <option value="Physiotherapy &amp; Rehabilitation">
                Physiotherapy &amp; Rehabilitation
              </option>
              <option value="Physiotherapy &amp; Rehabilitation">
                Physiotherapy &amp; Rehabilitation
              </option>
              <option value="Plastic Surgery">Plastic Surgery</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Pulmonary Medicine">Pulmonary Medicine</option>
              <option value="Radiation Oncology">Radiation Oncology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Robotic Surgery">Robotic Surgery</option>
              <option value="Spine Surgery">Spine Surgery</option>
              <option value="Surgical Oncology">Surgical Oncology</option>
              <option value="Tobacco Cessation Clinic">
                Tobacco Cessation Clinic
              </option>
              <option value="Travel Medicine Clinic">
                Travel Medicine Clinic
              </option>
              <option value="Urology">Urology</option>
              <option value="Uveitis Clinic">Uveitis Clinic</option>
              <option value="Vulva Clinic">Vulva Clinic</option>
              <option value="Women’s Cancer Screening Clinic">
                Women’s Cancer Screening Clinic
              </option>
            </select>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}
