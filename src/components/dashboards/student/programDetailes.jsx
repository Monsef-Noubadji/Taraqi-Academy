import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { Clear, Error, LibraryAdd } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'


export default function Program({windowSize}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [programRegister, setProgramRegister] = useState(false);
    const [choosedProgram, setChoosedProgram] = useState(null);
    const [program, setProgram] = useState({});
  
    const location = useLocation();
 
    const [programId, setProgramId] = useState('');

    async function getProgram() {
      try {
          const searchParams = new URLSearchParams(location.search);
          const idFromUrl = searchParams.get('id');
          setProgramId(idFromUrl)
          const response = await axiosInstance.post('/studentApi/getProgram',{id: idFromUrl});
          if(response.data.response === 'done'){
             setLoading(false)
             setProgram(response.data.program)
             setChoosedProgram(response.data.choosed)
             setProgramRegister(response.data.programRegistration)
          }
      } catch (error) {
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
          getProgram()
        }
    }, []);

    const [openProgramRegisterPopup, setOpenProgramRegisterPopup] = React.useState(false);
    const handleCloseProgramRegisterPopup = () => {
        setOpenProgramRegisterPopup(false);
    }

    const [loadingProgramRegister, setLoadingProgramRegister] = useState(false);
    
    
    
    async function programRegistration() {
      try {
          setLoadingProgramRegister(true)
          const searchParams = new URLSearchParams(location.search);
          const idFromUrl = searchParams.get('id');
          const response = await axiosInstance.post('/studentApi/programRegistration',{programId: idFromUrl});
          setLoadingProgramRegister(false)
          if(response.data.response === 'done'){
            setLoadingProgramRegister(false)
            toast.success(response.data.message, {
              position: 'top-right',
              progress: undefined,
              autoClose: 3000,
              theme: 'colored'
            });
            setChoosedProgram(programId)
            setOpenProgramRegisterPopup(false)
          }
      } catch (error) {
          setLoadingProgramRegister(false)
          errorHandler(error, toast, navigate)
      }
  }

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
            <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/programs')} style={{cursor: 'pointer'}} >برامج الأكاديمية </span> <span> {">"} {program.name} </span></Typography>
            {choosedProgram ? 
              <WelcomeMessage>
                  <Typography variant= {windowSize.width > UISettings.devices.phone ? "h5" : 'h4'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl','width':'90%', color: 'white', textAlign: 'center', marginBottom: '20px'}}>البرنامج المختار : {program.name} </Typography>
                  <Typography variant="p" sx={{'whiteSpace':'normal', color: 'white', textAlign: 'center'}}>مدة البرنامج : {program.duration}</Typography>
              </WelcomeMessage>           
            :
            programRegister ? '' :
            <Button variant='primary' style={{alignSelf: 'start'}} onClick={()=> setOpenProgramRegisterPopup(true)} >اختر هذا البرنامج</Button>
            }
              <Container>
                <Info width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>عنوان البرنامج</InfosTitle> 
                    <InfosContent  width={windowSize.width} style={{color: UISettings.colors.black, fontWeight: 600, direction: 'rtl'}}> 
                      {program.name}
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={"35"} style={{margin: '0px 0px', marginLeft: '10px'}} />
                    </InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>وصف البرنامج</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.description} </InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>السن المقترح</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.age}</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width} >مدة البرنامج كاملا</InfosTitle> 
                    <InfosContent  width={windowSize.width} sty>{program.duration}</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>مدة الدراسة الفعلية</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.studyDuration}</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>مدة العطل و الامتحانات</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.vacationDuration}</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>عدد المستويات</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.levels} مستويات</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>السنة الأولى</InfosTitle> 
                    <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>السنة الثانية</InfosTitle> 
                    <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>السنة الثالثة</InfosTitle> 
                    <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                </Info>
                <Info  width={windowSize.width}>
                    <InfosTitle  width={windowSize.width}>سعر البرنامج</InfosTitle> 
                    <InfosContent  width={windowSize.width}>{program.price}.00 دج</InfosContent> 
                </Info>
            </Container>

            {/* // register popup */}
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={openProgramRegisterPopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseProgramRegisterPopup}
                aria-describedby="alert-dialog-slide-description"
                style={{borderRadius: '20px'}}
                >
                <DialogTitle><Clear onClick={()=> setOpenProgramRegisterPopup(false)} style={{cursor: 'pointer'}}/></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <LibraryAdd style={{fontSize: '100px', color: UISettings.colors.green}}></LibraryAdd>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>التسجيل في البرنامج</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>يمكنك التسجيل في برنامج واحد فقط، هل تريد التسجيل في هذا البرنامج؟</Typography>
                    <Buttons style={{justifyContent: 'center'}}>
                        <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenProgramRegisterPopup(false)}>رجوع</Button>
                        <LoadingButton loading={loadingProgramRegister} loadingPosition='center'  variant='primary' style={{backgroundColor: UISettings.colors.green}} onClick={()=> programRegistration()}>التسجيل في البرنامج</LoadingButton >
                    </Buttons>
                    </DialogContentText>
                </DialogContent>
                
            </Dialog>
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
  padding: 20px 0px;
`


const Container = styled.div`
  background-color: white;
  width: calc(100%);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
`

const Info = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'};
  justify-content: start;
`

const WelcomeMessage = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${UISettings.colors.darkGreen};
    border-radius: 20px;
    background-image: url('./../../../../src/assets/lightStar.svg');
    background-repeat: space;
    background-size: 30%;
`

const InfosTitle = styled.div`
  width: ${props => props.width > UISettings.devices.phone ? '20%' : '100%'};
  min-width: 130px;
  border-left: ${props => props.width > UISettings.devices.phone ? '1px solid ' + UISettings.colors.secondary : 'none'};
  border-bottom: ${props => props.width > UISettings.devices.phone ? 'none' : '1px solid ' + UISettings.colors.secondary};
  text-align: end;
  padding: 10px;
`

const InfosContent = styled.div`
  width:${props => props.width > UISettings.devices.phone ? '80%' : '100%'};
  padding: 10px;
  text-align: end;
  color: ${UISettings.colors.secondary};
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
  direction: rtl;
`
const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});