import React, { useEffect, useState } from "react";
import Hospital_subnavbar from "./hospital_subnavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Manage_apt() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleting, setIsDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("hs_token");
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
        navigate("/hospital_login");
      }, 2000);
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hospital-backend-coral.vercel.app/hospital/appointment-list",
        {
          headers: {
            token: sessionStorage.getItem("hs_token"),
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const data = await response.json();
      setAppointmentData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(
        `https://hospital-backend-coral.vercel.app/hospital/delete-appointment?id=${id}`,
        {
          method: "DELETE",
          headers: {
            token: sessionStorage.getItem("hs_token"),
          },
        }
      );
      
      if (response.status === 200) {
        setAppointmentData(
          appointmentData.filter(
            (appointment) => appointment._id !== id
          )
        );
        toast.success("Appointment cancelled successfully");
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error occurred while cancelling appointment");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAppointmentStatus = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const isPast = appointmentDate < today;
    
    return isPast ? 'completed' : 'upcoming';
  };

  const getStatusBadge = (date) => {
    const status = getAppointmentStatus(date);
    return status === 'completed' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Completed
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Upcoming
      </span>
    );
  };

  // Filter appointments
  const filteredAppointments = appointmentData.filter(appointment => {
    const matchesDoctor = selectedDoctor === "" || appointment.doctor_id === selectedDoctor;
    const matchesSearch = searchTerm === "" || 
      appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient_phone?.includes(searchTerm);
    
    const appointmentStatus = getAppointmentStatus(appointment.appointment_date);
    const matchesStatus = statusFilter === "all" || appointmentStatus === statusFilter;
    
    return matchesDoctor && matchesSearch && matchesStatus;
  });

  // Get unique doctors from appointments
  const uniqueDoctors = [...new Set(appointmentData.map(apt => apt.doctor_id))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Hospital_subnavbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Appointment Management
            </h1>
            <p className="text-blue-100 text-lg">
              Manage and monitor all hospital appointments
            </p>
            <div className="mt-4 flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-blue-100">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>{appointmentData.length} Total Appointments</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>{appointmentData.filter(apt => getAppointmentStatus(apt.appointment_date) === 'upcoming').length} Upcoming</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>{appointmentData.filter(apt => getAppointmentStatus(apt.appointment_date) === 'completed').length} Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Appointments
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by patient name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Doctor Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Doctor
              </label>
              <select
                value={selectedDoctor}
                onChange={handleDoctorChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              >
                <option value="">All Doctors</option>
                {uniqueDoctors.map((doctorId, index) => (
                  <option key={index} value={doctorId}>
                    {doctorId === "667d2fe9172cad6196450d63" ? "Dr. Yash" : 
                     doctorId === "667d2fe9172cad6196450d5b" ? "Dr. Yash1" : 
                     `Doctor ${doctorId.slice(-4)}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedDoctor || statusFilter !== 'all') && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDoctor('');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Appointments ({filteredAppointments.length})
              </h2>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500">
                  {appointmentData.length === 0 
                    ? "No appointments have been scheduled yet." 
                    : "No appointments match your current filters."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor & IDs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{appointment.patient_name}</div>
                            <div className="text-sm text-gray-500 capitalize">{appointment.patient_gender}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{appointment.patient_email}</div>
                            <div className="text-sm text-gray-500">{appointment.patient_phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatDate(appointment.appointment_date)}</div>
                            <div className="text-sm text-gray-500">{appointment.appointment_slot}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              {appointment.doctor_id === "667d2fe9172cad6196450d63" ? "Dr. Yash" : 
                               appointment.doctor_id === "667d2fe9172cad6196450d5b" ? "Dr. Yash1" : 
                               `Dr. ${appointment.doctor_id?.slice(-4)}`}
                            </div>
                            <div className="text-sm text-gray-500">ID: {appointment._id?.slice(-8)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(appointment.appointment_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteAppointment(appointment._id)}
                              disabled={isDeleting === appointment._id}
                              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isDeleting === appointment._id
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800'
                              }`}
                            >
                              {isDeleting === appointment._id ? (
                                <>
                                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Cancelling...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Cancel
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Management Actions */}
        {filteredAppointments.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Appointment Analytics</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Showing {filteredAppointments.length} of {appointmentData.length} appointments. 
              Use filters to narrow down your view.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                📊 Export Report
              </button>
              <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors duration-200">
                📅 Schedule New
              </button>
            </div>
          </div>
        )}
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
