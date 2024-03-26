import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { Add, Check, Remove, Save, VisibilityOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function AddExam({windowSize}) {

  const isLG = useMediaQuery('(min-width:1280px)');
  const isMD = useMediaQuery('(min-width:960px)');
  const isSM = useMediaQuery('(min-width:600px)');

  const cols = isLG ? 67 : isMD ? 45 : isSM ? 40 : 55;
  const rightValue = isLG ? '45%' : isMD ? '45%' : isSM ? '40%' : '40%'
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

  const questionType = [
    {id:0, name:"خيار من متعدد"},
    {id:1, name:"سؤال كتابي"},
    ]
  const [isWritten,setIsWritten] = useState(true)

    const [questions, setQuestions] = useState([1]);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, { id: questions.length + 1 }]);
  };

  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  return (
    <Body>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >إدارة الإمتحانات </span> <span> {">"} إنشاء إمتحان  </span></Typography>
        <Box sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
            <Button onClick={()=> navigate('/admin/exams/all')} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:UISettings.colors.white,white:'1px solid' + UISettings.colors.green}} >حفظ الإمتحان</Button>
            <Button variant='primary' endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >معاينة الإمتحان</Button>
            </Box>
            <Typography variant="p" display={'flex'} alignItems={'center'} gap={'.5rem'}> 
            <p style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem'}}>04 نقاط</p>
            مجموع نقاط الإمتحان            
           </Typography>
        </Box>

        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}> المعلومات العامة</Typography>
            </ProfileInfos>
          </ProfileHeader>
          
          <SubContainer>
            <ProfileDatas width={windowSize.width}>
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

            <ProfileDatas width={windowSize.width}>
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

            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>عنوان الإمتحان</Typography>
              <TextField style={{width: '100%'}} placeholder='أدخل عنوان الامتحان' />
            </ProfileDatas>

            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف (إختياري)</Typography>
              <FormControl>
                <textarea className=' p-3 rounded-lg ' cols={cols}  rows={7} autoComplete='off' placeholder='أدخل الإجابة النموذجية هنا'  style={{
                 border: '1px solid ' + UISettings.colors.secondary,
                 }}/>
              </FormControl>
            </ProfileDatas>

            <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تاريخ بداية الإمتحان</Typography>
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

            <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تاريخ نهاية الإمتحان</Typography>
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
            <ProfileDatas>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تعليمات خاصة بالإمتحان</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <SimpleMDE placeholder='أدخل التعليمات هنا'
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

        <Container style={{'marginBottom':'2rem'}}>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>أسئلة الإمتحان</Typography>
            </ProfileInfos>
          </ProfileHeader>
          {questions.map((question, index) => (
        <SubContainer key={question.id} style={{ position: 'relative',marginBottom:'6rem' }}>
          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>السؤال {index + 1}</Typography>
            <FormControl dir="rtl" style={{ width: "100%", paddingY: '1rem' }}>
              <TextField style={{ width: '100%', paddingY: '1rem' }} placeholder='أدخل السؤال هنا' />
            </FormControl>
          </ProfileDatas>

          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>نوع السؤال</Typography>
            <FormControl dir="rtl" style={{ width: "100%" }}>
              <Select
                dir="rtl"
                style={{ paddingTop: "0px", paddingBottom: '0px' }}
                id="program"
                defaultValue={'all'}
                onChange={()=>setIsWritten(!isWritten)}
              >
                <MenuItem selected disabled value={'all'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> إختر نوع السؤال</span> </MenuItem>
                {questionType.map((qst, index) => (
                  <MenuItem key={index} value={qst.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span>{qst.name}</span> </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ProfileDatas>

          <ProfileDatas style={{ paddingRight: '.5rem' }}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>إجابة السؤال</Typography>
            {isWritten && <FormControl dir="rtl" style={{ width: "100%" }}>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel value="answer1" control={<Radio />} label="الإجابة الأولى" />
                <FormControlLabel value="answer2" control={<Radio />} label="الإجابة الثانية" />
                <FormControlLabel value="answer3" control={<Radio />} label="الإجابة الثالثة" />
                <FormControlLabel value="answer4" control={<Radio />} label="الإجابة الرابعة" />
              </RadioGroup>
            </FormControl>}
          </ProfileDatas>

          <ProfileDatas style={{ paddingRight: '.5rem' }}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>نقطة السؤال</Typography>
            <ExamNoteMaker>
              <Add sx={{ color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
              <span>3</span>
              <Remove sx={{ color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
            </ExamNoteMaker>
          </ProfileDatas>
          <Button variant='primary' style={{ backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green }}>حفظ السؤال</Button>
          <Button variant='primary' onClick={handleAddQuestion} endIcon={<Add/>} style={{'backgroundColor':'white',border:'1px solid' + UISettings.colors.green,color:UISettings.colors.green,width: "fit-content",position:'absolute',bottom:'-4rem',right: rightValue}}>إضافة سؤال</Button>
        </SubContainer>
      ))}
        </Container>

        <Button onClick={()=> navigate('/admin/exams/all')} variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content"}} >حفظ الإمتحان</Button>

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