import React,{useState} from 'react';
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/view_report.css';

function View_report() {
  const [selectedReport, setSelectedReport] = useState(' ');
  const [report,setreport]=useState()

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    const user_id=sessionStorage.getItem("user_id")
    
    console.log(user_id)
    console.log(selectedReport,'rdffidnsdoif')

    const response=await fetch(`http://127.0.0.1:8000/view_report?patient_id=${user_id}&report=${selectedReport}`)

    var message=await response.json()
    setreport(message[0])
    console.log(message)
  };

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
  };

  return (
    <div>
      <h3 className='heading'>Medical Report</h3>
      <div className='main_container_report'>
        <div className='report_card'>
          <div className='report_details'>
            <form onSubmit={handleSubmit}>
              <h3>Please Enter The Order No</h3>
              <label htmlFor='orderNo'>Medical Report:</label><br />
               <select id='reportSelect' value={selectedReport} onChange={handleReportChange}>
                <option>select report</option>
                <option value="CT-Scan.jpg">CT-Scan</option>
                <option value="MRI.jpg">MRI</option>
                <option value="KFT.jpg">KFT</option>
                <option value="LFT.jpg">LFT</option>
                {/* Add more options as needed */}
              </select>
              <button type='submit' >search</button>
            </form>
          </div>
          <div className='instructions'>
            <h4>Please follow below steps to View/Print your Report Online:</h4>
            <ol>
              <li>Enter Order No.</li>
              <li>Click "SUBMIT"</li>
              <li>Validate last 4 digits of your Mobile Number by clicking "CONFIRM".</li>
              <li>You will now receive One Time Password (OTP) on your registered Mobile Number</li>
              <li>Enter OTP and Click "SUBMIT". You can re-generate OTP, in case you have not received in a minute.</li>
            </ol>
          </div>
        </div>
      </div>
      <div className='report'>
        <h3>Medical Report</h3>
         {selectedReport ? 
          <img src={report} alt="Medical Report" className="report-image" /> : 
          <p className="report-not-found">Report not found</p>
        }
         {selectedReport && 
          <button className="download-button">Download</button>
        }
      </div>
    </div>
  );
}

export default View_report;
