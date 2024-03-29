import { Box, Button, Typography } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink, useNavigate } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import TextField from '@mui/material/TextField';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import UISettings from "../../../theme/UISettings";
import validator from "validator";
import { LoadingButton } from "@mui/lab";
import errorHandler from "./errorHandler";
import axiosInstance from "./axiosInstance";


const StudentLogin = () => {
    const [type, setType] = useState('login');
    const [email, setEmail] = useState('dellihrmohammed44@gmail.com');
    const [password, setPassword] = useState('123456789');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [resetEmail, setResetEmail] = useState('');
    const [resetEmailError, setResetEmailError] = useState('');

    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
      
    useEffect(() => {
        function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    const [loadingLogin, setLoadingLogin] = useState(false);

    const navigate = useNavigate()

    async function Login() {
        try {
            setLoadingLogin(true)
            const response = await axiosInstance.post('/studentApi/login', {email, password});
            setLoadingLogin(false)
            if(response.data.response === 'done'){
                // redirect to login page
                toast.success('تم تسجيل الدخول بنجاح', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 1500,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate('/student')
                }, (1500));
            }else if(response.data.response === 'info'){
                toast.info(response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: false,
                    theme: 'colored'
                }); 
            }
        } catch (error) {
            setLoadingLogin(false)
            if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
                const errors = error.response.data.errors
                console.log(errors)
                console.log(errors.length)
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                for (let i = 0; i < errors.length; i++) {
                    const error = errors[i];
                    if(error.field === 'email'){
                        setEmailError(error.message)
                    } else if(error.field === 'password'){
                        setPasswordError(error.message)
                    }
                }
            }else{
                errorHandler(error, toast, navigate)
            }
        }
    }

    async function ResetPassword() {
        try {
            setLoadingLogin(true)
            const response = await axiosInstance.post('/studentApi/resetPassword', {email});
            setLoadingLogin(false)
            if(response.data.response === 'done'){
                // redirect to login page
                toast.success(response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 2000,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate('/student')
                }, (2000));
            }else if(response.data.response === 'info'){
                toast.info(response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: false,
                    theme: 'colored'
                }); 
            }
        } catch (error) {
            setLoadingLogin(false)
            if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
            }else{
                errorHandler(error, toast, navigate)
            }
        }
    }


    return ( 
        <main className=" bg-lace w-full flex items-stretch justify-center py-32 px-0 md:px-12 lg:px-24 " style={{height: '100vh', paddingTop: '10px' , paddingBottom: '10px',}}>
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','borderRadius':'30px','height':'auto','width': windowSize.width > UISettings.devices.phone ? '80%' : 'calc(100% - 30px )', overflow: 'hidden'}}>
                <section className=" hidden md:hidden lg:flex w-auto items-center justify-center px-24 h-full rounded-ss-xl rounded-es-xl bg-lightSmoke">
                    <img src={logo} alt="academy_logo" width={250} height={250} className="w-full h-2/4" />
                </section>

                {/* // login */}
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white" style={{padding: '15px 25px', display: type === 'login' ? 'flex' : 'none'}}>
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px'}}>السلام عليكم، تسعدنا رؤيتك مجددًا</Typography>

                    <form className="flex flex-col items-center justify-center gap-3" style={{flex: 1, alignSelf: 'center', width: '100%', maxWidth: '450px' }}>
                        <label htmlFor="email" className="self-end font-bold">البريد الإلكتروني</label>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label=""
                          type="email"
                          value={email}
                          onChange={(e)=>{ setEmail(e.target.value); setEmailError('')}}
                          error={emailError.length > 0 ? true : false}
                          helperText={emailError}
                          placeholder="أدخل بريدك الإلكتروني"
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                        <label htmlFor="password" className="self-end font-bold">كلمة السر</label>
                        <TextField
                          
                          fullWidth
                          id="password"
                          name="password"
                          label=""
                          type="password"
                          value={password}
                          onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
                          error={passwordError.length > 0 ? true : false}
                          helperText={passwordError}
                          placeholder=" أدخل كلمة السر "
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                        />
                        <NavLink  onClick={()=> setType('resetPassword')} className="text-primaryGreen self-start mb-12">نسيت كلمة المرور ؟</NavLink>
                        <LoadingButton loading={loadingLogin} loadingPosition="center" disabled={validator.isEmail(email) && password.length > 7 ? false : true} variant="primary" onClick={() => Login()} sx={{'paddingX':'2.5rem'}}>تسجيل الدخول</LoadingButton>
                        <p className="self-center">
                        لا تملك حسابا ؟
                        <NavLink to={"/student/register"} className="text-primaryGreen self-start"> أنشئ حسابا</NavLink>
                        </p>
                    </form>
                </section>

                {/* // Reset Password */}
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white" style={{padding: '15px 25px', display: type === 'resetPassword' ? 'flex' : 'none'}}>
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px'}}>السلام عليكم، تسعدنا رؤيتك مجددًا</Typography>

                    <form className="flex flex-col items-center justify-center gap-3" style={{flex: 1, alignSelf: 'center', width: '100%', maxWidth: '450px' }}>
                        <label htmlFor="email" className="self-end font-bold">البريد الإلكتروني</label>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label=""
                          type="email"
                          value={email}
                          onChange={(e)=>{ setEmail(e.target.value); setResetEmailError('')}}
                          error={resetEmailError.length > 0 ? true : false}
                          helperText={resetEmailError}
                          placeholder="أدخل بريدك الإلكتروني"
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                        <LoadingButton loading={loadingLogin} loadingPosition="center" disabled={validator.isEmail(email) ? false : true} variant="primary" onClick={() => ResetPassword()} sx={{'paddingX':'2.5rem', marginTop: '20px'}}>إعادة تعيين كلمة المرور</LoadingButton>
                        <p className="self-center">
                        العودة الى 
                        <NavLink onClick={()=> setType('login')} className="text-primaryGreen self-start"> تسجيل الدخول</NavLink>
                        </p>
                    </form>
                </section>
            </Box>
            <ToastContainer 
              rtl="true"
            />
        </main>
     );
}
 
export default StudentLogin;