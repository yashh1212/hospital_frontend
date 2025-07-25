import React, { useEffect, useState } from 'react'
import aptimg from "../images/appointment-book.png"
import loginimg from "../images/user.png"
import skimg from '../images/skyscraper.png'
import img from '../images/SHRIKRUSHNA HOSPITAL (2).png'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token"));
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("hs_token");
    };

    return (
        <>
            {/* Top Navigation Bar */}
            <div className="bg-gray-50 h-8 flex items-center justify-end px-4 lg:px-8">
                <ul className="hidden md:flex gap-4 lg:gap-8 list-none">
                    <li>
                        <a href="/book_apt" className="flex items-center text-blue-900 text-xs lg:text-sm font-medium hover:text-blue-800 transition-colors duration-300 no-underline">
                            <img src={aptimg} alt="Book An Appointment" className="h-6 px-2" />
                            <span className="hidden lg:inline">Book An Appointment</span>
                            <span className="lg:hidden">Book Apt</span>
                        </a>
                    </li>
                    
                    {!sessionStorage.getItem("hs_token") && !sessionStorage.getItem("token") && (
                        <>
                            <li>
                                <a href="/Hospital_login" className="flex items-center text-blue-900 text-xs lg:text-sm font-medium hover:text-blue-800 transition-colors duration-300 no-underline">
                                    <img src={loginimg} alt="Hospital Login" className="h-6 px-2" />
                                    <span className="hidden lg:inline">Hospital Login</span>
                                    <span className="lg:hidden">Hospital</span>
                                </a>
                            </li>
                            <li>
                                <a href="/user_login" className="flex items-center text-blue-900 text-xs lg:text-sm font-medium hover:text-blue-800 transition-colors duration-300 no-underline">
                                    <img src={loginimg} alt="User Login" className="h-6 px-2" />
                                    <span className="hidden lg:inline">User Login</span>
                                    <span className="lg:hidden">Login</span>
                                </a>
                            </li>
                        </>
                    )}
                    
                    {(sessionStorage.getItem("token") || sessionStorage.getItem("hs_token")) && (
                        <li>
                            <a href="/" id="logout" onClick={handleLogout} className="flex items-center text-blue-900 text-xs lg:text-sm font-medium hover:text-blue-800 transition-colors duration-300 no-underline">
                                <img src={loginimg} alt="Logout" className="h-6 px-2" />
                                Logout
                            </a>
                        </li>
                    )}
                </ul>
                
                {/* Mobile Menu Button with Animated Hamburger */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${
                        isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${
                        isMobileMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${
                        isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}></span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden bg-gray-50 border-t border-gray-200 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="flex flex-col space-y-2 px-4 py-2">
                    <a href="/book_apt" className="flex items-center text-blue-900 text-sm font-medium hover:text-blue-800 transition-colors duration-300 py-2">
                        <img src={aptimg} alt="Book An Appointment" className="h-5 mr-3" />
                        Book An Appointment
                    </a>
                    
                    {!sessionStorage.getItem("hs_token") && !sessionStorage.getItem("token") && (
                        <>
                            <a href="/Hospital_login" className="flex items-center text-blue-900 text-sm font-medium hover:text-blue-800 transition-colors duration-300 py-2">
                                <img src={loginimg} alt="Hospital Login" className="h-5 mr-3" />
                                Hospital Login
                            </a>
                            <a href="/user_login" className="flex items-center text-blue-900 text-sm font-medium hover:text-blue-800 transition-colors duration-300 py-2">
                                <img src={loginimg} alt="User Login" className="h-5 mr-3" />
                                User Login
                            </a>
                        </>
                    )}
                    
                    {(sessionStorage.getItem("token") || sessionStorage.getItem("hs_token")) && (
                        <a href="/" onClick={handleLogout} className="flex items-center text-blue-900 text-sm font-medium hover:text-blue-800 transition-colors duration-300 py-2">
                            <img src={loginimg} alt="Logout" className="h-5 mr-3" />
                            Logout
                        </a>
                    )}
                </div>
            </div>

            {/* Hospital Info Section */}
            <div className="bg-white flex flex-col md:flex-row items-center justify-between py-4 px-4 lg:px-8 min-h-[85px]">
                {/* Hospital Logo */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img src={img} alt="Hospital Logo" className="max-h-12 md:max-h-16 w-auto" />
                </div>
                
                {/* Contact Information */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-8 text-center md:text-left">
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-orange-300 mb-1">Appointment No :</span>
                        <a href="tel:02267668181" className="text-xs md:text-sm font-bold text-blue-600 hover:underline transition-all duration-200">
                            022 67668181 / 022 45108181
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-orange-300 mb-1">Emergency No :</span>
                        <a href="tel:02267668181" className="text-xs md:text-sm font-bold text-blue-600 hover:underline transition-all duration-200">
                            022 67668181 / 022 45108181
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
