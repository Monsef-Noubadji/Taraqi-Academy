import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress, TextField, Radio, RadioGroup, FormControlLabel} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import AdvancedAlert from './advancedAlert'
import { Check, ErrorOutlineOutlined, Save, SaveAltOutlined, Upload, Warning } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomPagination from './CustomPagination'
import axiosInstance from './axiosInstance'
import errorHandler from './errorHandler'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';





export default function Exam({windowSize}) {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [examInfo, setexamInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const  id  = useParams();
    async function getExam() {
        try {
            const response = await axiosInstance.post('/studentApi/getExam', { examId: id.id });
            console.log(response)
            if(response.data.response === 'done'){
               console.log(response.data)
               setLoading(false)
               setExam(response.data.exam)
               setexamInfo(response.data.examInfo)
               setErrorMessage('')
               if(response.data.exam && response.data.exam.answers){
                setQuestions(JSON.parse(response.data.exam.answers))
               }
            }else{
              setLoading(false)
              setErrorMessage(response.data.message)
            }
        } catch (error) {
            setLoading(false)
            setErrorMessage('لا يمكن الوصول إلى الامتحان')
            errorHandler(error, toast, navigate)
        }
    }

    const [loadingSave, setLoadingSave] = useState(false);
    async function saveExam() {
      try {
          setLoadingSave(true)
          const response = await axiosInstance.post('/studentApi/saveExam', { studentExamId: exam.id, answers: questions });
          setLoadingSave(false)
          toast.success(response.data.message, {
            position: 'top-right',
            progress: undefined,
            autoClose: 1500,
            theme: 'colored'
          });
          setTimeout(() => {
            navigate('/student/exams/', {replace: true})
          }, 2000);
      } catch (error) {
          setLoadingSave(false)
          setLoading(false)
          // setErrorMessage('لا يمكن الوصول إلى الامتحان')
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
            getExam()
        }
    }, []);


    const [questionsChange, setQuestionsChange] = useState(0);
    function updateObjectToArrayInOptions(questionKey, optionKey, value) {
      console.log(questionKey, optionKey, value)
      var data = questions
      if(data[questionKey] && data[questionKey].type === 'text'){
        data[questionKey].answer = value
      }else if(data[questionKey] && data[questionKey].type === 'options'){
        for (let i = 0; i < data[questionKey].options.length; i++) {
          // const item = data[questionKey].options[i];
          data[questionKey].options[i].answer = false
        }
        data[questionKey].options[optionKey].answer = value
      }
      
  
      setQuestions(data)
      setQuestionsChange(questionsChange + 1)
    }
  
   
    const [errorMessage, setErrorMessage] = useState('');

    const [timeLeft, setTimeLeft] = useState('');

  function calculateTimeLeft() {
    if(exam && exam.createdAt && examInfo && examInfo.time){
      
      const endTime = new Date(exam.createdAt);
      endTime.setMinutes(endTime.getMinutes() + Number(examInfo.time));
  
      const difference = endTime - new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
        return  (timeLeft.hours > 0 ? timeLeft.hours + ':' : '') + timeLeft.minutes + ':' + timeLeft.seconds;
      }else{
        return '00:00'
      }
    }else{
      return '00:00';
    }

  }

  setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //   console.log(exam)
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);
  
  if(loading){
    return(
      <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ToastContainer rtl="true"/>
        <CircularProgress style={{color: UISettings.colors.green}}/>
        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ..</Typography>
      </div>
    )
  }else if (errorMessage.length > 0){
    return(
      <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ToastContainer rtl="true"/>
          <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>{errorMessage}</Typography>
        </div>
      )
  }else{
    return (
      <Body>
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px'}}>امتحاناتي {">"} جميع الامتحانات</Typography>
          <ToastContainer rtl="true"/>
          
          <LoadingButton  loading={loadingSave} loadingPosition={"center"} onClick={()=> saveExam()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content", marginTop: '0px'}} >إنهاء الامتحان </LoadingButton>


          <Container>
                    <ProfileHeader style={{marginTop: '15px',marginBottom: '15px', flexWrap: 'wrap'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{examInfo && examInfo.title ? examInfo.title : ''}</Typography>
                      </ProfileInfos>
                    <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginRight: '20px', flex: 1, textAlign: 'left', minWidth: '150px'}}>الوقت المتبقي <span style={{marginRight: '10px'}}>{timeLeft}</span> </Typography>
                    </ProfileHeader>


                    
                    {
                      examInfo && examInfo.instructions ? 
                      
                      <Box display={'flex'}  flexDirection={'column'} alignItems={'end'} gap={'1rem'} borderRadius={'5px'} marginY={'1rem'} bgcolor={UISettings.colors.brownBG} padding={'1rem'} border={'.5px solid'+ UISettings.colors.brown}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={'.5rem'}>
                          <Typography variant="h6">تنويه قبل إجراء الإمتحان</Typography>
                          <Warning sx={{color:UISettings.colors.orange}}></Warning>
                        </Box>
                        <Typography dangerouslySetInnerHTML={{ __html: examInfo.instructions }} style={{textAlign: 'right'}} variant="p"></Typography>
                      </Box>
                      :
                      ''
                    }
                    

                    <SubContainer>

                      {
                        questions.map((question, index) => {
                          if(question.type === 'text'){
                            return(
                            <ProfileDatas key={index}>
                              <section className='flex items-center justify-between w-full'>
                              <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "0px"}}>{index + 1}- {question.question} </Typography>
                              
                              <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} نقطة</span>
                              </section>
                              <TextField value={question.answer} onChange={(e)=> updateObjectToArrayInOptions(index, 0, e.target.value)} style={{ width: '100%', paddingY: '0rem', marginTop: '10px', maxWidth: '450px'}}  type='text'  placeholder='أدخل الإجابة' />
                            </ProfileDatas>
                            )
                          }else if (question.type === 'options'){
                            return(
                              <ProfileDatas key={index}>
                              <section className='flex items-center justify-between w-full'>
                              <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "0px"}}>{index + 1}- {question.question}</Typography>
                              <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} نقطة</span>
                              </section>
                              <FormControl sx={{padding:'0px 1rem'}}>
                                  <RadioGroup
                                    aria-labelledby="controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                  >
                                    {question.options.map((option, key)=> {
                                      return(
                                        <FormControlLabel key={key} checked={option.answer} onClick={()=> updateObjectToArrayInOptions(index, key, !option.answer)} value="answer1" control={<Radio />} label={option.value} />
                                      )
                                    })}
                                  </RadioGroup>
                              </FormControl>
                            </ProfileDatas>
                            )
                          }
                        })
                      } 
                   
                    </SubContainer>
    
                  </Container>
        
                  <LoadingButton  loading={loadingSave} loadingPosition={"center"} onClick={()=> saveExam()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content", marginTop: '0px'}} >إنهاء الامتحان </LoadingButton>
                      
          
  
          
  
      </Body>
    )
  }
  
}



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
  margin-top: 10px;
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



const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`





const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px 0px;
  background-image: url('./../../../../src/assets/lightStar.svg');
  background-position: -80px 0px;
  background-size: 300px;
  background-repeat: no-repeat;

`
const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
`
const CardsContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
`


const arabicTheme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        components: {
          Pagination: CustomPagination,
        },
      },
    },
  },
});

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px', // Adjust margin as needed
    marginTop: '10px', // Adjust margin as needed
    width: '100%'
  },
};

const ProfileDatas = styled.div`
    margin: ${(props) => props.width > UISettings.devices.phone ? '7px 10px' : '7px 0px' };
    width: ${(props) => props.width > UISettings.devices.phone ? 'calc(50% - 20px)' : 'calc(100%)' } ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    direction: rtl;
    border: 1px solid #F3F3F3;
    border-radius: 10px;
    padding: 10px 20px;
`




const rows = [
  { id: 1, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 2, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 3, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notStarted', result: "--" },
  { id: 4, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 5, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 6, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 7, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 8, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 10, title: 'الاختبار التفاعلي 1', start: ' فيفري 2025', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 20, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 30, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notStarted', result: "--" },
  { id: 40, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 50, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 60, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 70, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 80, type: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', amount: "--" },
];