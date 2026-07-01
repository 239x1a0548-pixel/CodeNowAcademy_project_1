import nature_login from './nature_login.jpg'
import axios from 'axios'
import './Login.css'
import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ShowToast from './ShowToast'
function Login(){
    const navigate=useNavigate();
    const[email,setEmail]=useState(localStorage.getItem("email")||"")
    const[password,setPassword]=useState(localStorage.getItem("password")||"")
    const[login,setLogin]=useState(false)
    const[toast,setToast]=useState(false)
    const[message,setMessage]=useState("")
    const[check,setCheck]=useState(false);
     function handleToast(){
        setToast(true);
        setTimeout(()=>setToast(false),4000)
     }
     function handleRemember(){
        if(!check)
             return;
        localStorage.setItem("email",email)
        localStorage.setItem("password",password);
     }
    async function handleLogin() {
        console.log("I am here")
        const Data={
            email:email,
            password:password
        }
        console.log("I am here")
        setLogin(true);
        try{
            console.log("I am here")
            const response=await axios.post("http://localhost:5000/api/login",Data)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            console.log(response.status)
            if(response.status===400)
                 navigate("/login")
            setMessage("Login Successfull")
            handleToast();
            setTimeout(()=>{
               navigate("/user/allCourses")
            },2000)
           
            console.log(response.data.userData.id)
            
            console.log("I am here")
        }
        catch(error){
            console.log("I am here")
            setMessage("Login Failed")
            handleToast();
            setLogin(false);
        }
    }
    return(
        <div
            className="d-flex align-items-center justify-content-center min-vh-100 p-4"
            style={{ background: "#eef1f7" }}
        >
            <div
                className="d-flex flex-column flex-md-row shadow-lg rounded-4 overflow-hidden bg-white w-100"
                style={{ maxWidth: "1000px", border: "2px solid #2a5298" }}
            >

                {/* -------- Left Panel: Welcome / Image -------- */}
                <div
                    id="nature_login"
                    className="d-flex flex-column justify-content-center text-white p-5"
                    style={{
                        flex: "0 0 38%",
                        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)"
                    }}
                >
                   <h1 className="fw-bold mb-3">Welcome Back</h1>
                   <p className="mb-0" style={{ opacity: 0.9 }}>
                       Glad to see you again,<br/>please login to continue
                   </p>
                </div>

                {/* -------- Right Panel: Login Form -------- */}
                <div className="flex-fill p-4 p-md-5 d-flex flex-column gap-3">

                    <div>
                        <h1 className="fw-bold mb-1">Login</h1>
                        <p className="text-muted">Login to your account to continue</p>
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            id="user_email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            id="user_password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="remember_me"
                            onChange={()=>{setCheck(true)}}
                            className="form-check-input"
                        />
                        <label htmlFor="remember_me" className="form-check-label">
                            Remember Me
                        </label>
                    </div>

                    <button
                        className="btn btn-primary w-100 py-2"
                        onClick={()=>{handleLogin();handleRemember()}}
                        disabled={login}
                    >
                        {login?'Logging in...':'Login'}
                    </button>

                    {toast?<ShowToast toast={toast} message={message}/>:''}

                    <p className="text-center text-muted mb-0">
                        Don't have an account?{" "}
                        <Link to="/register">Register here</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}export default Login;