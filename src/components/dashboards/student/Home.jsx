import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Typography } from '@mui/material'


export default function Home({windowSize}) {
  return (
    <Body>
        <WelcomeMessage>
            <Typography variant= {windowSize.width > UISettings.devices.phone ? "h5" : 'h4'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl','width':'90%', color: 'white', textAlign: 'center', marginBottom: '20px'}}>السلام عليكم و رحمة الله و بركاته منصف </Typography>
            <Typography variant="p" sx={{'whiteSpace':'normal', color: 'white', textAlign: 'center'}}>توكل على الله و لنبدأ رحلة التعلم </Typography>
        </WelcomeMessage>

        <Container>
            <Title style={{ marginTop: '50px',  marginBottom: '10px'}}>
                <img src={'../../../../src/assets/valueIcon2.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "80" : '60'} style={{margin: '0px 0px'}} />
                <Typography variant={windowSize.width > UISettings.devices.phone ? "h3" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center'}}>أكمل عملية التسجيل</Typography>
            </Title>
            <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.secondary, textAlign: 'center'}}>لقد قمت بانشاء حساب في المنصة، اختر الآن برنامجا و ادفع ثمنه لبدء رحلة التعلم</Typography>
            <img src={'../../../../src/assets/step2.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? '70%' : '95%'} style={{marginTop: '10px'}} />
            <SubContainer windowSize={windowSize}>
                <SubContainerText windowSize={windowSize} style={{ marginTop: '0px',  marginBottom: '0px'}}>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '5px'}}>إنشاء حساب</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',}}>قمت بإنشاء حسب في منصتنا</Typography>
                </SubContainerText>
                <SubContainerText windowSize={windowSize} style={{ marginTop: '0px',  marginBottom: '0px'}}>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '5px'}}>اختر برنامجا</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',}}>اختر البرنامج الذي يناسبك من صفحة البرامج تجدها  هنا</Typography>
                </SubContainerText>
                <SubContainerText windowSize={windowSize} style={{ marginTop: '0px',  marginBottom: '0px'}}>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '5px'}}>الدفع</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',}}>ادفع تكلفة البرنامج</Typography>
                </SubContainerText>
                <SubContainerText windowSize={windowSize} style={{ marginTop: '0px',  marginBottom: '0px'}}>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '5px'}}>التعلم</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',}}>ابدأ رحلة التعلم في رحاب القرآن الكريم</Typography>
                </SubContainerText>
            </SubContainer>
        </Container>
    </Body>
  )
}

const Body = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 20px;
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
`

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`

const SubContainer = styled.div`
    width: ${(props) => props.windowSize.width > UISettings.devices.phone ? '75%' : '100%'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-top: -30px;
    margin-top: ${(props) => props.windowSize.width > UISettings.devices.phone ? '-30px' : '-10px'};

    margin-bottom: 40px;
`
const SubContainerText = styled.div`
    width: ${(props) => props.windowSize.width > UISettings.devices.phone ? '20%' : '24%'};
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`

