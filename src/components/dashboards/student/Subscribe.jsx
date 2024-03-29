import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import AdvancedAlert from './advancedAlert'
import { AccountBalance, AddCard, CreditCard, LibraryAdd, SaveAltOutlined, Upload } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import CustomPagination from './CustomPagination'
import { ToastContainer,toast } from "react-toastify";
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'



export default function Subscribe({windowSize}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [isInit, setIsInit] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [experationDays, setExperationDays] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [displayedDescription, setDisplayedDescription] = useState([]);
  
  async function getSubscriptions() {
    try {
        const response = await axiosInstance.post('/studentApi/getSubscriptions', { withCredentials: true });
        console.log(response.data)
        console.log(response)
        if(response.data.response === 'done'){
          setLoading(false)
          setSubscriptions(response.data.subscriptions)
          setDisplayedDescription(response.data.subscriptions)
          setExperationDays(response.data.expirationDays)
          if(response.data.expirationDays < 0){
            setAlertTitle('انتهى الاشتراك')
            setAlertMessage('يرجى تجديد اشتراكك لتتمكن من الوصول إلى امتحانات البرنامج ..')
          }else{
            setAlertTitle('تذكير بدفع الاشتراك ')
            setAlertMessage('تذكير باقتراب دفع اشتراك الشهر القادم فقد تبقى '+ response.data.expirationDays +' أيام على انتهاء الاشتراك الحالي')
          }
        }else if(response.data.response === 'paySubscription'){
          // navigate('/student/subscribe/payment')
          setSubscriptions(response.data.subscriptions)
          setDisplayedDescription(response.data.subscriptions)
          setLoading(false)
          setExperationDays(0)
          setAlertTitle('تفعيل الاشتراك')
          setAlertMessage('يرجى دفع اشتراكك لتتمكن من الوصول إلى امتحانات البرنامج ..')
        }else if(response.data.response === 'noProgram'){
          setSubscriptions(response.data.subscriptions)
          setDisplayedDescription(response.data.subscriptions)
          setIsInit(false)
          setLoading(false)
        }else if(response.data.response === 'selectNewProgram'){
          setSubscriptions(response.data.subscriptions)
          setDisplayedDescription(response.data.subscriptions)
          setLoading(false)
          setAlertMessage('يمكنك اختيار برنامج جديد')
          setAlertTitle('اختر برنامجاً جديداً')
        }
    } catch (error) {
        errorHandler(error, toast, navigate)
    }
}
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    var Data = []
    
      if(filter === 'all'){
        setDisplayedDescription(subscriptions)
      }else{
        for (let i = 0; i < subscriptions.length; i++){
          const item = subscriptions[i];
          if(item.status === filter){
            Data.push(item)
          }
        }
        setDisplayedDescription(Data)
      }
    
  }, [filter]);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
    // Cleanup function to set isMounted to false when component unmounts
    isMounted.current = false;
    };
  }, []);

  useEffect(() => {
      if (isMounted.current) {
        getSubscriptions()
      }
  }, []);
  if(loading){
    return(
    <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ToastContainer rtl="true"/>
        <CircularProgress style={{color: UISettings.colors.green}}/>
        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات..</Typography>
      </div>
    )
  }if(!isInit){
    return(
    <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ToastContainer rtl="true"/>
        <LibraryAdd style={{color: UISettings.colors.secondary, fontSize: '40px'}}/>
        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم اختيار أي برنامج بعد</Typography>
      </div>
    )
  }else{
    return (
      <Body>
          <ToastContainer rtl="true"/>
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}>اشتراكاتي</Typography>
          {
            experationDays > 10 ?
            '':
            <AdvancedAlert text={alertMessage} title={ alertTitle} />
          }
          <Title style={{ marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}} >جميع الاشتراكات 
            <Button variant='primary' onClick={()=> navigate('/student/subscribe/payment')} style={{marginRight: '10px', color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '7px 10px'}}  startIcon={<AddCard style={{marginLeft: '10px'}} />} >اشتراك</Button>
            {/* <IconButton onClick={()=> navigate('/student/subscribe/payment')} style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, marginRight: '10px'}}><AddCard/></IconButton> */}
            </Typography>
            
            <FormControl dir="rtl" style={{width: "150px"}}>
              <InputLabel id="demo-simple-select-label"> الحالة </InputLabel>
              <Select
                dir="rtl"
                style={{paddingTop: "0px", paddingBottom: '0px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="الحالة"
                defaultValue={0}
                onChange={(e)=> setFilter(e.target.value)}
              >
                <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
                <MenuItem value={'payed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم الدفع</span> </MenuItem>
                <MenuItem value={'added'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >فترة إضافية</span> </MenuItem>
                <MenuItem value={'notPayed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يدفع</span> </MenuItem>
              </Select>
            </FormControl>
            <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<SaveAltOutlined/>} >تحميل الفاتورة</Button>
          </Title>
          <div dir="rtl" style={{ height: 370, width: '100%' }}>
            <DataGrid
              rows={displayedDescription}
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
const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
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

const columns = [
  { field: 'type', headerName: (<span>نوع الاشتراك</span>), minWidth: 120, flex: 1, renderCell: (params) => {
    var type = ''
      if(params.row.type === '1'){
        type = 'اشتراك شهر واحد '
      }else if (params.row.type === '3'){
        type= 'اشتراك 3 أشهر'
      }else if (params.row.type === '6'){
        type = 'اشتراك 6 أشهر'
      }else if (params.row.type === '12'){
        type = 'اشتراك 1 سنة'
      }
      return (<><span style={{color: UISettings.colors.secondary}}>{type}</span> </>);
    }, },
  { field: 'program', headerName: 'البرنامج', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.program}</span> </>);}, },
  { field: 'expirationDate', headerName: 'من', width: 140, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.validationDate? (params.row.validationDate.split('T')[0]? params.row.validationDate.split('T')[0] : '') : '--'}</span> </>);}, },
  { field: 'validationDate', headerName: 'إلى', width: 140, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.expirationDate.split('T')[0]? params.row.expirationDate.split('T')[0] : ''} </span> </>);}, },
  { field: 'paymentDate', headerName: 'تاريخ دفع الاشتراك', width: 140, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.paymentDate? (params.row.paymentDate.split('T')[0]? params.row.paymentDate.split('T')[0] : '') : '--'}</span> </>);}, },
  { field: 'status', headerName: 'الحالة', width: 140, renderCell: (params) => {
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
  { id: 1, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 2, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 3, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
  { id: 4, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 5, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 6, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 7, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 8, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 10, type: 'اشتراك شهري', month: ' فيفري 2025', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 20, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 30, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
  { id: 40, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 50, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 60, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 70, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 80, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
];