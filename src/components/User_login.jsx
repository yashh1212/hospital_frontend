import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User_login(props) {
  const [islogin, setislogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        email: email,
        password: password,
      };
      console.log(data);

      const response = await fetch(
        "http://localhost:4000/user/signUp",
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
      props.setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
      {islogin && <Navigate to={"/user_home"} />}
      
      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Login Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
        </div>

        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Login Form Section */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Header */}
              <div className="mb-10">
                <div className="relative inline-block">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">LOGIN</h2>
                  <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                </div>
                <p className="text-gray-500 mt-3">Enter your credentials to access your account</p>
              </div>

              {/* Form */}
              <form onSubmit={validate_user} className="space-y-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-orange-500">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                        placeholder="Enter your email"
                        required
                      />
                      <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-orange-500">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                        placeholder="Enter your password"
                        required
                      />
                      <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    email.length > 5
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
                      : "bg-gray-100 text-gray-500 border-2 border-gray-200 hover:bg-gray-200"
                  }`}
                  disabled={email.length <= 5}
                >
                  {email.length > 5 ? (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  ) : (
                    "Enter valid email"
                  )}
                </button>
              </form>
            </div>

            {/* Register Section */}
            <div className="lg:w-96 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-800 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">New Here?</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Join our community and discover amazing features waiting for you!
                  </p>
                </div>
                
                <a href="/User_Register" className="block group">
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105 active:scale-95 shadow-lg">
                    <span className="flex items-center gap-2">
                      Create Account
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
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
        toastClassName="backdrop-blur-sm"
      />
    </div>
  );
}