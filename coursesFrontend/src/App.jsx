// import {BrouserRouter,Routes,Route} from 'react-route-dom'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Content from './Components/Content';
import Register from './Components/Register';
import Login from './Components/Login';
import Layout from './Components/Layout';
import DashboardLayout from './Components/dashboard/DashboardLayout';
import Dashboard from './Components/dashboard/Dashboard';
import YourCourses from './Components/dashboard/YourCourses';
import Profile from './Components/dashboard/Profile';
import Logout from './Components/dashboard/Logout';
function App(){
  return(
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Content/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<DashboardLayout/>}>
          <Route path="allCourses" element={<Dashboard/>}/>
          <Route path="yourCourses" element={<YourCourses/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="logout" element={<Logout/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
  )
}export default App;