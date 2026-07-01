


//-----------------------------------BootStrap Styling-------------------------------------------


import { useEffect, useState } from "react"
import axios from "axios"
import './allCourses.css'
import ShowToast from '../ShowToast'
function Profile() {
    const [data, setData] = useState({})
    const [editUserName, seteditUserName] = useState(false)
    const [userName, setUserName] = useState("")
    const [editUserEmail, seteditUserEmail] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [changeOldPassword, setChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const[toast,setToast]=useState(false)
    const[message,setMessage]=useState("")
    
     function handleToast(){
        setToast(true);
        setTimeout(()=>setToast(false),4000)
     }
    useEffect(() => {
        async function fetchData1() {
            try {
                const user = JSON.parse(localStorage.getItem('userData'))
                if (!user) {
                    console.log("Login Again")
                    return;
                }

                const response = await axios.get(
                    "http://localhost:5000/user/getDetails",
                    { params: { id: user.id } }
                )

                setData(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData1()
    }, [])
    async function updateUserName(newUserName) {
                try {
                    const user = JSON.parse(localStorage.getItem('userData'))
                    const response = await axios.put("http://localhost:5000/user/updateUserName?id=" + user.id + "&newUserName=" + newUserName)
                    setMessage(response.data.message);
                }
                catch (error) {
                    setMessage("Something went wrong")
                    console.log(error.response.data.message)
                }
            }
        
            async function updateUserEmail(newUserEmail) {
                try {
                    const user = JSON.parse(localStorage.getItem('userData'))
                    const response = await axios.put("http://localhost:5000/user/updateUserEmail?id=" + user.id + "&newUserEmail=" + newUserEmail)
                    setMessage(response.data.message)
                }
                catch (error) {
                    setMessage("Something went wrong")
                    console.log(error.response.data.message)
                }
            }
            async function changePassword() {
                try {
                    console.log("1 Changing Password")
                    const user = JSON.parse(localStorage.getItem('userData'))
                    const userData = {
                        email: userEmail,
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    }
                    console.log("2 Changing Password")
                    const response = await axios.put("http://localhost:5000/user/changePassword?id=" + user.id, userData)
                    if (response.status === 400) {
                        alert(response.data.message)
                        return;
                    }
                    console.log("3 Changing Password")
                    setMessage(response.data.message)
                }
                catch (error) {
                    setMessage("Something went wrong")
                    console.log(error.response.data.error)
                }
            }
    const isModalOpen =
        editUserName || editUserEmail || changeOldPassword

    return (
        <div
            className="container-fluid py-5 min-vh-100"
            style={{
                background: "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
                color: "#ffffff"
            }}
        >
            <div
                className="row justify-content-center"
                style={{
                    filter: isModalOpen ? "blur(6px)" : "none",
                    transition: "0.3s ease",
                    pointerEvents: isModalOpen ? "none" : "auto"
                }}
            >
                <div className="col-lg-8 col-md-10">
                    <div
                        className="card border-0 shadow-lg rounded-4"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(10px)",
                            color: "#fff"
                        }}
                    >
                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-5 text-white">
                                My Profile
                            </h2>

                            {/* Username Section */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0 text-white">
                                    Welcome, {data.name}
                                </h4>

                                <button
                                    className="btn btn-light fw-semibold px-4"
                                    onClick={() => {seteditUserName(true)}}
                                >
                                    Edit
                                </button>
                                
                            </div>

                            <hr className="text-white" />

                            {/* Email Section */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0 text-white-50">
                                    Email: {data.email}
                                </h5>

                                <button
                                    className="btn btn-light fw-semibold px-4"
                                    onClick={() =>{ seteditUserEmail(true)}}
                                >
                                    Edit
                                </button>
                            </div>

                            <hr className="text-white" />

                            {/* Enrolled Courses */}
                            <div className="mb-4">
                                <h5 className="text-white">
                                    Enrolled Courses
                                    <span className="badge bg-info text-dark ms-3 px-3 py-2">
                                        {data.NumberOfCourses}
                                    </span>
                                </h5>
                            </div>

                            {/* Change Password */}
                            <button
                                className="btn btn-warning btn-lg fw-bold"
                                onClick={() => setChangePassword(true)}
                            >
                                Change Password
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODALS (UNCHANGED EXACTLY) --- */}

            {editUserName && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: "500px", maxWidth: "90%" }}>
                        <h4 className="mb-4">Edit Username</h4>

                        <input type="text" className="form-control mb-3"
                            placeholder="Enter New Username"
                            onChange={(e) => setUserName(e.target.value)} />

                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-success"
                                onClick={() => {
                                    updateUserName(userName);
                                    seteditUserName(false)
                                    ;setToast(true)
                                }}>
                                Submit
                            </button>

                            <button className="btn btn-secondary"
                                onClick={() => {seteditUserName(false);setToast(false)}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editUserEmail && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: "500px", maxWidth: "90%" }}>
                        <h4 className="mb-4">Edit Email</h4>

                        <input type="email" className="form-control mb-3"
                            placeholder="Enter New Email"
                            onChange={(e) => setUserEmail(e.target.value)} />

                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-success"
                                onClick={() => {
                                    updateUserEmail(userEmail)
                                    seteditUserEmail(false);setToast(true)
                                }}>
                                Submit
                            </button>

                            <button className="btn btn-secondary"
                                onClick={() => {seteditUserEmail(false);setToast(false)}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {changeOldPassword && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: "500px", maxWidth: "90%" }}>
                        <h4 className="mb-4">Change Password</h4>

                        <input type="email" className="form-control mb-3"
                            placeholder="Enter Your Email"
                            onChange={(e) => setUserEmail(e.target.value)} />

                        <input type="password" className="form-control mb-3"
                            placeholder="Enter Your Old Password"
                            onChange={(e) => setOldPassword(e.target.value)} />

                        <input type="password" className="form-control mb-3"
                            placeholder="Enter Your New Password"
                            onChange={(e) => setNewPassword(e.target.value)} />

                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-success"
                                onClick={() => {
                                    setChangePassword(false)
                                    changePassword();setToast(true)
                                }}>
                                Update
                            </button>

                            <button className="btn btn-danger"
                                onClick={() => {setChangePassword(false);setToast(false)}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                // 
            )}
            {toast?<ShowToast toast={toast} message={message}/>:''}
        </div>
    )
}

export default Profile