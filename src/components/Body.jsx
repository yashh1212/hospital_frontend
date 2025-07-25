import React, { useState, useEffect } from 'react';

export default function Body() {
  const [currentimageindex, setcurrentimageindex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const images = [
    "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/cancer-homepage%20banner-desktop_0.jpg?VersionId=DLxU0lH58ZPsPxzuwf_mpB0b7Sp2YbxJ",
    "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/cancer-homepage%20banner-desktop_0.jpg?VersionId=DLxU0lH58ZPsPxzuwf_mpB0b7Sp2YbxJ",
    "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/home-page-banner1-Quality-healthcare-desktop.jpg?VersionId=oZjVdTWD75v31WTBmLr19t09IUGj14il"
  ];

  const services = [
    {
      icon: "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/book_an_appointment.svg?VersionId=jvbSOCEPQZk4sodUO9mUCVUbWthOhqFG",
      title: "Book An Appointment",
      description: "Consult at Hospital or Teleconsult",
      href: "/user_login",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/find_doctors.svg?VersionId=gJbe8vyDHsacEUIzm3S7VxPWbQWHYid6",
      title: "Find Doctor",
      description: "Search according to specialties and more",
      href: "/user_login",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-05/online-medical-consultation-diagnosis.svg?VersionId=9eiZEqcc22M6j1FX8GvYtwmcXgqu8imQ",
      title: "Feedback",
      description: "Share your experience with us",
      href: "/feedback",
      color: "from-orange-500 to-red-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setcurrentimageindex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setcurrentimageindex(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Slider Container */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
        {/* Images */}
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentimageindex 
                ? `opacity-100 ${isTransitioning ? 'scale-105' : 'scale-100'}` 
                : 'opacity-0 scale-110'
            }`}
          >
            <img 
              src={imageUrl} 
              alt={`Healthcare slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentimageindex 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentimageindex - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => goToSlide((currentimageindex + 1) % images.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Service Cards - Overlapping the slider */}
      <div className="relative -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.href}
                className="group block transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 lg:p-8 border border-gray-100 overflow-hidden relative">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 flex items-start mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="relative z-10 flex justify-end mt-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Our Healthcare System
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Providing comprehensive medical care with state-of-the-art facilities, 
              experienced doctors, and compassionate service for over decades.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Expert Doctors" },
              { number: "500+", label: "Happy Patients" },
              { number: "25+", label: "Specialties" },
              { number: "24/7", label: "Emergency Care" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
