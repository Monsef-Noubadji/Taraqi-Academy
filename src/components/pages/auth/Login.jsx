import { Box, Button, Typography } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('هذا البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
        password: Yup.string().required('كلمة السر مطلوبة'),
      });
      
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: values => {
        toast('تم تسجيل الدخول بنجاح',{
          position:'top-right',
          type:'success',
          progress:undefined,
          autoClose:3000,
          theme:'colored'
        })
      },
    });

    return ( 
        <main className=" bg-lace w-full flex items-stretch justify-center py-32 px-0 md:px-12 lg:px-24 ">
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','borderRadius':'30px','height':'auto','width':'80%'}}>
                <section className=" hidden md:hidden lg:flex w-auto items-center justify-center px-24 h-full rounded-ss-xl rounded-es-xl bg-lightSmoke">
                    <img src={logo} alt="academy_logo" width={250} height={250} className="w-full h-2/4" />
                </section>
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white">
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl'}}>السلام عليكم، تسعدنا رؤيتك مجددًا</Typography>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center gap-3">
                        <label htmlFor="email" className="self-end font-bold">البريد الإلكتروني</label>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label=""
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
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
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                          placeholder=" أدخل كلمة السر "
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                        />
                        <NavLink to={"resetPassword"} className="text-primaryGreen self-start mb-12">نسيت كلمة المرور ؟</NavLink>
                        <Button disabled={!formik.values.email || !formik.values.password} variant="primary" type="submit" sx={{'paddingX':'2.5rem'}}>تسجيل الدخول</Button>
                    </form>
                    <p className="self-center">
                      لا تملك حسابا ؟
                      <NavLink to={"/register"} className="text-primaryGreen self-start"> أنشئ حسابا</NavLink>
                    </p>
                </section>
            </Box>
            <ToastContainer 
              rtl="true"
            />
        </main>
     );
}
 
export default Login;