import React, { useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { ArrowLeft, Clear, KeyboardArrowLeft, LibraryAdd } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'



export default function ProgramCard({title, desc, index, available, disabled, width, id, selected, alreadyRegister}) {
    const navigate = useNavigate()
    const [openProgramRegisterPopup, setOpenProgramRegisterPopup] = React.useState(false);
    const handleCloseProgramRegisterPopup = () => {
        setOpenProgramRegisterPopup(false);
    }

    const [loadingProgramRegister, setLoadingProgramRegister] = useState(false);

    return (
      <Body width={width}>
          <Index>{index}</Index> 
          <Typography variant={'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', marginBottom: '10px'}}>{title}</Typography>
          <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start', flex: 1}}>{desc}</Typography>
          <Buttons>
              <Button variant={alreadyRegister === true ? 'primary':'primary'} disabled={!disabled || (alreadyRegister && selected === false) ? true : false} style={{display: selected ? 'flex' : 'flex'}} onClick={()=> selected || alreadyRegister ? console.log('') : setOpenProgramRegisterPopup(true)}>{selected ? 'مسجّل' : 'سجل الآن'}</Button>
              <Button onClick={()=> navigate('/student/programs/program?id=' + id)} variant='primary' disabled={false} style={{backgroundColor: 'white', color:UISettings.colors.green, borderColor: UISettings.colors.green, marginRight: '10px',}} startIcon={<KeyboardArrowLeft/>} >التفاصيل</Button>
          </Buttons>
          <SideText style={{display: disabled === false ? 'block' : 'none'}} >غير متاح حاليا</SideText>
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
                    <Buttons1 style={{justifyContent: 'center'}}>
                        <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenProgramRegisterPopup(false)}>رجوع</Button>
                        <LoadingButton loading={loadingProgramRegister} loadingPosition='center'  variant='primary' style={{backgroundColor: UISettings.colors.green}} onClick={()=> setOpenProgramRegisterPopup(false)}>التسجيل في البرنامج</LoadingButton >
                    </Buttons1>
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
  padding: 10px 20px;
  box-shadow: 0px 0px 25px 0px #00000012;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  margin: 10px;
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
  width: 50px;
  height: 50px;
  background-image: url('../../../../src/assets/star.svg');
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
  margin-bottom: 10px;
`

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    margin-top: 20px;
`

const Buttons1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});