import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Slide, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Clear, Delete, MoreVert, PrintOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../student/axiosInstance';
import errorHandler from '../student/errorHandler';
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';


export const TeacherMenu = ({ id, setOpenDeletePopup, setSelectedProgram }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [secondMenuAnchorEl, setSecondMenuAnchorEl] = useState(null);
  
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
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
                    <Link to={`/admin/reports/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                            <BadgeIcon />
                        </ListItemIcon>
                        <Typography variant="inherit">التفاصيل</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={()=> {setOpenDeletePopup(true);  setAnchorEl(null); setSelectedProgram(id)}}>
                    <ListItemIcon sx={{'color':UISettings.colors.red}}>
                        <Delete />
                    </ListItemIcon>
                    <Typography variant="inherit">حذف </Typography>
                </MenuItem>
            </Menu>
        </div>
        
    );
  };


const AllReports = () => {

    const navigate = useNavigate()


    const [displayedReports, setDisplayedReports] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getReports() {
        try {
            const response = await axiosInstance.post('/adminApi/getReports');
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedReports(response.data.reports)
                setReports(response.data.reports)
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
    
      useEffect(() => {
          if (isMounted.current) {
            getReports()
          }
      }, []);

      const [changes, setChanges] = useState(0);

      function sortByName() {
        var array = reports
        array = array.slice().sort((a, b) => a.title.localeCompare(b.title));
        setDisplayedReports(array)
        setChanges(changes + 1)
      }
      
      // Function to sort array of objects by newest createdAt
      function sortByNewest() {
        var array = reports
        array = array.slice().sort((a, b) => new Date(b.createdAt)  - new Date(a.createdAt) );
        setDisplayedReports(array)
        setChanges(changes + 1)
        console.log(array)

      }
      
      // Function to sort array of objects by oldest createdAt
      function sortByOldest() {
        var array = reports
        array = array.slice().sort((a, b) =>  new Date(a.createdAt)  - new Date(b.createdAt));
        setDisplayedReports(array)
        setChanges(changes + 1)

      }
      
      const [sortBy, setSortBy] = useState('الكل');

      useEffect(() => {
        console.log(sortBy)
        if(sortBy === 'الأحدث'){
            sortByNewest()
        }else if (sortBy == 'الأقدم'){
            sortByOldest()

        }else{
            sortByName()
        }
      }, [sortBy]);

      const columns = [
        { 
            field: 'name', 
            headerName: (<span>عنوان التقرير</span>), 
            minWidth: 150, 
            flex: 1, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/reports/${params.row.id}`}>
                        <span style={{color: UISettings.colors.secondary}}>{params.row.title}</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'askDate', 
            headerName: 'تاريخ طلب التقرير', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.createdAt ? params.row.createdAt.split('T')[0] : '--'}</span>
                );
            }, 
        },
        { 
            field: 'teacher', 
            headerName: 'الأستاذ المسؤول', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.teacher ? params.row.teacher.firstName + ' ' + params.row.teacher.familyName : '--'}</span>
                );
            }, 
        },
        
        { 
            field: 'status', 
            headerName: 'حالة التقرير', 
            width: 150, 
            renderCell: (params) => { 
              if(params.row.replied === true){
                  return(
                      <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>تم الإرسال</span>
                  )
              }else{
                  return(
                      <span style={{'color':UISettings.colors.brown,backgroundColor:UISettings.colors.brownBG,padding:'.5rem',borderRadius:'10px'}}>لم يتم الإرسال</span>
                  )
              }
                
            }, 
        },
        { 
            field: 'date', 
            headerName: 'تاريخ إرسال التقرير', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.repliedAt ? params.row.repliedAt.split('T')[0] : '--'}</span>
                );
            }, 
        },
        { 
            field: 'details', 
            headerName: '', 
            width: 50, 
            renderCell: (params) => { 
                return (
                    <TeacherMenu setSelectedProgram={setSelectedProgram} setOpenDeletePopup={setOpenDeletePopup} id={params.row.id} />
                );
            }, 
        },
    ];

    const [selectedProgram, setSelectedProgram] = useState('');

      const [loadingDelete, setLoadingDelete] = useState(false);
      async function deleteProgram() {
        try {
            setLoadingDelete(true)
            const response = await axiosInstance.post('/adminApi/deleteReport', {id: selectedProgram});
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedReports(response.data.reports)
                setReports(response.data.reports)
                setLoadingDelete(false)
                setOpenDeletePopup(false)
                toast.success('تم حذف التقرير بشكل نهائي', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 3000,
                    theme: 'colored'
                });
            }
        } catch (error) {
            setLoadingDelete(false)
            errorHandler(error, toast, navigate)
        }
    }

      const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
        const handleCloseDeletePopup = () => {
            setOpenDeletePopup(false);
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
            <main style={{'direction':'rtl',padding:'1rem', marginTop: '0px', paddingTop: '0px'}}>
                <ToastContainer rtl="true"/>
                <Typography variant='h5' fontWeight={800}>{'إدارة التقارير > جميع التقارير'}</Typography>
                <section className='flex flex-col items-start justify-center mt-6 gap-8'>
                <Typography variant='p' fontWeight={400}>مجموع التقارير : {rows.length} تقرير</Typography>
    
                    {/* filter section */}
                    {/* <section className='flex items-center justify-start gap-2 w-full'>
                    <FormControl dir="rtl" style={{width: "50%"}}>
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
                    <FormControl dir="rtl" style={{width: "50%"}}>
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
                    {/* CTA section */}
                    <section className='flex-col md:flex-row lg:flex-row justify-between gap-10 w-full' style={{marginTop: '-20px', marginBottom: '0px'}}>
                        {/* <p className='mb-8 md:mb-0 lg:mb-0'>مجموع التقارير : {rows.length} تقرير</p> */}
                        <div className='flex items-center justify-start md:justify-end lg:justify-end gap-3'>
                            {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><PrintOutlined/></Button> */}
                            <FormControl dir="rtl" style={{'width':'7rem'}} >
                                <Select
                                dir="rtl"
                                style={{paddingTop: "0px", paddingBottom: '0px'}}
                                labelId="program"
                                id="program"
                                value={sortBy}
                                label=""
                                defaultValue={'الكل'}
                                onChange={(e)=> setSortBy(e.target.value)}
                                >
                                    <MenuItem selected value={'الكل'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                    <MenuItem  value={'الأقدم'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الأقدم</span> </MenuItem>
                                    <MenuItem  value={'الأحدث'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الأحدث</span> </MenuItem> 
                                </Select>
                            </FormControl>
                            <Button variant='primary' onClick={()=> navigate('/admin/reports/demande')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >طلب تقرير</Button>
                        </div>
                    </section>
    
                    <div dir="rtl" style={{ height: "calc(100vh - 280px)", width: '100%' }}>
                        <DataGrid
                            rows={displayedReports}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 20 },
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
                </section>

                {/* // delete popup */}
                <Dialog
                    fullWidth
                    maxWidth={"sm"}
                    open={openDeletePopup}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeletePopup}
                    aria-describedby="alert-dialog-slide-description"
                    style={{borderRadius: '20px'}}
                    >
                    <DialogTitle><Clear onClick={()=> setOpenDeletePopup(false)} style={{cursor: 'pointer'}}/></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Delete style={{fontSize: '100px', color:'red'}}></Delete>
                        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>حذف التقرير</Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>هل أنت متأكد من حذف هذا التقرير بشكل نهائي ؟</Typography>
                        <Buttons style={{justifyContent: 'center'}}>
                            <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenDeletePopup(false)}>رجوع</Button>
                            <LoadingButton loading={loadingDelete} loadingPosition='center'  variant='primary' style={{backgroundColor: 'red'}} onClick={()=> deleteProgram()}>حذف التقرير</LoadingButton >
                        </Buttons>
                        </DialogContentText>
                    </DialogContent>
                    
                </Dialog> 
            </main>
        );
    }

};

