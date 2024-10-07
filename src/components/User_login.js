import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/hospital_login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User_login(props) {
  const [islogin, setislogin] = useState(false);

  useEffect(() => {
    if (islogin) {
      setislogin(false);
    }
  }, [islogin]);

  const validate_user = async (event) => {
    event.preventDefault();
    props.setloading(true);
    try {
      const data = {
        email: document.getElementById("login_id").value,
        password: document.getElementById("login_password").value,
      };
      console.log(data);

      const response = await fetch(
        "https://hospital-backend-vri9.vercel.app/user/signUp",
        {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const message = await response.json();
      console.log(message);
      if (response.status == 200) {
        console.log(message);
        sessionStorage.setItem("token", message);
        props.setloading(false);
        if (sessionStorage.getItem("token")) {
          setislogin(true);
        }
      } else if (response.status === 401) {
        props.setloading(false);
        toast.error("enter valid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const btn_style = () => {
    let button = document.getElementById("submit");
    if (document.getElementById("login_id").value.length > 5) {
      button.style.backgroundColor = "#044597";
      button.style.color = "#fff";
    } else {
      button.style.backgroundColor = "#fff";
      button.style.color = "black";
      button.style.border = " 1px solid #044597";
    }
  };
  return (
    <>
      <span className="login_name">Login</span>
      <div className="container">
        <div className="login_container">
          {islogin ? <Navigate to={"/user_home"} /> : null}
          <div className="login_container_header">
            <p>LOGIN</p>
          </div>
          <form action="" onSubmit={validate_user}>
            <label htmlFor="">User ID</label>
            <input type="email" id="login_id" onChange={btn_style} required />
            <br />
            <label htmlFor="">PASSWORD</label>
            <input type="password" id="login_password" required />
            <br />
            <button type="submit" id="submit">
              Login
            </button>
          </form>
        </div>
        <div className="login_container2">
          <p>Create account</p>
          <a href="/User_Register">
            <button>Register</button>
          </a>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
