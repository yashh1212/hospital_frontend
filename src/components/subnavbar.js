import React from 'react'

function subnavbar() {
  return (
    <div className="submenu">
        <ul>
            <li>
                <a href="">Patient </a>
                <ul className='dropdown'>
                <li><a href="/book_apt">Book Appointment</a></li>
                <li><a href="/View_report?">Patient Report</a></li>
                 </ul>
            </li>
            <li>
                <a href="/book_apt">Search Doctor</a>
            </li>
            <li>
                <a href="/Services">Specialities & Services</a>
            </li>
             
            <li>
            <a href="/appointment_history">Appointment History</a>
            </li>
            <li>
            <a href="/feedback">Feedback</a>
            </li>
        </ul>
    </div>
  )
}

export default subnavbar
