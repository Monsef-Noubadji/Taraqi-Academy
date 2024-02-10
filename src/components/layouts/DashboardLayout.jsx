import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return ( 
        <main>
            <h1>Dashboard</h1>
            <Outlet/>
        </main>
     );
}
 
export default DashboardLayout;