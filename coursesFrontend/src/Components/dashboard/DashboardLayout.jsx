import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './allCourses.css'
function DashboardLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token)
      navigate("/login")
  }, [navigate])
  return (
    <div style={{ display: 'flex' }}>
      <nav>
        <NavBar />
      </nav>
      <main style={{ flex: '1' ,
                 background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)',height:'100%'
            }}>
        <Outlet />
      </main>
    </div>
  )
} export default DashboardLayout;