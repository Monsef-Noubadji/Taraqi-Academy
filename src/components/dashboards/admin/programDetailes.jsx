import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Program({windowSize}) {
    const navigate = useNavigate()
  return (
    <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/programs')} style={{cursor: 'pointer'}} >برامج الأكاديمية </span> <span> {">"} تفاصيل برامج الهمم  </span></Typography>
        <Button variant='primary' style={{alignSelf: 'start'}} >اختر هذا البرنامج</Button>
        <Container>
            <Info width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>عنوان البرنامج</InfosTitle> 
                <InfosContent  width={windowSize.width} style={{color: UISettings.colors.black, fontWeight: 600}}> 
                    <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={"35"} style={{margin: '0px 0px', marginLeft: '10px'}} />
                  برنامج الهمم</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>وصف البرنامج</InfosTitle> 
                <InfosContent  width={windowSize.width}>برنامج لحفظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات.برنامج لحفظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات.فظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>السن المقترح</InfosTitle> 
                <InfosContent  width={windowSize.width}>13 سنة فما فوق</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>مدة البرنامج كاملا</InfosTitle> 
                <InfosContent  width={windowSize.width}>3 سنوات</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>مدة الدراسة الفعلية</InfosTitle> 
                <InfosContent  width={windowSize.width}>30 شهرا ( 10 أشهر كل سنة)</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>مدة العطل و الامتحانات</InfosTitle> 
                <InfosContent  width={windowSize.width}>6 أشهر ( شهرين كل سنة)</InfosContent> 
            </Info>
            <Info  width={windowSize.width}>
                <InfosTitle  width={windowSize.width}>عدد المستويات</InfosTitle> 
                <InfosContent  width={windowSize.width}>7 مستويات</InfosContent> 
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
                <InfosContent  width={windowSize.width}>5000.00 دج</InfosContent> 
            </Info>
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

const Info = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'};
  justify-content: start;
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
  justify-content: end;
  align-items: center;
`
