import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { BlockOutlined, Check, Clear, Close, Print } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { forwardRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
export default function TeacherDetails({windowSize}) {
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)

  const studentDetails = {
    teacher:'العيد عبود',
    session:'جميع المعلمين',
    recent:'المسجلون حديثا',
    isRecent: true
  }

  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  const approved = ()=>{
    toast('تم قبول طلب إنشاء الحساب',{
        position:'top-left',
        type:'success',
        progress:undefined,
        autoClose:3000,
        theme:'colored'
      })
}
const denied = ()=>{
    toast('تم رفض طلب إنشاء الحساب',{
        position:'top-left',
        type:'error',
        progress:undefined,
        autoClose:3000,
        theme:'colored'
      })
}
  const [openExam, setOpenExam] = useState(false);
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpenExam = () => {
    setOpenExam(true);
  };

  const handleCloseExam = () => {
    setOpenExam(false);
  }

  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}>{!studentDetails.isRecent ? studentDetails.session : studentDetails.recent + ' > ' + studentDetails.teacher}</Typography>
        {studentDetails.isRecent ? <Box sx={{'display':'flex',alignItems:'stretch',justifyContent:'start',gap:'1rem'}}>
            <Button variant='primary' onClick={()=> denied()  } endIcon={<Close/>} style={{color: UISettings.colors.red, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.red, alignSelf: 'left', width: "fit-content"}} >رفض إنشاء الحساب</Button>
            <Button variant='primary' onClick={()=> approved()} endIcon={<Check/>} style={{color: UISettings.colors.green, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.green, alignSelf: 'left', width: "fit-content"}} >قبول إنشاء الحساب</Button>
        </Box>
        :
      
        <Box sx={{'display':'flex',alignItems:'stretch',justifyContent:'start',gap:'1rem'}}>
            <Button variant='primary' onClick={()=> handleClickOpenExam()} endIcon={<BlockOutlined/>} style={{color: UISettings.colors.red, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.red, alignSelf: 'left', width: "fit-content"}} >حظر الأستاذ</Button>
            <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px',width: "fit-content"}} ><Print/></Button>
        </Box>


        }


        <Container>
          <ProfileHeader>
              <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={80} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>العيد عبود</Typography>
                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>أستاذ علوم شرعية تخصص الحديث وأصوله</Typography>
              </ProfileInfos>
          </ProfileHeader>
        </Container>

        <Container>
          <ProfileHeader style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>المعلومات الشخصية</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الاسم الكامل</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>العيد عبود</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الوصف</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>أستاذ علوم شرعية تخصص الحديث وأصوله</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البريد الالكتروني</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>elaid.aboud@gmail.com</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>رقم الهاتف</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons,direction:'ltr'}}>+2135588124957</Typography>
            </ProfileDatas>
          </SubContainer>
        </Container>

        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات العنوان</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البلد</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>الجزائر</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الولاية</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>الجزائر العاصمة</Typography>
            </ProfileDatas>
          </SubContainer>
        </Container>

        <Dialog
          open={openExam}
          TransitionComponent={Transition}
          onClose={handleCloseExam}
          aria-describedby="alert-dialog-slide-description"
          style={{borderRadius: '40px'}}
        >
          <DialogTitle><Clear onClick={()=> handleCloseExam()} style={{cursor: 'pointer'}}/></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <BlockOutlined style={{fontSize: '120px', color: UISettings.colors.red}}></BlockOutlined>
              <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>هل أنت متاكد ؟</Typography>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>سيتم حظر هذا المعلم من المنصة، هل أنت متاكد من ذلك ؟؟</Typography>
              <Buttons style={{justifyContent: 'center'}}>
                <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenExam(false)}>إلغاء</Button>
                <Button variant='primary' sx={{backgroundColor:UISettings.colors.red,'&:hover':{backgroundColor:UISettings.colors.red}}} onClick={()=> handleCloseExam()}>نعم متأكد</Button>
              </Buttons>
            </DialogContentText>
          </DialogContent>
         
        </Dialog>

    <ToastContainer/>
    </Body>
  )
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

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
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

const ProfileHeader = styled.div`
    width: 100%;
    padding: 0;
    display: flex;
    display: flex ;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
`

const ProfileInfos = styled.div`
    margin-right: 10px;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`

const ProfileDatas = styled.div`
    margin: ${(props) => props.width > UISettings.devices.phone ? '7px 10px' : '7px 0px' };
    width: ${(props) => props.width > UISettings.devices.phone ? 'calc(50% - 20px)' : 'calc(100%)' } ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    direction: rtl;
`


const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-wrap: wrap;
  direction: rtl;
`