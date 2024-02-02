import { Outlet } from "react-router-dom";
import NavBar from '../templates/NavBar.jsx'
import Footer from "../templates/Footer.jsx";
const HomeLayout = () => {
    return ( 
        <main>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </main>
     );
}
 
export default HomeLayout;