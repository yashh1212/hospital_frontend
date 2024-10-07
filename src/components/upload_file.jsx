import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/upload_file.css";
import Hospital_subnavbar from './hospital_subnavbar';

export default function Upload_file() {
    const [file, setFile] = useState(null);
    const [patient_id, setPatientId] = useState('');
    const navigate = useNavigate();  

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
        }
    }, [navigate]);

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    const uploadFile = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('patient_id', patient_id);

        try {
            const response = await fetch(`http://localhost:4000/upload/upload_file`, {
                method: "POST",
                headers: {
                    "token": sessionStorage.getItem("hs_token"),
                },
                body: formData
            });
            const message = await response.json();

            if (message === "File uploaded successfully") {
                toast.success("File uploaded successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error(message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload file. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <>
            <Hospital_subnavbar />
            <div className='main_container_uploa_file'>
                <form onSubmit={uploadFile}>
                    <label htmlFor="file">Patient Report:</label>
                    <input
                        className='select_file'
                        type="file"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        required
                    />
                    <label htmlFor="patient_id">Patient ID:</label>
                    <input
                        type="text"
                        className='input_text'
                        onChange={handlePatientIdChange}
                        required
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />  
        </>
    );
}
