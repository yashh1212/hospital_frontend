import React, { useState ,useEffect} from 'react';
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/appointment.css';
import { json, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Subnavbar from './subnavbar';
import Images from "../doctor_images/images.jsx";
import download from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/doctor_images/download.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Doctor_appointment(props) {
 
  console.log("dct_id gandi ",props.doctor_id)
  console.log(props.doctor_information)
  const [selectedSlot, setSelectedSlot] = useState('');
  const [payment_successfull ,setpayment_successfull]=useState(false)
      const navigate = useNavigate();


  useEffect(()=>{

    // console.log(Images,"hbbldshbl.jsdnclihisch")
    // console.log(Images[`${props.doctor_information[0].replace(/\s+/g, "-")}.png`])
    // console.log( props.doctor_information[0].replace(/\s+/g, "-"))
   },[])

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    
  };

  const capitalize =(data)=>{
    if(data){

      return data.charAt(0).toUpperCase()+ data.slice(1)
    }
  }

  const confirm_appointment = (event) => {
    event.preventDefault();

  
  }
    
  const PaymentButton = async(event) => {
    event.preventDefault();
    try{

      const response = await fetch(
        "https://hospital-backend-vri9.vercel.app/appointment/generate-paymentID",
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      const order_id=await response.json()
      const data = {
        patient_name:document.getElementById("first_name").value +" "+ document.getElementById("last_name").value,
        patient_email: document.getElementById("email").value,
        patient_phone: document.getElementById("phone").value,
        patient_gender: document.getElementById("gender").value,
        doctor_id: props.doctor_id,
        appointment_date: document.getElementById("date").value,
        appointment_slot: document.querySelector(".selected").innerHTML,
      };
      console.log(data,"jjrsvdlv")
      const options = {
      key: 'rzp_test_bt8M5fD2VwY5Rw',
      amount: "100000",
      currency: 'INR',
      order_id: order_id,
      name: 'Shrikrushna Hospital',
      description: 'Description of your product',
      handler:async function (response) {
          toast.success(response.razorpay_payment_id);
          toast.success(response.razorpay_order_id);
          toast.success(response.razorpay_signature);
 
 
      
          const api_response = await fetch(
            "https://hospital-backend-vri9.vercel.app/appointment/appointment-confirm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
              },
              body: JSON.stringify(data),
            }
          );
         const message=await api_response.json()
         console.log(message)
  
        if( api_response.status == 201){
          toast.success("appointment booked successfully")
          setpayment_successfull(true)
        }else if(api_response.status == 401){
          toast.error(message);
        }
        },
        prefill: {
          name: data['patient_name'],
          email: data['patient_email'],
          contact: data['patient_phone'],
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: 'rgb(2, 69, 148)',
        },
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
 
    }
    catch{}

};


  return (
    <>
      <Subnavbar />
      {payment_successfull ? <Navigate to="/user_home" /> : null}
      <div className="appointment_container_mian">
        <div className="doctor_profile">
          <h2 className="Speciality">
            {capitalize(props.doctor_information["speciality"])}
          </h2>
          <h1 className="Doctor_name">
            {capitalize(props.doctor_information["doctor_name"])}
          </h1>
          <h6 className="Education">
            {capitalize(props.doctor_information["education"])}
          </h6>
          <h5 className="arrea_of_expertise_heading">Areas of Expertise</h5>
          <p className="arrea_of_expertise">
            {capitalize(props.doctor_information["area_of_expertise"])}
          </p>
        </div>
        <div className="doctor_profile_image">
          <img
            src={
              Images[
                `${props.doctor_information["doctor_name"].replace(
                  /\s+/g,
                  "-"
                )}.png`
              ]
                ? Images[
                    `${props.doctor_information["doctor_name"].replace(
                      /\s+/g,
                      "-"
                    )}.png`
                  ]
                : download
            }
          />
        </div>
      </div>

      <form action="" onSubmit={PaymentButton}>
        <div className="appointmentcard">
          <div className="patient_details">
            <h4>Patient Details</h4>
            <br />

            <div>
              <label htmlFor="">First Name :</label>
              <input type="text" id="first_name" required />
            </div>
            <div>
              <label htmlFor="">Last Name :</label>
              <input type="text" id="last_name" required />
            </div>
            <div>
              <label htmlFor="">Email :</label>
              <input type="email" id="email" required />
            </div>
            <div>
              <label htmlFor="">Phone :</label>
              <input type="number" id="phone" required />
            </div>
            <div>
              <label htmlFor="">gender :</label>
              <select id="gender" name="gender" required fdprocessedid="qhglnh">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="female">Transgender</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Doctor ID :</label>
              <input
                type="number"
                placeholder={props.doctor_id}
                required
                readOnly
              />
            </div>
            <div>
              {/* <label htmlFor="">User ID :</label>
              <input
                type="number"
                id="user_id"
                placeholder={sessionStorage.getItem("user_id")}
                required
                readOnly
              /> */}
            </div>
            <button id="rzp-button1">submit</button>
          </div>

          <div className="appointment_details">
            <h4>Enter Details</h4>
            <br />
            <label htmlFor="">Select Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={new Date().toISOString().split("T")[0]}
            ></input>
            <div className="slot">
              <h4 htmlFor="" className="slot">
                Timing
              </h4>
              <ul id="slot">
                <li
                  id={
                    selectedSlot === "10:30 AM - 10:45 AM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("10:30 AM - 10:45 AM")}
                  value={"10:30 AM - 10:45 AM"}
                >
                  <a
                    className={
                      selectedSlot === "10:30 AM - 10:45 AM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("10:30 AM - 10:45 AM")}
                  >
                    10:30 AM - 10:45 AM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "10:45 AM - 11:00 AM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("10:45 AM - 11:00 AM")}
                  value={"10:45 AM - 11:00 AM"}
                >
                  <a
                    className={
                      selectedSlot === "10:45 AM - 11:00 AM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("10:45 AM - 11:00 AM")}
                  >
                    10:45 AM - 11:00 AM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "11:00 AM - 11:15 AM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("11:00 AM - 11:15 AM")}
                  value={"11:00 AM - 11:15 AM"}
                >
                  <a
                    className={
                      selectedSlot === "11:00 AM - 11:15 AM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("11:00 AM - 11:15 AM")}
                  >
                    11:00 AM - 11:15 AM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "11:15 AM - 11:30 AM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("11:15 AM - 11:30 AM")}
                  value={"11:15 AM - 11:30 AM"}
                >
                  <a
                    className={
                      selectedSlot === "11:15 AM - 11:30 AM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("11:15 AM - 11:30 AM")}
                  >
                    11:15 AM - 11:30 AM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "11:30 AM - 11:45 AM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("11:30 AM - 11:45 AM")}
                  value={"11:30 AM - 11:45 AM"}
                >
                  <a
                    className={
                      selectedSlot === "11:30 AM - 11:45 AM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("11:30 AM - 11:45 AM")}
                  >
                    11:30 AM - 11:45 AM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "11:45 AM - 12:00 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("11:45 AM - 12:00 PM")}
                  value={"11:45 AM - 12:00 PM"}
                >
                  <a
                    className={
                      selectedSlot === "11:45 AM - 12:00 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("11:45 AM - 12:00 PM")}
                  >
                    11:45 AM - 12:00 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "12:00 PM - 12:15 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("12:00 PM - 12:15 PM")}
                  value={"12:00 PM - 12:15 PM"}
                >
                  <a
                    className={
                      selectedSlot === "12:00 PM - 12:15 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("12:00 PM - 12:15 PM")}
                  >
                    12:00 PM - 12:15 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "12:15 PM - 12:30 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("12:15 PM - 12:30 PM")}
                  value={"12:15 PM - 12:30 PM"}
                >
                  <a
                    className={
                      selectedSlot === "12:15 PM - 12:30 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("12:15 PM - 12:30 PM")}
                  >
                    12:15 PM - 12:30 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "12:30 PM - 12:45 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("12:30 PM - 12:45 PM")}
                  value={"12:30 PM - 12:45 PM"}
                >
                  <a
                    className={
                      selectedSlot === "12:30 PM - 12:45 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("12:30 PM - 12:45 PM")}
                  >
                    12:30 PM - 12:45 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "12:45 PM - 1:00 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("12:45 PM - 1:00 PM")}
                  value={"12:45 PM - 1:00 PM"}
                >
                  <a
                    className={
                      selectedSlot === "12:45 PM - 1:00 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("12:45 PM - 1:00 PM")}
                  >
                    12:45 PM - 1:00 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "1:00 AM - 1:15 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("1:00 AM - 1:15 PM")}
                  value={"1:00 AM - 1:15 PM"}
                >
                  <a
                    className={
                      selectedSlot === "1:00 AM - 1:15 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("1:00 AM - 1:15 PM")}
                  >
                    1:00 AM - 1:15 PM
                  </a>
                </li>

                <li
                  id={
                    selectedSlot === "1:15 PM - 1:30 PM"
                      ? "selected"
                      : "available"
                  }
                  onClick={() => handleSlotClick("1:15 PM - 1:30 PM")}
                  value={"1:15 PM - 1:30 PM"}
                >
                  <a
                    className={
                      selectedSlot === "1:15 PM - 1:30 PM"
                        ? "selected"
                        : "available"
                    }
                    onClick={() => handleSlotClick("1:15 PM - 1:30 PM")}
                  >
                    1:15 PM - 1:30 PM
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
      
  }