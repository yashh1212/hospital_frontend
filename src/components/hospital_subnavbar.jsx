import React from 'react';

function HospitalSubnavbar() {
  return (
    <div className="submenu hs_nav">
      <ul>
        <li><a href="/Manage_apt">Manage Appointment</a></li>
        <li><a href="/Upload_file">Upload Report</a></li>
        <li><a href="/Doctor_list">Doctors</a></li>
      </ul>
    </div>
  );
}

export default HospitalSubnavbar;
