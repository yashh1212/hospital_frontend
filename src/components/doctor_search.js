import React, { useEffect, useCallback, useState } from 'react';
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/doctor_search.css';
import Doctor_appointment from './Doctor_appointment';
import { Navigate } from 'react-router-dom';
import Images from "../doctor_images/images.jsx";
import download from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/doctor_images/download.png"

export default function DoctorSearch(props) {
 
  const[assign,setassign]=useState(false)

  useEffect(()=>{
    if(assign){
      setassign(false)
    }
  },[assign])

  const handleclick = useCallback(async (event) => {
    props.setloading(true);
    try {
      const dct_id = event.target.id;
        props.callback(event.target.id) 
        const response = await fetch(
          `http://localhost:4000/doctor/search_doctor`,
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        const data=await response.json()
         if(props.getdoctor_information(data))
        // props.getdoctor_information(data)
      props.setloading(false);
        setassign(true)
      }
     
    catch (error) {
      console.log("failed to assign value",error);
      event.preventDefault();
    }
  },);

  useEffect(() => {
    const data = props.apidata;
    const mainDiv = document.getElementById("container_doctor_search");
    mainDiv.innerHTML=''
    for (let i = 0; i < data.length; i++) {
      if (mainDiv) {
        const outerDiv = document.createElement('div');
        outerDiv.className = '_doctor_search';

        const imgDiv = document.createElement('div');
        imgDiv.className = 'dct_img';

        const img = document.createElement('img');
        img.setAttribute('src', Images[`${data[i]["doctor_name"].replace(/\s+/g, "-")}.png`]? Images[`${data[i]["doctor_name"].replace(/\s+/g, "-")}.png`]:download);

        imgDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'information';

        const nameH6 = document.createElement('h6');
        nameH6.className = 'dct_name';
        nameH6.textContent = `${data[i]["doctor_name"]}`;

        const specP = document.createElement('p');
        specP.className = 'speciality';
        specP.textContent = `${data[i]["speciality"]}`;

        const degreeSpan = document.createElement('span');
        degreeSpan.className = 'degree';
        degreeSpan.textContent = `${data[i]["education"]}`;

        const locSpan = document.createElement('span');
        locSpan.className = 'location';
        locSpan.textContent = 'Amravati';

        const hospSpan = document.createElement('span');
        hospSpan.className = 'hospital_name';
        hospSpan.textContent = 'Shrikrushna Hospital';

        const feeH5 = document.createElement('h5');
        feeH5.className = 'fee';
        feeH5.textContent = '1000rs';

        const a = document.createElement("a");
        a.className = "button_href";
        a.id = `${data[i]["doctor_id"]}`;
        // a.href = `/Doctor_appointment`;
        

        const bookBtn = document.createElement('button');
        bookBtn.id = `${data[i]["_id"]}`;
        bookBtn.className = 'book_visit';
        bookBtn.textContent = 'Book Hospital Visit';
        bookBtn.onclick = handleclick; 

        a.appendChild(bookBtn);

        infoDiv.appendChild(nameH6);
        infoDiv.appendChild(specP);
        infoDiv.appendChild(degreeSpan);
        infoDiv.appendChild(locSpan);
        infoDiv.appendChild(hospSpan);
        infoDiv.appendChild(feeH5);
        infoDiv.appendChild(a);

        outerDiv.appendChild(imgDiv);
        outerDiv.appendChild(infoDiv);

        mainDiv.appendChild(outerDiv);
      }
    }
  },);

  return (
    <>
    {(assign)?

    <Navigate to={"Doctor_appointment"} /> 
    :null}
    <div className='container_doctor_search' id='container_doctor_search'></div>
    </>
  );
}
