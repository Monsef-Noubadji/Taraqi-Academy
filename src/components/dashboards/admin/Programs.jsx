import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Typography } from '@mui/material'
import Alert from './alert'
import ProgramCard from './programCard'
import { useNavigate } from 'react-router-dom'

export default function Programs({windowSize}) {
  const navigate = useNavigate()
  return (
    <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >برامج الأكاديمية </span> <span> {">"} تفاصيل برامج الهمم  </span></Typography>
        <Alert text={'يجب اختيار برنامج واحد لمتابعة الدراسة عليه'} />
        
        <Container>
          <Title style={{ marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start'}}>برامج حفظ القرآن الكريم كاملا </Typography>
          </Title>
          <CardsContainer>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={true} disabled={true} width={windowSize.width} />
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
          </CardsContainer>
          <Title style={{  marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start'}}>برامج حفظ القرآن الكريم كاملا </Typography>
          </Title>
          <CardsContainer>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={true} disabled={true} width={windowSize.width}/>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
            <ProgramCard title='برنامج الهمم'  desc='برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.' index='1' available={false} disabled={false} width={windowSize.width}/>
          </CardsContainer>
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