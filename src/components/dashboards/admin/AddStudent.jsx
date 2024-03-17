import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { Delete, PersonOutlineOutlined, Save, SaveAlt, Upload } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { useState } from 'react'

export default function AddStudent({windowSize}) {
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)
  const programs = [
    {id:0, name:"برنامح الهمم"},
    {id:1, name:"برنامج التميز"},
    {id:2, name:"برنامح الأساس"},
  ]

  const sessions = [
  {id:0, name:"حلقة الهمم"},
  {id:1, name:"حلقة التميز"},
  {id:2, name:"حلقة الأساس"},
  ]

  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  return (
    <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >إدارة الطلاب </span> <span> {">"} إضافة طالب  </span></Typography>
        <Button onClick={()=> navigate('/admin/students/all')} variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >حفظ المعلومات</Button>
        
        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>أدخل المعلومات الشخصية</Typography>
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
            <ProfileDatas>
            <FormControl sx={{padding:'1rem'}}>
              <FormLabel id="controlled-radio-buttons-group">الجنس</FormLabel>
              <RadioGroup
              row
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel value="MALE" control={<Radio />} label="ذكر" />
                <FormControlLabel value="FEMALE" control={<Radio />} label="أنثى" />
              </RadioGroup>
            </FormControl>
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
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البلد</Typography>
              <TextField style={{width: '100%'}} placeholder='البلد' />
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الولاية</Typography>
              <TextField style={{width: '100%'}} placeholder='الولاية' />
            </ProfileDatas>
          </SubContainer>
        </Container>

        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات البرنامج</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر البرنامج </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الحلقة</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر الحلقة</span> </MenuItem>
                        {sessions.map((session,index)=>(

                            <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
          </SubContainer>
        </Container>

        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الاشتراك</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer style={{'flexDirection':'column'}}>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر البرنامج </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            <ProfileDatas style={{'display':'flex',flexDirection:'row',alignItems:'center'}}  width={windowSize.width}>
              <ProfileDatas>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تفعيل الإشتراك</Typography>
                <Notif onClick={()=> handleActivate()}>
                    <ProfileDatas style={{'display':'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}} width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل إشتراك الطالب</Typography>
                        <SwitchIcon sx={{'marginRight':'10px'}}/>
                    </ProfileDatas>
                </Notif> 
              </ProfileDatas>    

              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>حالة الإشتراك</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal',padding:'6px',borderRadius:'5px', color: isSubscribed === true ? UISettings.colors.green : UISettings.colors.red, backgroundColor: isSubscribed === true ? UISettings.colors.greenBG : UISettings.colors.redBG}}>{isSubscribed === true ? 'الإشتراك مفعل' : ' الإشتراك غير مفعل'}</Typography>
              </ProfileDatas>   
            </ProfileDatas>
            
          </SubContainer>
        </Container>
        <Button onClick={()=> navigate('/admin/students/all')} variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >حفظ المعلومات</Button>

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

const Notif = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
`