import React, { useState, useEffect } from 'react';
import Subnavbar from './subnavbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import { Navigate, useNavigate } from "react-router-dom";

export default function Appointment_history(props) {
  const [appointmentData, setAppointmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
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
      return;
    }
    
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://hospital-backend-coral.vercel.app/appointment/appointment-history`, {
            headers: {
              'token': sessionStorage.getItem('token')
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch appointment history');
        }
        
        const data = await response.json();
        console.log(typeof(data));
        console.log(data);
        setAppointmentData(data);
      } catch (error) {
        console.error('Error fetching appointment history:', error);
        toast.error('Failed to load appointment history');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [props.login_id, navigate]);

  // Filter appointments based on search term and date
  const filteredAppointments = appointmentData.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor_id?.toString().includes(searchTerm);
    
    const matchesDate = filterDate === '' || 
      appointment.appointment_date?.includes(filterDate);
    
    return matchesSearch && matchesDate;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const isPast = appointmentDate < today;
    
    return isPast ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Completed
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Upcoming
      </span>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
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
      
      {/* Subnavbar */}
      <div>
        <Subnavbar/>
      </div>

      {/* Header Section */}
      <div className='relative w-full overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80 z-10'></div>
        <img 
          src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2024-01/eye_banner.png?VersionId=EgFBCwbFrqpQyDaCdjhyVzeIfNTA_GDD" 
          alt="Medical Banner" 
          className='w-full h-64 object-cover'
        />
        <div className='absolute inset-0 z-20 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4' style={{fontFamily: 'Titillium Web, sans-serif'}}>
              Appointment History
            </h1>
            <p className='text-lg md:text-xl text-blue-100'>
              Track your medical appointments and consultations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Appointments</p>
                <p className='text-2xl font-bold text-gray-900'>{appointmentData.length}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Completed</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {appointmentData.filter(apt => new Date(apt.appointment_date) < new Date()).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Upcoming</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {appointmentData.filter(apt => new Date(apt.appointment_date) >= new Date()).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Search Appointments
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='Search by name, email, or doctor ID...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200'
                />
              </div>
            </div>
            
            <div className='sm:w-64'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Filter by Date
              </label>
              <input
                type='date'
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200'
              />
            </div>
            
            {(searchTerm || filterDate) && (
              <div className='flex items-end'>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterDate('');
                  }}
                  className='px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Appointments Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700'>
            <h2 className='text-xl font-bold text-white flex items-center'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
              </svg>
              Your Appointments ({filteredAppointments.length})
            </h2>
          </div>
          
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-600'>Loading appointments...</span>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Patient Details</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact Info</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Appointment</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Doctor & IDs</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={index} className='hover:bg-gray-50 transition-colors duration-150'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>{appointment.patient_name}</div>
                          <div className='text-sm text-gray-500 capitalize'>{appointment.patient_gender}</div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm text-gray-900'>{appointment.patient_email}</div>
                          <div className='text-sm text-gray-500'>{appointment.patient_phone}</div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>{formatDate(appointment.appointment_date)}</div>
                          <div className='text-sm text-gray-500'>{appointment.appointment_slot}</div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm text-gray-900'>Dr. ID: {appointment.doctor_id}</div>
                          <div className='text-sm text-gray-500'>Apt: {appointment._id?.slice(-8)}</div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {getStatusBadge(appointment.appointment_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-center py-12'>
              <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
              </svg>
              <h3 className='mt-2 text-sm font-medium text-gray-900'>No appointments found</h3>
              <p className='mt-1 text-sm text-gray-500'>
                {searchTerm || filterDate ? 'Try adjusting your search or filter criteria.' : 'You haven\'t booked any appointments yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
