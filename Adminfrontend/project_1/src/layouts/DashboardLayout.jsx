import { Outlet } from "react-router-dom"
import Header from "../components/Header"
function DashboardLayout(){
    return(
        <div>
            <div><Header/></div>
            <main>
                <Outlet/>
            </main>
            
        </div>
    )
}
export default DashboardLayout;