import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
    const navigate =useNavigate();
    const admin = JSON.parse(localStorage.getItem("admin")) || [];
    let name = [];
    if(admin&&admin.fullName) {
        name = admin.fullName.split(" ");
    }
    const logout=()=>{
        
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/login");
    }
    return (
        <div className="bootstrap-scope d-flex justify-content-between p-3" style={{ backgroundColor: "grey", height: "10vh", textAlign: "center" }}>
            <h1>Admin Dashboard</h1>
            <div className="d-flex gap-2">
                <h2>{name[0]}</h2>


                <div className="btn-group">
                    <button className="btn text-white bg-primary dropdown-toggle" data-bs-toggle="dropdown" >{name[0][0]}</button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Profile</li>
                        <li className="dropdown-item" onClick={logout}>Logout</li>
                        
                    </ul>
                </div>
               
               

            </div>

        </div>
    )
}
export default Header;