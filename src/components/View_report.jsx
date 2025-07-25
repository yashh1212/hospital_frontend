import React, { useState } from 'react';

function View_report() {
  const [selectedReport, setSelectedReport] = useState('');
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const reportTypes = [
    { value: "CT-Scan.jpg", label: "CT Scan", icon: "🧠" },
    { value: "MRI.jpg", label: "MRI Scan", icon: "🔬" },
    { value: "KFT.jpg", label: "Kidney Function Test", icon: "🩺" },
    { value: "LFT.jpg", label: "Liver Function Test", icon: "🧪" }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedReport) {
      setError('Please select a report type');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const user_id = sessionStorage.getItem("user_id");
      
      if (!user_id) {
        setError('User ID not found. Please login again.');
        return;
      }

      console.log(user_id);
      const response = await fetch(`http://127.0.0.1:8000/view_report?patient_id=${user_id}&report=${selectedReport}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const message = await response.json();
      setReport(message[0]);
      console.log(message);
      
      if (!message[0]) {
        setError('Report not found for the selected type');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      setError('Failed to load report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
    setError('');
    setReport(null);
  };

  const handleDownload = () => {
    if (report) {
      const link = document.createElement('a');
      link.href = report;
      link.download = selectedReport;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getSelectedReportInfo = () => {
    return reportTypes.find(type => type.value === selectedReport);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Medical Report Viewer
            </h1>
            <p className="text-blue-100 text-lg">
              Access and download your medical reports securely
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Report Selection Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Select Report
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Medical Report Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reportSelect"
                    value={selectedReport}
                    onChange={handleReportChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all duration-200 bg-white"
                    required
                  >
                    <option value="">Select report type</option>
                    {reportTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !selectedReport}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                    isLoading || !selectedReport
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading Report...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Report
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to Access Reports
                </h3>
              </div>
              <div className="p-6">
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Select your desired report type from the dropdown</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Click "Search Report" to retrieve your medical report</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>View your report in the preview area</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Download the report for offline access if needed</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Report Display Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {getSelectedReportInfo() ? `${getSelectedReportInfo().label} Report` : 'Medical Report'}
                </h2>
              </div>
              
              <div className="p-6">
                {!selectedReport && !report && (
                  <div className="text-center py-16">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Report Selected</h3>
                    <p className="text-gray-500">Please select a report type and click search to view your medical report.</p>
                  </div>
                )}

                {selectedReport && !report && !isLoading && !error && (
                  <div className="text-center py-16">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Report Not Found</h3>
                    <p className="text-gray-500">No {getSelectedReportInfo()?.label.toLowerCase()} report was found for your account.</p>
                  </div>
                )}

                {report && (
                  <div className="space-y-6">
                    {/* Report Info */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getSelectedReportInfo()?.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{getSelectedReportInfo()?.label}</h4>
                          <p className="text-sm text-gray-500">Medical Report</p>
                        </div>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Download
                      </button>
                    </div>

                    {/* Report Image */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <img 
                        src={report} 
                        alt={`${getSelectedReportInfo()?.label} Report`}
                        className="w-full h-auto max-h-[600px] object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          setError('Failed to load report image');
                        }}
                      />
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your medical report...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🔒 Your Privacy is Protected</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            All medical reports are encrypted and transmitted securely. Your personal health information is protected in accordance with medical privacy standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2 text-blue-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_report;
