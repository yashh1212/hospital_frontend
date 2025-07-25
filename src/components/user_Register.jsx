import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserRegister(props) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobile_no: '',
        country: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitData = async (event) => {
        event.preventDefault();
        props.setloading(true);
        try {
            const response = await fetch(
                "https://hospital-backend-coral.vercel.app/user/SignIn",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const message = await response.json();
            console.log(formData);
            
            if (response.status === 201) {
                toast.success("User registered successfully!");
                props.setloading(false);
                setIsSubmitted(true);
            } 
            else if (response.status === 208) {
                props.setloading(false);
                toast.error("Email already exists!");
            }
            else {
                console.log(message, "failed");
                props.setloading(false);
                toast.error("Registration failed. Please try again.");
            }

        } catch (error) {
            console.error('Error:', error);
            props.setloading(false);
            toast.error("Network error. Please try again.");
        }
    };

    const isFormValid = Object.values(formData).every(value => value.trim() !== '');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            {isSubmitted && <Navigate to="/user_login" />}
            
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Join Our Community
                    </h1>
                    <p className="text-gray-600 text-lg">Create your account and get started today</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Panel - Login Redirect */}
                    <div className="w-full lg:w-80 order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-800 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-2xl">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-6 right-6 w-16 h-16 border-2 border-white rounded-full"></div>
                                <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-white rounded-full"></div>
                                <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white rounded-full"></div>
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold">Already Have an Account?</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Welcome back! Sign in to access your dashboard and continue where you left off.
                                    </p>
                                </div>
                                
                                <a href="/user_login" className="block group">
                                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105 active:scale-95 shadow-lg w-full">
                                        <span className="flex items-center justify-center gap-2">
                                            Sign In
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                                            </svg>
                                        </span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Registration Form */}
                    <div className="flex-1 order-1 lg:order-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-4"></div>
                                <p className="text-gray-600">Fill in your details to get started</p>
                            </div>

                            <form onSubmit={submitData} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email and Country */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your country"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile and Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile_no"
                                            value={formData.mobile_no}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your mobile number"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-orange-500">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                                            isFormValid
                                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
                                                : "bg-gray-100 text-gray-500 border-2 border-gray-200 cursor-not-allowed"
                                        }`}
                                        disabled={!isFormValid}
                                    >
                                        {isFormValid ? (
                                            <span className="flex items-center justify-center gap-2">
                                                Create Account
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </span>
                                        ) : (
                                            "Please fill all fields"
                                        )}
                                    </button>
                                </div>

                                {/* Terms and Privacy */}
                                <div className="text-center pt-4">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our{' '}
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </form>
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