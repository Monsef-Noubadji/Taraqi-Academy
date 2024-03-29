import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import Alert from './alert'
import ProgramCard from './programCard'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { Clear, LibraryAdd } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'


export default function Programs({windowSize}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [choosedProgram, setChoosedProgram] = useState(null);
  const [programRegister, setProgramRegister] = useState(false);

  async function getPrograms() {
    try {
        const response = await axiosInstance.post('/studentApi/getPrograms', { withCredentials: true });
        console.log(response)
        if(response.data.response === 'done'){
           setLoading(false)
           setPrograms(response.data.programs)
           setChoosedProgram(response.data.studentProgram)
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
        getPrograms()
      }
  }, []);

  const [openProgramRegisterPopup, setOpenProgramRegisterPopup] = React.useState(false);
  const handleCloseProgramRegisterPopup = () => {
      setOpenProgramRegisterPopup(false);
  }

  const [loadingProgramRegister, setLoadingProgramRegister] = useState(false);


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
          <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span >برامج الأكاديمية </span></Typography>
          {
            choosedProgram ? 
              <Container>
                <Title style={{ marginBottom: '10px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
                  <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start'}}>البرنامج المحدد</Typography>
                </Title>
                <CardsContainer>
                {
                programs.map((program, key) => {
                  if(choosedProgram && program.id === choosedProgram.studyProgramId){
                    return (
                    <ProgramCard key={key} title={program.name}  desc={program.description && program.description.length > 100 ? program.description.substring(0, 70) + '...' : program.description } index={1} available={program.status === "available" ? true : false} disabled={program.status=== "available" ? true : false} id={program.id} width={windowSize.width} selected={true} alreadyRegister={programRegister} />
                    )
                  }
                })
              }                
              </CardsContainer>
              </Container>      
            :
              <Alert text={'يجب اختيار برنامج واحد لمتابعة الدراسة عليه'} />
          }
          
          <Container>
            <Title style={{ marginBottom: '10px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
              <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start'}}>برامج الأكاديمية </Typography>
            </Title>
            <CardsContainer>
              {
                programs.map((program, key) => {
                  var selected = false
                  if(choosedProgram && program.id === choosedProgram.studyProgramId){
                    selected = true
                  }
                  return (
                    <ProgramCard key={key} title={program.name}  desc={program.description && program.description.length > 100 ? program.description.substring(0, 70) + '...' : program.description } index={key + 1} available={program.status === "available" ? true : false} disabled={program.status=== "available" ? true : false} id={program.id} width={windowSize.width} selected={selected} alreadyRegister={programRegister} />
                  )
                })
              }
            </CardsContainer>
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
                        <LoadingButton loading={loadingProgramRegister} loadingPosition='center'  variant='primary' style={{backgroundColor: UISettings.colors.green}} onClick={()=> setOpenProgramRegisterPopup(false)}>التسجيل في البرنامج</LoadingButton >
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
  padding-top: 20px;
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
const CardsContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
`

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
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