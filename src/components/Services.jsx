import React, { useEffect, useState } from "react";
import cancer_care from "../images/cancer_care.svg";
import heart_care from "../images/heart_care.svg";
import nuro_care from "../images/neuro_care.svg";
import bone_care from "../images/bone_care.svg";
import urology from "../images/urology.svg";
import Psychiatry from "../images/Psychiatry.svg";
import Kidney from "../images/kidney_care.svg";
import Gastroenterology from "../images/Gatroenterology_LiverCare.svg";
import Dental from "../images/dental-icon.svg";
import Anaesthesiology from "../images/Anesthesiology.svg";
import Dermatology from "../images/Dermatology.svg";
import Pulmonary_Medicine from "../images/Pulmonary_Medicine.svg";
import Subnavbar from "./subnavbar";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Services(props) {
  const navigate = useNavigate();
  const [speciality_set, setspeciality_set] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    } else if (speciality_set) {
      setspeciality_set(true);
    }
  }, [navigate, speciality_set]);

  const handleclick = (specialityName) => {
    if (props.set_speciality(specialityName)) {
      setspeciality_set(true);
    }
  };

  // Centers of Excellence data
  const centersOfExcellence = [
    { 
      name: "Center of Cancer Care", 
      icon: cancer_care, 
      description: "Comprehensive cancer treatment with advanced oncology care",
      color: "from-red-500 to-pink-600"
    },
    { 
      name: "Center of Cardiac Care", 
      icon: heart_care, 
      description: "Complete heart care with cutting-edge cardiac procedures",
      color: "from-red-600 to-rose-700"
    },
    { 
      name: "Center of Neuro Care", 
      icon: nuro_care, 
      description: "Advanced neurological treatments and brain surgery",
      color: "from-purple-500 to-indigo-600"
    },
    { 
      name: "Center of Bone Care", 
      icon: bone_care, 
      description: "Specialized orthopedic and bone health services",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  // Specialities data
  const specialities = [
    { name: "Anaesthesiology", icon: Anaesthesiology, category: "surgical" },
    { name: "Dental", icon: Dental, category: "general" },
    { name: "Dermatology", icon: Dermatology, category: "general" },
    { name: "Gastroenterology", icon: Gastroenterology, category: "internal" },
    { name: "Psychiatry", icon: Psychiatry, category: "mental" },
    { name: "Urology", icon: urology, category: "surgical" },
    { name: "Cardiologist", icon: heart_care, category: "internal" },
    { name: "Nephrology", icon: Kidney, category: "internal" },
    { name: "Pulmonary Medicine", icon: Pulmonary_Medicine, category: "internal" }
  ];

  // Filter specialities based on search and category
  const filteredSpecialities = specialities.filter(specialty => {
    const matchesSearch = specialty.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || specialty.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {speciality_set && <Navigate to="/Dct_list_speciality" />}
      <Subnavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Medical Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive healthcare services with world-class medical expertise and advanced technology
          </p>
          <div className="flex justify-center gap-8 text-sm md:text-base">
            <div className="flex items-center gap-2 text-blue-100">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>24/7 Emergency Care</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Expert Specialists</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Advanced Technology</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Centers of Excellence */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Centers of Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized treatment centers offering comprehensive care with multidisciplinary approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {centersOfExcellence.map((center, index) => (
              <div
                key={index}
                onClick={() => handleclick(center.name)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${center.color} p-6 text-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img src={center.icon} alt={center.name} className="w-10 h-10" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{center.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {center.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-semibold">Learn More</span>
                      <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialities Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Expert care across various medical disciplines with experienced specialists
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search specialities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'general', label: 'General' },
                  { key: 'internal', label: 'Internal' },
                  { key: 'surgical', label: 'Surgical' },
                  { key: 'mental', label: 'Mental Health' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specialities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSpecialities.map((specialty, index) => (
              <div
                key={index}
                onClick={() => handleclick(specialty.name)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <img src={specialty.icon} alt={specialty.name} className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {specialty.name}
                      </h3>
                      <span className="text-xs text-gray-500 capitalize">{specialty.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-sm">View Doctors</span>
                    <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredSpecialities.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No specialities found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Help Choosing?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our medical coordinators are available 24/7 to help you find the right specialist for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
              📞 Call Now: +91-1234567890
            </button>
            <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors duration-200">
              💬 Live Chat Support
            </button>
          </div>
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
