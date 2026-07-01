import TempLogin from "./pages/TempLogin";
import {Link,BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Students from './pages/Students';
import DashboardLayout from './layouts/DashboardLayout';
import TempCourses from './pages/TempCourses'


function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<TempLogin/>}/>
          
          <Route path="/adminDashboard" element={
            <ProtectedRoute><DashboardLayout/></ProtectedRoute>
           
          }>
           <Route index element={<AdminDashboard/>}/>
           <Route path="students" element={<Students/>}/>
           <Route path="courses" element={<TempCourses/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;