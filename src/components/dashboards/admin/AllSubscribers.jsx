import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button,Box, FormControl,ListItemIcon, InputLabel,Menu, MenuItem, Select, Typography, CircularProgress, TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomPagination from './CustomPagination'
import AddIcon from '@mui/icons-material/Add';
import { MoreVert,Block,Delete, CheckCircleOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import errorHandler from '../student/errorHandler'
import axiosInstance from '../student/axiosInstance'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab'


export const TeacherMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [secondMenuAnchorEl, setSecondMenuAnchorEl] = useState(null);


  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleClickSecondMenu = (event) => {
    setSecondMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSecondMenu = () => {
    setSecondMenuAnchorEl(null);
  };
  

  return (
      <div>
          <MoreVert onClick={handleClick} style={{ cursor: 'pointer' }} />
          <Menu
              sx={{direction:'rtl',padding:'1rem'}}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
          >
              <MenuItem >
                  <Link to={`/admin/subscriptions/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
                      <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                          <BadgeIcon />
                      </ListItemIcon>
                      <Typography variant="inherit">التفاصيل</Typography>
                  </Link>
              </MenuItem>
              <MenuItem onClick={handleClickSecondMenu}>
                  <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                      <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">تغيير حالة الإشتراك</Typography>
                  
              </MenuItem>
              <MenuItem>
                  <ListItemIcon sx={{'color':UISettings.colors.red}}>
                      <Delete />
                  </ListItemIcon>
                  <Typography variant="inherit">حذف </Typography>
              </MenuItem>
          </Menu>

          <Menu
                anchorEl={secondMenuAnchorEl}
                open={Boolean(secondMenuAnchorEl)}
                onClose={handleCloseSecondMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم الدفع</span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >فترة إضافية</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يدفع</span> </MenuItem>
            
            </Menu>
      </div>
      
  );
};

export default function Subscribe({windowSize}) {
  const navigate = useNavigate()
  const programs = [
    {id:0, name:"برنامح الهمم"},
    {id:1, name:"برنامج التميز"},
    {id:2, name:"برنامح الأساس"},
  ]

  const sessions = [
  {id:0, name:"حلقة الهمم"},
  {id:1, name:"حلقة التميز"},
  {id:2, name:"حلقة الأساس"},
  ]


    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getSubscriptions() {
        try {
            const response = await axiosInstance.post('/adminApi/getAllSubscriptions');
            console.log(response.data)
            if(response.data.response === 'done'){
                setSubscriptions(response.data.subscriptions)
                setDisplayedSubscriptions(response.data.subscriptions)
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

      const [loadingData, setLoadingData] = useState(false);
    
      useEffect(() => {
          if (isMounted.current) {
            getSubscriptions()
          }
      }, []);

      const [status, setStatus] = useState('all');
      const [student, setStudent] = useState('');
      const [displayedSubscriptions, setDisplayedSubscriptions] = useState([]);

      function stringContains(searchString, pattern) {
        // Escape special characters in the pattern
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Create a regular expression with the pattern and 'i' flag for case-insensitive search
        const regex = new RegExp(escapedPattern, 'i');
        // Test if the searchString matches the pattern
        return regex.test(searchString);
    }

      useEffect(() => {
        setLoadingData(true)
        var data = []
        var dataByStatus = []
        for (let i = 0; i < subscriptions.length; i++) {
          const item = subscriptions[i];
          
          // check status
          if(status === "all"){
            dataByStatus.push(item)
          }else{
            if(item.status === status){
              dataByStatus.push(item)
            }
          }
        }

        for (let i = 0; i < dataByStatus.length; i++) {
          const item = dataByStatus[i];
          var firstName = item.student && item.student.firstName ? item.student.firstName : ''
          var familyName = item.student && item.student.familyName ? item.student.familyName : ''
          var name = firstName + ' ' + familyName
          if(stringContains(name, student)){
            data.push(item)
          }
        }

        setDisplayedSubscriptions(data)
        setLoadingData(false)

      }, [status, student, subscriptions]);

      const columns = [
        { field: 'student', headerName: 'الطالب', minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.student ? params.row.student.firstName + ' ' + params.row.student.familyName : '--'}</span> </>);}, },
        { field: 'program', headerName: 'البرنامج', width: 120, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.program ? params.row.program : '--'}</span> </>);}, },
        { field: 'type', headerName: 'نوع الاشتراك', width: 100, renderCell: (params) => 
          { 
            var type = ''
            if(params.row.type === '1'){
              type = 'شهر واحد '
            }else if (params.row.type === '3'){
              type= '3 أشهر'
            }else if (params.row.type === '6'){
              type = '6 أشهر'
            }else if (params.row.type === '12'){
              type = '1 سنة'
            }else if (params.row.type === 'special'){
              type = 'مخصص'
            }
            return (
              <><span style={{color: UISettings.colors.secondary}}>{type}</span> </>
            );
          }, 
        },
        { field: 'expirationDate', headerName: 'من', width: 100, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.validationDate? (params.row.validationDate.split('T')[0]? params.row.validationDate.split('T')[0] : '') : '--'}</span> </>);}, },
        { field: 'validationDate', headerName: 'إلى', width: 100, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.expirationDate.split('T')[0]? params.row.expirationDate.split('T')[0] : ''} </span> </>);}, },
        { field: 'paymentDate', headerName: 'تاريخ دفع الاشتراك', width: 140, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.paymentDate? (params.row.paymentDate.split('T')[0]? params.row.paymentDate.split('T')[0] : '') : '--'}</span> </>);}, },
        { field: 'status', headerName: 'الحالة', width: 100, renderCell: (params) => {
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
        { field: 'amount', headerName: 'المبلغ', width: 120, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.amount}.00 دج</span> </>);}, },
      
        { 
          field: 'details', 
          headerName: 'تأكيد الدفع', 
          width: 150, 
          renderCell: (params) => { 
            if(params.row.status === 'payed'){
              return (
                <></>
                // <Button variant='outlined' disabled style={{backgroundColor: "white", color: UISettings.colors.green, borderColor: 'white', padding: '5px 5px 5px 13px'}} startIcon={<CheckCircleOutlineOutlined style={{paddingLeft: '10px', fontSize: '25px'}} />} >تم تأكيد الدفع</Button>
              );
            }else if(params.row.status === 'notPayed'){
              return (
                  <LoadingButton loading={params.row.loading ? true : false} loadingPosition='end' onClick={()=> confirmSbscription(params.row.id) } variant='outlined' style={{backgroundColor: UISettings.colors.green, color: 'white', borderColor: 'white', padding: '5px 5px 5px 13px'}} startIcon={<CheckCircleOutlineOutlined style={{paddingLeft: '10px', fontSize: '25px', color: params.row.loading ? 'transparent' : 'white'}} />} >تأكيد الدفع</LoadingButton>
              );
            }else if(params.row.status === 'snoozed'){
              return (
                <></>
              );
            }
          }, 
            // <TeacherMenu id={params.row.id} />
        }
      ];

      async function confirmSbscription(id) {
        try {
          const updatedList = subscriptions.map(obj => {
            if (obj.id === id) {
                // Return a new object with the updated property
                return { ...obj, ['loading']: true };
            }
            return obj; // Return the original object if ID doesn't match
          });
          setSubscriptions(updatedList);
          const response = await axiosInstance.post('/adminApi/confirmSubscription', {id});
          console.log(response.data)
          if(response.data.response === 'done'){
            const updatedList = subscriptions.map(obj => {
              if (obj.id === response.data.id) {
                  // Return a new object with the updated property
                  return { ...obj, ['status']: 'payed', ['loading']: false, ['validationDate']: response.data.from, ['expirationDate']: response.data.to, ['paymentDate']: response.data.paymentDate   };
              }
              return obj; // Return the original object if ID doesn't match
            });
            setSubscriptions(updatedList);
            // setSubscriptions(response.data.subscriptions)
            // setDisplayedSubscriptions(response.data.subscriptions)
            // setLoading(false)
          }
        } catch (error) {
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
              <Box display={'flex'} sx={{'direction':'rtl'}} flexDirection={'column'} alignItem={'start'} justifyContent={'center'} gap={'2rem'}>
              <Typography variant='h5' fontWeight={800}>{'إدارة الإشتراكات > إشتراكات الطلاب'}</Typography>
                
                {/* in comment // */}
                {/* filter section */}
                {/* <Typography variant='h7' fontWeight={700}>حدد الطلاب المراد عرضهم</Typography> */}
                {/* <section className='flex items-center justify-start gap-2 my-4 w-full' style={{display: 'none'}}>
                  <FormControl dir="rtl" style={{width: "33%"}}>
                          <InputLabel id="program" > البرنامج </InputLabel>
                              <Select
                                  dir="rtl"
                                  style={{paddingTop: "0px", paddingBottom: '0px'}}
                                  labelId="program"
                                  id="program"
                                  //value={age}
                                  label="البرنامج"
                                  defaultValue={'all'}
                                  //onChange={handleChange}
                              >
                                  <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                  {programs.map((program,index)=>(
      
                                      <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                                  ))}
                              </Select>
                  </FormControl>
                  <FormControl dir="rtl" style={{width: "33%"}}>
                          <InputLabel id="gender" > الجنس </InputLabel>
                              <Select
                                  dir="rtl"
                                  style={{paddingTop: "0px", paddingBottom: '0px'}}
                                  labelId="gender"
                                  id="gender"
                                  //value={age}
                                  label="الجنس"
                                  defaultValue={0}
                                  //onChange={handleChange}
                              >
                              <MenuItem selected value={0} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                              <MenuItem selected value={"MALE"} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>ذكر</span> </MenuItem>
                              <MenuItem value={"FEMALE"} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> أنثى</span> </MenuItem>
                              </Select>
                  </FormControl>
                  <FormControl dir="rtl" style={{width: "33%"}}>
                          <InputLabel id="session" > الحلقة </InputLabel>
                              <Select
                                  dir="rtl"
                                  style={{paddingTop: "0px", paddingBottom: '0px'}}
                                  labelId="session"
                                  id="session"
                                  //value={age}
                                  label="الحلقة"
                                  defaultValue={'all'}
                                  //onChange={handleChange}
                              >
                                  <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                  {sessions.map((session,index)=>(
      
                                      <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                                  ))}
                              </Select>
                  </FormControl>
                </section> */}
      
              </Box>
              <Title style={{ marginBottom: '10px',justifyContent:'space-between'}}>
                {/* <Typography variant="p" sx={{'marginBottom':'1.5rem'}} >مجموع إشتراكات الطلاب : {rows.length} إشتراك</Typography> */}
                <Box display={'flex'} flexDirection={'row-reverse'} alignItems={'center'} gap={'1rem'} style={{width: '100%', justifyContent: 'space-between'}}>
                  

                  
                  
                  <div style={{minWidth: '300px', display: 'flex', flexDirection: 'column', direction: 'rtl'}}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", textAlign: 'start', width: '100%'}}>بحث عن طالب</Typography>
                    <TextField
                      style={{width: '100%'}} 
                      placeholder='أدخل اسم الطالب' 
                      value={student} 
                      onChange={(e)=> {setStudent(e.target.value)}}
                      />
                  </div>
                  
                  <FormControl dir="rtl" style={{width: "auto"}}>
                  <InputLabel id="demo-simple-select-label"> الحالة </InputLabel>
                  <Select
                    dir="rtl"
                    style={{paddingTop: "0px", paddingBottom: '0px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="الحالة"
                    defaultValue={0}
                    onChange={(e)=>setStatus(e.target.value)}
                  >
                    <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
                    <MenuItem value={'payed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم الدفع</span> </MenuItem>
                    <MenuItem value={'snoozed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >فترة إضافية</span> </MenuItem>
                    <MenuItem value={'notPayed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يدفع</span> </MenuItem>
                  
                  </Select>
                  </FormControl>

                  {/* <Button variant='primary' onClick={()=> navigate('/admin/subscriptions/new')} endIcon={<AddIcon sx={{'marginRight':'10px'}}/>} >إضافة اشتراك</Button> */}
                </Box>
              </Title>
              <div dir="rtl" style={{ height: 470, width: '100%' }}>
                <DataGrid
                  rows={displayedSubscriptions}
                  columns={columns}
                  loading={loadingData}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection={false}
                  rowSelection={false}
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
    margin-top: 25px;
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