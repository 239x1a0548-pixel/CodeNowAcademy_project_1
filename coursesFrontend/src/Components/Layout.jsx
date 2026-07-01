import { Outlet,Link } from "react-router-dom";
import Content  from "./Content";

function Layout(){
    return(
        <>
          <Link to="\"></Link>
           <Outlet/>
        </>
    )
}export default Layout;