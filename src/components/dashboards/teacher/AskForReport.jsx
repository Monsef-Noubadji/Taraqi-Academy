import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { Add, Check, Remove, Save, VisibilityOutlined, Warning } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function AskForReport({windowSize}) {

  const navigate = useNavigate()
  const programs = [
    {id:0, name:" محمد عبد الرحمان"},
    {id:1, name:"أحمد عبيد محمد صالح"},
    {id:2, name:"خليل المالكي"},
  ]

  return (
     <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/admin/reports/all')} style={{cursor: 'pointer'}} >إدارة التقارير </span> <span> {">"} طلب تقرير  </span></Typography>

       <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}> معلومات طلب التقرير</Typography>
            </ProfileInfos>
          </ProfileHeader>
          
          <SubContainer>

            <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المرسل إليه</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> الأستاذ المرسل إليه </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>

            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> عنوان التقرير</Typography>
              <TextField InputProps={{style: { padding: '5px' } }} style={{width: '100%'}} placeholder='أدخل عنوانا للتقرير' />
            </ProfileDatas>

            <ProfileDatas>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> وصف التقرير</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <SimpleMDE placeholder='أدخل وصفا للتقرير'
                    options={{
                      direction:'rtl',
                      spellChecker: false,
                      forceSync: true,
                      toolbar: [
                        'bold',
                        'italic',
                        'heading',
                        'link',
                        'heading-1',
                        '|',
                        'quote',
                        'unordered-list',
                        'ordered-list',
                        '|',
                        'preview',
                      ],
                    }}
                    style={{
                      color:UISettings.colors.green,
                    }}
                    />
              </FormControl>
            </ProfileDatas>
          </SubContainer>
        </Container>

        <Button onClick={()=> navigate('/admin/reports/all')} variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content"}} >حفظ الطلب</Button>
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

const ExamNoteMaker = styled.div`
  display: flex;
  border: 1px solid ${UISettings.colors.secondary};
  border-radius: 10px;
  width: 12rem;
  height:3rem;
  padding: .5rem;
  align-items:center;
  justify-content:space-between;
  font-weight: bold;
  
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

const Notif = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
`