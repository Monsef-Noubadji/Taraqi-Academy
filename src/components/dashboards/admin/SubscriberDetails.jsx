import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { Add, BlockOutlined, BorderColorOutlined, Clear, CurrencyExchange, DataUsage, Print, Remove, ReportProblem } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { forwardRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function SubscriberDetails({windowSize}) {
  const navigate = useNavigate()
  const [isSubscribed,setIsSubscribed] = useState(true)

  const studentDetails = {
    name: "منصف عبد الإله",
    teacher:'العيد عبود',
    session:'جميع الإشتراكات ',
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

  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px'}}>{studentDetails.session + ' > ' + studentDetails.name}</Typography>
        <Box sx={{'display':'flex',alignItems:'stretch',justifyContent:'start',gap:'1rem'}}>
            <Button variant='primary' endIcon={<CurrencyExchange/>} style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px',width: "fit-content"}} >تغيير حالة الإشتراك</Button>
        </Box>

        <Container>
            <ProfileDatas style={{'marginTop':'1rem',flexDirection:'row',alignItems:'center',gap:'.8rem','marginBottom':'1rem'}}>
                <DataUsage sx={{'color':UISettings.colors.green,height:'100%',width:'3rem'}}/>
                <Typography variant="p">بقي 10 أيام على انتهاء الاشتراك</Typography>
            </ProfileDatas>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الإشتراك</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>

            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>نوع الإشتراك</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>إشتراك شهري</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تاريخ الإشتراك</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>11/12/2023</Typography>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تفعيل الإشتراك</Typography>
                <Notif onClick={()=> handleActivate()}>
                    <ProfileDatas style={{'display':'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}} width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل إشتراك الطالب</Typography>
                        <SwitchIcon sx={{'marginRight':'10px'}}/>
                    </ProfileDatas>
                </Notif>            
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>حالة الإشتراك</Typography>
              <Typography variant="p" sx={{'whiteSpace':'normal',padding:'6px',borderRadius:'5px', color: isSubscribed === true ? UISettings.colors.green : UISettings.colors.red, backgroundColor: isSubscribed === true ? UISettings.colors.greenBG : UISettings.colors.redBG}}>{isSubscribed === true ? 'الإشتراك مفعل' : ' الإشتراك غير مفعل'}</Typography>
            </ProfileDatas>

            <ProfileDatas style={{ paddingRight: '.5rem' }}>
            <Typography variant="p" sx={{ fontFamily: 'Cairo', fontWeight: 600, textWrap: 'wrap', direction: 'rtl', marginBottom: "10px" }}>إضافة مهلة</Typography>
            <ExamNoteMaker>
              <Add sx={{ color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
              <span> 3 أيام</span>
              <Remove sx={{ color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, borderRadius: '3px', cursor: 'pointer', width: '2rem', height: '2rem' }} />
            </ExamNoteMaker>
          </ProfileDatas>

          </SubContainer>
          <Typography variant="h6" sx={{'fontFamily':'Cairo',marginY:'1rem','float':'left','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>قائمة الإشتراكات</Typography>
          <DataGrid
            sx={{direction:'rtl'}}
            rows={rows}
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
        </Container>

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

const ExamNoteMaker = styled.div`
  display: flex;
  border: 1px solid ${UISettings.colors.secondary};
  border-radius: 10px;
  width: 15rem;
  height:3rem;
  padding: .5rem;
  align-items:center;
  justify-content:space-between;
  font-weight: bold;
  
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