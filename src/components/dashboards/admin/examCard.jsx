import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, Typography } from '@mui/material'
import { ArrowLeft, Clear, KeyboardArrowLeft, ReportProblem } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

export default function ExamCard({title, desc, index, available, disabled, width, status, date}) {
    const navigate = useNavigate()
    const [openExam, setOpenExam] = React.useState(false);
  const handleClickOpenExam = () => {
    setOpenExam(true);
  };
  const handleCloseExam = () => {
    setOpenExam(false);
  }

  return (
    <Body width={width}>
        <Index></Index> 
        <Container>
          <Typography variant={'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', marginBottom: '10px'}}>{title}</Typography>
          <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start'}}>{desc}</Typography>
          <Buttons>
              <Button variant='primary' onClick={() => {if(available === true){setOpenExam(true)}}} disabled={disabled} style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, border: 'none '}} >{status === 'notStarted' ? 'لم ينجز بعد' : 'إبدأ الامتحان'}</Button>
              <Button  variant='primary' disabled={true} style={{backgroundColor: 'white', color: UISettings.colors.green, border: "none", marginRight: '10px', textAlign: 'start', direction: 'rtl' }} >18 فيفري 2024</Button>
          </Buttons>
          <SideText style={{display: available ? 'none' : 'block'}} >غير متاح حاليا</SideText>
        </Container>

        <Dialog
          open={openExam}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseExam}
          aria-describedby="alert-dialog-slide-description"
          style={{borderRadius: '20px'}}
        >
          <DialogTitle><Clear onClick={()=> setOpenExam(false)} style={{cursor: 'pointer'}}/></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <ReportProblem style={{fontSize: '100px', color: '#FDBC1A'}}></ReportProblem>
              <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>تنويه قبل إجراء الامتحان</Typography>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>يرجى التنويه إلى أنه لا يسمح بدخول الامتحان إلا مرة واحدة، كما يرجى عدم الاستعانة بأي مصدر خارجي حتى نهاية الامتحان</Typography>
              <Buttons style={{justifyContent: 'center'}}>
                <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenExam(false)}>خروج</Button>
                <Button variant='primary' onClick={()=> setOpenExam(false)}>أوافق على المابعة</Button>
              </Buttons>
            </DialogContentText>
          </DialogContent>
         
        </Dialog>

    </Body>
  )
}


const Body = styled.div`
  width: ${props => props.width > UISettings.devices.phone ? '31%' : '100%'};
  min-width: 150px;
  /* max-width: 250px; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0px 0px;
  box-shadow: 0px 0px 25px 0px #00000012;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  background-color: white;
`



const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 10px 10px 10px;
`



const SideText = styled.div`
  position: absolute;
  top: 30px;
  left: -35px;
  transform: rotate(-45deg);
  color: white;
  background-color: ${UISettings.colors.secondary};
  padding: 0px 10px;
  width: 150px;
  text-align: center;
`

const Index = styled.div`
  width: 100%;
  height: 80px;
  background-image: url('../../../../src/assets/examHeaderStart.png');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${UISettings.colors.green};
  font-size: 25px;
  font-weight: 600;
  align-self: end;
  margin-bottom: 0px;
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