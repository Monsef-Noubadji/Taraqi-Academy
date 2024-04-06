import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, Typography } from '@mui/material'
import { BorderColorOutlined, EditOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Profile({windowSize}) {
  const navigate = useNavigate()
  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}>بروفايلي</Typography>
        <Button onClick={()=> navigate('/teacher/settings')} variant='primary' endIcon={<BorderColorOutlined/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, alignSelf: 'left', width: "fit-content"}} >تعديل</Button>
        <Container>
          <ProfileHeader>
              <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={80} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>منصف عبد الإله نوباجي</Typography>
                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>أستاذ علوم شرعية تخصص حديث وأصوله</Typography>
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
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>منصف عبد الإله نوباجي</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الوصف</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>أستاذ علوم شرعية</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البريد الالكتروني</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>monsefemail@gmail.com</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>رقم الهاتف</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>+2135588124957</Typography>
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