import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, Slide, Typography } from '@mui/material'
import { BlockOutlined, Clear, ErrorOutlineOutlined } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";


export default function ReportDetails({windowSize}) {
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)

  const studentDetails = {
    name: "منصف عبد الإله",
    teacher:'العيد عبود',
    session:'حلقة الأستاذ عبود',
    isSubscribed: true
  }

  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  const [openExam, setOpenExam] = useState(false);
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpenExam = () => {
    setOpenExam(true);
  };

  const handleCloseExam = () => {
    setOpenExam(false);
  }


    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState({});

    const  id  = useParams();

    async function getReport() {
        try {
            const response = await axiosInstance.post('/adminApi/getReport', {id: id.id});
            console.log(response.data)
            if(response.data.response === 'done'){
              if(response.data.report){
                setReport(response.data.report)
                setLoading(false)
                setStatus('')
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
            getReport()
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
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على التقرير</Typography>
             </div>
           )
      }else{
        return (
          <Body>
               <ToastContainer rtl="true"/>
              <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}><span onClick={()=> navigate('/admin/reports/all')} style={{cursor: 'pointer'}} >إدارة التقارير</span>{' > ' + ' تقرير ' + report.title}</Typography>
              {/* <Box sx={{'display':'flex',alignItems:'stretch',justifyContent:'start',gap:'1rem'}}>
                  <Button variant='primary' onClick={()=> navigate('/admin/reports/demande')} endIcon={<AddIcon/>} style={{color: UISettings.colors.green, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.green, alignSelf: 'left', width: "fit-content"}} >طلب تقرير من هذا الأستاذ</Button>
              </Box> */}
              <Container>
                <ProfileHeader style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}> عنوان التقرير :  {report.title}</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                <SubContainer>
                  <ProfileDatas style={{ borderBottom: '1px solid whitesmoke'}}>
                      {/* <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl',fontSize:'1.2rem', marginBottom: "5px"}}> تفاصيل التقرير</Typography> */}
                      <List style={{marginTop: '-10px',}}>
                          <ListItem > <strong style={{marginLeft: '10px'}}>حالة التقرير :</strong>  
                            {report && report.replied === true ?
                                <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>تم الإرسال</span>
                                :
                                <span style={{'color':UISettings.colors.brown,backgroundColor:UISettings.colors.brownBG,padding:'.5rem',borderRadius:'10px'}}>لم يتم الإرسال</span>
                            }
                          </ListItem>
                          <ListItem > <strong style={{marginLeft: '10px'}}>الأستاذ المسؤول :</strong>  {report.teacher ? report.teacher.firstName + ' ' + report.teacher.familyName : '--'}</ListItem>
                          <ListItem > <strong style={{marginLeft: '10px'}}>تاريخ طلب التقرير :</strong>  {report.createdAt ? report.createdAt.split('T')[0] : '--'}</ListItem>
                          <ListItem style={{alignItems: 'start'}} > <strong style={{marginLeft: '10px', minWidth: '100px'}}>وصف التقرير :</strong> <div dangerouslySetInnerHTML={{ __html: report.text }} style={{direction: 'rtl', textAlign: 'right'}}></div></ListItem>
                      </List>
      
                  </ProfileDatas>
                  {/* <ProfileDatas >
                      <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl',fontSize:'1.2rem', marginBottom: "5px"}}>تفصيل التقرير</Typography>
                      <List>
                          <ListItem>الحلقة من تقديم: الأستاذ محمد علي</ListItem>
                          <ListItem>تاريخ الحلقة: 10 فبراير 2024</ListItem>
                          <ListItem>المنصة: المجموعة التفاعلية للذكور الخاصة بحساب أكاديمية الترقي في التلغرام</ListItem>
                          <ListItem>عنوان الحلقة: تدبر وتلاوة سورة الفاتحة</ListItem>
                          <ListItem>الحضور: حوالي 30 طالبًا من مختلف الفئات العمرية</ListItem>
      
                      </List>
      
                  </ProfileDatas> */}
                  <ProfileDatas>
                      <Typography variant="h7" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl',fontSize:'1.2rem', marginBottom: "5px"}}>التقرير</Typography>
                        <List>
                          <ListItem ><div dangerouslySetInnerHTML={{ __html: report.reply }}></div></ListItem>
                        </List>
                  </ProfileDatas>
                </SubContainer>
              </Container>
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

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`

const Container = styled.div`
  background-color: white;
  width: calc(100%);
  margin-top: 20px;
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
  width: 100%;
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

const columns = [
    { field: 'month', headerName: 'الشهر', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.month}</span> </>);}, },
    { field: 'paymentDate', headerName: 'تاريخ دفع الاشتراك', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.paymentDate}</span> </>);}, },
    { field: 'status', headerName: 'الحالة', width: 200, renderCell: (params) => {
        if(params.row.status === 'payed'){
          return (
              <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم الدفع</span> </>
          );
        }else if(params.row.status === 'notPayed'){
          return (
              <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم يدفع</span> </>
          );
        }else if(params.row.status === 'snoozed'){
          return (
              <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>فترة إضافية</span> </>
           );
        }
      }, 
    },
    { field: 'amount', headerName: 'المبلغ المستحق', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.amount}</span> </>);}, },
];
  
const rows = [
    { id: 1, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 2, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 3, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
    { id: 4, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 5, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
    { id: 6, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 7, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
    { id: 8, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 10, month: ' فيفري 2025', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 20, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 30, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
    { id: 40, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 50, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
    { id: 60, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
    { id: 70, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
    { id: 80, month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
];

const examColumns = [
    { field: 'name', headerName: 'عنوان الإمتحان', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.name}</span> </>);}, },
    { field: 'status', headerName: 'الحالة', width: 200, renderCell: (params) => {
        if(params.row.status === 'passed'){
          return (
              <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم إنجازه</span> </>
          );
        }else if(params.row.status === 'nonPassed'){
          return (
              <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم يتم إنجازه</span> </>
          );
        }else if(params.row.status === 'notPassedYet'){
          return (
              <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>لم ينجز بعد</span> </>
           );
        }
      }, 
    },
    { field: 'score', headerName: 'النتيجة', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.score}</span> </>);}, },
];
  
const examRows = [
    { id: 1, name: 'الإمتحان التفاعلي الثاني', status: 'passed', score: "90" },
    { id: 2, name: ' الإمتحان التفاعلي الخامس ', status: 'nonPassed', score: "--" },
    { id: 3, name: ' الإمتحان النهائي ', status: 'notPassedYet', score: "--" },
    { id: 4, name: 'إمتحان تفاعلي رقم 3', status: 'passed', score: "80" },
    { id: 5, name: 'إمتحان تفاعلي رقم 4', status: 'nonPassed', score: "--" },
    { id: 6, name: 'إمتحان تفاعلي رقم 5', status: 'notPassedYet', score: "--" },

];