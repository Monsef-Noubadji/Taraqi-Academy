import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, FormControl, FormControlLabel, CircularProgress, MenuItem, Radio, RadioGroup, Select, IconButton, TextField, Typography, useMediaQuery, Autocomplete } from '@mui/material'
import { Add, AddCircleOutlineOutlined, Check, Delete, Remove, RemoveCircleOutlineOutlined, Save, VisibilityOutlined, Warning } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import React, { useEffect, useRef, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Editor from './editor'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from '../student/errorHandler'
import axiosInstance from '../student/axiosInstance'
import { LoadingButton } from '@mui/lab'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs'


export default function AddExam({windowSize}) {

  const isLG = useMediaQuery('(min-width:1280px)');
  const isMD = useMediaQuery('(min-width:960px)');
  const isSM = useMediaQuery('(min-width:600px)');

  const cols = isLG ? 67 : isMD ? 45 : isSM ? 40 : 40;
  const rightValue = isLG ? '45%' : isMD ? '45%' : isSM ? '40%' : '40%'
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)
  

  const [programs, setPrograms] = useState([
    {id:0, name:"برنامح الهمم"},
    {id:1, name:"برنامج التميز"},
    {id:2, name:"برنامح الأساس"},
  ]);

  const sessions = [
  {id:0, name:"حلقة الهمم"},
  {id:1, name:"حلقة التميز"},
  {id:2, name:"حلقة الأساس"},
  ]
  
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('simpleExam');
  const [description, setDescription] = useState('');
  var currentDate = new Date()
  const [startExam, setStartExam] = React.useState(dayjs(currentDate))
  const [endExam, setEndExam] =React.useState(dayjs(currentDate));
  const [instructions, setInstructions] = useState('');
  const [time, setTime] = useState(60);


  // const [questions, setQuestions] = useState([1]);
  const [preview,setPreview] = useState(false)
  

  
  const handlePreview = ()=> {
    setPreview(!preview)
  }

  const [questions, setQuestions] = useState([
    {
      question: "",
      type: 'text',
      point: 0,
      options: [
        {
          value: '',
          answer: false
        },
        {
          value: '',
          answer: false
      }]
    }
  ]);

  const [questionsChange, setQuestionsChange] = useState(0);

  function updateObjectToArray(key, field, value) {
    var data = questions

    if(field === 'question'){
      data[key].question = value
    }else if(field === 'type'){
      data[key].type = value
    }else if(field === 'point'){
      data[key].point = value
    }
    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }

  function updateObjectToArrayInOptions(questionKey, optionKey, field, value) {
    console.log(questionKey, optionKey, field, value)
    var data = questions
    if(field === 'value'){
      data[questionKey].options[optionKey].value = value
    }else if(field === 'answer'){
      data[questionKey].options[optionKey].answer = value
    }

    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }

  function removeLastObjectFromArray(index) {
    var data = questions
    if ( data[index].options.length > 0) {
        data[index].options.pop(); // Removes the last element from the array
    }
    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }
  function addObjectToArray(index) {
    var data = questions
    data[index].options.push({value: '', answer: false})
    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }
  function addObjectToQuestions(index) {
    var data = questions
    data.splice(index + 1, 0, {
      question: "",
      type: 'text',
      options: [
        {
          value: '',
          answer: false
        }],
      point: 0
    });
    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }
  function removeLastObjectFromQuestions(index) {
    var data = questions
    if ( data.length > 1) {
      data.splice(index, 1) // Removes the last element from the array
    }else{
      toast.error("يجب أن يحتوي الامتحان على سؤال واحد على الأقل", {
        position: 'top-right',
        progress: undefined,
        autoClose: 3000,
        theme: 'colored'
      });
    }
    setQuestions(data)
    setQuestionsChange(questionsChange + 1)
  }
  const [isCorrect, setIsCorrect] = useState(false);
  const [text, setText] = useState('');


  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  async function createExamBaseInfo() {
    try {
        setLoading(true)
        const response = await axiosInstance.post('/adminApi/createExamBaseInfo');
        console.log(response.data)
        if(response.data.response === 'done'){
          setGroups(response.data.groups)
          setLoading(false)
        }
    } catch (error) {
        errorHandler(error, toast, navigate)
    }
  }
const isMounted = useRef(true);
    
useEffect(() => {
  return () => {
  // Cleanup function to set isMounted to false when component unmounts
  isMounted.current = false;
  };
}, []);

useEffect(() => {
    if (isMounted.current) {
      createExamBaseInfo()
    }
}, []);

const [loadinCreateExam, setLoadinCreateExam] = useState(false);
async function createExam() {
  try {
      setLoadinCreateExam(true)
      const response = await axiosInstance.post('/adminApi/createExam', {title, type, selectedGroups, time, description, startExam, endExam, instructions, questions });
      //console.log(response.data)
      if(response.data.response === 'done'){
        //setGroups(response.data.groups)
        setLoadinCreateExam(false)
        toast.success("تم إنشاء الامتحان بنجاح", {
          position: 'top-right',
          progress: undefined,
          autoClose: 3000,
          theme: 'colored'
        });
        setTimeout(() => {
          navigate('/admin/exams/all')
        }, 2000);
      }
  } catch (error) {
      setLoadinCreateExam(false)
      errorHandler(error, toast, navigate)
  }
}

const [note, setNote] = useState(0);
const [noteChanges, setNoteChanges] = useState(0);
useEffect(() => {
  var data = 0
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(question.point)
    if(question && question.point && !isNaN(question.point)){
      data = data + Number(question.point) 
    }
    setNote(data)
    setNoteChanges(noteChanges + 1)
  }
}, [questionsChange]);



  if(loading){
    return(
        <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ToastContainer rtl="true"/>
            <CircularProgress style={{color: UISettings.colors.green}}/>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
        </div>
    )
  }else{
    return (
      <>
      <ToastContainer rtl="true"/>
    { !preview ? <Body>
          <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >إدارة الإمتحانات </span> <span> {">"} إنشاء إمتحان  </span></Typography>
          <Box sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
                <LoadingButton  loading={loadinCreateExam} loadingPosition={"center"} onClick={()=> createExam()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content"}} >إنشاء الإمتحان</LoadingButton>
                <Button variant='primary' onClick={handlePreview} endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >معاينة الإمتحان</Button>
              </Box>
              <Typography variant="p" display={'flex'} alignItems={'center'} gap={'.5rem'}> 
              <p style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem', direction: 'rtl'}}>{note} نقاط</p>
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
  
            <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>عنوان الإمتحان</Typography>
                <TextField style={{width: '100%'}} placeholder='أدخل عنوان الامتحان' value={title} onChange={(e)=> setTitle(e.target.value)} />
              </ProfileDatas>
  
              <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>نوع الامتحان</Typography>
                <FormControl dir="rtl" style={{width: "100%"}}>
                      <Select
                          dir="rtl"
                          style={{paddingTop: "0px", paddingBottom: '0px'}}
                          id="program"
                          value={type}
                          // defaultValue={'alll'}
                          onChange={(e)=> setType(e.target.value)}
                      >
                          <MenuItem  value={'levelUpExam'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>امتحان رفع المستوى</span> </MenuItem>
                          <MenuItem selected  value={'simpleExam'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>امتحان</span> </MenuItem>
                      </Select>
                </FormControl>
              </ProfileDatas>
              
  
              <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الحلقة</Typography>
                <Autocomplete
                className='autocompleteFreeSolo'
                multiple
                id="tags-readOnly"
                options={groups.map((option) => option)}
                getOptionLabel={(option) => option.name}
                ListboxProps={{
                  style: { direction: 'rtl', /* Add any other styles here */ }
                }}
                groupBy={(option) => option.program}
                onChange={(e, value) => setSelectedGroups(value)}
                style={{width: '100%', direction: 'rtl'}}
                renderInput={(params) => (
                  <TextField placeholder='إختر الحلقة' style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }}  {...params} />
                )}
              />
              </ProfileDatas>
  
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>وقت الامتحان (بالدقائق)</Typography>
                <TextField style={{width: '100%'}} value={time} onChange={(e)=> setTime(e.target.value)} type='number' placeholder='أدخل وقت الامتحان (بالدقائق)' />
              </ProfileDatas>
              
              <ProfileDatas>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف (إختياري)</Typography>
                <Editor text={description} setText={setDescription} />
              </ProfileDatas>
  
              {/* <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف (إختياري)</Typography>
                <FormControl>
                  <textarea className=' p-3 rounded-lg ' cols={cols}  rows={7} autoComplete='off' placeholder='أدخل الإجابة النموذجية هنا'  style={{
                   border: '1px solid ' + UISettings.colors.secondary,
                   }}/>
                </FormControl>
              </ProfileDatas> */}
  
              <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تاريخ بداية الإمتحان</Typography>
                {/* <TextField  InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} style={{width: '100%'}} type='datetime-local' value={startExam} onChange={(e)=> setStartExam(e.target.value)} placeholder='تاريخ بداية الإمتحان' /> */}
                <LocalizationProvider style={{width: '100%', backgroundColor: 'red'}} dateAdapter={AdapterDayjs}>
                  <DemoContainer style={{width: '100%', backgroundColor: 'green'}} components={['DateTimePicker']}>
                    <DateTimePicker ampm={false} value={startExam} onChange={(newValue)=> setStartExam(newValue)} format="HH:mm DD/MM/YYYY" hours12={false} style={{width: '100%', backgroundColor: 'yellow'}}  />
                  </DemoContainer>
                </LocalizationProvider>
              
              </ProfileDatas>
  
              <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تاريخ نهاية الإمتحان</Typography>
                {/* <TextField style={{width: '100%'}} type='date' value={endExam} onChange={(e) => setEndExam(e.target.value)} placeholder='تاريخ نهاية الإمتحان' /> */}
                <LocalizationProvider style={{width: '100%', backgroundColor: 'red'}} dateAdapter={AdapterDayjs}>
                  <DemoContainer style={{width: '100%', backgroundColor: 'green'}} components={['DateTimePicker']}>
                    <DateTimePicker ampm={false} value={endExam} onChange={(newValue)=> setEndExam(newValue)} format="HH:mm DD/MM/YYYY" hours12={false} style={{width: '100%', backgroundColor: 'yellow'}}  />
                  </DemoContainer>
                </LocalizationProvider>
              </ProfileDatas>
  
              {/* <ProfileDatas>
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
              </ProfileDatas> */}
  
              <ProfileDatas>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تعليمات خاصة بالإمتحان</Typography>
                <Editor text={instructions} setText={setInstructions} />
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
              <SubContainer key={question.id} style={{ position: 'relative',marginBottom:'20px',paddingBottom:'20px',paddingTop: '20px', border: '1px solid #F3F3F3', borderRadius: '10px' }}>
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>السؤال {index + 1} <IconButton onClick={() =>removeLastObjectFromQuestions(index)} style={{backgroundColor: 'red', padding: '5px', color: 'white'}}><Delete style={{fontSize: '15px'}} /></IconButton> </Typography>
                  <FormControl dir="rtl" style={{ width: "100%", paddingY: '0rem' }}>
                    <TextField style={{ width: '100%', paddingY: '0rem' }} value={question.question} onChange={(e)=>updateObjectToArray(index, 'question', e.target.value)} placeholder='أدخل السؤال هنا' />
                  </FormControl>
                </ProfileDatas>
  
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>نوع السؤال</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <Select
                      dir="rtl"
                      style={{ paddingTop: "0px", paddingBottom: '0px' }}
                      id="program"
                      value={question.type}
                      onChange={(e)=>updateObjectToArray(index, 'type', e.target.value)}
                    >
                      <MenuItem value={'text'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> إجابة مكتوبة</span> </MenuItem>
                      <MenuItem value={'options'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> خيار من متعدد</span> </MenuItem>
                    </Select>
                  </FormControl>
                </ProfileDatas>
  
                <ProfileDatas style={{display : question.type === 'text' ? 'none' : 'flex', marginBottom: '-10px', marginTop: '-5px'}} width={windowSize.width}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> الخيارات <IconButton onClick={()=> addObjectToArray(index) } style={{color: UISettings.colors.green, padding: '5px'}}><AddCircleOutlineOutlined/></IconButton> {question.options.length} <IconButton onClick={()=> removeLastObjectFromArray(index) } style={{color : 'red', padding: '5px'}}><RemoveCircleOutlineOutlined/></IconButton> </Typography>
                </ProfileDatas>
                <ProfileDatas width={windowSize.width}>
                </ProfileDatas> 
                {
                  question.type === 'options' ?
                    question.options.map((option, key) => {
                      return(
                        <>
                          <ProfileDatas width={windowSize.width}>
                              <TextField InputProps={{style: { padding: '0px 5px' } }} style={{width: '100%'}} value={option.value} onChange={(e)=> updateObjectToArrayInOptions(index, key, 'value', e.target.value)} placeholder='أدخل الخيار ' />
                          </ProfileDatas>
                          <ProfileDatas  onClick={(e)=> {updateObjectToArrayInOptions(index, key, 'answer', !questions[index].options[key].answer)}} width={windowSize.width} style={{'flexDirection':'row',alignItems:'center'}}>
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>خيار صحيح؟</Typography>
                            <SwitchIcon change={setIsCorrect}  open={questions[index].options[key].answer} sx={{'marginRight':'5px'}}/>
                          </ProfileDatas>  
                        </>
                      )
                    })
                  :
                  <span></span>
                } 
  
              
  
                <ProfileDatas style={{ paddingRight: '.5rem', marginTop: question.type === 'text' ? '-10px' : '5px' }}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>نقطة السؤال</Typography>
                  {/* <ExamNoteMaker>
                    <Add sx={{ color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
                    <span>3</span>
                    <Remove sx={{ color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
                  </ExamNoteMaker> */}
                  <TextField style={{ width: '100%', paddingY: '0rem', maxWidth: '250px' }} type='number' value={question.point} onChange={(e)=>updateObjectToArray(index, 'point', e.target.value)} placeholder='أدخل نقطة السؤال ' />
                </ProfileDatas>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '-70px', zIndex: '10'}}>
                  <Button onClick={()=> addObjectToQuestions(index)} variant='primary' endIcon={<AddCircleOutlineOutlined style={{marginRight: '10px'}}/>} style={{alignSelf: 'left', width: "max-content", color: UISettings.colors.green, backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, height: '60px'}} >إضافة سؤال</Button>
                </div>
              </SubContainer>
            ))}
  
  
          </Container>
  
          <LoadingButton  loading={loadinCreateExam} loadingPosition={"center"} onClick={()=> createExam()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content"}} >إنشاء الإمتحان</LoadingButton>
      </Body>
      :
      <Body>
        <Container style={{'padding':'2rem'}}>
          <Box display={'flex'} alignItems={'start'} justifyContent={'space-between'}>
            <Typography variant="p" sx={{backgroundColor:UISettings.colors.gray,padding:'.5rem',borderRadius:'5px'}}>{note}/{note}</Typography>
            <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >إنشاء إمتحان </span> <span> {">"} معاينة الإمتحان  </span></Typography>
          </Box>
          <Box display={'flex'}  flexDirection={'column'} alignItems={'end'} gap={'1rem'} borderRadius={'5px'} marginY={'1rem'} bgcolor={UISettings.colors.brownBG} padding={'1rem'} border={'.5px solid'+ UISettings.colors.brown}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={'.5rem'}>
              <Typography variant="h6">تنويه قبل إجراء الإمتحان</Typography>
              <Warning sx={{color:UISettings.colors.orange}}></Warning>
            </Box>
            <Typography dangerouslySetInnerHTML={{ __html: instructions }} variant="p"></Typography>
          </Box>
            <ProfileHeader style={{marginTop: '15px',marginBottom: '15px',paddingRight:'1rem'}}>  
                    <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                    <ProfileInfos>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>أسئلة {title}</Typography>
                    </ProfileInfos>
            </ProfileHeader>
                  
            <SubContainer style={{'paddingRight':'1rem','paddingLeft':'1rem'}}>

                    {
                      questions.map((question, key) => {
                        if(question.type === 'options'){
                          return(
                            <ProfileDatas style={{marginTop: "3px", marginBottom: '3px', borderRadius: '10px', padding: '10px 20px', border: '1px solid #F3F3F3'}}  key={key} >
                              <section className='flex items-center justify-between w-full'>
                              <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>{key + 1 } - {question.question} </Typography>
                              <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} نقطة</span>
                              </section>
                              <FormControl sx={{padding:'0rem'}}>
                                  <RadioGroup
                                    aria-labelledby="controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                  >
                                    {
                                      question.options.map((option, index)=>{
                                        return(
                                          <FormControlLabel key={index} checked={option.answer} value="answer1" control={<Radio />} label={option.value} />
                                        )
                                      })
                                    }
                                  </RadioGroup>
                              </FormControl>
                            </ProfileDatas>
                          )
                        }else if(question.type === 'text'){
                          return(
                            <ProfileDatas style={{marginTop: "3px", marginBottom: '3px', borderRadius: '10px', padding: '10px 20px', border: '1px solid #F3F3F3'}}  key={key} >
                              <section className='flex items-center justify-between w-full'>
                              <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "0px"}}>{key + 1 } - {question.question} </Typography>
                              <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} نقطة</span>
                              </section>
                            </ProfileDatas>
                          )
                        }
                      })
                    }
                   


                    {/* <ProfileDatas>
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
                      <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>أربع نقاط</span>
                      </section>
                        <FormControl  sx={{paddingX:'2rem',paddingY:'2rem'}}>
                         <textarea className=' p-3 rounded-lg ' cols={cols}  rows={7} autoComplete='off' placeholder='أدخل الإجابة النموذجية هنا'  style={{
                          border: '1px solid ' + UISettings.colors.secondary,
                          }}/>
                      </FormControl>
                    </ProfileDatas> */}
            </SubContainer>
            <Button variant='primary' onClick={handlePreview} endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:'white',border:'1px solid' + UISettings.colors.green}} >العودة إلى الإمتحان</Button>
        </Container>
      </Body>
    }
      </>
    )
  }
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