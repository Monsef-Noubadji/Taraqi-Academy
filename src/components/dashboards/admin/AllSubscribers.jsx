import { useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button,Box, FormControl,ListItemIcon, InputLabel,Menu, MenuItem, Select, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomPagination from './CustomPagination'
import AddIcon from '@mui/icons-material/Add';
import { MoreVert,Block,Delete } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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
                  <Link to={`/admin/teachers/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
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

  const questionType = [
    {id:0, name:"خيار من متعدد"},
    {id:1, name:"سؤال كتابي"},
    ]

  return (
    <Body>
        <Box display={'flex'} sx={{'direction':'rtl'}} flexDirection={'column'} alignItem={'start'} justifyContent={'center'} gap={'2rem'}>
        <Typography variant='h5' fontWeight={800}>{'إدارة الإشتراكات > إشتراكات الطلاب'}</Typography>
          <Typography variant='h7' fontWeight={700}>حدد الطلاب المراد عرضهم</Typography>
          {/* filter section */}
          <section className='flex items-center justify-start gap-2 w-full'>
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
          </section>
        </Box>
        <Title style={{ marginBottom: '10px',justifyContent:'space-between'}}>
          <Typography variant="p" sx={{'marginBottom':'1.5rem'}} >مجموع إشتراكات الطلاب : {rows.length} طالب</Typography>
          <Box display={'flex'} flexDirection={'row-reverse'} alignItems={'center'} gap={'1rem'}>
            <FormControl dir="rtl" style={{width: "auto"}}>
            <InputLabel id="demo-simple-select-label"> الحالة </InputLabel>
            <Select
              dir="rtl"
              style={{paddingTop: "0px", paddingBottom: '0px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="الحالة"
              defaultValue={0}
              //onChange={handleChange}
            >
              <MenuItem selected value={0} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم الدفع</span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >فترة إضافية</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يدفع</span> </MenuItem>
            
            </Select>
            </FormControl>
            <FormControl dir="rtl" style={{width: "25%"}}>
            <InputLabel id="demo-simple-select-label"> نوع الإشتراك </InputLabel>
            <Select
              dir="rtl"
              style={{paddingTop: "0px", paddingBottom: '0px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="نوع الإشتراك"
              defaultValue={0}
              //onChange={handleChange}
            >
              <MenuItem selected value={0} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
              <MenuItem value={9} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >شهري </span> </MenuItem>
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} > ثلاثة أشهر </span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} > ستة أشهر</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >سنوي</span> </MenuItem>
            </Select>
            </FormControl>
            <Button variant='primary' onClick={()=> navigate('/admin/subscriptions/new')} endIcon={<AddIcon sx={{'marginRight':'10px'}}/>} >إضافة اشتراك</Button>
          </Box>
        </Title>
        <div dir="rtl" style={{ height: 370, width: '100%' }}>
          <DataGrid
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
        </div>
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

const columns = [
  { field: 'type', headerName: (<span>نوع الاشتراك</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.type}</span> </>);}, },
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

  { 
    field: 'details', 
    headerName: <span><MoreVertIcon/></span>, 
    width: 150, 
    renderCell: (params) => { 
        return (
            <TeacherMenu id={params.row.id} />
        );
    }, 
},
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