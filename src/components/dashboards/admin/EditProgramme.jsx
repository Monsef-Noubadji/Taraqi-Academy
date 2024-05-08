import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Autocomplete, Box, Button, CircularProgress, FormControl, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { Add, AddCircleOutlineOutlined, Check, CheckBox, EditOutlined, ErrorOutlineOutlined, Remove, RemoveCircleOutlineOutlined, Save, VisibilityOutlined, Warning } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import SwitchIcon from './switchIcon'
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab'


export default function UpdateProgram({windowSize}) {

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
  "10 - 15",
  "15 - 20",
  "20 فما فوق",
  ]

  const programDuration = [
    "6 أشهر",
    "سنة",
    "سنتين",
    "3 سنوات",
    "4 سنوات",
    "5 سنوات",    
    ]

    const levels = [1, 2, 3, 4, 5]

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


  const [semesterChanges, setSemesterChanges] = useState(0);
  const [semesters, setSemesters] = useState([]);
  function removeLastObjectFromArray() {
    var data = semesters
    if ( data.length > 0) {
        data.pop(); // Removes the last element from the array
    }
    setSemesters(data)
    setSemesterChanges(semesterChanges + 1)
  }
  function addObjectToArray() {
    var data = semesters
    data.push({name: '', message: ''})
    console.log(data)
    setSemesters(data)
    setSemesterChanges(semesterChanges + 1)
  }
  function updateObjectToArray(key, field, value) {
    var data = semesters
    if(field === 'name'){
      data[key].name = value
    }else{
      data[key].message = value
    }
    setSemesters(data)
    setSemesterChanges(semesterChanges + 1)
  }
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [duration, setDuration] = useState('');
  const [studyDuration, setStudyDuration] = useState('');
  const [vacationDuration, setVacationDuration] = useState('');
  const [level, setlevel] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ageError, setAgeError] = useState('ss');
  const [durationError, setDurationError] = useState('');
  const [studyDurationError, setStudyDurationError] = useState('');
  const [vacationDurationError, setVacationDurationError] = useState('');
  const [levelError, setlevelError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [statusError, setStatusError] = useState(true);
  const [loadingCreation, setLoadingCreation] = useState(false);

const  id  = useParams();


  async function updateProgram() {
    try {
        setLoadingCreation(true)
        const response = await axiosInstance.post('/adminApi/updateProgram', {id: id.id, name, description, age, duration, studyDuration, vacationDuration, semesters, level, price, status});
        console.log(response.data)
        if(response.data.response === 'done'){
          toast.success(response.data.message, {
            position: 'top-right',
            progress: undefined,
            autoClose: 1000,
            theme: 'colored'
          });
          setTimeout(() => {
            setLoadingCreation(false)
            navigate('/admin/programs/all')
          }, 1000);
        }
    } catch (error) {
        setLoadingCreation(false)
        errorHandler(error, toast, navigate)
    }
}


const [loading, setLoading] = useState(true);
const [displayedProgram, setDisplayedProgram] = useState({});

async function getProgram() {
    try {
        const response = await axiosInstance.post('/adminApi/getProgram', {id: id.id});
        console.log(response.data)
        if(response.data.response === 'done'){
          if(response.data.program){
            setDisplayedProgram(response.data.program)
            if(response.data.program && response.data.program.levelsDescription){
              if(JSON.parse(response.data.program.levelsDescription)){
                setSemesters(JSON.parse(response.data.program.levelsDescription))
              }
            }
            setName(response.data.program.name)
            setDescription(response.data.program.description)
            setAge(response.data.program.age)
            setDuration(response.data.program.duration)
            setStudyDuration(response.data.program.studyDuration)
            setVacationDuration(response.data.program.vacationDuration)
            setlevel(response.data.program.levels)
            setPrice(response.data.program.price)
            setStatus(response.data.program.status === 'available' ? true : false)
            setLoading(false)
            setProgramStatus('')
          }else{
            setLoading(false)
            setProgramStatus('notFound')
          }
        }else if (response.data.response === 'notFound'){
          setLoading(false)
          setProgramStatus('notFound')
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

const [programstatus, setProgramStatus] = useState('notFound');

  if(loading){
    return(
      <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ToastContainer rtl="true"/>
          <CircularProgress style={{color: UISettings.colors.green}}/>
          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
        </div>
      )
  }else if(programstatus === 'notFound'){
    return(
      <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ToastContainer rtl="true"/>
          <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على البرنامج</Typography>
        </div>
      )
  }else{
    return (
      <>
      <ToastContainer rtl="true"/>
    { !preview ? <Body>
          <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px', marginTop: '-20px'}}><span onClick={()=> navigate('/admin/programs/all')} style={{cursor: 'pointer'}} >إدارة البرامج </span> <span> {">"} تعديل برنامج  </span></Typography>
          <Box sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
                <LoadingButton loading={loadingCreation} loadingPosition='center' onClick={()=> updateProgram()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:UISettings.colors.white,white:'1px solid' + UISettings.colors.green}} >حفظ البرنامج</LoadingButton>
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
                <TextField 
                  InputProps={{style: { padding: '5px' } }} 
                  style={{width: '100%'}} 
                  placeholder='أدخل عنوان البرنامج' 
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                />
              </ProfileDatas>
  
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف</Typography>
                <FormControl>
                  <textarea className=' p-3 rounded-lg ' cols={cols}  rows={4} autoComplete='off' placeholder='أدخل وصف البرنامج هنا'  
                  style={{
                   border: '1px solid ' + UISettings.colors.secondary,
                  }}
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)}}
                  />
                </FormControl>
              </ProfileDatas>
  
              {/* <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>السن المقترح</Typography>
                <TextField InputProps={{style: { padding: '5px' } }} style={{width: '100%'}} placeholder='أدخل السن المقترح' />
              </ProfileDatas> */}
  
              <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>السن المقترح</Typography>
                <Autocomplete
                  className='autocompleteFreeSolo'
                  dir="rtl" 
                  style={{width: '100%', direction: 'rtl'}}
                  id="free-solo-demo"
                  ListboxProps={{
                    style: { direction: 'rtl', /* Add any other styles here */ }
                  }}
                  freeSolo
                  value={age}
                  onChange={(e, newValue) => {setAge(newValue)}}
                  options={sessions}
                  renderInput={(params) => <TextField onChange={(e) => {setAge(e.target.value)}} placeholder='أدخل السن المقترح'  {...params} style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }} />}
                />
              </ProfileDatas>
              
              {/* <ProfileDatas width={windowSize.width} style={{'alignItems':'start'}}>
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
              </ProfileDatas> */}
  
            </SubContainer>
          </Container>
  
          <Container style={{'marginBottom':'0rem'}}>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>المدة</Typography>
              </ProfileInfos>
            </ProfileHeader>
      
          <SubContainer style={{ position: 'relative',marginBottom:'0rem' }}>
  
          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة البرنامج كاملا</Typography>
            <Autocomplete
              className='autocompleteFreeSolo'
              dir="rtl" 
              style={{width: '100%', direction: 'rtl'}}
              id="free-solo-demo"
              ListboxProps={{
                style: { direction: 'rtl', /* Add any other styles here */ }
              }}
              freeSolo
              value={duration}
              onChange={(e, newValue) => {setDuration(newValue)}}
              options={programDuration.map((option) => option)}
              renderInput={(params) => <TextField onChange={(e) => {setDuration(e.target.value)}} placeholder='إختر مدة البرنامج'  {...params} style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }} />}
            />
          </ProfileDatas>
  
  
  
          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة الدراسة الفعلية</Typography>
            <Autocomplete
              className='autocompleteFreeSolo'
              dir="rtl" 
              style={{width: '100%', direction: 'rtl'}}
              id="free-solo-demo"
              ListboxProps={{
                style: { direction: 'rtl', /* Add any other styles here */ }
              }}
              freeSolo
              value={studyDuration}
              onChange={(e, newValue) => {setStudyDuration(newValue)}}
              options={programDuration.map((option) => option)}
              renderInput={(params) => <TextField onChange={(e) => {setStudyDuration(e.target.value)}} placeholder='إختر مدة الدراسة الفعلية'  {...params} style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }} />}
            />
          </ProfileDatas>
  
          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة العطل والامتحانات</Typography>
            <Autocomplete
              className='autocompleteFreeSolo'
              dir="rtl" 
              style={{width: '100%', direction: 'rtl'}}
              id="free-solo-demo"
              ListboxProps={{
                style: { direction: 'rtl', /* Add any other styles here */ }
              }}
              value={vacationDuration}
              onChange={(e, newValue) => {setVacationDuration(newValue)}}
              freeSolo
              options={programDuration.map((option) => option)}
              renderInput={(params) => <TextField onChange={(e) => {setVacationDuration(e.target.value)}} placeholder='أدخل مدة العطل والامتحانات'  {...params} style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }} />}
            />
          </ProfileDatas>
          
          {/* <ProfileDatas width={windowSize.width}>
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
            </ProfileDatas> */}
  
            {/* <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة الدراسة الفعلية</Typography>
              <FormControl dir="rtl" style={{ width: "100%" }}>
                <TextField InputProps={{style: { padding: '5px' } }} placeholder='أدخل مدة الدراسة الفعلية'/>
              </FormControl>
            </ProfileDatas> */}
            {/* <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>مدة العطل والامتحانات</Typography>
              <FormControl dir="rtl" style={{ width: "100%" }}>
                <TextField InputProps={{style: { padding: '5px' } }} placeholder='أدخل مدة العطل والامتحانات'/>
              </FormControl>
            </ProfileDatas> */}
  
          </SubContainer>
          </Container>
  
          <Container style={{'marginBottom':'0rem'}}>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>مستويات و فصول البرنامج</Typography>
              </ProfileInfos>
            </ProfileHeader>
  
          <SubContainer style={{ position: 'relative',marginBottom:'0rem' }}>
  
          <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>عدد مستويات البرنامج</Typography>
                <Autocomplete
                  className='autocompleteFreeSolo'
                  dir="rtl" 
                  style={{width: '100%', direction: 'rtl'}}
                  id="free-solo-demo"
                  ListboxProps={{
                    style: { direction: 'rtl', /* Add any other styles here */ }
                  }}
                  freeSolo
                  value={level}
                  onChange={(e, newValue) => {setlevel(newValue)}}
                  options={levels.map((option) => option)}
                  renderInput={(params) => <TextField onChange={(e) => {setlevel(e.target.value)}} placeholder='أدخل عدد مستويات البرنامج'  {...params} style={{ height: '50px', direction: 'rtl' /* Add any other styles here */ }} />}
                />
          </ProfileDatas>
          <ProfileDatas width={windowSize.width}>
  
          </ProfileDatas>
  
          <ProfileDatas width={windowSize.width}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginTop: "10px", marginBottom: '-10px' }}>فصول البرنامج <IconButton onClick={addObjectToArray} style={{color: UISettings.colors.green, padding: '5px'}}><AddCircleOutlineOutlined/></IconButton> {semesters.length} <IconButton onClick={removeLastObjectFromArray} style={{color : 'red', padding: '5px'}}><RemoveCircleOutlineOutlined/></IconButton> </Typography> 
          </ProfileDatas>
  
          <ProfileDatas width={windowSize.width}>
  
          </ProfileDatas>
  
          {
            semesters.map((semester, key) => {
              return(
                <>
                  <ProfileDatas width={windowSize.width}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>اسم الفصل الدراسي {key + 1}</Typography>
                      <TextField InputProps={{style: { padding: '5px' } }} style={{width: '100%'}} value={semester.name} onChange={(e)=> updateObjectToArray(key, 'name', e.target.value)} placeholder='أدخل اسم الفصل ' />
                  </ProfileDatas>
                  <ProfileDatas width={windowSize.width}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>وصف الفصل الدراسي {key + 1}</Typography>
                    <TextField InputProps={{style: { padding: '5px' } }} style={{width: '100%'}} value={semester.message} onChange={(e)=> updateObjectToArray(key, 'message', e.target.value)} placeholder='أدخل وصف الفصل' />
                  </ProfileDatas>  
                </>
              )
            })
          }
          
          {/* <ProfileDatas width={windowSize.width}>
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
          </ProfileDatas> */}
  
          </SubContainer>
          </Container>
  
          <Container style={{'marginBottom':'0rem'}}>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>سعر الإشتراك</Typography>
              </ProfileInfos>
            </ProfileHeader>
          
          <SubContainer style={{ position: 'relative',marginBottom:'0rem' }}>
          
            <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>سعر الإشتراك</Typography>
                  <TextField 
                    InputProps={{style: { padding: '5px' } }} 
                    style={{width: '100%'}} 
                    placeholder='أدخل سعر الإشتراك' 
                    value={price}
                    onChange={(e) => {setPrice(e.target.value)}}  
                  />
            </ProfileDatas>
            
          {/* <ProfileDatas width={windowSize.width}>
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
          </ProfileDatas> */}
  
  
          </SubContainer>
          </Container>
  
          <Container style={{'marginBottom':'0rem'}}>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تفعيل البرنامج</Typography>
              </ProfileInfos>
            </ProfileHeader>
  
          <SubContainer style={{ position: 'relative',marginBottom:'0rem' }}>
          
              <ProfileDatas style={{'flexDirection':'row',alignItems:'center'}}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل هذا البرنامج ليتمكن الطلاب من التسجيل فيه </Typography>
                  <SwitchIcon open={status} change={setStatus} sx={{'marginRight':'10px'}}/>
              </ProfileDatas>  
  
          </SubContainer>
          </Container>
  
          <Box style={{paddingTop: '20px'}} sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
                <LoadingButton loading={loadingCreation} loadingPosition='center' onClick={()=> updateProgram()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:UISettings.colors.white,white:'1px solid' + UISettings.colors.green}} >حفظ البرنامج</LoadingButton>
                <Button variant='primary' onClick={handlePreview} endIcon={<VisibilityOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >معاينة البرنامج</Button>
              </Box>
          </Box>
          {/* <Button onClick={()=> console.log()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content"}} >حفظ البرنامج</Button> */}
      </Body>
      :
      <Body>
          <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px', marginTop: '-20px', paddingTop: '0px'}}><span onClick={()=> navigate('/admin/programs/all')} style={{cursor: 'pointer'}} > إدارة البرامج </span> <span> {">"} تعديل برنامج  </span></Typography>
          <Box sx={{'display':'flex','gap':'1rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},alignItems:{xs:'end',sm:'end',md:'center',lg:'center',xl:'center'}}}  justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
                <LoadingButton loading={loadingCreation} loadingPosition='center' onClick={()=> updateProgram()} variant='primary' endIcon={<Check/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:UISettings.colors.white,white:'1px solid' + UISettings.colors.green}} >حفظ البرنامج</LoadingButton>
                <Button variant='primary' onClick={handlePreview} endIcon={<EditOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color:UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >تعديل البرنامج</Button>
              </Box>
          </Box>
          <Container>
              <Info width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>عنوان البرنامج</InfosTitle> 
                  <InfosContent  width={windowSize.width} style={{color: UISettings.colors.black, fontWeight: 600}}> 
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={"35"} style={{margin: '0px 0px', marginLeft: '10px'}} />
                    {name}</InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>وصف البرنامج</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{description}</InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>السن المقترح</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{age}</InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>مدة البرنامج كاملا</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{duration} </InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>مدة الدراسة الفعلية</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{studyDuration} </InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>مدة العطل و الامتحانات</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{vacationDuration}</InfosContent> 
              </Info>
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>عدد المستويات</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{level} مستويات</InfosContent> 
              </Info>
              {semesters.map((semester, key)=> (
                <Info key={key}  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>{semester.name}</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{semester.message}</InfosContent> 
                </Info>
              ))}
              <Info  width={windowSize.width}>
                  <InfosTitle  width={windowSize.width}>سعر البرنامج</InfosTitle> 
                  <InfosContent  width={windowSize.width}>{price}.00 دج</InfosContent> 
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
  margin-bottom: 0px;
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
  flex-direction: row;
  justify-content: start;
  align-items: center;
  direction: rtl;
`
