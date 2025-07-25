import React, { useEffect, useCallback, useState } from 'react';
import Doctor_appointment from './Doctor_appointment.jsx';
import { Navigate } from 'react-router-dom';
import Images from "../doctor_images/images.jsx";
import download from "../doctor_images/download.png"

export default function DoctorSearch(props) {
  const [assign, setassign] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (assign) {
      setassign(false);
    }
  }, [assign]);

  useEffect(() => {
    // Set doctor data from props when component mounts or apidata changes
    if (props.apidata && props.apidata.length > 0) {
      setDoctorData(props.apidata);
    }
  }, [props.apidata]);

  const handleclick = useCallback(async (event) => {
    setIsLoading(true);
    props.setloading(true);
    
    try {
      const dct_id = event.target.id;
      props.callback(event.target.id);
      
      const response = await fetch(
        `https://hospital-backend-coral.vercel.app/doctor/doctor_information?doctor_id=${dct_id}`,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      
      if (props.getdoctor_information(data)) {
        props.setloading(false);
        setassign(true);
      }
    } catch (error) {
      console.log("failed to assign value", error);
      event.preventDefault();
    } finally {
      setIsLoading(false);
      props.setloading(false);
    }
  }, [props]);

  const capitalize = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  return (
    <>
      {assign ? <Navigate to={"Doctor_appointment"} /> : null}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Search Results
              </h1>
              <p className="text-blue-100 text-lg">
                {doctorData.length} doctor{doctorData.length !== 1 ? 's' : ''} found
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
                <p className="text-gray-600">Loading doctor information...</p>
              </div>
            </div>
          ) : doctorData.length > 0 ? (
            // Doctors Grid
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doctorData.map((doctor) => (
                <div 
                  key={doctor._id || doctor.doctor_id} 
                  className="w-[95%] bg-white flex flex-col h-auto p-5 shadow-[3px_3px_6px_rgba(0,0,0,0.15)] mb-12 rounded-[20px] pb-8 m-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Doctor Image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={
                          Images[`${doctor.doctor_name.replace(/\s+/g, "-")}.png`] 
                            ? Images[`${doctor.doctor_name.replace(/\s+/g, "-")}.png`] 
                            : download
                        }
                        alt={doctor.doctor_name}
                        className="h-[100px] w-[100px] rounded-full object-cover border-4 border-blue-100"
                      />
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Information */}
                  <div className="text-center space-y-3">
                    <h6 
                      className="text-[#f68C42] text-[1.2rem] font-bold hover:border-b hover:border-[#f68C42] cursor-pointer inline-block"
                      style={{ fontFamily: '"Roboto-Medium", sans-serif' }}
                    >
                      Dr. {capitalize(doctor.doctor_name)}
                    </h6>
                    
                    <p 
                      className="font-bold text-black text-[0.90rem]"
                      style={{ fontFamily: '"Roboto-Medium", sans-serif' }}
                    >
                      {capitalize(doctor.speciality)}
                    </p>
                    
                    <div className="space-y-2 text-left">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span 
                          className="text-[#262e30] text-[0.75rem]"
                          style={{ fontFamily: '"Roboto-Medium", sans-serif' }}
                        >
                          {doctor.education}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-black text-sm">Amravati</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-black text-sm">Shrikrushna Hospital</span>
                      </div>
                    </div>

                    {/* Fee and Rating */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Consultation Fee</p>
                        <p className="text-xl font-bold text-green-600">₹1,000</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">4.8</span>
                        </div>
                        <p className="text-xs text-gray-500">120+ reviews</p>
                      </div>
                    </div>

                    {/* Book Appointment Button */}
                    <button
                      id={doctor._id || doctor.doctor_id}
                      onClick={handleclick}
                      disabled={isLoading}
                      className={`mt-4 w-full h-[40px] border border-[#024594] text-[#024594] rounded-[20px] transition-all duration-300 font-semibold ${
                        isLoading 
                          ? 'bg-gray-100 cursor-not-allowed opacity-50' 
                          : 'bg-transparent hover:bg-[#024594] hover:text-white hover:shadow-lg transform hover:scale-105'
                      }`}
                      style={{ fontFamily: '"Roboto-Medium", sans-serif' }}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        'Book Hospital Visit'
                      )}
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
                  No doctors match your search criteria. Please try a different search.
                </p>
                <button 
                  onClick={() => window.history.back()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* Help Section */}
          {doctorData.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need Assistance?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our medical coordinators are here to help you choose the right doctor and schedule your appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                  📞 Call: +91-1234567890
                </button>
                <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors duration-200">
                  💬 Live Chat Support
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
