import { Box, Button, Checkbox, Typography,TextField, Select, MenuItem } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer,toast } from "react-toastify";
import StepOne from '../../../assets/step1.svg'
import StepTwo from '../../../assets/step2.svg'
import StepThree from '../../../assets/step3.svg'
import StepFour from '../../../assets/step4.svg'

const Register = () => {
    const [step,setStep] = useState(1)
    const [checked,setChecked] = useState(false)
    const [countries,setCountries] = useState([])
    const [states,setStates] = useState([])

    const nextStep = ()=>{
        if(step === 4){
            return;
        }
        setStep(prevStep => prevStep + 1 )
    }

    const prevStep = ()=>{
        if(step === 1){
            return;
        }
        setStep(prevStep => prevStep - 1 )
    }

    const handleChecked = () =>{
        setChecked(!checked);
    }

    const fetchCountryNames = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        setCountries(countries.map(country => country.name.common));
    }

    const fetchStates = async (country) =>{
        const response = await fetch(`https://restcountries.com/v3.1/${country}?fields=name,states`);
        const states = await response.json();
        setStates(states);
    }

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().min(5,'الإسم يجب أن يكون أطول من 5 أحرف').required('الإسم الثلاثي مطلوب'),
        email: Yup.string().email('هذا البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง~\\|[\]\/?]).{8,}$/,
            'كلمة المرور يجب أن تتكون من حرف كبير, حرف صغير و رقم و يكون على الأقل 8 حروف'
          ).required('كلمة السر مطلوبة'),
        phone_number: Yup.string().matches(/^\d{9}$/, 'الرقم يجب أن يكون 10 أرقام').required('الرقم مطلوب'),
        whatsapp_number: Yup.string().matches(/^\d{10}$/, 'الرقم يجب أن يكون 10 أرقام').required('الرقم مطلوب'),
        age: Yup.number().min(10,'العمر يجب أن يكون أكبر من 10 سنوات').required('العمر مطلوب'),
        gender: Yup.string().required('الجنس مطلوب'),
        country: Yup.string().required('البلد مطلوب'),
        state: Yup.string().required('الولاية مطلوبة'),
        role: Yup.string().required('الدور مطلوب'),
        education_level: Yup.string().required('المستوى الدراسي مطلوب'),
        school_name: Yup.string().required('إسم المدرسة مطلوب'),
        speciality: Yup.string().required('التخصص مطلوب'),
        saved_ahzab: Yup.number().min(0).max(60,'عدد الأحزاب لا يجب أن يتجاوز 60 حزبا').required('عدد الأحزاب مطلوب')

    });
      
    const formik = useFormik({
      initialValues: {
        full_name: '',
        email: '',
        password:'',
        phone_number:'',
        whatsapp_number:'',
        age:'',
        gender:'',
        country:'',
        state:'',
        role:'',
        education_level:'',
        school_name:'',
        speciality:'',
        saved_ahzab:''
    },
      validationSchema,
      onSubmit: values => {
        toast('تم إنشاء الحساب بنجاح',{
          position:'top-right',
          type:'success',
          progress:undefined,
          autoClose:2000,
          theme:'colored'
        })
        console.log(values);
      },
    });

    useEffect(()=>{
        fetchCountryNames()
    },[])
    return ( 
        <main className=" bg-lace w-full flex items-stretch justify-center py-32 px-0 md:px-12 lg:px-12">
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','borderRadius':'30px','height':'auto','width':'80%'}}>
                <section className=" hidden md:hidden lg:flex w-auto items-center justify-center px-12 h-full rounded-ss-xl rounded-es-xl bg-lightSmoke">
                <img src={logo} alt="academy_logo" width={250} height={250} className="w-full h-1/4" />
                </section>
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white">
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl'}}>السلام عليكم، مرحبًا بك في أكاديمية الترقي</Typography>
                   <p className="text-lg self-end" style={{'direction':'rtl'}}> اتبع المراحل لإنشاء حسابك الآن واستعد لتجربة تعليمية مميزة!</p>
                   <img loading="eager" className="self-center px-2" src={step === 1 ? StepOne : step === 2 ? StepTwo : step === 3 ? StepThree : step === 4 ? StepFour : null} alt="stepper" width={500} height={250} />

                   {/* Conditions */}
                   {step === 1 && 
                   <section style={{'direction':'rtl',display:'flex',flexDirection:'column',gap:'2rem'}}>
                    <h1 className="font-bold">شروط المتابعة</h1>

                    <ul className="flex flex-col gap-4" style={{'listStyleType':'initial','paddingRight':'2rem'}}>
                        <li>الالتزام و الانضباط بأخلاقيات طالب العلم</li>
                        <li>إحترام الآخرين من المشرفين و الأساتذة و الطلبة</li>
                        <li>الإنضباط بالجدول الزمني للحصص و مواعيد الحلقات و الامتحانات</li>
                    </ul>

                    <label htmlFor="conditions" className="flex items-center gap-1">
                        <Checkbox onClick={handleChecked} size="medium" checked={checked === true ? true : false} value={checked} sx={{color: '#9A9A9A','&.Mui-checked': { color:'#3BB349'}}} id='conditions' required/>
                        <p>أوافق على كامل الشروط</p>
                    </label>
                    
                    </section>}

                    {/* Form */}
                   { step !== 1 && <form onSubmit={formik.handleSubmit} className="flex flex-col  justify-center gap-3">
                        {step === 2 && 
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <label htmlFor="email" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">البريد الإلكتروني</p>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label=""
                          type="text"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          placeholder="  البريد الإلكتروني "
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                        />
                            </label>

                            <label htmlFor="full_name" className=" flex flex-col gap-2 font-bold">
                                <p className="self-end">الإسم الكامل (الثلاثي)</p>  
                        <TextField
                          fullWidth
                          id="full_name"
                          name="full_name"
                          label=""
                          type="text"
                          value={formik.values.full_name}
                          onChange={formik.handleChange}
                          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                          helperText={formik.touched.full_name && formik.errors.full_name}
                          placeholder="الإسم الثلاثي"
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                            </label>

                            <label htmlFor="phone_number" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">رقم الهاتف</p> 
                        <TextField
                          fullWidth
                          id="phone_number"
                          name="phone_number"
                          label=""
                          type="number"
                          value={formik.values.phone_number}
                          onChange={formik.handleChange}
                          error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                          helperText={formik.touched.phone_number && formik.errors.phone_number}
                          placeholder="رقم الهاتف الشخصي  "
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                            </label>

                            <label htmlFor="password" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">كلمة المرور</p>
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
                          placeholder=" كلمة المرور  "
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                        />
                            </label>

                            <label htmlFor="whatsapp_number" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">رقم الواتساب</p> 
                        <TextField
                          fullWidth
                          id="whatsapp_number"
                          name="whatsapp_number"
                          label=""
                          type="text"
                          value={formik.values.whatsapp_number}
                          onChange={formik.handleChange}
                          error={formik.touched.whatsapp_number && Boolean(formik.errors.whatsapp_number)}
                          helperText={formik.touched.whatsapp_number && formik.errors.whatsapp_number}
                          placeholder="رقم هاتف الواتساب  "
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                            </label>

                            <label htmlFor="age" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">السن</p> 
                        <TextField
                          fullWidth
                          id="age"
                          name="age"
                          label=""
                          type="text"
                          value={formik.values.age}
                          onChange={formik.handleChange}
                          error={formik.touched.age && Boolean(formik.errors.age)}
                          helperText={formik.touched.age && formik.errors.age}
                          placeholder="السن  "
                          sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                        />
                            </label>

                            <label htmlFor="country" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">البلد</p>
                            
                            <Select
                                fullWidth
                                id="country"
                                name="country"
                                label=""
                                value={formik.values.country}
                                onChange={()=>{formik.handleChange}}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                            >
                               {countries.map((country,index) => (
                                <MenuItem key={index} value={country}>{country}</MenuItem>
                               ))}
                            </Select>

                            </label>

                            <label htmlFor="state" className="self-end flex flex-col gap-2 font-bold">
                                <p className="self-end">الولاية</p>
                            
                            <Select
                                fullWidth
                                id="state"
                                name="state"
                                label=""
                                value={formik.values.state}
                                onChange={formik.handleChange && fetchStates}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                            >
                               {states.map((state,index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                               ))}
                            </Select>

                            </label>

                            <label htmlFor="gender" className="self-end col-start-[span_2] flex flex-col gap-2 font-bold">
                                <p className="self-end">الجنس</p>
                            
                            <Select
                                fullWidth
                                id="gender"
                                name="gender"
                                label=""
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                            >
                                <MenuItem value={'MALE'}>ذكر</MenuItem>
                                <MenuItem value={'FEMALE'}>أنثى</MenuItem>
                            </Select>

                            </label>

                        </section>
                        }
                        <Button variant="primary" type="submit">تأكيد</Button>
                    </form>}
                    {/* {step === 2 && 
                        <section>

                        </section>}
                    {step === 3 && <section>step 3</section>}
                    {step === 4 && <section>step 4</section>} */}

                    <section className="self-center flex justify-between items-center w-full gap-3">
                        <Button sx={{'paddingX':'2rem'}} disabled={checked === false} onClick={()=> formik.errors} variant="primary" type="submit">{step === 4 ? 'إنشاء الحساب' : 'التالي'}</Button>
                        { step !== 1 && <Button sx={{'paddingX':'2rem'}} disabled={step === 1} onClick={()=> prevStep()} variant="secondary">السابق</Button>}            
                    </section>

                </section>
            </Box>
            <ToastContainer rtl="true"/>
        </main>
     );
}
 
export default Register;