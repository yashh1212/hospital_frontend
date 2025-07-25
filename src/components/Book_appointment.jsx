import React, { useState } from "react";
import find_doctor from "../images/find-doctors-icon.svg";
import banner_doctor from "../images/banner-doctor-listing.jpg";
import { useEffect } from "react";
import Doctor_search from "./doctor_search";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subnavbar from "./subnavbar";

export default function Book_appointment({ callback, setloading }) {
  const [apidata, setapidata] = useState([]);
  const [doctor_found, setdoctor_found] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
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
        navigate("/user_login");
      }, 1000);
    } else if (doctor_found) {
      setdoctor_found(false);
    }
  }, [doctor_found]);

  const search_doctor = async (event) => {
    event.preventDefault();
    
    if (!searchTerm.trim() && !selectedSpecialty) {
      toast.warning("Please enter a doctor name or select a specialty");
      return;
    }

    setIsSearching(true);
    setloading(true);

    const data = { 
      doctor_name: searchTerm, 
      speciality: selectedSpecialty 
    };

    try {
      const response = await fetch(
        `https://hospital-backend-coral.vercel.app/doctor/search_doctor?speciality=${selectedSpecialty}&doctor_name=${searchTerm}`,
        {
          method: "get",
          headers: {
            token: sessionStorage.getItem("token"),
            "content-type": "application/json",
          },
        }
      );
      
      const fetch_data = await response.json();
      console.log(fetch_data);
      
      if (response.status === 404) {
        toast.error("No doctors found matching your criteria");
      } else if (fetch_data.length > 0) {
        setapidata(fetch_data);
        callback(fetch_data);
        toast.success(`Found ${fetch_data.length} doctor(s)`);
        setdoctor_found(true);
      } else {
        toast.error("No doctors found matching your criteria");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
      setloading(false);
    }
  };

  const specialties = [
    "Adult Immunization Clinic", "Allergy Clinic", "Anaesthesiology", "Blood Bank", 
    "Blood Centre", "Bone Marrow Transplantation", "Cardiologist", 
    "Cardiovascular and Thoracic Surgery", "Centre for Cancer Care", 
    "Centre for Cardiac Care", "Centre for Neuro Care", "Centre for Orthopedic Care",
    "Child Development Centre", "Clinical Chemistry and Immunology", "Clinical Genetics",
    "Clinical Hematology", "Clinical Nutrition", "Clinical Psychology", 
    "Collagen and Lung Clinic", "Dental", "Dental Implant Clinic", "Dermatology",
    "ENT", "Emergency", "Endocrinology", "Evening Consultations Clinic",
    "Fitness Clinic", "Gastroenterology", "Gastroenterology & Liver Care",
    "Gastroenterology Surgery", "General Medicine / Internal Medicine", 
    "General Surgery", "Gynecology", "Heart Valve Clinic", "Hematology",
    "Histopathology & Cytopathology", "IVF & Infertility", "Imaging",
    "Immunoserology", "Infectious Diseases", "Interventional Radiology",
    "Irritable Bowel Disease Clinic", "Lab Medicine", "Lupus Clinic",
    "Medical Oncology", "Microbiology & Serology", "Minimal Access Surgery",
    "Nephrology", "Neurology", "Neurosurgery", "Nuclear Medicine",
    "Nutrition & Dietetics", "Ocular Immunology Clinic", "Ophthalmology",
    "Orthopaedics", "Paediatric Care", "Paediatric Ophthalmology",
    "Pain Management", "Pain Management Clinic", "Palliative Care",
    "Patient Support Groups", "Pediatric Nephrology", "Pediatric Neuro-Rehabilitation",
    "Pediatric Neurology", "Pediatric Surgery", "Physiotherapy & Rehabilitation",
    "Plastic Surgery", "Psychiatry", "Pulmonary Medicine", "Radiation Oncology",
    "Rheumatology", "Robotic Surgery", "Spine Surgery", "Surgical Oncology",
    "Tobacco Cessation Clinic", "Travel Medicine Clinic", "Urology",
    "Uveitis Clinic", "Vulva Clinic", "Women's Cancer Screening Clinic"
  ];

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {doctor_found ? <Navigate to={"/Doctor_search"} /> : null}
      <Subnavbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src={banner_doctor} 
            alt="Medical professionals at work"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <img
                  className="w-16 h-16"
                  src={find_doctor}
                  alt="Find Doctor Icon"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Book An Appointment
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Choose your doctor across specialties and get expert medical care
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>200+ Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span>Expert Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative -mt-24 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Your Doctor
              </h2>
              <p className="text-blue-100 mt-2">Search by name or browse by specialty</p>
            </div>
            
            <form onSubmit={search_doctor} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Doctor Name Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Search by Doctor Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter doctor's name..."
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Specialty Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Or Filter by Specialty
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 bg-white appearance-none"
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map((specialty, index) => (
                        <option key={index} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  {(searchTerm || selectedSpecialty) && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear Search
                    </button>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSearching || (!searchTerm.trim() && !selectedSpecialty)}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                    isSearching || (!searchTerm.trim() && !selectedSpecialty)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Doctors
                    </>
                  )}
                </button>
              </div>

              {/* Search Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Search Tips:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Search by doctor's full name or last name
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Browse by medical specialty
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Use both for more specific results
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    All our doctors are verified professionals
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Specialties Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Specialties</h2>
          <p className="text-gray-600 text-lg">Quick access to our most sought-after medical departments</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'Gynecology'].map((specialty, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedSpecialty(specialty);
                setSearchTerm('');
              }}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-200">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{specialty}</span>
            </button>
          ))}
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
