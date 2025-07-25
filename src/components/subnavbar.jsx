import React, { useState } from 'react'

function Subnavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);

    return (
        <>
            {/* Desktop Subnavbar */}
            <div className="hidden md:block bg-gray-50 shadow-md">
                <div className="px-4 lg:px-8 py-3">
                    <ul className="flex items-center space-x-8 list-none">
                        {/* Patient Dropdown */}
                        <li className="relative group">
                            <a 
                                href="#" 
                                className="inline-flex items-center text-blue-900 font-normal hover:text-blue-800 py-2"
                                onMouseEnter={() => setIsPatientDropdownOpen(true)}
                                onMouseLeave={() => setIsPatientDropdownOpen(false)}
                            >
                                Patient
                                {isPatientDropdownOpen ? (
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </a>
                            
                            {/* Dropdown Menu */}
                            <ul 
                                className={`absolute left-0 top-full w-48 bg-blue-600 text-white shadow-lg z-50 ${
                                    isPatientDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                                onMouseEnter={() => setIsPatientDropdownOpen(true)}
                                onMouseLeave={() => setIsPatientDropdownOpen(false)}
                            >
                                <li>
                                    <a 
                                        href="/book_apt" 
                                        className="block px-4 py-3 text-white hover:text-white hover:border-b-2 hover:border-orange-400"
                                    >
                                        Book Appointment
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/View_report?" 
                                        className="block px-4 py-3 text-white hover:text-white hover:border-b-2 hover:border-orange-400"
                                    >
                                        Patient Report
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a 
                                href="/book_apt" 
                                className="text-blue-900 font-normal hover:text-blue-800 py-2"
                            >
                                Search Doctor
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/Services" 
                                className="text-blue-900 font-normal hover:text-blue-800 py-2"
                            >
                                Specialities & Services
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/appointment_history" 
                                className="text-blue-900 font-normal hover:text-blue-800 py-2"
                            >
                                Appointment History
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/feedback" 
                                className="text-blue-900 font-normal hover:text-blue-800 py-2"
                            >
                                Feedback
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Subnavbar */}
            <div className="md:hidden bg-gray-50 shadow-md">
                {/* Mobile Menu Toggle Button */}
                <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-blue-900 font-medium">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-blue-900 focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Items */}
                <div className={`overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <ul className="list-none border-t border-gray-200">
                        {/* Patient Section with Expandable Submenu */}
                        <li>
                            <button
                                onClick={() => setIsPatientDropdownOpen(!isPatientDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-left text-blue-900 font-medium border-b border-gray-100 hover:bg-gray-100"
                            >
                                Patient
                                {isPatientDropdownOpen ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>
                            
                            {/* Patient Submenu */}
                            <div className={`overflow-hidden ${
                                isPatientDropdownOpen ? 'max-h-32' : 'max-h-0'
                            }`}>
                                <ul className="bg-blue-50">
                                    <li>
                                        <a 
                                            href="/book_apt" 
                                            className="block px-8 py-2 text-blue-800 text-sm hover:bg-blue-100"
                                        >
                                            Book Appointment
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="/View_report?" 
                                            className="block px-8 py-2 text-blue-800 text-sm hover:bg-blue-100"
                                        >
                                            Patient Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a 
                                href="/book_apt" 
                                className="block px-4 py-3 text-blue-900 font-medium border-b border-gray-100 hover:bg-gray-100"
                            >
                                Search Doctor
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/Services" 
                                className="block px-4 py-3 text-blue-900 font-medium border-b border-gray-100 hover:bg-gray-100"
                            >
                                Specialities & Services
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/appointment_history" 
                                className="block px-4 py-3 text-blue-900 font-medium border-b border-gray-100 hover:bg-gray-100"
                            >
                                Appointment History
                            </a>
                        </li>

                        <li>
                            <a 
                                href="/feedback" 
                                className="block px-4 py-3 text-blue-900 font-medium hover:bg-gray-100"
                            >
                                Feedback
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Subnavbar
