import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Slide, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Clear, Delete, Error, MoreVert, PrintOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer,toast } from "react-toastify";
import errorHandler from '../student/errorHandler';
import axiosInstance from '../student/axiosInstance';
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';


export const TeacherMenu = ({ id, setOpenDeletePopup, setSelectedProgram }) => {
    const [anchorEl, setAnchorEl] = useState(null);
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
                    <Link to={`/admin/programs/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
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


const AllPrograms = () => {

    const navigate = useNavigate()

    const [displayedPrograms, setDisplayedPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPrograms() {
        try {
            const response = await axiosInstance.post('/adminApi/getProgramsWithStudentCount');
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedPrograms(response.data.programs)
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
            getPrograms()
          }
      }, []);

      const [changes, setChanges] = useState(0);

      function sortByName() {
        var array = displayedPrograms
        array = array.slice().sort((a, b) => a.name.localeCompare(b.name));
        setDisplayedPrograms(array)
        setChanges(changes + 1)
      }
      
      // Function to sort array of objects by newest createdAt
      function sortByNewest() {
        var array = displayedPrograms
        array = array.slice().sort((a, b) => new Date(b.createdAt)  - new Date(a.createdAt) );
        setDisplayedPrograms(array)
        setChanges(changes + 1)
        console.log(array)

      }
      
      // Function to sort array of objects by oldest createdAt
      function sortByOldest() {
        var array = displayedPrograms
        array = array.slice().sort((a, b) =>  new Date(a.createdAt)  - new Date(b.createdAt));
        setDisplayedPrograms(array)
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

      const [selectedProgram, setSelectedProgram] = useState('');

      const [loadingDelete, setLoadingDelete] = useState(false);
      async function deleteProgram() {
        try {
            setLoadingDelete(true)
            const response = await axiosInstance.post('/adminApi/deleteProgram', {id: selectedProgram});
            console.log(response.data)
            if(response.data.response === 'done'){
                setDisplayedPrograms(response.data.programs)
                setLoadingDelete(false)
                setOpenDeletePopup(false)
                toast.success('تم حذف البرنامج بشكل نهائي', {
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

      const columns = [
        { 
            field: 'name', 
            headerName: (<span>إسم البرنامج</span>), 
            minWidth: 150, 
            flex: 1, 
            renderCell: (params) => { 
                return (
                    <Link to={`/admin/programs/${params.row.id}`}>
                        <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
                    </Link>
                );
            }, 
        },
        { 
            field: 'number', 
            headerName: 'عدد الطلاب المسجلين', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.students}</span>
                );
            }, 
        },
        { 
            field: 'duration', 
            headerName: 'مدة البرنامج', 
            width: 150, 
            renderCell: (params) => { 
                return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.duration}</span>
                );
            }, 
        },
        { 
          field: 'status', 
          headerName: 'حالة البرنامج', 
          width: 150, 
          renderCell: (params) => { 
            if(params.row.status === 'available'){
                return(
                    <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>متاح</span>
                )
            }else{
                return(
                    <span style={{'color':UISettings.colors.brown,backgroundColor:UISettings.colors.brownBG,padding:'.5rem',borderRadius:'10px'}}>غير متاح</span>
                )
            }
              
          }, 
      },
      { 
        field: 'date', 
        headerName: 'تاريخ الإنشاء', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <span style={{color: UISettings.colors.secondary}}>{params.row.createdAt ? params.row.createdAt.split('T')[0] : '--'}</span>
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
                <Typography variant='h5' fontWeight={800}>{'إدارة البرامج > جميع البرامج'}</Typography>
                <section className='flex flex-col items-start justify-center mt-6 gap-8'>
                    {/* CTA section */}
                    <section className='flex-col md:flex-row lg:flex-row justify-between gap-10 w-full'>
                        <p className='mb-8 md:mb-0 lg:mb-0'>مجموع البرامج : {displayedPrograms.length} برنامج</p>
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
                            <Button variant='primary' onClick={()=> navigate('/admin/programs/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة برنامج</Button>
                        </div>
                    </section>
    
                    <div dir="rtl" style={{ height: "calc(100vh - 280px)", width: '100%' }}>
                        <DataGrid
                            rows={displayedPrograms}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 6 },
                            },
                            }}
                            pageSize={6}
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
                        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>حذف البرنامج</Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>هل أنت متأكد من حذف هذا البرنامج بشكل نهائي ؟</Typography>
                        <Buttons style={{justifyContent: 'center'}}>
                            <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenDeletePopup(false)}>رجوع</Button>
                            <LoadingButton loading={loadingDelete} loadingPosition='center'  variant='primary' style={{backgroundColor: 'red'}} onClick={()=> deleteProgram()}>حذف البرنامج</LoadingButton >
                        </Buttons>
                        </DialogContentText>
                    </DialogContent>
                    
                </Dialog> 
            </main>
        );
    }

}

export default AllPrograms;




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