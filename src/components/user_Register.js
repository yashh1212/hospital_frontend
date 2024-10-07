import React, { useState, useEffect } from 'react';
import '../css/user_register.css'; 
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserRegister(props) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    const submitData = async (event) => {
        event.preventDefault();
        props.setloading(true);
        try {
            const data = {
              firstname: document.getElementById("first_name").value,
              lastname: document.getElementById("last_name").value,
              mobile_no: document.getElementById("mobile_no").value,
              country: document.getElementById("country").value,
              email: document.getElementById("emailaddress").value,
              password: document.getElementById("password").value,
            }; 
            const response = await fetch(
              "https://hospital-backend-vri9.vercel.app/user/SignIn",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const message = await response.json();
            console.log(data)
            if (response.status ===201) {
                 toast.success("user registered successfully")
                 props.setloading(false);
                 setIsSubmitted(true);  
            } 
            else if(response.status === 208 ) {
        
                //  alert("email is already exist");
                props.setloading(false);
                 toast.error("email is already exist");
                 
            }
            else{
                console.log(message,"failed")
                console.log("failed")
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className='main_container'>
                {isSubmitted && <Navigate to="/user_login" />} 
                <div className="container1">
                    <p>Already Registered</p>
                    <button className='login_btn'>Login</button>
                </div>
                <form onSubmit={submitData}>
                    <div className="container2">
                        <h3>Not Registered? Please provide below details</h3>
                        <div className='container2_1'>
                            <input type="text" placeholder='First Name' required id='first_name' />
                            <input type="text" placeholder='Last Name' required id='last_name' />
                        </div>
                        <div className='container2_2'>
                            <input type="text" placeholder='Email Address' required id='emailaddress' />
                            <input type="text" placeholder='Country' required id='country' />
                        </div>
                        <div className='container2_3'>
                            <input type="number" placeholder='Mobile Number' id='mobile_no' required />
                            <input type="password" placeholder='Password' id='password' required />
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
             <ToastContainer />
        </>
    );
}
