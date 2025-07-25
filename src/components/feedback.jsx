import React, { useEffect, useState, useRef } from "react";
import Subnavbar from "./subnavbar";
import { ToastContainer, toast } from 'react-toastify';

export default function Feedback() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pt_fname: '',
    pt_lname: '',
    ptient_email: '',
    ptient_number: '',
    doctor_name: '',
    suggestion: '',
    like_to_feedback: '',
    treatment: '',
    doctor_knowledge: '',
    technology: '',
    facility: '',
    lab_test: '',
    friendly: ''
  });
  const feedbackFormRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['pt_fname', 'pt_lname', 'ptient_email', 'ptient_number', 'doctor_name', 'suggestion', 'like_to_feedback'];
    const ratingFields = ['treatment', 'doctor_knowledge', 'technology', 'facility', 'lab_test', 'friendly'];
    
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        toast.error(`Please fill in ${field.replace('_', ' ').replace('ptient', 'patient')}`);
        return false;
      }
    }
    
    for (let field of ratingFields) {
      if (!formData[field]) {
        toast.error("Please rate all aspects of your experience");
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const data = {
      patient_name: `${formData.pt_fname} ${formData.pt_lname}`,
      pt_email: formData.ptient_email,
      pt_number: formData.ptient_number,
      doctor_name: formData.doctor_name,
      pt_suggestion: formData.suggestion,
      like_to_feedback: formData.like_to_feedback,
      treatment: formData.treatment,
      doctor_knowledge: formData.doctor_knowledge,
      technology: formData.technology,
      facility: formData.facility,
      lab_test: formData.lab_test,
      friendly: formData.friendly,
    };

    try {
      const response = await fetch("https://hospital-backend-vri9.vercel.app/feedback/submit_feedback", {
        method: "POST",
        headers: {
          'token': sessionStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Thank you! Your feedback has been submitted successfully!");
        setFormData({
          pt_fname: '',
          pt_lname: '',
          ptient_email: '',
          ptient_number: '',
          doctor_name: '',
          suggestion: '',
          like_to_feedback: '',
          treatment: '',
          doctor_knowledge: '',
          technology: '',
          facility: '',
          lab_test: '',
          friendly: ''
        });
      } else {
        toast.error("Please ensure all fields are completed correctly.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingQuestions = [
    { question: "Effectiveness of the treatment and medication", name: "treatment", icon: "💊" },
    { question: "Doctor's knowledge and alertness", name: "doctor_knowledge", icon: "👨‍⚕️" },
    { question: "Use of the latest technology for your needs", name: "technology", icon: "🔬" },
    { question: "Care received at our hospital/facility", name: "facility", icon: "🏥" },
    { question: "Efficiency in conducting health examinations and lab tests", name: "lab_test", icon: "🧪" },
    { question: "Doctor's friendliness", name: "friendly", icon: "😊" }
  ];

  const ratingOptions = [
    { value: "not satisfied", label: "Not Satisfied", color: "text-red-600", bgColor: "bg-red-50 border-red-200" },
    { value: "somewhat satisfied", label: "Somewhat Satisfied", color: "text-orange-600", bgColor: "bg-orange-50 border-orange-200" },
    { value: "satisfied", label: "Satisfied", color: "text-yellow-600", bgColor: "bg-yellow-50 border-yellow-200" },
    { value: "very satisfied", label: "Very Satisfied", color: "text-green-600", bgColor: "bg-green-50 border-green-200" }
  ];

  return (
    <>
      {isLogin ? <Subnavbar /> : null}
      
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Patient Feedback Form</h1>
                <p className="text-blue-100">Help us improve our services with your valuable feedback</p>
              </div>
            </div>
            
            <div className="px-8 py-6 bg-blue-50">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Confidential & Secure</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Anonymous Option</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Quality Improvement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form ref={feedbackFormRef} onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pt_fname"
                      value={formData.pt_fname}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pt_lname"
                      value={formData.pt_lname}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="ptient_number"
                      value={formData.ptient_number}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="ptient_email"
                      value={formData.ptient_email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select your doctor</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
                    <option value="Dr. Williams">Dr. Williams</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Rate Your Experience
                </h2>
                <p className="text-blue-100 mt-1">Please rate each aspect of your visit</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {ratingQuestions.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        {item.question}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {ratingOptions.map((option, i) => (
                          <label key={i} className={`cursor-pointer transition-all duration-200 ${
                            formData[item.name] === option.value 
                              ? `${option.bgColor} border-2 transform scale-105` 
                              : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                          } rounded-xl p-4 text-center`}>
                            <input
                              type="radio"
                              name={item.name}
                              value={option.value}
                              checked={formData[item.name] === option.value}
                              onChange={handleInputChange}
                              required
                              className="sr-only"
                            />
                            <div className={`text-sm font-medium ${
                              formData[item.name] === option.value ? option.color : 'text-gray-600'
                            }`}>
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Feedback */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                  Additional Comments
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What else would you like us to know about your visit? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="suggestion"
                    value={formData.suggestion}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Please share any additional comments, suggestions, or concerns..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Would you like to share this feedback with your doctor? <span className="text-red-500">*</span>
                  </h3>
                  <div className="flex gap-6">
                    <label className={`cursor-pointer transition-all duration-200 ${
                      formData.like_to_feedback === 'yes' 
                        ? 'bg-green-50 border-green-500 border-2' 
                        : 'bg-white border-gray-200 border-2 hover:border-gray-300'
                    } rounded-xl p-4 flex items-center gap-3`}>
                      <input
                        type="radio"
                        name="like_to_feedback"
                        value="yes"
                        checked={formData.like_to_feedback === 'yes'}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-green-600"
                      />
                      <span className={`font-medium ${
                        formData.like_to_feedback === 'yes' ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        Yes, please share
                      </span>
                    </label>
                    
                    <label className={`cursor-pointer transition-all duration-200 ${
                      formData.like_to_feedback === 'no' 
                        ? 'bg-red-50 border-red-500 border-2' 
                        : 'bg-white border-gray-200 border-2 hover:border-gray-300'
                    } rounded-xl p-4 flex items-center gap-3`}>
                      <input
                        type="radio"
                        name="like_to_feedback"
                        value="no"
                        checked={formData.like_to_feedback === 'no'}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-red-600"
                      />
                      <span className={`font-medium ${
                        formData.like_to_feedback === 'no' ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        Keep it confidential
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl transform hover:-translate-y-1'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Feedback...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        neuestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
