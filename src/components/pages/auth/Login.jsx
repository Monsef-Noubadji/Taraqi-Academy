import { Box, Typography } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

const Login = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      });
      
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    return ( 
        <main className=" bg-lace w-full flex items-stretch justify-center py-32 px-12">
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','borderRadius':'30px','height':'auto','width':'70%'}}>
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
                        <NavLink to={"resetPassword"} className="text-primaryGreen self-start">نسيت كلمة المرور ؟</NavLink>
                        <button type="submit" className="btn-primary mt-8 px-12">
                          تسجيل الدخول
                        </button>
                    </form>

                </section>
            </Box>
        </main>
     );
}
 
export default Login;