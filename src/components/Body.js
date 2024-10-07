import React, { useState, useEffect } from 'react'
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/info.css'
import img from 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Website-Banner.png'
// import Subnavbar from './subnavbar';
export default function Body() {
  
  const[currentimageindex, setcurrentimageindex]=useState(0);
  const images=[img,
  "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/cancer-homepage%20banner-desktop_0.jpg?VersionId=DLxU0lH58ZPsPxzuwf_mpB0b7Sp2YbxJ",
'https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/home-page-banner1-Quality-healthcare-desktop.jpg?VersionId=oZjVdTWD75v31WTBmLr19t09IUGj14il',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentimageindex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
     <>
     {/* <Subnavbar/> */}
      <div className='content'>
            <div className='sliding'>
            {images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} style={{ display: index === currentimageindex ? 'block' : 'none' }} />
          ))}

                <div className='item' >
                    <div className="bookapt1">
                      <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/book_an_appointment.svg?VersionId=jvbSOCEPQZk4sodUO9mUCVUbWthOhqFG" />
                      <a href="/user_login">Book An Appointment
                      <p class="box_content">Consult at Hospital or Teleconsult</p>
                      </a>
                    </div>
                    <div className="bookapt1">
                    <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/find_doctors.svg?VersionId=gJbe8vyDHsacEUIzm3S7VxPWbQWHYid6" />
                      <a href="/user_login">Find Doctor
                      <p class="box_content">Search according to specialties and more</p></a>
                    </div>
                    <div className="bookapt1">
                    <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-05/online-medical-consultation-diagnosis.svg?VersionId=9eiZEqcc22M6j1FX8GvYtwmcXgqu8imQ" />
                      <a href="/feedback">Feedback
                      <p class="box_content"> </p>
                      </a>
                      
                    </div>
                    {/* <div className="bookapt1">
                    <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/online-medical-consultation-diagnosis.svg?VersionId=twBBWkKAVsmcK4Mt3RyeFW6fXsQ_PMy_" />
                      <a href="">HEALTHFIRST
                      <p class="box_content">Preventive Health Checkup</p>
                      </a>
                    </div> */}
                </div>
            </div>
      </div>       
     </>
  )
}
