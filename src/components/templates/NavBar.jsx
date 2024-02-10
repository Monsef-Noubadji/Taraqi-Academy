import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.svg'
import { Box } from '@mui/material';
import '../../navStyle.css'
const NavBar = () => {

    return ( 
        <header className=" flex gap-12 w-full pt-6 items-center justify-center">

            <Box sx={{'display':'flex', 'alignItems':'center', 'gap':'1rem'}}>
             <NavLink to="register" className="btn-primary register">إنشاء حساب</NavLink>
             <NavLink to="login">تسجيل الدخول</NavLink>
            </Box>
            
            <a href="/#contactUs">تواصل معنا</a>
            <a href="/#howToRegister">كيفية التسجيل</a>
            <NavLink to="programs">برامج الأكاديمية</NavLink>
            <a href="/#aboutUs">تعرف علينا</a>
            <NavLink to="/" >الرئيسية</NavLink>

            <img src={Logo} alt="academy_logo" width={70} height={70} />
        </header>
     );
}
 
export default NavBar;