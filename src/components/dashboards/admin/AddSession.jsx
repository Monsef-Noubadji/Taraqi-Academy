import { Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { useState } from "react";
import { Save } from "@mui/icons-material";

const AddSession = ({windowSize}) => {
    const [isSubscribed,setIsSubscribed] = useState(false)
    const programs = [
        {id:0, name:"شهري"},
        {id:1, name:"دوري"},
        {id:2, name:"سنوي"},
    ]

    const duration = [
        {id:0, name:"سنتين"},
        {id:1, name:" ثلاث سنوات"},
        {id:2, name:"أربع سنوات"},
      ]
    return ( 
        <Body>
            <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} >إدارة الحلقات </span> <span> {">"} إضافة حلقة  </span></Typography>
            <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الحلقة</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إسم الحلقة</Typography>
              <TextField style={{width: '100%'}} placeholder='إسم الحلقة' />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المسؤول</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر الأستاذ المسؤول </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            {/* <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>مدة البرنامج</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر مدة البرنامج </span> </MenuItem>
                        {duration.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas> */}
          </SubContainer>
          <Button  variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:'white',border:'1px solid' + UISettings.colors.green}} >حفظ الاشتراك</Button>

            </Container>
        </Body>
     );
}
 
export default AddSession;



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

const ProfileInfos = styled.div`
    margin-right: 10px;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`

const SubContainer = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
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


const ProfileDatas = styled.div`
    margin: ${(props) => props.width > UISettings.devices.phone ? '7px 10px' : '7px 0px' };
    width: ${(props) => props.width > UISettings.devices.phone ? 'calc(50% - 20px)' : 'calc(100%)' } ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    direction: rtl;
`

const Notif = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
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