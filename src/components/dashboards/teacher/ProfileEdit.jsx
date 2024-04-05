import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, TextField, Typography } from '@mui/material'
import { BorderColorOutlined, Delete, DeleteOutlineOutlined, EditOutlined, Person, PersonOutlineOutlined, RemoveOutlined, Upload, UploadFileOutlined, UploadOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function EditProfile({windowSize}) {
  const navigate = useNavigate()
  return (
    <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >بروفايلي </span> <span> {">"} تعديل المعلومات  </span></Typography>
        <Button onClick={()=> navigate('/student/profile')} variant='primary' style={{alignSelf: 'left', width: "fit-content"}} >حفظ التغييرات</Button>
        
        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل المعلومات الشخصية</Typography>
            </ProfileInfos>
          </ProfileHeader>

          <div   style={{width: '280px', alignSelf: 'center', height: '100%', backgroundColor: '#3BB3490D', border: '2px dashed #5FCE6C', borderRadius: "5px", padding: "20px 10px" , display: 'flex', flexDirection: 'column', justifyContent: 'start', marginBottom: '20px'}}>
            <PersonOutlineOutlined style={{padding: '10px', borderRadius: '50%', color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, fontSize: '60px', alignSelf: 'center'}}/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}} >
              <Button variant='secondary' endIcon={<Delete/>} >حذف</Button>
              <Button variant='primary' endIcon={<Upload/>} style={{marginLeft:'10px'}} >تحميل</Button>

            </div>
          </div>
          
          <SubContainer>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الاسم الكامل (الثلاثي)</Typography>
              <TextField style={{width: '100%'}} placeholder='الاسم الكامل (الثلاثي)' />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف</Typography>
              <TextField style={{width: '100%'}} placeholder='الوصف' />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البريد الالكتروني</Typography>
              <TextField style={{width: '100%'}} placeholder='البريد الالكتروني' />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>رقم الهاتف</Typography>
              <TextField style={{width: '100%'}} placeholder='رقم الهاتف' />
            </ProfileDatas>
          </SubContainer>
        </Container>
        
        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل معلومات العنوان</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البلد</Typography>
              <TextField style={{width: '100%'}} placeholder='البلد' />
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الولاية</Typography>
              <TextField style={{width: '100%'}} placeholder='الولاية' />
            </ProfileDatas>
          </SubContainer>
        </Container>
        <Button onClick={()=> navigate('/student/profile')} variant='primary' style={{alignSelf: 'left', width: "fit-content"}} >حفظ التغييرات</Button>

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

const Container = styled.div`
  background-color: white;
  width: calc(100%);
  margin-top: 20px;
  margin-bottom: 20px;
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
  width: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-wrap: wrap;
  direction: rtl;
`