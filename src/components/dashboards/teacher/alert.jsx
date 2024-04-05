import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { ErrorOutline, ReportProblem } from '@mui/icons-material'

export default function Alert({text}) {
  return (
    <Body>
        <ErrorOutline style={{color: UISettings.colors.brown, marginLeft: '10px'}} />
        <span style={{textAlign: 'end'}}>{text}</span>
    </Body>
  )
}

const Body = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${UISettings.colors.brown};
    background-color: ${UISettings.colors.brownBG};
    color: ${UISettings.colors.primary};
    font-size: 18px;
    align-items: center;
    align-self: end;
`
