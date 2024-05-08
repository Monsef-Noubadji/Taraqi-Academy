import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, CircularProgress, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { Add, Check, ErrorOutlineOutlined, Remove, Save, VisibilityOutlined, Warning } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import SwitchIcon from './switchIcon'
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";


export default function AddProgram({windowSize}) {

  const isLG = useMediaQuery('(min-width:1280px)');
  const isMD = useMediaQuery('(min-width:960px)');
  const isSM = useMediaQuery('(min-width:600px)');

  const cols = isLG ? 67 : isMD ? 45 : isSM ? 40 : 40;
  const rightValue = isLG ? '45%' : isMD ? '45%' : isSM ? '40%' : '40%'
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)
  const programs = [
    {id:0, name:"برنامح الهمم"},
    {id:1, name:"برنامج التميز"},
    {id:2, name:"برنامح الأساس"},
  ]

  const sessions = [
  {id:0, name:"10 - 15"},
  {id:1, name:"15 - 20"},
  {id:2, name:"20 فما فوق"},
  ]

  const programDuration = [
    {id:0, name:"6 أشهر"},
    {id:1, name:"سنة"},
    {id:1, name:"سنتين"},
    {id:1, name:"3 سنوات"},
    {id:1, name:"4 سنوات"},
    {id:1, name:"5 سنوات"},    
    ]

    const levels = [
        {id:0, name:"1"},
        {id:1, name:"2"},
        {id:2, name:"3"},
        {id:3, name:"4 "},
        {id:4, name:"5 "},
    ]

    const prices = [
        {id:0, name:"3000"},
        {id:1, name:"4000"},
        {id:2, name:"5000"},
    ]
  const [isWritten,setIsWritten] = useState(true)

    const [questions, setQuestions] = useState([1]);
    const [preview,setPreview] = useState(false)
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, { id: questions.length + 1 }]);
  };

  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  const handlePreview = ()=> {
    setPreview(!preview)
  }




    const [displayedProgram, setDisplayedProgram] = useState({});
    const [loading, setLoading] = useState(true);

    const  id  = useParams();

    async function getProgram() {
        try {
            const response = await axiosInstance.post('/adminApi/getProgram', {id: id.id});
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedProgram(response.data.program)
                setLoading(false)
                setStatus('')
            }else if (response.data.response === 'notFound'){
              setLoading(false)
              setStatus('notFound')
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
            getProgram()
          }
      }, []);

      const [status, setStatus] = useState('notFound');

      if(loading){
        return(
           <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <ToastContainer rtl="true"/>
               <CircularProgress style={{color: UISettings.colors.green}}/>
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
             </div>
           )
      }else if(status === 'notFound'){
        return(
           <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <ToastContainer rtl="true"/>
               <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على الطالب</Typography>
             </div>
           )
      }else{
        return (
          <>
            <ToastContainer rtl="true"/>
        { !preview ? <Body>
              <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} >إدارة البرامج </span> <span> {">"} تعديل برنامج  </span></Typography>
              <Box sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
                    <Button onClick={()=> navigate('/admin/programs/all')} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:UISettings.colors.white,white:'1px solid' + UISettings.colors.green}} >حفظ البرنامج</Button>
                    <Button variant='primary' onClick={handlePreview} endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >معاينة البرنامج</Button>
                  </Box>
              </Box>
      
             <Container>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}> معلومات البرنامج</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                
                <SubContainer>
      
                  <ProfileDatas width={windowSize.width}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>عنوان البرنامج</Typography>
                    <TextField InputProps={{style: { padding: '5px' } }} style={{width: '100%'}} placeholder='أدخل عنوان البرنامج' />
                  </ProfileDatas>
      
                  <ProfileDatas  width={windowSize.width}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف</Typography>
                    <FormControl>
                      <textarea className=' p-3 rounded-lg ' cols={cols}  rows={7} autoComplete='off' placeholder='أدخل وصف البرنامج هنا'  style={{
                       border: '1px solid ' + UISettings.colors.secondary,
                       }}/>
                    </FormControl>
                  </ProfileDatas>
                  
                  <ProfileDatas width={windowSize.width} style={{'alignItems':'start'}}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>السن المقترح</Typography>
                    <FormControl dir="rtl" style={{width: "100%"}}>
                          <Select
                              dir="rtl"
                              style={{paddingTop: "0px", paddingBottom: '0px'}}
                              id="program"
                              //value={age}
                              defaultValue={'all'}
                              //onChange={handleChange}
                          >
                              <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر السن</span> </MenuItem>
                              {sessions.map((session,index)=>(
      
                                  <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                              ))}
                          </Select>
                    </FormControl>
                  </ProfileDatas>
      
                </SubContainer>
              </Container>
      
              <Container style={{'marginBottom':'2rem'}}>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>المدة</Typography>
                  </ProfileInfos>
                </ProfileHeader>
          
              <SubContainer style={{ position: 'relative',marginBottom:'6rem' }}>
              
              <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة البرنامج كاملا</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <Select
                      dir="rtl"
                      style={{ paddingTop: "0px", paddingBottom: '0px' }}
                      id="program"
                      defaultValue={'all'}
                      onChange={()=>setIsWritten(!isWritten)}
                    >
                      <MenuItem selected disabled value={'all'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> إختر مدة البرنامج</span> </MenuItem>
                      {programDuration.map((qst, index) => (
                        <MenuItem key={index} value={qst.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span>{qst.name}</span> </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ProfileDatas>
      
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة الدراسة الفعلية</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <TextField InputProps={{style: { padding: '5px' } }} placeholder='أدخل مدة الدراسة الفعلية'/>
                  </FormControl>
                </ProfileDatas>
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة العطل والامتحانات</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <TextField InputProps={{style: { padding: '5px' } }} placeholder='أدخل مدة العطل والامتحانات'/>
                  </FormControl>
                </ProfileDatas>
      
              </SubContainer>
              </Container>
      
              <Container style={{'marginBottom':'2rem'}}>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>مستويات البرنامج</Typography>
                  </ProfileInfos>
                </ProfileHeader>
      
              <SubContainer style={{ position: 'relative',marginBottom:'6rem' }}>
              
              <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}> عدد مستويات البرنامج</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <Select
                      dir="rtl"
                      style={{ paddingTop: "0px", paddingBottom: '0px' }}
                      id="program"
                      defaultValue={'all'}
                      onChange={()=>setIsWritten(!isWritten)}
                    >
                      <MenuItem selected disabled value={'all'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> إختر عدد المستويات</span> </MenuItem>
                      {levels.map((qst, index) => (
                        <MenuItem key={index} value={qst.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span>{qst.name}</span> </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </ProfileDatas>
      
              </SubContainer>
              </Container>
      
              <Container style={{'marginBottom':'2rem'}}>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>سعر الإشتراك</Typography>
                  </ProfileInfos>
                </ProfileHeader>
              
              <SubContainer style={{ position: 'relative',marginBottom:'6rem' }}>
              
              <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>  سعر الإشتراك</Typography>
                  <FormControl dir="rtl" style={{ width: "100%" }}>
                    <Select
                      dir="rtl"
                      style={{ paddingTop: "0px", paddingBottom: '0px' }}
                      id="program"
                      defaultValue={'all'}
                      onChange={()=>setIsWritten(!isWritten)}
                    >
                      <MenuItem selected disabled value={'all'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span> إختر سعر الإشتراك </span> </MenuItem>
                      {prices.map((qst, index) => (
                        <MenuItem key={index} value={qst.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}> <span>{qst.name}</span> </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </ProfileDatas>
      
      
              </SubContainer>
              </Container>
      
              <Container style={{'marginBottom':'2rem'}}>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تفعيل البرنامج</Typography>
                  </ProfileInfos>
                </ProfileHeader>
      
              <SubContainer style={{ position: 'relative',marginBottom:'6rem' }}>
              
                  <ProfileDatas style={{'flexDirection':'row',alignItems:'center'}}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل هذا البرنامج ليتمكن الطلاب من التسجيل فيه </Typography>
                      <SwitchIcon sx={{'marginRight':'10px'}}/>
                  </ProfileDatas>  
      
              </SubContainer>
              </Container>
      
              <Button onClick={()=> navigate('/admin/programs/all')} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content"}} >حفظ البرنامج</Button>
          </Body>
          :
          <Body>
              <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/admin/programs/all')} style={{cursor: 'pointer'}} > إدارة البرامج </span> <span> {">"} تفاصيل برامج الهمم  </span></Typography>
              <Button variant='primary' onClick={handlePreview} endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >العودة إلى تعديل البرنامج</Button>
              <Container>
                  <Info width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>عنوان البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width} style={{color: UISettings.colors.black, fontWeight: 600}}> 
                          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={"35"} style={{margin: '0px 0px', marginLeft: '10px'}} />
                        {displayedProgram.name}.</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>وصف البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width}>برنامج لحفظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات.برنامج لحفظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات.فظ القرآن الكريم كاملا مع التجويد  بالاضافة لحفظ الغريب و قراءة التفسير المختصر له في مدة ثلاث سنوات</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>السن المقترح</InfosTitle> 
                      <InfosContent  width={windowSize.width}>13 سنة فما فوق</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة البرنامج كاملا</InfosTitle> 
                      <InfosContent  width={windowSize.width}>3 سنوات</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة الدراسة الفعلية</InfosTitle> 
                      <InfosContent  width={windowSize.width}>30 شهرا ( 10 أشهر كل سنة)</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة العطل و الامتحانات</InfosTitle> 
                      <InfosContent  width={windowSize.width}>6 أشهر ( شهرين كل سنة)</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>عدد المستويات</InfosTitle> 
                      <InfosContent  width={windowSize.width}>7 مستويات</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>السنة الأولى</InfosTitle> 
                      <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>السنة الثانية</InfosTitle> 
                      <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>السنة الثالثة</InfosTitle> 
                      <InfosContent  width={windowSize.width}>ثلاث مستويات, المستوى الأول: شهران, والمستوى الثاني: ثلاثة أشهر, والمستوى الثالث: خمسة أشهر</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>سعر البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width}>5000.00 دج</InfosContent> 
                  </Info>
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
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`

const Info = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'};
  justify-content: start;
`

const InfosTitle = styled.div`
  width: ${props => props.width > UISettings.devices.phone ? '20%' : '100%'};
  min-width: 130px;
  border-left: ${props => props.width > UISettings.devices.phone ? '1px solid ' + UISettings.colors.secondary : 'none'};
  border-bottom: ${props => props.width > UISettings.devices.phone ? 'none' : '1px solid ' + UISettings.colors.secondary};
  text-align: end;
  padding: 10px;
`

const InfosContent = styled.div`
  width:${props => props.width > UISettings.devices.phone ? '80%' : '100%'};
  padding: 10px;
  text-align: end;
  color: ${UISettings.colors.secondary};
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
`
