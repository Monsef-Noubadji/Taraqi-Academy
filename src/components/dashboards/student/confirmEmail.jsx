import  { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../src/assets/logo.svg'
import UISettings from '../../../theme/UISettings'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button, Checkbox, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import StepOne from '../../../assets/step1.svg'
import StepTwo from '../../../assets/step2.svg'
import StepThree from '../../../assets/step3.svg'
import StepFour from '../../../assets/step4.svg'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutlineOutlined, ErrorOutline } from '@mui/icons-material'



export default function ConfirmStudentEmail() {

    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const code = queryParams.get("code")


    const [step,setStep] = useState(3)

    const navigate = useNavigate()
    // Register 
    async function ConfirmEmail(code, id) {
        try {
            const response = await axiosInstance.post('/studentApi/confirmEmail', {code, id});
            if(response.data.response === 'done'){
                setStep(5)
                toast.success('تم إنشاء حسابك بنجاح', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 2000,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate('/student')
                }, 3000);
            }else{
                setStep(4)
            }
        } catch (error) {
            errorHandler(error, toast, navigate)
        }
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

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
        // Cleanup function to set isMounted to false when component unmounts
        isMounted.current = false;
        };
    }, []);

    
   
    useEffect(() => {
        if (isMounted.current) {
            ConfirmEmail(code, id)
        }
    }, []);



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
                <img loading="eager" className="self-center px-2" src={StepFour} alt="stepper" width={500} height={250} style={{marginTop: '10px', marginBottom: '20px'}} />


                {/* step 4 ****** */}
                <section style={{'direction':'rtl', display: step == 5 ? 'flex' : 'none',flexDirection:'column',gap:'2rem',alignItems: "center", textAlign: "center", marginTop: '50px'}}>
                    <CheckCircleOutlineOutlined style={{fontSize: '50px', color: UISettings.colors.green, marginBottom: '-20px'}}></CheckCircleOutlineOutlined>
                    <h1 className="font-bold" >تم تأكيد عنوان بريدك الإلكتروني</h1>
                    <h2 style={{color: UISettings.colors.secondary, marginTop: '-10px'}} className="font-bold">تم تأكيد عنوان بريدك الإلكتروني! يمكنك الآن تسجيل الدخول للوصول إلى حسابك.</h2>
                </section> 

                <section style={{'direction':'rtl', display: step == 4 ? 'flex' : 'none',flexDirection:'column',gap:'2rem', alignItems: "center", textAlign: "center", marginTop: '50px'}}>
                    <ErrorOutline style={{fontSize: '50px', color: 'red', marginBottom: '-20px'}}></ErrorOutline>
                    <h1 className="font-bold" style={{color: 'red'}}>فشل تأكيد عنوان بريدك الإلكتروني</h1>
                    <h2 style={{color: UISettings.colors.secondary, marginTop: '-10px'}} className="font-bold">فشل تأكيد البريد الإلكتروني، قد يكون رابط التأكيد قد انتهت صلاحيته أو تم استخدامه بالفعل. يُرجى التحقق وإعادة المحاولة.</h2>
                </section> 

                <section style={{'direction':'rtl', display: step == 3 ? 'flex' : 'none',flexDirection:'column',gap:'2rem', marginTop: '50px'}}>
                    {/* <h1 className="font-bold">تأكيد البريد الإلكتروني</h1> */}
                    <CircularProgress style={{color: UISettings.colors.green, alignSelf: 'center'}}></CircularProgress>
                    <h2 style={{color: UISettings.colors.secondary, marginTop: '-10px', textAlign: 'center'}} className="font-bold">جارٍ تأكيد عنوان البريد الإلكتروني</h2>
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
