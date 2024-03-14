import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { ErrorOutline, NotificationImportantOutlined, ReportProblem } from '@mui/icons-material'
import { Typography } from '@mui/material'

export default function AdvancedAlert({text, title}) {
  return (
    <Body>
      <Container>
        <NotificationImportantOutlined style={{color: UISettings.colors.brown, marginLeft: '10px'}} />
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', width: '100%'}}>{title}</Typography>
      </Container>
      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', width: '100%'}}>{text}</Typography>
    </Body>
  )
}


const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${UISettings.colors.brown};
    background-color: ${UISettings.colors.brownBG};
    color: ${UISettings.colors.primary};
    font-size: 18px;
    align-items: center;
    align-self: end;
`

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    padding-bottom: 10px;
    border-radius: 10px;
    color: ${UISettings.colors.primary};
    font-size: 18px;
    align-items: center;
    align-self: end;
`
