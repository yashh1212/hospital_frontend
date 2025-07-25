import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Subnavbar from './subnavbar.jsx';
import Images from "../doctor_images/images.jsx";
import download from "../doctor_images/download.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Doctor_appointment(props) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [payment_successfull, setpayment_successfull] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: 'male',
    date: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set minimum date to today
    // sessionStorage.clear('load');
    const today = new Date().toISOString().split("T")[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, [])

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const capitalize = (data) => {
    if (data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    }
  }

  const PaymentButton = async (event) => {
    event.preventDefault();
    
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.date) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(
        "https://hospital-backend-coral.vercel.app/appointment/generate-paymentID",
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      const order_id = await response.json()
      const data = {
        patient_name: formData.first_name + " " + formData.last_name,
        patient_email: formData.email,
        patient_phone: formData.phone,
        patient_gender: formData.gender,
        doctor_id: props.doctor_id,
        appointment_date: formData.date,
        appointment_slot: selectedSlot,
      };

      const options = {
        key: process.env.REACT_PAYMENT_KAY, // Replace with your Razorpay key
        amount: "1000*100",
        currency: 'INR',
        order_id: order_id,
        name: 'Shrikrushna Hospital',
        description: 'Doctor Appointment Booking',
        handler: async function (response) {
          // toast.success("Payment successful!");

          const api_response = await fetch(
            "https://hospital-backend-coral.vercel.app/appointment/appointment-confirm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
              },
              body: JSON.stringify(data),
            }
          );
          const message = await api_response.json()

          if (api_response.status == 201) {
            toast.success("Appointment booked successfully!")
            // Navigate("/user_home");
            setpayment_successfull(true)
          } else if (api_response.status == 401) {
            toast.error(message);
          }
        },
        prefill: {
          name: data['patient_name'],
          email: data['patient_email'],
          contact: data['patient_phone'],
        },
        notes: {
          address: 'Shrikrushna Hospital, Amravati',
        },
        theme: {
          color: '#024594',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Payment error:", error);
    }
  };

  // Time slots array
  const timeSlots = [
    "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", 
    "11:30 AM", "11:45 AM", "12:00 PM", "12:15 PM",
    "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM"
  ];

  return (
    <>
      {payment_successfull ? <Navigate to="/user_home" /> : null}
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Doctor Profile Card - Fixed Layout */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <div className="flex items-center gap-6">
                {/* Doctor Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={
                        Images[
                          `${props.doctor_information["doctor_name"]?.replace(/\s+/g, "-")}.png`
                        ] || download
                      }
                      alt={props.doctor_information["doctor_name"]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-2xl font-bold mb-1">
                    Dr. {capitalize(props.doctor_information["doctor_name"])}
                  </h1>
                  <p className="text-blue-100 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                    {capitalize(props.doctor_information["speciality"])}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                      <h3 className="font-semibold text-blue-100 mb-1">Education</h3>
                      <p>{capitalize(props.doctor_information["education"])}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                      <h3 className="font-semibold text-blue-100 mb-1">Expertise</h3>
                      <p className="text-xs leading-relaxed">
                        {capitalize(props.doctor_information["area_of_expertise"])}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-xl font-bold text-blue-600">₹1,000</p>
                  <p className="text-xs text-gray-600">Consultation Fee</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">15 min</p>
                  <p className="text-xs text-gray-600">Per Session</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-orange-600">★ 4.8</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Form - Fixed Layout */}
          <form onSubmit={PaymentButton}>
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Patient Details Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-orange-500 px-4 py-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-white">👤</span>
                    Patient Details
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        id="first_name" 
                        required 
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        id="last_name" 
                        required 
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  {/* Phone and Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                        placeholder="Enter phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <select 
                        id="gender" 
                        required 
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Doctor ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doctor ID
                    </label>
                    <input
                      type="text"
                      value={`DR-${props.doctor_id}`}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-4 py-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-white">📅</span>
                    Appointment Details
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  
                  {/* Time Slots */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">🕐</span>
                      Available Time Slots
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => handleSlotClick(slot)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                            selectedSlot === slot
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    
                    {selectedSlot && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <span className="font-medium">Selected:</span> {selectedSlot}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button 
                type="submit"
                className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>💳</span>
                Book Appointment & Pay ₹1,000
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
