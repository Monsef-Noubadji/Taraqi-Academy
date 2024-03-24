import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography, useMediaQuery } from '@mui/material'
import { Assignment, ChecklistOutlined, Save} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.css'





export default function ExamDetails({windowSize}) {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  const isLG = useMediaQuery('(min-width:1280px)');
  const isMD = useMediaQuery('(min-width:960px)');
  const isSM = useMediaQuery('(min-width:600px)');

  const cols = isLG ? 100 : isMD ? 80 : isSM ? 60 : 40;


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':'bolder','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '20px'}}>{'حلقة الأستاذ علي'  + ' > ' + 'الإمتحان التفاعلي الخامس'} </Typography>
        <Container className='mui-tabs-Global'>

        {
                [''].map((index) => {
                  if(windowSize.width < UISettings.devices.phone){
                    return(
                      <div key={index} style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', width: '100%'}} >
                        <IconButton style={{color: value === 1 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 1) }><ChecklistOutlined/></IconButton>
                        <IconButton style={{color: value === 0 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 0) }><Assignment/></IconButton>
                      </div>
                    )
                  }
                })
              }

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', direction: 'rtl', }}
            >
              {
                [''].map((index) => {
                  if(windowSize.width > UISettings.devices.phone){
                    return(
                      <Tabs
                          orientation="vertical"
                          value={value}
                          onChange={handleChange}
                          key={index}
                          aria-label="Vertical tabs example"
                          sx={{ borderLeft: 0, borderColor: 'divider', width:'200px' }}
                      >
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="أسئلة الإمتحان" icon={<Assignment style={{marginLeft: '10px'}}/>} iconPosition='end' {...a11yProps(0)} />
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="أجوبة الطلاب" icon={<ChecklistOutlined style={{marginLeft: '10px'}}/>} iconPosition='end'  {...a11yProps(1)} />
                      </Tabs>
                    )
                  }
                })
              }
            
            <TabPanel value={value} style={{width:'calc(100%)'}} index={0}>
              <Container>
                <ProfileHeader style={{marginTop: '15px',marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>أسئلة الإمتحان التفاعلي الخامس</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                
                <SubContainer>
                  <ProfileDatas>
                    <section className='flex items-center justify-between w-full'>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> السؤال الأول</Typography>
                    <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>نقطتان</span>
                    </section>
                    <FormControl sx={{padding:'1rem'}}>
                        <RadioGroup
                          aria-labelledby="controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                        >
                          <FormControlLabel checked value="answer1" control={<Radio />} label="الإجابة الأولى" />
                          <FormControlLabel disabled value="answer2" control={<Radio />} label="الإجابة الثانية" />
                          <FormControlLabel disabled value="answer3" control={<Radio />} label="الإجابة الثالثة" />
                          <FormControlLabel disabled value="answer4" control={<Radio />} label="الإجابة الرابعة" />

                        </RadioGroup>
                    </FormControl>
                  </ProfileDatas>
                  <ProfileDatas>
                    <section className='flex items-center justify-between w-full'>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> السؤال الثاني</Typography>
                    <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>نقطتان</span>
                    </section>
                    <FormControl sx={{padding:'1rem'}}>
                        <RadioGroup
                          aria-labelledby="controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                        >
                          <FormControlLabel disabled value="answer1" control={<Radio />} label="الإجابة الأولى" />
                          <FormControlLabel disabled value="answer2" control={<Radio />} label="الإجابة الثانية" />
                          <FormControlLabel checked value="answer3" control={<Radio />} label="الإجابة الثالثة" />
                          <FormControlLabel disabled value="answer4" control={<Radio />} label="الإجابة الرابعة" />

                        </RadioGroup>
                    </FormControl>
                  </ProfileDatas>
                  <ProfileDatas>
                    <section className='flex items-center justify-between w-full'>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> السؤال الثالث</Typography>
                    <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>نقطتان</span>
                    </section>
                    <FormControl sx={{padding:'1rem'}}>
                        <RadioGroup
                          aria-labelledby="controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                        >
                          <FormControlLabel disabled value="answer1" control={<Radio />} label="الإجابة الأولى" />
                          <FormControlLabel checked  value="answer2" control={<Radio />} label="الإجابة الثانية" />
                          <FormControlLabel disabled value="answer3" control={<Radio />} label="الإجابة الثالثة" />
                          <FormControlLabel disabled value="answer4" control={<Radio />} label="الإجابة الرابعة" />

                        </RadioGroup>
                    </FormControl>
                  </ProfileDatas>
                  <ProfileDatas width={100}>
                    <section className='flex items-center justify-between w-full'>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> السؤال الرابع</Typography>
                    <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>نقطتان</span>
                    </section>
                      <FormControl  sx={{paddingX:'2rem',paddingY:'2rem'}}>
                       <textarea className=' placeholder:p-3 rounded-lg ' cols={cols}  rows={7} autoComplete='off' placeholder='أدخل الإجابة النموذجية هنا'  style={{
                        border: '1px solid ' + UISettings.colors.secondary,
                        }}/>
                    </FormControl>
                  </ProfileDatas>
                </SubContainer>
              </Container>

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
        className='pr-0 md:pr-12 lg:pr-12'
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

const Tag = styled.span`
    content:${props => `"# ${props.tag}"`};
    color: ${UISettings.colors.green},
    background-color:${UISettings.colors.greenBG};
    border-radius: 5px;
    padding:10px;

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
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`