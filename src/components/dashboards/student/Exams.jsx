import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress, TextField, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import AdvancedAlert from './advancedAlert'
import { Save, SaveAltOutlined, Upload } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import CustomPagination from './CustomPagination'
import ExamCard from './examCard'
import axiosInstance from './axiosInstance'
import errorHandler from './errorHandler'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Exams({windowSize}) {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [studentExams, setStudentExams] = useState([]);
  const [displayedStudentExams, setDisplayedStudentExams] = useState([]);
  const [exams, setExams] = useState([]);

    async function getExams() {
        try {
            const response = await axiosInstance.post('/studentApi/getExams', { withCredentials: true });
            if(response.data.response === 'done'){
              console.log(response.data)
               setLoading(false)
               setExams(response.data.exams)
               setStudentExams(response.data.studentExams)
               setDisplayedStudentExams(response.data.studentExams)
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
            getExams()
        }
    }, []);

    const [openAnswersModal, setOpenAnswersModal] = React.useState(false);

    const handleClickOpenAnswersModal = () => {
      setOpenAnswersModal(true);
    };
  
    const handleCloseAnswersModal = () => {
      setOpenAnswersModal(false);
    };

    const [answers, setAnswers] = useState([]);


    const columns = [
      { field: 'title', headerName: (<span>عنوان الامتحان</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.title}</span> </>);}, },
      { field: 'start', headerName: 'تاريخ بداية الامتحان', width: 150, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.startExam ?params.row.startExam.split(' ')[0] : '--'}</span> </>);}, },
      { field: 'end', headerName: 'تاريخ نهاية الامتحان', width: 150, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.endExam ?params.row.endExam.split(' ')[0] : '--'}</span> </>);}, },
      { field: 'date', headerName: 'تاريخ إجراء الامتحان', width: 150, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.date ? params.row.date.split('T')[0] + ' ' + (params.row.date.split('T')[0] ? params.row.date.split('T')[1].slice(0,5) : ' ') : '--'}</span> </>);}, },
      { field: 'status', headerName: 'الحالة', width: 100, renderCell: (params) => {
          if(params.row.status === 'finish'){
            return (
                <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم إنجازه</span> </>
            );
          }else{
            return (
                <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>لم ينتهي</span> </>
             );
          }
        }, 
      },
      { field: 'result', headerName: 'النتيجة', width: 70, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.totalNote}/{params.row.note}</span> </>);}, },
      { field: 'answer', headerName: '', width: 110, renderCell: (params) => { return (<Button style={{color: UISettings.colors.green, background: UISettings.colors.greenBG, borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px'}} onClick={(e) => {e.stopPropagation(); setAnswers(params.row.answers ? JSON.parse(params.row.answers)  : [] ); setOpenAnswersModal(true)}} >عرض الإجابة</Button>);}, },
    ];
    
    const [examFilter, setExamFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    useEffect(() => {
      var data = studentExams
      var dataAfterStatusFilter = []
      var dataAfterExamFilter = []

      for (let i = 0; i < data.length; i++) {
        const exam = data[i];
        if(statusFilter === 'all'){
          dataAfterStatusFilter.push(exam)
        }else if( statusFilter === exam.status ){
          dataAfterStatusFilter.push(exam)
        }
      }

      for (let i = 0; i < dataAfterStatusFilter.length; i++) {
        const exam = data[i];
        if(examFilter === 'all'){
          dataAfterExamFilter.push(exam)
        }else if( examFilter === exam.type ){
          dataAfterExamFilter.push(exam)
        }
      }

      setDisplayedStudentExams(dataAfterExamFilter)



    }, [studentExams, examFilter, statusFilter]);
  
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
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px'}}>امتحاناتي {">"} جميع الامتحانات</Typography>
          <ToastContainer rtl="true"/>
          
          <Title style={{ marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>امتحانات لم تنجز بعد</Typography>
          </Title>
          
          <CardsContainer>
            {
              exams.map((exam, index)=>{
                return(
                  <ExamCard key={index} title={exam.title}  desc={exam.description && exam.description.length >0 ? exam.description : 'امتحان'} index='1' available={new Date() > new Date(exam.startExam) ? true : false} disabled={new Date() > new Date(exam.startExam) ? false : true} status={exam.status} date={exam.startExam} endDate={exam.endExam} id={exam.id} time={exam.time} width={windowSize.width} />
                )
              })
            }
            {/* <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={false} status={"started"} date={'18 فيفري 2024'} width={windowSize.width} /> */}
          </CardsContainer>
          
          <Title style={{ marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>جميع الامتحانات</Typography>
            <FormControl dir="rtl" style={{width: "150px"}}>
              <InputLabel id="demo-simple-select-label"> الحالة </InputLabel>
              <Select
                dir="rtl"
                style={{paddingTop: "0px", paddingBottom: '0px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusFilter}
                label="الحالة"
                //defaultValue={0}
                onChange={(e)=> setStatusFilter(e.target.value)}
              >
                <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
                <MenuItem value={'finish'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم إنجازه </span> </MenuItem>
                <MenuItem value={'start'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >لم ينتهي</span> </MenuItem>
              </Select>
            </FormControl>
  
            <FormControl dir="rtl" style={{width: "180px"}}>
              <InputLabel id="demo-simple-select-label"> فلترة المتحانات </InputLabel>
              <Select
                dir="rtl"
                style={{paddingTop: "0px", paddingBottom: '0px', marginRight: '10px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={examFilter}
                label="فلترة المتحانات"
                //defaultValue={0}
                onChange={(e)=> setExamFilter(e.target.value)}
              >
                <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >كل الامتحانات</span> </MenuItem>
                <MenuItem value={'levelUpExam'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >امتحانات نهاية المستوى</span> </MenuItem>
              </Select>
            </FormControl>
            {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<SaveAltOutlined/>} >تحميل الفاتورة</Button> */}
          </Title>
          <div dir="rtl" style={{ height: 370, width: '100%' }}>
            <DataGrid
              rows={displayedStudentExams}
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
                        <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'10px',borderRadius:'10px'}}>{question.point} / {question.note}</span>
                        </section>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الإجابة :</Typography>
                        <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "0px"}}>{question.answer}</Typography>
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
              </DialogActions>
            </Dialog>
  
      </Body>
    )
  }
  
}





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