import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Hospital_subnavbar from './hospital_subnavbar';

export default function Upload_file() {
    const [file, setFile] = useState(null);
    const [patient_id, setPatientId] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
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
        }
    }, [navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);
    };

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            
            if (allowedTypes.includes(droppedFile.type)) {
                setFile(droppedFile);
            } else {
                toast.error("Please upload only JPG, PNG, or PDF files");
            }
        }
    };

    const validateForm = () => {
        if (!file) {
            toast.error("Please select a file to upload");
            return false;
        }
        if (!patient_id.trim()) {
            toast.error("Please enter patient ID");
            return false;
        }
        if (patient_id.length < 3) {
            toast.error("Patient ID must be at least 3 characters");
            return false;
        }
        return true;
    };

    const uploadFile = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('patient_id', patient_id);

        try {
            const response = await fetch(`https://hospital-backend-coral.vercel.app/upload/upload_file`, {
                method: "POST",
                headers: {
                    "token": sessionStorage.getItem("hs_token"),
                },
                body: formData
            });
            const message = await response.json();

            if (message === "File uploaded successfully") {
                toast.success("File uploaded successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                // Reset form
                setFile(null);
                setPatientId('');
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';
            } else {
                toast.error(message || "Upload failed", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload file. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileType) => {
        if (fileType?.includes('pdf')) {
            return (
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            );
        } else {
            return (
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Hospital_subnavbar />

            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Upload Patient Reports
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Securely upload and manage patient medical reports
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload Medical Report
                        </h2>
                        <p className="text-green-100 mt-2">
                            Upload patient reports in JPG, PNG, or PDF format
                        </p>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={uploadFile} className="p-8 space-y-8">
                        
                        {/* Patient ID Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Patient ID <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2m4-2v2" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={patient_id}
                                    onChange={handlePatientIdChange}
                                    placeholder="Enter patient identification number"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                                    required
                                />
                            </div>
                            {patient_id && patient_id.length < 3 && (
                                <p className="mt-2 text-sm text-red-600">
                                    Patient ID must be at least 3 characters
                                </p>
                            )}
                        </div>

                        {/* File Upload Section */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Patient Report <span className="text-red-500">*</span>
                            </label>
                            
                            {/* Drag and Drop Area */}
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                    dragActive 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    required
                                />
                                
                                {!file ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-700">
                                                Drop your file here, or <span className="text-blue-600">browse</span>
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Supports: JPG, PNG, PDF (Max 10MB)
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            {getFileIcon(file.type)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-700">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Remove file
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File Requirements */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-sm font-medium text-blue-900">File Requirements</h3>
                                    <div className="text-sm text-blue-700 mt-1">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Accepted formats: JPG, JPEG, PNG, PDF</li>
                                            <li>Maximum file size: 10MB</li>
                                            <li>Ensure file contains clear, readable content</li>
                                            <li>Patient information should be clearly visible</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isUploading || !file || !patient_id.trim()}
                                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                                    isUploading || !file || !patient_id.trim()
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-2xl transform hover:-translate-y-0.5'
                                }`}
                            >
                                {isUploading ? (
                                    <span className="flex items-center gap-3">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading Report...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Upload Report
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        If you're having trouble uploading files or need assistance with the upload process, 
                        our technical support team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                            📞 Call Support: +91-1234567890
                        </button>
                        <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors duration-200">
                            💬 Live Chat Support
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer 
                position="top-center"
                autoClose={3000}
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
