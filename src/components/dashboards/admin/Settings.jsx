import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, IconButton, TextField, Typography, makeStyles } from '@mui/material'
import { BorderColorOutlined, Delete, EditOutlined, NotificationAdd, Notifications, Person, PersonOutlineOutlined, Save, SaveOutlined, Security, Upload } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.css'
import SwitchIcon from './switchIcon'




export default function Settings({windowSize}) {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '20px'}}>الإعدادات </Typography>
        <Container className='mui-tabs-Global'>

        {
                [''].map(() => {
                  if(windowSize.width < UISettings.devices.phone){
                    return(
                      <div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', width: '100%'}} >
                        <IconButton style={{color: value === 0 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 0) }><Person/></IconButton>
                        <IconButton style={{color: value === 1 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 1) }><Security/></IconButton>
                        <IconButton style={{color: value === 2 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 2) }><Notifications/></IconButton>
                      </div>
                    )
                  }
                })
              }

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', direction: 'rtl', }}
            >
              {
                [''].map(() => {
                  if(windowSize.width > UISettings.devices.phone){
                    return(
                      <Tabs
                          orientation="vertical"
                          value={value}
                          onChange={handleChange}
                          aria-label="Vertical tabs example"
                          sx={{ borderLeft: 0, borderColor: 'divider', width:'200px' }}
                      >
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الحساب" icon={<Person style={{marginLeft: '10px'}}/>} iconPosition='end' {...a11yProps(0)} />
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الحماية" icon={<Security style={{marginLeft: '10px'}}/>} iconPosition='end'  {...a11yProps(1)} />
                          <Tab  style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الإشعارات" icon={<Notifications style={{marginLeft: '10px'}}/>} iconPosition='end'  {...a11yProps(2)} />
                      </Tabs>
                    )
                  }
                })
              }
            
            <TabPanel value={value} style={{width: 'calc(100%)'}} index={0}>
              <Container>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل المعلومات الشخصية</Typography>
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
                </SubContainer>
              </Container>
              <Container style={{marginTop: '20px'}}>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل معلومات العنوان</Typography>
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
              <Button onClick={()=> navigate('/student/profile/edit')} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</Button>

            </TabPanel>
            <TabPanel value={value}  style={{width: 'calc(100%)'}} index={1}>
              <Container>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل كلمة المرور</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                <SubContainer>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>كلمة المرور الحالية</Typography>
                    <TextField style={{width: '100%'}} placeholder='كلمة المرور الحالية' />
                  </ProfileDatas>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>كلمة المرور الجديدة</Typography>
                    <TextField style={{width: '100%'}} placeholder='كلمة المرور الجديدة' />
                  </ProfileDatas>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تأكيد كلمة المرور الجديدة</Typography>
                    <TextField style={{width: '100%'}} placeholder='تأكيد كلمة المرور الجديدة' />
                  </ProfileDatas>
                </SubContainer>
              
                <Button onClick={()=> navigate('/student/profile/edit')} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</Button>

              </Container>
            </TabPanel>
            <TabPanel style={{width: 'calc(100%)'}} value={value} index={2}>
            <Container>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>إعدادات الإشعارات</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                <SubContainer>
                  <Notif>
                    <SwitchIcon/>
                    <ProfileDatas  width={100}>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تفعيل الإشعارات</Typography>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات الامتحانات الجديدة، إشعارات الاشتراكات و إشعارات النتائج </Typography>
                    </ProfileDatas>
                  </Notif>
                  <Notif>
                    <ProfileDatas  width={100}>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تخصيص الإشعارات</Typography>
                    </ProfileDatas>
                  </Notif>
                  <Notif>
                    <SwitchIcon/>
                    <ProfileDatas  width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات الامتحانات</Typography>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات الامتحانات الجديدة التي تم وضعها في المنصة</Typography>
                    </ProfileDatas>
                  </Notif>
                  <Notif>
                    <SwitchIcon/>
                    <ProfileDatas  width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات الاشتراكات</Typography>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات تفعيل الاشتراكات و اقتراب موعد الدفع  </Typography>
                    </ProfileDatas>
                  </Notif>
                  <Notif>
                    <SwitchIcon/>
                    <ProfileDatas  width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات النتائج</Typography>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات النتائج عند تصحيح الامتحانات و رفع النتائج</Typography>
                    </ProfileDatas>
                  </Notif>
                </SubContainer>
                <Button onClick={()=> navigate('/student/profile/edit')} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</Button>
              </Container>
            </TabPanel>
            </Box>
        </Container>
    </Body>
  )
}



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
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
  direction: ltr;
  //width: calc(100%);
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 20px ;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
  background-color: white;
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