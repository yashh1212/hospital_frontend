import React, { useEffect, useState, useRef } from "react";
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/feedback.css';
import Subnavbar from "./subnavbar";
import { ToastContainer, toast } from 'react-toastify';

export default function Feedback() {
  const [isLogin, setIsLogin] = useState(false);
  const feedbackFormRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
     }
    console.log("isLogin:", isLogin);
  }, [isLogin]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = feedbackFormRef.current;

    if (form) {
      const data = {
        patient_name: `${form.pt_fname.value} ${form.pt_lname.value}`,
        pt_email: form.ptient_email.value,
        pt_number: form.ptient_number.value,
        doctor_name: form.doctor_name.value,
        pt_suggestion: form.suggestion.value,
        like_to_feedback: form.like_to_feedback.value || "",
      };

      const radioGroups = [
        "treatment",
        "doctor_knowledge",
        "technology",
        "facility",
        "lab_test",
        "friendly",
      ];

      radioGroups.forEach((group) => {
        const selectedValue = form[group].value;
        if (selectedValue) {
          data[group] = selectedValue;
        }
      });

      console.log(data);

      const response = await fetch("https://hospital-backend-vri9.vercel.app/feedback/submit_feedback", {
        method: "POST",
        headers: {
          'token': sessionStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Feedback submitted successfully!");
        form.reset();
      } else {
        toast.error("Please fill all the options.");
      }
    }
  };

  return (
    <>
      {isLogin ? <Subnavbar /> : null}
      <div className="main_feedback">
        <form ref={feedbackFormRef} onSubmit={handleSubmit}>
          <div className="header">
            <h1>Patient Feedback Form</h1>
            <hr />
            <p>Thank you for taking the time to fill out this feedback survey. We value your input!</p>
            <p>The information you enter on this form is private and will only be seen by us. Unless you give us permission at the bottom of this form, it will not be shared with your therapist.</p>
            <p>We want you to achieve positive outcomes. We want to know what went well and where we could improve.</p>
          </div>

          <div>
            <label htmlFor="pt_fname" className="p_name">Your Name</label>
            <label htmlFor="doctor_name" className="d_name">Doctor Name</label>
            <br />
            <div className="row1">
              <div className="patient_name">
                <input type="text" id="pt_fname" name="pt_fname" required placeholder="First Name" />
                <input type="text" id="pt_lname" name="pt_lname" required placeholder="Last Name" />
              </div>
              <div className="doctorname">
                <select id="doctor_name" name="doctor_name" required>
                  <option value="" disabled selected>Select a Doctor</option>
                  <option value="gandu">gandu</option>
                 </select>
              </div>
            </div>

            <label htmlFor="ptient_number" className="pnumber">Your Phone Number</label>
            <label htmlFor="ptient_email" className="email">Your Email</label>
            <div className="row2">
              <div className="phone_number">
                <input type="number" id="ptient_number" name="ptient_number" required />
              </div>
              <div className="c_email">
                <input type="email" id="ptient_email" name="ptient_email" required />
              </div>
            </div>

            <div className="main_form">
              <h3>How Would you Evaluate your Experience Here?</h3>
              <table>
                <thead>
                  <tr>
                    <th className="th_q"></th>
                    <th>Not Satisfied</th>
                    <th>Somewhat Satisfied</th>
                    <th>Satisfied</th>
                    <th>Very Satisfied</th>
                  </tr>
                </thead>
                <tbody>
                  {["Effectiveness of the treatment and medication",
                    "Doctor’s knowledge and alertness",
                    "Use of the latest technology for your needs",
                    "Care received at our hospital/facility",
                    "Efficiency in conducting health examinations and lab tests",
                    "Doctor's friendliness"].map((question, index) => (
                      <tr key={index}>
                        <td className="question">{question}:</td>
                        {["not satisfied", "somewhat satisfied", "satisfied", "very satisfied"].map((option, i) => (
                          <td key={i}>
                            <input type="radio" name={question.toLowerCase().replace(/\s/g, "_")} value={option} required />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="feedback">
                <h3>What else do you want us to know about your visit here?</h3>
                <textarea id="suggestion" name="suggestion" required></textarea>

                <h3>Would you like to give your therapist the information on this form?</h3>
                <input type="radio" name="like_to_feedback" value="yes" required />
                <label htmlFor="like_to_feedback">Yes</label><br />
                <input type="radio" name="like_to_feedback" value="no" required />
                <label htmlFor="like_to_feedback">No</label>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
