import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, TextField, Menu, Typography, ListItemIcon } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Badge, Block, Clear, Delete, Error, FilterList, MoreVert, OpenInNew, Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../student/axiosInstance';
import errorHandler from '../student/errorHandler';
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';
import countriesArabic from '../student/countries';

export const TeacherMenu = ({ id, setOpenDeletePopup, setSelectedProgram, block, setBlocked}) => {
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
                    <Link to={`/admin/teachers/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                            <Badge />
                        </ListItemIcon>
                        <Typography variant="inherit">التفاصيل</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={()=> {setOpenDeletePopup(true); setBlocked(block),  setAnchorEl(null); setSelectedProgram(id)}}>
                    <ListItemIcon sx={{'color':UISettings.colors.red}}>
                        <Block />
                    </ListItemIcon>
                    <Typography variant="inherit" >{block === true ? 'حظر' : 'إلغاء الحظر'} </Typography>
                </MenuItem>
            </Menu>
        </div>
        
    );
  };


const AllRequestedTeachers = ({windowSize}) => {


    
    // const programs = [
    //     {id:0, name:"برنامح الهمم"},
    //     {id:1, name:"برنامج التميز"},
    //     {id:2, name:"برنامح الأساس"},
    // ]
    
    const navigate = useNavigate()
    
    const [teachers, setTeachers] = useState([]);
    const [displayedTeachers, setDisplayedTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getTeachers() {
        try {
            const response = await axiosInstance.post('/adminApi/getRequestedTeachers');
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedTeachers(response.data.teachers)
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
            getTeachers()
          }
      }, []);
     

      const [selectedProgram, setSelectedProgram] = useState('');
      const [loadingDelete, setLoadingDelete] = useState(false);

      async function deleteProgram() {
        try {
            setLoadingDelete(true)
            const teacher = teachers.find(item => item.id === selectedProgram)
            const response = await axiosInstance.post('/adminApi/blockTeacher', {id: selectedProgram, block: teacher ? !teacher.banned : false});
            console.log(response.data)
            if(response.data.response === 'done'){
                if(response.data.teacher){
                    setTeachers(prevItems => {
                        return prevItems.map(item => {
                          if (item.id === selectedProgram) {
                            return { ...item, banned: blocked };
                          }
                          return item;
                        });
                    });
                    setDisplayedTeachers(prevItems => {
                        return prevItems.map(item => {
                          if (item.id === selectedProgram) {
                            return { ...item, banned: blocked };
                          }
                          return item;
                        });
                    });
                }
                setLoadingDelete(false)
                setOpenDeletePopup(false)
                // toast.success('تم حظر المعلم بشكل ', {
                //     position: 'top-right',
                //     progress: undefined,
                //     autoClose: 3000,
                //     theme: 'colored'
                // });
            }
        } catch (error) {
            setLoadingDelete(false)
            errorHandler(error, toast, navigate)
        }
    }

    const [loadingChange, setLoadingChange] = useState(false);
    const [treatedTeachers, setTreatedTeachers] = useState([]);

    async function TeacherStatusChange(id, status) {
        try {
            const data = treatedTeachers
            treatedTeachers.push(id)
            setTreatedTeachers(data)
            setLoadingChange(true)
            console.log(id, status)
            const response = await axiosInstance.post('/adminApi/changeTeacherStatus', {id, status});
            console.log(response.data)
            var newData = treatedTeachers
            newData = newData.filter(item => item !== id)
            setTreatedTeachers(newData)
            if(response.data.response === 'done'){
                setLoadingChange(false)
                var parmanentTeacher = displayedTeachers
                parmanentTeacher = parmanentTeacher.filter(item => item.id !== id)
                // setTeachers(parmanentTeacher)
                setDisplayedTeachers(parmanentTeacher)
            }
        } catch (error) {
            var newData1 = treatedTeachers
            newData1 = newData1.filter(item => item !== id)
            setTreatedTeachers(newData1)
            setLoadingDelete(false)
            errorHandler(error, toast, navigate)
        }
    }

      const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
        const handleCloseDeletePopup = () => {
            setOpenDeletePopup(false);
        }

     

      const [blocked, setBlocked] = useState(false);

      const columns = [
        { 
            field: 'name', 
            headerName: (<span>الاسم</span>), 
            minWidth: 150, 
            flex: 1, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/teachers/${params.row.id}`}>
                        <span style={{color: UISettings.colors.secondary}}>{params.row.firstName + ' ' + params.row.familyName}</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'email', 
            headerName: 'البريد الإلكتروني', 
            width: 220, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/teachers/${params.row.id}`}>
                        <span style={{color: UISettings.colors.secondary}}>{params.row.email}</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'phoneNumber', 
            headerName: ' رقم الهاتف', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/teachers/${params.row.id}`}>                
                        <span style={{color: UISettings.colors.secondary}}>{params.row.phoneNumber ? params.row.phoneNumber : '--' }</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'address', 
            headerName: 'العنوان', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/teachers/${params.row.id}`}>                
                        <span style={{color: UISettings.colors.secondary}}>{params.row.wilaya ? params.row.wilaya + ',' : '' } {params.row.country ? params.row.country : '' }</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'date', 
            headerName: 'تاريخ التسجيل', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/teachers/${params.row.id}`}>
                        <span style={{color: UISettings.colors.secondary}}>{params.row.createdAt? params.row.createdAt.split('T')[0] : '--'}</span>
                    </Link>
                );
            }, 
        },
        
        { 
            field: 'details', 
            headerName: '', 
            width: 170, 
            renderCell: (params) => { 
                if(treatedTeachers.indexOf(params.row.id) !== -1){
                    return(
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <CircularProgress style={{color: UISettings.colors.green, fontSize: '10px'}} />
                        </div>
                    )
                }else{
                    return(
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <LoadingButton loading={treatedTeachers.indexOf(params.row.id) !== -1} loadingPosition='center' variant='primary' style={{height: '40px', padding: '0px', marginLeft: '0px'}} onClick={()=> TeacherStatusChange(params.row.id, 'accept')} >قبول</LoadingButton>
                            <LoadingButton loading={treatedTeachers.indexOf(params.row.id) !== -1} loadingPosition='center' variant='primary' style={{height: '40px', padding: '0px', marginLeft: '0px', backgroundColor: 'red'}} onClick={()=> TeacherStatusChange(params.row.id, 'refuse')} >رفض</LoadingButton>
                        </div>
                    )
                }
            }
        },
    ];

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
                <main style={{'direction':'rtl',padding:'1rem', paddingTop: '0px', marginTop: '0px'}}>
                    <ToastContainer rtl="true"/>
                    <Typography variant='h5' fontWeight={800}>{'إدارة المعلمين > المعلمين المسجلين حديثا'}</Typography>
                    <section className='flex flex-col items-start justify-center mt-20 gap-8' style={{marginTop: '25px'}}>
                        {/* CTA section */}
                        <section className='flex items-center justify-between gap-2 w-full' style={{flexDirection: windowSize.width > UISettings.devices.phone? 'row': 'column'}}>
                            <p style={{alignSelf: 'start'}}>مجموع المعلمين : {teachers.length} معلم</p>
                            <div className='flex items-center justify-center gap-3' style={{alignSelf: 'end'}}>
                                {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><Print/></Button> */}
                                {/* <Button variant='primary'  style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<FilterList sx={{'marginLeft':'10px'}}/>} onClick={()=> setOpenFilterPopup(true)} >تصفية المعلمين</Button> */}
                                <Button variant='primary'  onClick={()=> navigate('/admin/teachers/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة معلم</Button>
                            </div>
                        </section>
        
                        <div dir="rtl" style={{ height: windowSize.width > UISettings.devices.phone? 'calc(100vh - 250px)' : 'calc(100vh - 300px)', width: '100%' }}>
                        <DataGrid
                            rows={displayedTeachers}
                            columns={columns}
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
                            }}
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
                        <Block style={{fontSize: '100px', color:'red'}}></Block>
                        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}> {blocked ? 'حظر  المعلم' : 'إلغاء حظر المعلم'}</Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}> {blocked? 'هل أنت متأكد من حظر هذا المعلم ؟' : 'هل أنت متأكد من إلغاء حظر هذا المعلم ؟'}</Typography>
                        <Buttons style={{justifyContent: 'center'}}>
                            <Button variant='secondary' style={{marginLeft: '20px'}} onClick={()=> setOpenDeletePopup(false)}>رجوع</Button>
                            <LoadingButton loading={loadingDelete} loadingPosition='center'  variant='primary' style={{backgroundColor: 'red'}} onClick={()=> deleteProgram()}> {blocked ? 'حظر  المعلم' : 'إلغاء الحظر'} </LoadingButton >
                        </Buttons>
                        </DialogContentText>
                    </DialogContent>
                    
                </Dialog> 
                </main>
            );
        }

};

export default AllRequestedTeachers;


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