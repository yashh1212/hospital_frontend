import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Images from "../doctor_images/images.jsx";
import download from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/doctor_images/download.png"

export default function DctListSpeciality(props) {
    const [assign, setAssign] = useState(false);
    const [doctorData, setDoctorData] = useState([]);
    const navigate=useNavigate()
    useEffect(() => {
        async function fetchData() {
           if(!sessionStorage.getItem('token')){
            navigate('/user_home')
           }
            
            try {
                const response = await fetch(`https://hospital-backend-vri9.vercel.app/doctor/speciality_search?speciality=${props.speciality}`,{
                    headers:{
                        'token':sessionStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDoctorData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [props.speciality]);

    const handleClick = useCallback(async (event) => {

        try {
          const dct_id = event.target.id;
           console.log(dct_id)
            props.callback(event.target.id) 
            const response = await fetch(`https://hospital-backend-vri9.vercel.app/doctor/doctor_information?doctor_id=${dct_id}`,{
                headers:{
                    'token':sessionStorage.getItem('token')
                }
            })
            const data=await response.json()
       
            if(props.getdoctor_information(data))
            setAssign(true)
          }
        catch (error) {
          console.log("failed to assign value",error);
          event.preventDefault();
        }
      },);
    
    return (
        <div>
            {assign && <Navigate to="Doctor_appointment" />}
            <div className='container_doctor_search' id='container_doctor_search'>
                {doctorData.map((doctor) => (
                    <div key={doctor._id} className='_doctor_search'>
                        <div className='dct_img'>
                            <img
                                src={
                                    Images[
                                        `${doctor.doctor_name.replace(
                                            /\s+/g,
                                            "-"
                                        )}.png`
                                    ]
                                        ? Images[
                                        `${doctor.doctor_name.replace(
                                            /\s+/g,
                                            "-"
                                        )}.png`
                                        ]
                                        : download
                                } />
                        </div>
                        <div className='information'>
                            <h6 className='dct_name'>{doctor.doctor_name}</h6>
                            <p className='speciality'>{doctor.speciality}</p>
                            <span className='degree'>{doctor.education}</span>
                            <span className='location'>Amravati</span>
                            <span className='hospital_name'>Shrikrushna Hospital</span>
                            <h5 className='fee'>1000rs</h5>                                                                     
                            <a className='button_href' id={doctor.doctor_id}  >
                                <button className='book_visit'  id={doctor._id} onClick={handleClick}>Book Hospital Visit</button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
