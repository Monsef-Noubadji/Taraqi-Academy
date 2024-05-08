import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { BlockOutlined, BorderColorOutlined, Clear, Error, ErrorOutlineOutlined, Print, ReportProblem } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from '../student/errorHandler'
import axiosInstance from '../student/axiosInstance'
import { LoadingButton } from '@mui/lab'


export default function TeacherDetailes({windowSize}) {
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)



  const handleActivate = () => {
    setIsSubscribed(!isSubscribed)
  }
  

  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState({});
  const [program, setProgram] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [exams, setExams] = useState([]);

  const  id  = useParams();

  async function getTeacher() {
    try {
        const response = await axiosInstance.post('/adminApi/getTeacher', {id});
        console.log(response.data)
        if(response.data.response === 'done'){
            setTeacher(response.data.teacher)
            setLoading(false)
            setStatus('done')
            if(response.data.programName){
              setProgram(response.data.programName)
            }
        }else if(response.data.response === 'notFound'){
          setTeacher(response.data.teacher)
          setLoading(false)
          setStatus('notFound')

        }
    } catch (error) {
        errorHandler(error, toast, navigate)
    }
}
const [status, setStatus] = useState('notFound');
const isMounted = useRef(true);

  useEffect(() => {
    return () => {
    // Cleanup function to set isMounted to false when component unmounts
    isMounted.current = false;
    };
  }, []);

  useEffect(() => {
      if (isMounted.current) {
        getTeacher()
      }
  }, []);

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
           <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على المعلم</Typography>
         </div>
       )
  }else{
    return (
      <Body>
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}><span onClick={()=> navigate('/admin/teachers/all')} style={{cursor: 'pointer'}}>المعلمين</span> { ' > ' + teacher.firstName + ' ' + teacher.familyName}</Typography>
          <Box sx={{'display':'flex',alignItems:'stretch',justifyContent:'start',gap:'1rem'}}>
              <Button variant='primary' onClick={()=> setOpenExam(true)} endIcon={<BlockOutlined />} style={{color: UISettings.colors.red, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.red, alignSelf: 'left', width: "fit-content"}} >حظر الطالب</Button>
              {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px',width: "fit-content"}} ><Print/></Button> */}
          </Box>
  
          <Container>
            <ProfileHeader>
                <img src={ teacher.image && teacher.image.length > 0 ? teacher.image :  '../../../../src/assets/user.png'} alt="academy_logo" width={80} style={{margin: '0px 0px'}} />
                <ProfileInfos>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{teacher.firstName + ' ' + teacher.familyName}</Typography>
                    <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>طالب</Typography>
                </ProfileInfos>
            </ProfileHeader>
          </Container>
  
          <Container>
            <ProfileHeader style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>المعلومات الشخصية</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الاسم الكامل</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher.firstName === '' && teacher.familyName === '' ? '__' : teacher.firstName + ' ' + teacher.familyName}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الوصف</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher.description? teacher.description : '__'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البريد الالكتروني</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher.email? teacher.email : '__'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>رقم الهاتف</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons,direction:'ltr'}}>{teacher.phoneNumber ? teacher.phoneNumber : '__'} </Typography>
              </ProfileDatas>
            </SubContainer>
          </Container>
  
          <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات العنوان</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>البلد</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher.country ? teacher.country : '__'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الولاية</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher.wilaya? teacher.wilaya : '__'}</Typography>
              </ProfileDatas>
            </SubContainer>
          </Container>
  
          <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات البرنامج المشترك فبه</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer >
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>اسم البرنامج</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{program ? program : "--" }</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width} >
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>الحلقة</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher && teacher.groups && teacher.groups[0] ? teacher.groups[0].name : '--'}</Typography>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width} ></ProfileDatas>
            </SubContainer>
          </Container>
  
          {/* <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الإشتراك</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer style={{justifyContent: 'start'}}>
  
              <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تاريخ انتهاء الاشتراك</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{teacher && teacher.studyPrograms && teacher.studyPrograms[0] && teacher.studyPrograms[0].studentStudyProgram && teacher.studyPrograms[0].studentStudyProgram.experationDate ? teacher.studyPrograms[0].studentStudyProgram.experationDate.split('T')[0] : '--' }</Typography>
              </ProfileDatas>
             
            
  
            </SubContainer>
            <Typography variant="h6" sx={{'fontFamily':'Cairo',marginY:'1rem','float':'left','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>قائمة الإشتراكات</Typography>
            <div style={{ height: 400, width: '100%' }}>

              <DataGrid
                sx={{direction:'rtl'}}
                rows={subscriptions}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 30 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                componentsProps={{
                  pagination: { style: {
                    direction: 'ltr',
                  }},
                }}
                />
              </div>
          </Container> */}
          
          {/* <Container>
              <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>نتائج الإمتحانات</Typography>
              </ProfileInfos>
              </ProfileHeader>
              <DataGrid
              sx={{direction:'rtl'}}
              rows={examRows}
              columns={examColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 30 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection={false}
              componentsProps={{
                pagination: { style: {
                  direction: 'ltr'
                }},
              }}
            />
          </Container> */}
  
            
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
    { field: 'type', headerName: 'نوع الاشتراك', width: 200, renderCell: (params) => 
      {
        var type = ''
        if(params.row.type === '1'){
          type = 'اشتراك شهري'
        }else if(params.row.type === '3'){
          type = 'اشتراك 3 أشهر'
        }else if (params.row.type === '6'){
          type = 'اشتراك 6 أشهر'
        }else if (params.row.type === '12'){
          type = 'اشتراك سنة واحدة'
        }
        return (
        <><span style={{color: UISettings.colors.secondary}}>{type}</span> </>
        )
      }, 
    },
    { field: 'paymentDate', headerName: 'تاريخ دفع الاشتراك', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.paymentDate ? params.row.paymentDate.split('T')[0] : '--'}</span> </>);}, },
    { field: 'program', headerName: 'البرنامج', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.program}</span> </>);}, },
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
    { field: 'amount', headerName: 'المبلغ المستحق', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.amount}.00 دج</span> </>);}, },
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