import { Box, Typography } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';

const Register = () => {
    return ( 
        <main className=" bg-lace w-full flex items-center justify-center py-32 px-12">
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','border':'1px solid #000','borderRadius':'30px','height':'auto','width':'80%'}}>
                <section className=" hidden md:flex lg:flex w-auto items-center justify-center px-12 h-full rounded-ss-xl rounded-es-xl bg-white">
                    <img src={logo} alt="academy_logo" width={250} height={250} />
                </section>
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white">
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl'}}>السلام عليكم، مرحبًا بك في أكاديمية الترقي</Typography>
                   <p className="text-lg self-end" style={{'direction':'rtl'}}> اتبع المراحل لإنشاء حسابك الآن واستعد لتجربة تعليمية مميزة!</p>
                </section>
            </Box>
        </main>
     );
}
 
export default Register;