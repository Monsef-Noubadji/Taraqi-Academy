import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, Typography } from '@mui/material'
import { ArrowLeft, KeyboardArrowLeft } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


export default function ProgramCard({title, desc, index, available, disabled, width}) {
    const navigate = useNavigate()
  return (
    <Body width={width}>
        <Index>{index}</Index> 
        <Typography variant={'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', marginBottom: '10px'}}>{title}</Typography>
        <Typography variant={'p'} sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start'}}>{desc}</Typography>
        <Buttons>
            <Button variant='primary' disabled={disabled}>سجل الآن</Button>
            <Button onClick={()=> navigate('/student/programs/program')} variant='primary' disabled={disabled} style={{backgroundColor: 'white', color: disabled ? UISettings.colors.secondary : UISettings.colors.green, borderColor: UISettings.colors.green, marginRight: '10px'}} startIcon={<KeyboardArrowLeft/>} >التفاصيل</Button>
        </Buttons>
        <SideText style={{display: available ? 'none' : 'block'}} >غير متاح حاليا</SideText>
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
