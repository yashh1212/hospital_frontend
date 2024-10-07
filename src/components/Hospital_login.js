import React ,{useEffect,useState}from 'react'
import 'C:/Users/asus/OneDrive/Desktop/internship project/hospital/src/css/hospital_login.css'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Hospital_login(props) {
  const [islogin, setislogin]=useState(false)

  useEffect(()=>{
    if(islogin){
      setislogin(false)
    }
  },[islogin])

  const btn_style=()=>{
          let button=document.getElementById('submit')
          if(document.getElementById("login_id").value > 5){
            button.style.backgroundColor="#044597"
            button.style.color="#fff"
          }
          else{
            button.style.backgroundColor="#fff"
            button.style.color="black"
            button.style.border=' 1px solid #044597';

            
          }
  }
  const hospital_login=async(evevt)=>{
      evevt.preventDefault()
      props.setloading(true)
      const data = {
        Hospital_id: document.getElementById("login_id").value,
        password: document.getElementById("login_password").value,
      };

      console.log(data)
      const response = await fetch(
        `https://hospital-backend-vri9.vercel.app/hospital/sign-in`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const message=await response.json()
 
      if(response.status == 200){
        sessionStorage.setItem("hs_token", message);
        if (sessionStorage.getItem("hs_token")) {
          props.setloading(false);
          setislogin(true);
        }
      }
      else if(response.status === 401){
        toast.error(message)
        props.setloading(false);
      }



  }
  return (
    <>
    {islogin?<Navigate to={"/hospital_home"}/>:null}
    <span className='login_name'>Login</span>
    <div className='container'>
      

      <div className='login_container'>
        <div className='login_container_header'>
        <p>LOGIN</p>

        </div>
        <form action="" onSubmit={hospital_login}>
        <label htmlFor="" >HOSPITAL ID</label>
        <input type="text" min={24} max={24}  id='login_id'onChange={btn_style}/><br />
        <label htmlFor="">PASSWORD</label>
        <input type="password"   id='login_password'/><br />
        <button type='submit' id='submit'>Login</button>
        </form>

      </div>
      <div className="login_container2">
       
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
 
export default Hospital_login
