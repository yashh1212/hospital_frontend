import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Images from "../doctor_images/images.jsx";
import Hospital_subnavbar from './hospital_subnavbar';
import download from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/doctor_images/download.png";
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/dct_list.css'


function Doctor_list() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  

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
      async function get_data() {
        setLoading(true);  // Show loader
        try {
          const response = await fetch("https://hospital-backend-vri9.vercel.app/doctor/doctot-list", {
            headers: {
              'token': token
            }
          });
          const data = await response.json();
          console.log(data);

          const mainDiv = document.getElementById("container_doctor_search");
          mainDiv.innerHTML = ''; // Clear previous results
          for (let i = 0; i < data.length; i++) {
            if (mainDiv) {
              const outerDiv = document.createElement('div');
              outerDiv.className = '_doctor_search p-4 flex flex-col lg:flex-row border rounded-lg shadow-lg mb-4';

              const imgDiv = document.createElement('div');
              imgDiv.className = 'dct_img mb-4 lg:mb-0 lg:mr-6';

              const img = document.createElement('img');
              img.setAttribute('src', Images[`${data[i]["doctor_name"].replace(/\s+/g, "-")}.png`] ? Images[`${data[i]["doctor_name"].replace(/\s+/g, "-")}.png`] : download);
              img.className = 'w-32 h-32 object-cover rounded-full';

              imgDiv.appendChild(img);

              const infoDiv = document.createElement('div');
              infoDiv.className = 'information';

              const nameH6 = document.createElement('h6');
              nameH6.className = 'dct_name text-lg font-semibold';
              nameH6.textContent = `${data[i]["doctor_name"]}`;

              const specP = document.createElement('p');
              specP.className = 'speciality text-gray-500';
              specP.textContent = `${data[i]["speciality"]}`;

              const degreeSpan = document.createElement('span');
              degreeSpan.className = 'degree text-sm text-gray-400';
              degreeSpan.textContent = `${data[i]["education"]}`;

              const locSpan = document.createElement('span');
              locSpan.className = 'location text-sm text-gray-400';
              locSpan.textContent = 'Amravati';

              const hospSpan = document.createElement('span');
              hospSpan.className = 'hospital_name text-sm text-gray-400';
              hospSpan.textContent = 'Shrikrushna Hospital';

              const a = document.createElement("a");
              a.className = "button_href text-blue-500 mt-4 inline-block";
              a.id = `${data[i]["doctor_id"]}`;
              a.href = '#'; // Placeholder link for now

              infoDiv.appendChild(nameH6);
              infoDiv.appendChild(specP);
              infoDiv.appendChild(degreeSpan);
              infoDiv.appendChild(document.createElement('br'));
              infoDiv.appendChild(locSpan);
              infoDiv.appendChild(document.createElement('br'));
              infoDiv.appendChild(hospSpan);
              infoDiv.appendChild(a);

              outerDiv.appendChild(imgDiv);
              outerDiv.appendChild(infoDiv);

              mainDiv.appendChild(outerDiv);
            }
          }
          setLoading(false); // Hide loader
        } catch (error) {
          console.log(error);
          setLoading(false); // Hide loader if an error occurs
        }
      }
      get_data();
    }
  }, [navigate]);

  return (
    <div>
      <Hospital_subnavbar />

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className='container_doctor_search' id='container_doctor_search'></div>
      )}

      <ToastContainer /> {/* Toastify container for rendering notifications */}
    </div>
  );
}

export default Doctor_list;
