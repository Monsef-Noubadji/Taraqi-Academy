import { Outlet, useLocation } from "react-router-dom";
import NavBar from '../templates/NavBar.jsx'
import Footer from "../templates/Footer.jsx";

const HomeLayout = () => {
    const location = useLocation()
    const route = location.pathname.split("/")[1]
    return ( 
        <main>
            {route === 'login' || route === 'register' || route === 'dashboard' || route === 'student' ? null : <NavBar/>}
            <Outlet/>
            {route === 'login' || route === 'register' || route === 'dashboard' || route === 'student' ? null : <Footer/>}
        </main>
     );
}
 
export default HomeLayout;