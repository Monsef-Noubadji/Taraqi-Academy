import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import Alert from './alert'
import ProgramCard from './programCard'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { useEffect, useRef, useState } from 'react'
import AdvancedAlert from './advancedAlert'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { green } from '@mui/material/colors'
import { WhatsApp } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

export default function Payement({windowSize}) {
    const [loading, setLoading] = useState(false);
    const [step, setstep] = useState(1);
    const navigate = useNavigate()
    const [program, setProgram] = useState({});
    const [studentProgram, setStudentProgram] = useState({experationDate: '2020-01-01 00:00:01'});
    const [loadingFirstStep, setLoadingFirstStep] = useState(true);

    async function getPaymentDetails() {
        try {
            const response = await axiosInstance.post('/studentApi/getPaymentDetails', { withCredentials: true });
            console.log(response.data)
            if(response.data.response === 'done'){
                setProgram(response.data.program)
                setLoadingFirstStep(false)
                var newDate = new Date(response.data.studentProgram.experationDate);
                newDate.setMonth(newDate.getMonth() + subscriptionType);
                var year = newDate.getFullYear();
                var month = ('0' + (newDate.getMonth() + 1)).slice(-2);
                var day = ('0' + newDate.getDate()).slice(-2);
                var hours = ('0' + newDate.getHours()).slice(-2);
                var minutes = ('0' + newDate.getMinutes()).slice(-2);
                setExpirationDate(`${year}-${month}-${day} ${hours}:${minutes}`)
                setStudentProgram(response.data.studentProgram)
                setPrice(response.data.program.price * subscriptionType)
            }else if(response.data.response === 'noProgram'){
              navigate('/student/programs')
            }
        } catch (error) {
            errorHandler(error, toast, navigate)
        }
    }

    const [lodingConfirmation, setLodingConfirmation] = useState(false);
    async function addSubscription() {
        try {
            setLodingConfirmation(true)
            const response = await axiosInstance.post('/studentApi/addSubscription', { subscriptionType });
            setLodingConfirmation(false)
            if(response.data.response === 'done'){
                toast.success(response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 3000,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate('/student/subscribe')
                }, 3000);
            }
        } catch (error) {
            setLodingConfirmation(false)
            errorHandler(error, toast, navigate)
        }
    }
    
      const isMounted = useRef(true);
    
      useEffect(() => {
        return () => {
        // Cleanup function to set isMounted to false when component unmounts
        isMounted.current = false;
        };
      }, []);
    
      useEffect(() => {
          if (isMounted.current) {
            getPaymentDetails()
          }
      }, []);

      const [subscriptionType, setSubscriptionType] = useState(1);
      const [price, setPrice] = useState(0);
      const [expirationDate, setExpirationDate] = useState("");


      useEffect(() => {
        var newDate = new Date(studentProgram.experationDate);
        newDate.setMonth(newDate.getMonth() + subscriptionType);
        var year = newDate.getFullYear();
        var month = ('0' + (newDate.getMonth() + 1)).slice(-2);
        var day = ('0' + newDate.getDate()).slice(-2);
        var hours = ('0' + newDate.getHours()).slice(-2);
        var minutes = ('0' + newDate.getMinutes()).slice(-2);
        setExpirationDate(`${year}-${month}-${day} ${hours}:${minutes}`)
        console.log(newDate, 'changes')
        setPrice(program.price * subscriptionType)
      }, [subscriptionType]);

    if(loading){
     return(
        <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ToastContainer rtl="true"/>
            <CircularProgress style={{color: UISettings.colors.green}}/>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
          </div>
        )
      }else{
          return (
            <Body>
                <ToastContainer rtl="true"/>
                <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span > دفع الاشتراك </span></Typography>
                
                {/* step 1 ****** */}
                <Container style={{display: step === 1 && loadingFirstStep === true ? 'flex' : 'none'}}>
                <div style={{height: "250px", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress style={{color: UISettings.colors.green, }}/>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات..</Typography>
                </div>
                </Container>

                <Container style={{display: step === 1  && loadingFirstStep === false ?  'flex' : 'none'}}>
                    <AdvancedAlert text={'لقد اخترت  '+ program.name +'، تابع هنا لدفع الاشتراك'} title={"دفع اشتراك "+ program.name} type={'info'} />
                    <Typography variant={'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',margin: '25px 0px 25px 0px'}}><span >اختر طريقة الدفع الخاصة بك</span></Typography>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{direction: 'rtl', display:'grid', }}>
                        <label htmlFor="firstName" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="postalAccount"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="postalAccount" control={<Radio style={{color: UISettings.colors.green}} />} label="الدفع باستخدام الحساب البريدي" />
                                    <FormControlLabel value="CIB" disabled control={<Radio  />} label="الدفع باستخدام بطاقة CIB (قريبًا )" />
                                </RadioGroup>
                            </FormControl>
                        </label>
                        <label htmlFor="firstName" className=" flex flex-col gap-2 font-bold" style={{marginTop: '-10px'}}>
                            <p className="self-start">نوع الاشتراك</p>  
                            <Select
                                fullWidth
                                id="country"
                                name="country"
                                label=""
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                                onChange={(e,)=> {setSubscriptionType(e.target.value)}}
                                value={subscriptionType}
                                >
                                <MenuItem style={{direction: 'rtl'}}  value={1}>اشتراك شهر واحد </MenuItem>
                                <MenuItem  style={{direction: 'rtl'}} value={3}>اشتراك 3 أشهر</MenuItem>
                                <MenuItem  style={{direction: 'rtl'}} value={6}>اشتراك 6 أشهر</MenuItem>
                                <MenuItem  style={{direction: 'rtl'}} value={12}>اشتراك 1 سنة</MenuItem>
                            </Select>
                        </label>
                    </section>
                    <div>
                        <Button variant='primary' onClick={()=> setstep(2)} style={{width: 'max-content', margin: '20px 10px 20px 0px'}}>التالي</Button>
                        <Button variant='secondary' onClick={()=> navigate("/student/subscribe")} style={{width: 'max-content', margin: '20px 0px'}}>رجوع</Button>
                    </div>
                </Container>
                {/* step 2 ****** */}
                <Container style={{display: step === 2 ? 'flex' : 'none'}}>
                    <AdvancedAlert  text={`قم بدفع المبلغ المستحق باستخدام حسابك البريدي ثم ارسل صورة لوصل الاستلام إلى الأكاديمية عبر رقم الواتساب هذا، سيقوم أحد مسؤولي المنصة بالتحقق من صلاحية وصل الاستلام ثم تأكيد اشتراكك على المنصة. `} title={"طريقة الاشتراك"} text2={'ملاحظة: من المهم تأكيد الاشتراك على المنصة قبل إرسال  صورة وصل الاستلام على الواتساب'} type={'warning'} />
                    <div style={{display: 'flex', flexDirection: windowSize.width > UISettings.devices.phone ? 'row-reverse' : 'column', justifyContent: 'start', marginTop: '20px'}} >
                        <div style={{minWidth: '50%'}}>
                            <Typography variant={'h5'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 15px 0px', display: 'flex'}}><span>معلومات الاشتراك</span></Typography>
                            {/* <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >الاسم الكامل </p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>دليحر محمد</span> </Typography> */}
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >البرنامج المختار </p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>{program.name} </span> </Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >الاشتراك </p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>اشتراك  {subscriptionType} شهر</span> </Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >من تاريخ</p> <span style={{marginRight: '20px', color: UISettings.colors.secondary, direction: 'ltr'}}>{studentProgram.experationDate.split('T')[0]? studentProgram.experationDate.split('T')[0] : ''} {studentProgram.experationDate.split('T')[1] ? studentProgram.experationDate.split('T')[1].slice(0, 5) : ''}</span> </Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >إلى تاريخ</p> <span style={{marginRight: '20px', color: UISettings.colors.secondary, direction: 'ltr'}}>{expirationDate}</span> </Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 25px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >المبلغ المُستحق </p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>{price}.00 دج</span> </Typography>
                        </div>
                        <div style={{minWidth: '50%'}}>
                            <Typography variant={'h5'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 15px 0px', display: 'flex'}}><span>معلومات الدفع</span></Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 4px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >رقم الحساب البريدي</p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>46887684974654</span> </Typography>
                            <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', fontSize: '18px', color: UISettings.colors.black, textAlign: 'start',margin: '4px 0px 25px 0px', display: 'flex'}}><p style={{minWidth: '150px'}} >رقم المفتاح</p> <span style={{marginRight: '20px', color: UISettings.colors.secondary}}>12</span> </Typography>
                        </div>
                    </div>
                   
                    <div>
                        <LoadingButton onClick={addSubscription} loading={lodingConfirmation} loadingPosition='center' variant='primary' style={{width: 'max-content', margin: '20px 10px 20px 0px'}}>تأكيد الاشتراك</LoadingButton>
                        <Button variant='secondary' onClick={()=> setstep(1)} style={{width: 'max-content', margin: '20px 0px'}}>رجوع</Button>
                    </div>
                </Container>
            </Body>
          )
      }
}

const Body = styled.div`
  background-image: url('./../../../../src/assets/lightStar.svg');
  background-position: -80px 0px;
  background-size: 300px;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 20px;
`
const Container = styled.div`
  background-color: white;
  min-height: 250px;
  width: calc(100%);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
`