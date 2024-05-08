import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, CircularProgress, FormControlLabel, IconButton, Radio, RadioGroup, Typography, useMediaQuery, TextField} from '@mui/material'
import { Assignment, ChecklistOutlined, ErrorOutlineOutlined, Save, Warning} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.css'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import errorHandler from '../student/errorHandler'
import axiosInstance from '../student/axiosInstance'
import { ToastContainer,toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function ExamDetails({windowSize}) {
  const [value, setValue] = React.useState(0);
  const isLG = useMediaQuery('(min-width:1280px)');
  const isMD = useMediaQuery('(min-width:960px)');
  const isSM = useMediaQuery('(min-width:600px)');

  const cols = isLG ? 100 : isMD ? 80 : isSM ? 60 : 40;


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openAnswersModal, setOpenAnswersModal] = React.useState(false);

  const handleClickOpenAnswersModal = () => {
    setOpenAnswersModal(true);
  };

  const handleCloseAnswersModal = () => {
    setOpenAnswersModal(false);
  };

  const navigate = useNavigate()

  const [exam, setExam] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [students, setStudents] = useState([]);
  const  {id}  = useParams();
  async function getExam() {
      try {
          const response = await axiosInstance.post('/adminApi/getExam', {id: id});
          console.log(response.data)
          if(response.data.response === 'done'){
            if(response.data.exam){
              setExam(response.data.exam)
              setLoading(false)
              setStatus('')
              if(response.data.exam.questions && response.data.exam.questions.length > 0){
                const data = JSON.parse(response.data.exam.questions)
                console.log(data)
                setQuestions(data)
              }
              if(response.data.exam.students){
                setStudents(response.data.exam.students)
              }
            }else{
              setLoading(false)
              setStatus('notFound')
            }
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
          getExam()
        }
    }, []);

    const [status, setStatus] = useState('notFound');

    const columns = [
      { field: 'name', headerName: (<span>إسم الطالب</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.firstName ? params.row.firstName : ''} {params.row.familyName ? params.row.familyName : ''} </span> </>);}, },
      { field: 'Email', headerName: 'البريد الإلكتروني', width: 250, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.email ? params.row.email : '--'}</span> </>);}, },
    
      { field: 'status', headerName: 'الحالة', width: 150, renderCell: (params) => {
          if(params.row.StudentExam && params.row.StudentExam.noteStatus  === 'corrected'){
            return (
               <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم التصحيح</span> </>
           );
          }else{
            return (
                <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>لم يتم التصحيح</span> </>
            );
          }
         
        }, 
      },
      { field: 'result', headerName: 'النتيجة', width: 50, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.StudentExam ?   (params.row.StudentExam.note ? params.row.StudentExam.note : '--') +  '/'  + exam.note   : '--/' + exam.note}</span> </>);}, },
      { field: 'answer', headerName: '', width: 110, renderCell: (params) => { return (<Button style={{color: UISettings.colors.green, background: UISettings.colors.greenBG, borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px'}} onClick={(e) => {e.stopPropagation(), setOpenAnswersModal(true), setSelectedExam(params.row.StudentExam.id), setAnswers(params.row.StudentExam && params.row.StudentExam.answers && params.row.StudentExam.answers.length > 0 ? JSON.parse(params.row.StudentExam.answers) : [])}} >عرض الإجابة</Button>);}, },
    ];

    function handleNoteChanged(index, value) {
      var data = answers
      data[index].note = value
      setAnswers(data)
    }

    const [selectedExam, setSelectedExam] = useState('');

    const [loadingCorrection, setLoadingCorrection] = useState(false);
    async function correctExam() {
      try {
          setLoadingCorrection(true)
          const response = await axiosInstance.post('/adminApi/correctExam', {id: selectedExam, answers});
          getExam()
          setLoadingCorrection(false)
          setOpenAnswersModal(false)
          toast.success(response.data.message, {
            position: 'top-right',
            progress: undefined,
            autoClose: 3000,
            theme: 'colored'
        });
          //console.log(response.data)
      } catch (error) {
        setLoadingCorrection(false)
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
    }else if(status === 'notFound'){
      return(
         <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
             <ToastContainer rtl="true"/>
             <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
             <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على الإمتحان</Typography>
           </div>
         )
    }else{
      return (
        <Body>
             <ToastContainer rtl="true"/>
            <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':'bolder','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '20px', marginTop: '-20px'}}>{'إدارة الإمتحانات'  + ' > ' + 'تفاصيل الامتحان'} </Typography>
            <section className='flex flex-col md:flex-row lg:flex-row items-end md:items-center lg:items-center gap-3 justify-between my-4' style={{marginTop: '-10px'}}>
                <div className='flex gap-3 items-center justify-center'>
                  <Button variant='primary' onClick={()=> navigate('/admin/exams/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة إمتحان</Button>
                  {/* <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>تم تصحيحه</span> */}
                </div>
                <div>
                  <Typography variant="p">مجموع النقاط : </Typography>
                  <Typography variant="p" fontWeight={700} color={UISettings.colors.green}>{exam.note} نقطة</Typography>
                </div>
            </section>

            
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
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{exam.title ? exam.title : ''}</Typography>
                      </ProfileInfos>
                    </ProfileHeader>
                    
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
                                        <FormControlLabel key={key} checked={option.answer} value="answer1" control={<Radio />} label={option.value} />
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
    
                </TabPanel>
                
                <TabPanel value={value}  style={{width: 'calc(100%)'}} index={1}>
                  <Container>
                    <ProfileHeader style={{marginTop: '15px',marginBottom: '15px'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>نتائج الطلاب</Typography>
                      </ProfileInfos>
                    </ProfileHeader>
                    <SubContainer>
                    <div dir="rtl" style={{ height: 370, width: '100%' }}>
                      <DataGrid
                        rows={students}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        componentsProps={{
                          pagination: { style: {
                            direction: 'ltr'
                          }},
                        }}
                      />
                    </div>
                    </SubContainer>
                  </Container>
                </TabPanel>
                </Box>
            </Container>

            <Dialog
              fullWidth
              maxWidth={'lg'}
              open={openAnswersModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseAnswersModal}
              aria-describedby="alert-dialog-slide-description"
              style={{direction: 'rtl'}}
            >
              <DialogTitle>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>إجابة الطالب</Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {
                  answers.map((question, index) => {
                    if(question.type === 'text'){
                      return(
                      <ProfileDatas key={index}>
                        <section className='flex items-center justify-between w-full'>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "0px", color: UISettings.colors.black}}>{index + 1}- {question.question} </Typography>
                        <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} / {question.note} </span>
                        </section>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الإجابة :</Typography>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "0px"}}>{question.answer}</Typography>

                        <TextField style={{ width: '100%', paddingY: '0rem', maxWidth: '500px', marginTop: '20px' }} placeholder='أدخل نقطة الإجابة' onChange={(e)=> handleNoteChanged(index, e.target.value)} />

                      </ProfileDatas>
                      )
                    }else if (question.type === 'options'){
                      return(
                        <ProfileDatas key={index}>
                        <section className='flex items-center justify-between w-full'>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "0px", color: UISettings.colors.black}}>{index + 1}- {question.question}</Typography>
                        <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} / {question.note}</span>
                        </section>
                        <FormControl sx={{padding:'0px 1rem'}}>
                            <RadioGroup
                              aria-labelledby="controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                            >
                              {question.options.map((option, key)=> {
                                return(
                                  <FormControlLabel key={key} checked={option.answer} value="answer1" control={<Radio />} label={option.value} />
                                )
                              })}
                            </RadioGroup>
                        </FormControl>
                      </ProfileDatas>
                      )
                    }
                  })
                }
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant='primary' style={{backgroundColor: 'white', color: UISettings.colors.green, marginLeft: '10px'}} onClick={handleCloseAnswersModal}>رجوع</Button>
                <LoadingButton loadingPosition='center' loading={loadingCorrection} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} onClick={correctExam}>حفظ</LoadingButton>
              </DialogActions>
            </Dialog>
        </Body>
      )
    }

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
    border: 1px solid #F3F3F3;
    border-radius: 10px;
    padding: 10px 20px;
`


const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`



const rows = [
  { id: 1, name: 'الاختبار التفاعلي 1', status: 'done', result: '16/17' },
  { id: 2, name: 'الاختبار التفاعلي 1', status: 'done', result: '16/17' },
  { id: 3, name: 'الاختبار التفاعلي 1', status: 'notDoneYet', result: "--" },
  { id: 4, name: 'الاختبار التفاعلي 1', status: 'done', result: '16/17' },
  { id: 5, name: 'الاختبار التفاعلي 1', status: 'done', result: "18/20" },
  { id: 6, name: 'الاختبار التفاعلي 1', status: 'notDone', result: "--" },
  { id: 7, name: 'الاختبار التفاعلي 1', status: 'done', result: "18/20" },
  { id: 8, name: 'الاختبار التفاعلي 1', status: 'notDoneYet', result: "--" },
];