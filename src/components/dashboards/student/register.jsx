import  { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../src/assets/logo.svg'
import UISettings from '../../../theme/UISettings'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Checkbox, MenuItem, Select, TextField, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import StepOne from '../../../assets/step1.svg'
import StepTwo from '../../../assets/step2.svg'
import StepThree from '../../../assets/step3.svg'
import StepFour from '../../../assets/step4.svg'
import AlgerianWilayas from './algerianWialays'
import countriesArabic from './countries'
import validator from 'validator'
import phone from 'phone'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { LoadingButton } from '@mui/lab'



export default function StudentRegister() {
    const [step,setStep] = useState(1)
    const [checked,setChecked] = useState(false)
    const [NextDisabled, setNextDisabled] = useState(true);

    // student data
    const [country, setCountry] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [familyNameError, setFamilyNameError] = useState('');
    const [wilayaError, setWilayaError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');

    const navigate = useNavigate()
    // Register 
    const [loadingRegister, setLoadingRegister] = useState(false);
    async function Register() {
        try {
            setLoadingRegister(true)
            const response = await axiosInstance.post('/studentApi/register', {firstName, familyName, phoneNumber, birthDate, country, wilaya, email, password, confirmPassword});
            setLoadingRegister(false)
            if(response.data.response === 'done'){
                setStep(prevStep => prevStep + 1 )
            }
            else{
                // handle error
            }
        } catch (error) {
            setLoadingRegister(false)
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
                    console.log(error)
                    console.log('*******')
                    if(error.field === 'firstName'){
                        setFirstNameError(error.message)
                        setStep(2)
                    } else if(error.field === 'familyName'){
                        setStep(2)
                        setFamilyNameError(error.message)
                    } else if(error.field === 'phoneNumber'){
                        setStep(2)
                        setPhoneError(error.message)
                    } else if(error.field === 'birthDate'){
                        setBirthDateError(error.message)
                        setStep(2)
                    } else if(error.field === 'country'){
                        setStep(2)
                        setCountryError(error.message)
                    } else if(error.field === 'wilaya'){
                        setWilayaError(error.message)
                        setStep(2)
                    } else if(error.field === 'email'){
                        setEmailError(error.message)
                    } else if(error.field === 'password'){
                        setPasswordError(error.message)
                    } else if(error.field === 'confirmPassword'){
                        setConfirmPasswordError(error.message)
                    } 
                }
            }else{
                errorHandler(error, toast, navigate)
            }
        }
    }


    const nextStep = async ()=>{
        if(step === 2){
            if( country === 'الجزائر' && phone('+213' + phoneNumber).isValid){
                setStep(prevStep => prevStep + 1 )
            }else if (phoneNumber.length > 9){
                setStep(prevStep => prevStep + 1 )
            }else{
                setPhoneError('أدخل رقم هاتف صالح')
            }
        }else if (step === 3){
            if(validator.isEmail(email)){
                if(password.length > 7){
                    if(confirmPassword === password){
                        await Register()
                    }else{
                        setConfirmPasswordError('كلمة المرور وتأكيد كلمة المرور ليستا متماثلتين')
                    }
                }else{
                   setPasswordError('يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل') 
                }
            }else{
                setEmailError('أدخل بريداً إلكترونياً صالحاً')
            }
        }else{
            setStep(prevStep => prevStep + 1 )
        }
    }

    const prevStep = ()=>{
        setStep(prevStep => prevStep - 1 )
    }

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


    useEffect(() => {
        console.log('come here ', checked)
        if(step === 1){
            setNextDisabled(!checked)
        }
    }, [checked]);

    useEffect(() => {
        if(step === 2){
            if(country !== '' && wilaya !== '' &&  firstName !== '' && familyName !== '' &&  birthDate !== '' &&  phoneNumber !== '' ){
                setNextDisabled(false)
            }else{
                setNextDisabled(true)
            }
        }
    }, [country, wilaya, firstName, familyName, birthDate, phoneNumber]);

    useEffect(() => {
        if(step === 3){
            if(email !== '' && password !== '' &&  confirmPassword !== ''){
                setNextDisabled(false)
            }else{
                setNextDisabled(true)
            }
        }
    }, [email, password, confirmPassword]);

  return (
    <Home>
        <ToastContainer rtl="true"/>
        <Container width={windowSize.width}>
            <ContainerImage width={windowSize.width}>
                <img src={logo} alt="academy_logo" width={250} height={250} className="w-full h-1/4" />
            </ContainerImage>
            <ContainerData width={windowSize.width}>
                <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                    <EastIcon/>
                </NavLink>
                
                <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', fontSize: '26px', marginTop: '25px'}}>السلام عليكم، مرحبًا بك في أكاديمية الترقي</Typography>
                <p className="text-lg self-end" style={{'direction':'rtl', marginTop:'7px', fontSize: '17px'}}> اتبع المراحل لإنشاء حسابك الآن واستعد لتجربة تعليمية مميزة!</p>
                <img loading="eager" className="self-center px-2" src={step === 1 ? StepOne : step === 2 ? StepTwo : step === 3 ? StepThree : step === 4 ? StepFour : null} alt="stepper" width={500} height={250} style={{marginTop: '10px', marginBottom: '20px'}} />

                {/* step 1 ***** */}
                <section style={{'direction':'rtl',display: step == 1 ? 'grid' : 'none',gap:'2rem',}}>
                    <h1 className="font-bold">شروط المتابعة</h1>

                    <ul className="flex flex-col gap-4" style={{'listStyleType':'initial','paddingRight':'2rem'}}>
                        <li>الالتزام و الانضباط بأخلاقيات طالب العلم</li>
                        <li>إحترام الآخرين من المشرفين و الأساتذة و الطلبة</li>
                        <li>الإنضباط بالجدول الزمني للحصص و مواعيد الحلقات و الامتحانات</li>
                    </ul>

                    <label htmlFor="conditions" className="flex items-center gap-1">
                        <Checkbox size="medium" checked={checked} value={checked} onChange={(e)=> setChecked(e.target.checked)} sx={{color: '#9A9A9A','&.Mui-checked': { color:'#3BB349'}}} id='conditions' required/>
                        <p>أوافق على كامل الشروط</p>
                    </label>
                    
                </section>

                {/* step 2 ****** */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{direction: 'rtl', display: step == 2 ? 'grid' : 'none', }}>

                <label htmlFor="firstName" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">الإسم *</p>  
                    <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label=""
                    type="text"
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value); setFirstNameError('')}}
                    error={firstNameError.length > 0 ? true : false}
                    helperText={firstNameError}
                    placeholder="الإسم *"
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                <label htmlFor="familyName" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">اللقب *</p>  
                    <TextField
                    fullWidth
                    id="familyName"
                    name="familyName"
                    label=""
                    type="text"
                    value={familyName}
                    onChange={(e) => {setFamilyName(e.target.value); setFamilyNameError('')}}
                    error={familyNameError.length > 0 ? true : false}
                    helperText={familyNameError}
                    placeholder="اللقب *"
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                <label htmlFor="phone" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">رقم الهاتف</p>  
                    <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label=""
                    type="number"
                    error={phoneError.length > 0 ? true : false}
                    helperText={phoneError}
                    value={phoneNumber}
                    onChange={(e) => {setPhoneNumber(e.target.value); setPhoneError('')}}
                    placeholder="رقم الهاتف * "
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                <label htmlFor="birthDate" className="self-start flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">تاريخ الميلاد  (السنة / اليوم / الشهر)</p>
                    <TextField
                    fullWidth
                    id="birthDate"
                    name="birthDate"
                    label=""
                    type="date"
                    value={birthDate}
                    onChange={(e) => {setBirthDate(e.target.value); setBirthDateError('')}}
                    error={birthDateError.length > 0 ? true : false}
                    helperText={birthDateError}
                    placeholder="تاريخ الميلاد *"
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    />
                </label>


                <label htmlFor="country" className="self-start flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                <p className="self-start">البلد</p>

                <Select
                    fullWidth
                    id="country"
                    name="country"
                    label=""
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    onChange={(e,)=> {setCountry(e.target.value); setCountryError('')}}
                    error={countryError.length > 0 ? true : false}
                    helperText={countryError}
                    value={country}
                    >
                {countriesArabic.map((country,index) => (
                    <MenuItem key={index} value={country}>{country}</MenuItem>
                    ))}
                </Select>
                </label>

                <label htmlFor="wilaya" className="self-end flex flex-col gap-2 font-bold" style={{marginTop: '-10px', display: country === 'الجزائر' ? 'none' : 'flex'}}>
                    <p className="self-start">الولاية</p>
                    <TextField
                    fullWidth
                    id="wilaya"
                    name="wilaya"
                    label=""
                    type="text"
                    value={wilaya}
                    onChange={(e) => {setWilaya(e.target.value); setWilayaError('')}}
                    error={wilayaError.length > 0 ? true : false}
                    helperText={wilayaError}
                    placeholder="الولاية"
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    />
                </label>

                <label htmlFor="wilaya" className="self-end flex flex-col gap-2 font-bold" style={{marginTop: '-10px', display: country === 'الجزائر' ? 'flex' : 'none'}}>
                    <p className="self-start">الولاية</p>

                <Select
                    fullWidth
                    id="wilaya"
                    name="wilaya"
                    label=""
                    value={wilaya}
                    onChange={(e) => {setWilaya(e.target.value); setWilayaError('')}}
                    error={wilayaError.length > 0 ? true : false}
                    helperText={wilayaError}
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                >
                {AlgerianWilayas.map((country,index) => (
                    <MenuItem key={index} value={country}>{country}</MenuItem>
                ))}
                </Select>

                </label>


                </section>

                {/* step 3 ****** */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{direction: 'rtl', display: step == 3 ? 'grid' : 'none', }}>

                <label htmlFor="email" className="flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">البريد الإلكتروني *</p>  
                    <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label=""
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
                    error={emailError.length > 0 ? true : false}
                    helperText={emailError}
                    placeholder="البريد الإلكتروني *"
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{direction: 'rtl', display: step == 3 ? 'grid' : 'none', marginTop: '30px' }}>


                <label htmlFor="password" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">كلمة المرور *</p>  
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
                    placeholder="كلمة المرور *"
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                <label htmlFor="confirmPassword" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                    <p className="self-start">تأكيد كلمة المرور *</p>  
                    <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label=""
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value); setConfirmPasswordError('')}}
                    error={confirmPasswordError.length > 0 ? true : false}
                    helperText={confirmPasswordError}
                    placeholder="تأكيد كلمة المرور *"
                    sx={{'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                    />
                </label>

                </section>

                {/* step 4 ****** */}
                <section style={{'direction':'rtl', display: step == 4 ? 'flex' : 'none',flexDirection:'column',gap:'2rem'}}>
                    <h1 className="font-bold">تأكيد البريد الإلكتروني</h1>
                    <h2 style={{color: UISettings.colors.secondary, marginTop: '-10px'}} className="font-bold">لقد أرسلنا لك رسالة تأكيد بالبريد الإلكتروني على {email}،   تحقق من بريدك الإلكتروني لتتمكن من الوصول إلى حسابك.</h2>
                </section>

                <section className="self-center flex justify-between items-center w-full gap-3" style={{marginTop: '25px', display: step === 4 ? 'none' : 'flex'}}>
                    <LoadingButton loading={loadingRegister} loadingPosition='center' sx={{'paddingX':'2rem'}} disabled={NextDisabled} onClick={()=> nextStep()} variant="primary" type="submit">{step === 3 ? 'إنشاء الحساب' : 'التالي'}</LoadingButton>
                    { step !== 1 && <Button sx={{'paddingX':'2rem'}} disabled={step === 1} onClick={()=> prevStep()} variant="secondary">السابق</Button>}            
                </section>

            </ContainerData>
        </Container>
    </Home>
  )
}

const Home = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #fff4e4;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
`
const Container = styled.div`
    width: ${props => props.width > UISettings.devices.phone ? '80%' : '100%'};
    height: 100%;
    min-height: calc(100vh - 30px);
    background-color: #ffffff;
    display: flex;
    flex-direction: ${props => props.width > UISettings.devices.phone ? 'row' : 'column'};
    justify-content: start;
    border-radius: 20px;
`
const ContainerImage = styled.div`
    width: 350px;
    /* height: 100%; */
    display: ${props => props.width > UISettings.devices.phone ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fffcf4;
    border-radius: 20px 0px 0px 20px;
`

const ContainerData = styled.div`
    width:${props => props.width > UISettings.devices.phone ? 'calc(100% - 380px)' : '100%'} ;
    padding: ${props => props.width > UISettings.devices.phone ? '15px 0px 15px 20px !important' : '15px !important'}  ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
`
