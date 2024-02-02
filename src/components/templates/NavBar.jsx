import { NavLink } from "react-router-dom";
const NavBar = () => {
    return ( 
        <header className=" flex gap-6 items-center justify-center">
            <NavLink to="/">Test</NavLink>
            <NavLink to="login">login</NavLink>
            <NavLink to="register">register</NavLink>
            <NavLink to="programs">programs</NavLink>
            <NavLink to="test">test</NavLink>
        </header>
     );
}
 
export default NavBar;