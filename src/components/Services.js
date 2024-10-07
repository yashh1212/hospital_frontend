import React, { useEffect, useState } from "react";
import "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/services.css";
import cancer_care from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/cancer_care.svg";
import heart_care from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/heart_care.svg";
import nuro_care from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/neuro_care.svg";
import bone_care from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/bone_care.svg";
import urology from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/urology.svg";
import Psychiatry from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Psychiatry.svg";
import Kidney from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/kidney_care.svg";
import Gastroenterology from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Gatroenterology_LiverCare.svg";
import Dental from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/dental-icon.svg";
import Anaesthesiology from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Anesthesiology.svg";
import Dermatology from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Dermatology.svg";
import Pulmonary_Medicine from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Pulmonary_Medicine.svg";
import Subnavbar from "./subnavbar";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Services(props) {
  const navigate = useNavigate();
  const [speciality_set, setspeciality_set] = useState(false);

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
    } else if (speciality_set) {
      setspeciality_set(true);
    }
  }, [navigate, speciality_set]);

  const handleclick = (event) => {
    const speciality = event.target.innerText;
    if (props.callback(speciality)) {
      setspeciality_set(true);
    }
  };

  return (
    <div className="main_container_services" id="main_container_services">
      {speciality_set && <Navigate to="/Dct_list_speciality" />}
      <Subnavbar />
      <div className="main_services">
        <h3>CENTER OF EXCELLENCE</h3>
        <ul>
          <li>
            <a onClick={handleclick}>
              <img src={cancer_care} alt="Cancer Care" />
              <span className="text_link">Center of Cancer Care</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={heart_care} alt="Cardiac Care" />
              <span className="text_link">Center of Cardiac Care</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={nuro_care} alt="Neuro Care" />
              <span className="text_link">Center of Neuro Care</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={bone_care} alt="Bone Care" />
              <span className="text_link">Center of Bone Care</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="specialities">
        <h3>SPECIALITIES</h3>
        <ul className="row">
          <li>
            <a onClick={handleclick}>
              <img src={Anaesthesiology} alt="Anaesthesiology" />
              <span className="text_link">Anaesthesiology</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Dental} alt="Dental" />
              <span className="text_link">Dental</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Dermatology} alt="Dermatology" />
              <span className="text_link">Dermatology</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Gastroenterology} alt="Gastroenterology" />
              <span className="text_link">Gastroenterology</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Psychiatry} alt="Psychiatry" />
              <span className="text_link">Psychiatry</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={urology} alt="Urology" />
              <span className="text_link">Urology</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={heart_care} alt="Cardiology" />
              <span className="text_link">Cardiologist</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Kidney} alt="Nephrology" />
              <span className="text_link">Nephrology</span>
            </a>
          </li>
          <li>
            <a onClick={handleclick}>
              <img src={Pulmonary_Medicine} alt="Pulmonary Medicine" />
              <span className="text_link">Pulmonary Medicine</span>
            </a>
          </li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}
