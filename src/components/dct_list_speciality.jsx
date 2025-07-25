import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Images from "../doctor_images/images.jsx";
import download from "../doctor_images/download.png"

export default function DctListSpeciality(props) {
    const [assign, setAssign] = useState(false);
    const [doctorData, setDoctorData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (!sessionStorage.getItem('token')) {
                navigate('/user_home');
                return;
            }
            
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:4000/doctor/speciality_search?speciality=${props.speciality}`, {
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDoctorData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [props.speciality, navigate]);

    const handleClick = useCallback(async (event) => {
        try {
            const dct_id = event.target.id;
            console.log(dct_id);
            props.callback(event.target.id);
            const response = await fetch(`http://localhost:4000/doctor/doctor_information?doctor_id=${dct_id}`, {
                headers: {
                    'token': sessionStorage.getItem('token')
                }
            });
            const data = await response.json();
       
            if (props.getdoctor_information(data))
                setAssign(true);
        } catch (error) {
            console.log("failed to assign value", error);
            event.preventDefault();
        }
    }, [props]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {assign && <Navigate to="Doctor_appointment" />}
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {capitalize(props.speciality)} Specialists
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Find and book appointments with our expert doctors
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    // Loading State
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading doctors...</p>
                        </div>
                    </div>
                ) : doctorData.length > 0 ? (
                    // Doctors Grid
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {doctorData.map((doctor) => (
                            <div 
                                key={doctor._id} 
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Doctor Image */}
                                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                            <img
                                                src={
                                                    Images[
                                                        `${doctor.doctor_name.replace(/\s+/g, "-")}.png`
                                                    ] || download
                                                }
                                                alt={doctor.doctor_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    {/* Verified Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Doctor Information */}
                                <div className="p-6 space-y-4">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Dr. {doctor.doctor_name}
                                        </h3>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {doctor.speciality}
                                        </span>
                                    </div>

                                    {/* Credentials */}
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <span className="text-sm">{doctor.education}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm">Amravati</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-sm">Shrikrushna Hospital</span>
                                        </div>
                                    </div>

                                    {/* Fee and Rating */}
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">Consultation Fee</p>
                                            <p className="text-2xl font-bold text-green-600">₹1,000</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 mb-1">
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">4.8</span>
                                            </div>
                                            <p className="text-xs text-gray-500">256 reviews</p>
                                        </div>
                                    </div>

                                    {/* Book Appointment Button */}
                                    <button
                                        id={doctor._id}
                                        onClick={handleClick}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Book Hospital Visit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // No Doctors Found
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No doctors found
                            </h3>
                            <p className="text-gray-500 mb-6">
                                No {props.speciality} specialists are currently available. Please try again later or contact us for assistance.
                            </p>
                            <button 
                                onClick={() => navigate('/services')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Browse Other Specialties
                            </button>
                        </div>
                    </div>
                )}

                {/* Contact Support */}
                {doctorData.length > 0 && (
                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Need Help Choosing?</h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Our medical coordinators are available 24/7 to help you find the right doctor for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                                📞 Call: +91-1234567890
                            </button>
                            <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors duration-200">
                                💬 Live Chat
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
