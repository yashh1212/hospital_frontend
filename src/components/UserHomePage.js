import React, { useState, useEffect } from "react";
import Subnavbar from "./subnavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
export default function UserHomePage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setIsRedirecting(true);
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
  }, [navigate]);

  return (
    <div className={`user-home-page ${isRedirecting ? "blur-background" : ""}`}>
      <Subnavbar />
      <ToastContainer />
      <div className="content-section">
        <img
          src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2024-01/Evening%20consultation%20clinic%20homepage%20banner.png?VersionId=dVOV.O3u0CviedL2JZokpaHseieWZxf5"
          alt="Banner"
          width={"100%"}
        />
      </div>
    </div>
  );
}
