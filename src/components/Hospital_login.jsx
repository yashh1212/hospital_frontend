import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Hospital_login(props) {
  const [islogin, setislogin] = useState(false);
  const [formData, setFormData] = useState({
    Hospital_id: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (islogin) {
      setislogin(false);
    }
  }, [islogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.Hospital_id.trim()) {
      toast.error("Please enter Hospital ID");
      return false;
    }
    if (formData.Hospital_id.length !== 24) {
      toast.error("Hospital ID must be exactly 24 characters");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const hospital_login = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    props.setloading(true);

    const data = {
      Hospital_id: formData.Hospital_id,
      password: formData.password,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/hospital/sign-in`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const message = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("hs_token", message);
        if (sessionStorage.getItem("hs_token")) {
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            props.setloading(false);
            setislogin(true);
          }, 1000);
        }
      } else if (response.status === 401) {
        toast.error(message || "Invalid credentials");
        props.setloading(false);
      } else {
        toast.error("Something went wrong. Please try again.");
        props.setloading(false);
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
      console.error("Login error:", error);
      props.setloading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {islogin ? <Navigate to={"/hospital_home"} /> : null}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hospital Login</h2>
            <p className="text-gray-600">Access your hospital management system</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h3 className="text-xl font-bold text-white text-center">
                SECURE LOGIN
              </h3>
            </div>
            
            <form onSubmit={hospital_login} className="px-8 py-8 space-y-6">
              
              {/* Hospital ID Field */}
              <div>
                <label 
                  htmlFor="Hospital_id" 
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
                >
                  Hospital ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="Hospital_id"
                    id="Hospital_id"
                    value={formData.Hospital_id}
                    onChange={handleInputChange}
                    maxLength={24}
                    minLength={24}
                    required
                    placeholder="Enter 24-character Hospital ID"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-mono text-sm"
                  />
                  {formData.Hospital_id && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {formData.Hospital_id.length === 24 ? (
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-xs text-gray-400">
                          {formData.Hospital_id.length}/24
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {formData.Hospital_id && formData.Hospital_id.length > 0 && formData.Hospital_id.length !== 24 && (
                  <p className="mt-1 text-sm text-red-600">
                    Hospital ID must be exactly 24 characters
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Secure Connection</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your login credentials are encrypted and secured with SSL protection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || formData.Hospital_id.length !== 24 || !formData.password}
                className={`w-full py-3 px-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                  isLoading || formData.Hospital_id.length !== 24 || !formData.password
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login to Dashboard
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Having trouble logging in?{' '}
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Contact IT Support
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2024 Hospital Management System. All rights reserved.
            </p>
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
    </>
  );
}

export default Hospital_login;
