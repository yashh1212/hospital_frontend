import React, { useEffect,useState } from 'react'
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/navbar.css'
import aptimg from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/appointment-book.png"
import loginimg from "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/user.png"
import skimg from 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/skyscraper.png'
// import img from 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/Logo-3570dad3506eee206a594d7e761b3a4a.svg'
import img from 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/images/SHRIKRUSHNA HOSPITAL (2).png'

  
export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token"));

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("hs_token");
    };

    return (
      <>
        <div className="navbar">
          <ul className="list">
            <li>
              <a href="/book_apt">
                <img src={aptimg} alt="Book An Appointment" />
                Book An Appointment
              </a>
            </li>
            {/* <li>
                        <a href=""><img src={skimg} alt="Online Service" />Online Service</a>
                    </li> */}
            {!sessionStorage.getItem("hs_token") &&
              !sessionStorage.getItem("token") && (
                <li>
                  <a href="/Hospital_login">
                    <img src={loginimg} alt="Hospital Login" />
                    Hospital Login
                  </a>
                </li>
              )}
            {!sessionStorage.getItem("token") &&
              !sessionStorage.getItem("hs_token") && (
                <li>
                  <a href="/user_login">
                    <img src={loginimg} alt="User Login" />
                    User Login
                  </a>
                </li>
              )}
            {sessionStorage.getItem("token") && (
              <li>
                <a href="/ " id="logout" onClick={handleLogout}>
                  <img src={loginimg} alt="Logout" />
                  Logout
                </a>
              </li>
            )}
            {sessionStorage.getItem("hs_token") && (
              <li>
                <a href="/ " id="logout" onClick={handleLogout}>
                  <img src={loginimg} alt="Logout" />
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="info">
          <img src={img} alt="Hospital Logo" />
          <ul>
            <li>
              <span>Appointment No :</span>
              <a href=""> 022 67668181 / 022 45108181</a>
            </li>
            <li>
              <span>Emergency No :</span>
              <a href=""> 022 67668181 / 022 45108181</a>
            </li>
          </ul>
        </div>
      </>
    );
}