export default AllReports;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  
const rows = [
    { id: 1, name: 'تقرير الإمتحان النهائي ', date: '03 جانفي 2023', teacher: 'الأستاذ العيد عبود' },
    { id: 2, name: 'تقرير إمتحان السداسي ', date: '03 جانفي 2023', teacher: 'الأستاذة فاطمة خليل' },
    { id: 3, name: 'تقرير إمتحان التفسير ', date: '03 جانفي 2023', teacher: 'الأستاذ محمد علي' },
    { id: 4, name: 'تقرير إمتحان التجويد ', date: '03 جانفي 2023', teacher: 'الأستاذة سارة حسن' },
    { id: 5, name: 'تقرير إمتحان الناسخ والمنسوخ ', date: '03 جانفي 2023', teacher: 'الأستاذ عبد الرحمن محمد' },
    { id: 6, name: 'تقرير إمتحان المتشابهات ', date: '03 جانفي 2023', teacher: 'الأستاذة ليلى علي' },
    { id: 7, name: 'تقرير إمتحان أسباب النزول ', date: '03 جانفي 2023', teacher: 'الأستاذ يوسف صالح' },
    { id: 8, name: 'تقرير إمتحان المستوى الأول ', date: '03 جانفي 2023', teacher: 'الأستاذة نورة أحمد' }
      
      
];