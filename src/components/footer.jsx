import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* For Patients Column */}
            <div className="lg:col-span-2">
              <h5 className="text-xl font-bold text-orange-400 mb-6 pb-2 border-b-2 border-orange-400 inline-block">
                For Patients
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href='' className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Center of Cancer Care
                </a>
                <a href='' className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Center for Cardiac Care
                </a>
                <a href='' className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Center for Neuro Care
                </a>
                <a href='' className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Center for Orthopedic Care
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Specialty Clinics
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Care@Home
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Short Stay Service
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  HealthFirst - Preventive Health Checkup
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Health Blog
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Teleconsultation
                </a>
                <a href="" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Online Services
                </a>
              </div>
            </div>

            {/* For Doctors Column */}
            <div>
              <h5 className="text-xl font-bold text-orange-400 mb-6 pb-2 border-b-2 border-orange-400 inline-block">
                For Doctors
              </h5>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Search By Last Name
                </a>
                <a href="#" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform">
                  Search by Specialist
                </a>
              </div>
            </div>

            {/* Contact & Enquiry Column */}
            <div>
              <div className="space-y-6">
                <div>
                  <a href='' className="group">
                    <h5 className="text-xl font-bold text-orange-400 mb-3 pb-2 border-b-2 border-orange-400 inline-block group-hover:text-orange-300 transition-colors duration-200">
                      Contact
                    </h5>
                  </a>
                  <div className="text-gray-300 text-sm space-y-2 mt-4">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L8.16 10.913a11.928 11.928 0 006.927 6.927l1.526-2.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Emergency: 24/7
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Visit Us
                    </p>
                  </div>
                </div>
                
                <div>
                  <a href='' className="group">
                    <h5 className="text-xl font-bold text-orange-400 mb-3 pb-2 border-b-2 border-orange-400 inline-block group-hover:text-orange-300 transition-colors duration-200">
                      Enquiry
                    </h5>
                  </a>
                  <div className="text-gray-300 text-sm mt-4">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Get in Touch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-900 border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Healthcare System. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 animate-none">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 animate-none">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 animate-none">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}