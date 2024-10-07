import React,{useState} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/footer';
import Find_doctor from './components/find_doctor';
import Book_appointment from './components/Book_appointment';
import Hospital_login from './components/Hospital_login';
import User_login from './components/User_login';
import User_Register from './components/user_Register';
import Doctor_search from './components/doctor_search';
import Doctor_appointment from './components/Doctor_appointment';
import View_report from './components/View_report';
import Services from './components/Services';
import Appointment_history from './components/appointment_history';
import UserHomePage from './components/UserHomePage';
import Hhospital_homepage from './components/hhospital_homepage';
import Manage_apt from './components/manage_apt';
import Doctor_list from './components/doctor_list';
import Dct_list_speciality from './components/dct_list_speciality';
import Upload_file from './components/upload_file';
import Feedback from './components/feedback';
 
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Loader from './components/loader';




function App() {
  const [apidata, setApiData] = useState([]);
  const[doctor_id,setdoctor_id]=useState("")
  const [doctor_information , setdoctor_information]=useState([])
  const [islogin, setislogin]=useState(false)
  const [login_id,setlogin_id]=useState('')
  const [speciality, setspeciality]=useState('')
  const [loading, setloading] = useState(false);
  console.log("call again")
 

  const login=()=>{
    setislogin(true)
  }
  const get_doctorid=(doctor_id_para)=>{
    setdoctor_id(doctor_id_para)
    if(doctor_id.length >0) return true
    else return false
 
  }
  const get_speciality=(dct_speciality)=>{
    setspeciality(dct_speciality)

    if(speciality.length > 0){
      console.log(speciality.length )
      console.log(dct_speciality,"hello")
      return true
    }
    else return false
  }
  const get_login_id=(id)=>{
    if(id.length ==10){

      setlogin_id(id)
    }
    if(login_id.length > 9) return true
    else return false
  }
  const getdoctor_information=(data)=>{
    setdoctor_information(data)

    if (
      doctor_information["_id"] == doctor_id
    ) {
      console.log("inside hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      return true;
    } else { 
  
      return false};
  }
  const handleCallback= (data) =>{
    setApiData(data);
    
  };
  console.log("dct_id",doctor_id)
  console.log("ewgsrg",login_id)
  return (
    <Router>
      <div>
        <div className="header">
          <Navbar />
        </div>
        {loading ? <Loader /> : null}

        <Routes>
          <Route exat path="/" element={<Body />} />

 
          <Route
            exat
            path="/book_apt"
            element={
              <Book_appointment
                callback={handleCallback}
                setloading={setloading}
              />
            }
          />

          <Route
            exat
            path="/Hospital_login"
            element={<Hospital_login setloading={setloading} />}
          />
          <Route
            exat
            path="//hospital_home"
            element={<Hhospital_homepage setloading={setloading} />}
          />
          <Route
            exat
            path="/appointment_history"
            element={
              <Appointment_history
                login_id={login_id}
                setloading={setloading}
              />
            }
          />
          <Route
            exat
            path="/Manage_apt"
            element={<Manage_apt setloading={setloading} />}
          />
          <Route
            exat
            path="/Doctor_list"
            element={<Doctor_list setloading={setloading} />}
          />
          <Route
            exat
            path="/Upload_file"
            element={<Upload_file setloading={setloading} />}
          />
          <Route
            exat
            path="/Feedback"
            element={<Feedback setloading={setloading} />}
          />

          <Route
            exat
            path="/Dct_list_speciality"
            element={
              <Dct_list_speciality
                speciality={speciality}
                callback={get_doctorid}
                getdoctor_information={getdoctor_information}
                login={islogin}
                setloading={setloading}
              />
            }
          />

          <Route
            exat
            path="/user_login"
            element={
              <User_login
                callback={login}
                get_login_id={get_login_id}
                setloading={setloading}
              />
            }
          />
          <Route
            exat
            path="/Doctor_search/user_login"
            element={
              <User_login
                callback={login}
                get_login_id={get_login_id}
                setloading={setloading}
              />
            }
          />

          <Route
            exat
            path="/User_Register"
            element={<User_Register setloading={setloading} />}
          />
          <Route
            exat
            path="/Doctor_search"
            element={
              <Doctor_search
                apidata={apidata}
                callback={get_doctorid}
                getdoctor_information={getdoctor_information}
                login={islogin}
                setloading={setloading}
              />
            }
          />

          <Route
            exact
            path="/Doctor_search/Doctor_appointment"
            element={
              <Doctor_appointment
                doctor_id={doctor_id}
                doctor_information={doctor_information}
                login={islogin}
                setloading={setloading}
              />
            }
          />
          <Route
            exact
            path="/Dct_list_speciality/Doctor_appointment"
            element={
              <Doctor_appointment
                doctor_id={doctor_id}
                doctor_information={doctor_information}
                login={islogin}
                setloading={setloading}
              />
            }
          />
          <Route
            exat
            path="/View_report"
            element={
              <View_report login_id={login_id} setloading={setloading} />
            }
          />
          <Route
            exat
            path="/Services"
            element={
              <Services callback={get_speciality} setloading={setloading} />
            }
          />
          <Route
            exat
            path="/user_home"
            element={<UserHomePage setloading={setloading} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
