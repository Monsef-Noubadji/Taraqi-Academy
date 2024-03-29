import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, Typography } from '@mui/material'
import { BorderColorOutlined, EditOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import axiosInstance from './axiosInstance'
import errorHandler from './errorHandler'


export default function Profile({windowSize}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});

  async function getProfileData() {
    try {
        const response = await axiosInstance.post('/studentApi/getProfileData', { withCredentials: true });
        if(response.data.response === 'done'){
           setLoading(false)
           setStudent(response.data.student)
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
        getProfileData()
      }
  }, []);

  const handleImageLoad = (event) => {
    const img = event.target;
    if (img.naturalWidth > img.naturalHeight) {
      img.style.width = 'auto';
      img.style.height = '100%';
    } else {
      img.style.width = '100%';
      img.style.height = 'auto';
    }
  };

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
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}>بروفايلي</Typography>
          <Button onClick={()=> navigate('/student/profile/edit')} variant='primary' endIcon={<BorderColorOutlined/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, alignSelf: 'left', width: "fit-content"}} >تعديل</Button>
          <Container>
            <ProfileHeader>
            {
                student.image && student.image.length > 0 ?
                <div style={{height: '60px', width: "60px", borderRadius: '7px', alignSelf:'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                  <img src={student.image} onLoad={handleImageLoad}  crossorigin={"anonymous | use-credentials"} alt="academy_logo" style={{margin: '0px 0px', borderRadius: '5px',  alignSelf: 'center',}} />
                </div>                : <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={60} style={{margin: '0px 0px'}} />
              }
                <ProfileInfos>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{student.firstName + ' ' + student.familyName}</Typography>
                    <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>طالب</Typography>
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
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.firstName + ' ' + student.familyName}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الوصف</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.description}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تاريخ الميلاد</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.birthDate}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الجنس</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.gender && student.gender.length > 0 ? student.gender : '--'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البريد الالكتروني</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.email}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>رقم الهاتف</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.phoneNumber}</Typography>
              </ProfileDatas>
            </SubContainer>
          </Container>
          <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات إضافية</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البلد</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.country}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الولاية</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.wilaya}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>المستوى الدراسي</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.studyLevel ? student.studyLevel : '--'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>النشاط</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.status ? student.status : '--'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>عدد الأحزاب المحفوظة</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{student.hizbCount === 0 || student.hizbCount ? student.hizbCount : '--' }</Typography>
              </ProfileDatas>
            </SubContainer>
          </Container>
          <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات البرنامج المشترك فيه</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>اسم البرنامج</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>برنامج الهمم</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>المستوى</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>الأول</Typography>
              </ProfileDatas>
            </SubContainer>
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
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`