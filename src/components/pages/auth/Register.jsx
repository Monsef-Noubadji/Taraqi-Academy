import { Box, Button, Typography } from "@mui/material";
import logo from '../../../assets/logo.svg'
import { NavLink } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import { useState } from "react";
import StepOne from '../../../assets/step1.svg'
import StepTwo from '../../../assets/step2.svg'
import StepThree from '../../../assets/step3.svg'
import StepFour from '../../../assets/step4.svg'

const Register = () => {
    const [step,setStep] = useState(1)
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
    return ( 
        <main className=" bg-lace w-full flex items-stretch justify-center py-32 px-0 md:px-12 lg:px-12">
            <Box sx={{'display':'flex','alignItems':'center','justifyContent':'center','borderRadius':'30px','height':'auto','width':'80%'}}>
                <section className=" hidden md:hidden lg:flex w-auto items-center justify-center px-12 h-full rounded-ss-xl rounded-es-xl bg-lightSmoke">
                <img src={logo} alt="academy_logo" width={250} height={250} className="w-full h-2/4" />
                </section>
                <section className="w-full h-full py-14 px-6 gap-8 flex flex-col rounded-ee-xl rounded-se-xl bg-white">
                   <NavLink to={"/"} className="btn-auth self-end gap-1">الرجوع إلى الرئيسية
                        <EastIcon/>
                   </NavLink>
                   
                   <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl'}}>السلام عليكم، مرحبًا بك في أكاديمية الترقي</Typography>
                   <p className="text-lg self-end" style={{'direction':'rtl'}}> اتبع المراحل لإنشاء حسابك الآن واستعد لتجربة تعليمية مميزة!</p>
                   <img loading="eager" className="self-center" src={step === 1 ? StepOne : step === 2 ? StepTwo : step === 3 ? StepThree : step === 4 ? StepFour : null} alt="stepper" width={500} height={250} />
                   {step === 1 && <p>step 1</p>}
                    {step === 2 && <p>step 2</p>}
                    {step === 3 && <p>step 3</p>}
                    {step === 4 && <p>step 4</p>}

                    <section className="self-center flex justify-between items-center w-full gap-3">
                        <Button sx={{'paddingX':'2rem'}} disabled={step === 4} onClick={()=> nextStep()} variant="primary">التالي</Button>
                        <Button sx={{'paddingX':'2rem'}} disabled={step === 1} onClick={()=> prevStep()} variant="secondary">السابق</Button>
                    </section>
                </section>
            </Box>
        </main>
     );
     // Check MUI Stepper and OverRide its style : https://mui.com/material-ui/react-stepper/
}
 
export default Register;