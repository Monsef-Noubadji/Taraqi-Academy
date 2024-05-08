import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Autocomplete, Box, Button, CircularProgress, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { Add, Check, Remove, Save, Send, VisibilityOutlined, Warning } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Editor from './editor'
import { LoadingButton } from '@mui/lab'
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";


export default function AskForReport({windowSize}) {

  const navigate = useNavigate()
  const programs = [
    {id:0, name:" محمد عبد الرحمان"},
    {id:1, name:"أحمد عبيد محمد صالح"},
    {id:2, name:"خليل المالكي"},
  ]

  const [text, setText] = useState('');
  const [receivers, setReceivers] = useState([]);
  const [title, setTitle] = useState('');


  const [loading, setLoading] = useState(true);
  const [displayedTeachers, setDisplayedTeachers] = useState([]);

  async function askForReportBaseInfo() {
    try {
        setLoading(true)
        const response = await axiosInstance.post('/adminApi/askForReportBaseInfo');
        console.log(response.data)
        if(response.data.response === 'done'){
          setDisplayedTeachers(response.data.teachers)
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
      askForReportBaseInfo()
    }
}, []);

const [loadingSend, setLoadingSend] = useState(false);

async function askForReport() {
  try {
      setLoadingSend(true)
      const response = await axiosInstance.post('/adminApi/askForReport', {receivers, title, text});
      console.log(response.data)
      if(response.data.response === 'done'){
        toast.success(response.data.message, {
          position: 'top-right',
          progress: undefined,
          autoClose: 3000,
          theme: 'colored'
        });
        setLoadingSend(false)
      }
  } catch (error) {
      setLoadingSend(false)
      errorHandler(error, toast, navigate)
  }
}

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
     <Body>
        <ToastContainer rtl="true"/>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '15px', marginTop: '-20px'}}><span onClick={()=> navigate('/admin/reports/all')} style={{cursor: 'pointer'}} >إدارة التقارير </span> <span> {">"} طلب تقرير  </span></Typography>
  
       <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}> معلومات طلب التقرير</Typography>
            </ProfileInfos>
          </ProfileHeader>
          
          <SubContainer>
            {/* <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إسم المرسل</Typography>
              <TextField style={{width: '100%'}} placeholder='العيد عبود' />
            </ProfileDatas> */}
  
            <ProfileDatas style={{width: '100%'}}>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المرسل إليه</Typography>
          
            <Autocomplete
              className='autocompleteFreeSolo'
              multiple
              id="tags-readOnly"
              options={displayedTeachers.map((option) => option)}
              getOptionLabel={(option) => option.name}
              ListboxProps={{
                style: { direction: 'rtl', /* Add any other styles here */ }
              }}
              groupBy={(option) => option.program}
              onChange={(e, value) => setReceivers(value)}
              style={{width: '100%', direction: 'rtl'}}
              renderInput={(params) => (
                <TextField placeholder='أدخل الأستاذ المرسل إليه' style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }}  {...params} />
              )}
            />
          
              {/* <FormControl dir="rtl" style={{width: "100%"}}>
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
              </FormControl> */}
            </ProfileDatas>
  
            <ProfileDatas>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> عنوان التقرير</Typography>
              <TextField style={{width: '100%'}} value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='أدخل عنوانا للتقرير' />
            </ProfileDatas>
  
            <ProfileDatas>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> عنوان التقرير</Typography>
              <Editor text={text} setText={setText} />
            </ProfileDatas>
  
            {/* <ProfileDatas>
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
            </ProfileDatas> */}
          </SubContainer>
        </Container>
  
        <LoadingButton onClick={()=> askForReport()} loading={loadingSend} loadingPosition='center' variant='primary' endIcon={<Send/>} style={{alignSelf: 'left', width: "fit-content"}} >إرسال الطلب</LoadingButton>
    </Body>
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