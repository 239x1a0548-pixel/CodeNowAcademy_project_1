//------------------------------BootStrap styling-----------------


import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowToast from './ShowToast';

function Register() {
    const navigate = useNavigate();
    const[toast,setToast]=useState(false)
    const[message,setMessage]=useState("")
    const[register,setRegister]=useState(false);
         function handleToast(){
            setToast(true);
            setTimeout(()=>setToast(false),4000)
         }
    // ---------------------------For Handling Registration--------------------------
    async function handleRegister() {
        setRegister(true);
        if(fullName.length===0)
        {
            setMessage("Name must be entered")
            handleToast();
            setRegister(false);
            return;
        }
        if(email.length===0){
            setMessage("Email must be entered");
            handleToast();
            setRegister(false);
            return;
        }
        if (password.length < 6) {
            setMessage("Password length Must be greater than 5")
            handleToast();
            setRegister(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Confirm password must be same as password")
            handleToast();
            setRegister(false);
            return;
        }

        const userdata = {
            fullName: fullName,
            email: email,
            password: password
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                userdata
            );
            setMessage(response.data.message);
            handleToast();
        setTimeout(()=>{
          navigate("/login");
        },600)
            
        } catch (error) {
            setMessage(error.response.data.message);
            handleToast();
            setRegister(false);
        }
    }

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{ background: "#eef1f7" }}
        >
            <div
                className="row g-0 shadow-lg rounded-4 overflow-hidden"
                style={{ maxWidth: "950px", border: "2px solid #2a5298" }}
            >

                {/* -------- Left Panel: Student Registration Form -------- */}
                <div
                    className="col-md-7 d-flex align-items-center justify-content-center p-4 p-md-5"
                    style={{ background: "#ffffff" }}
                >
                    <div className="w-100">
                        <div className="text-center mb-4">
                            <h1 className="fw-bold">Student Registration</h1>
                            <p className="text-muted">
                                Create your student account to get started
                            </p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="user_register_name"
                                className="form-control"
                                placeholder="Enter your full name"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="user_register_email"
                                className="form-control"
                                placeholder="Enter your student email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="user_register_password"
                                className="form-control"
                                placeholder="Create a password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="user_register_confirm_password"
                                className="form-control"
                                placeholder="Confirm your password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100 py-2"
                            onClick={()=>{handleRegister()}}
                            disabled={toast}
                        >
                         {toast?'Registering...':'Register'}
                        </button>

                        {toast?<ShowToast toast={toast} message={message}/>:''}

                    </div>
                </div>

                {/* -------- Right Panel: Login -------- */}
                <div
                    className="col-md-5 d-flex align-items-center justify-content-center text-center p-4 p-md-5"
                    style={{
                        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)",
                        borderLeft: "2px solid #2a5298"
                    }}
                >
                    <div className="text-white">
                        <h2 className="fw-bold mb-3">Already a registered student?</h2>
                        <p className="mb-4">
                            Log in to access your courses, and student dashboard.
                        </p>
                        <Link
                            to="/login"
                            className="btn btn-outline-light px-5 py-2"
                        >
                            Login
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;