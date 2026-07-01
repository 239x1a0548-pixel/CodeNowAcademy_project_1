import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout(){
    const navigate=useNavigate()
     useEffect(()=>{
         localStorage.removeItem('token')
         localStorage.removeItem('userData')
         navigate("/login")
     },[navigate])
   
}
export default Logout;