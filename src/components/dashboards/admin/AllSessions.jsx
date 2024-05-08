import { Button, CircularProgress, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Delete, MoreVert, PrintOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from 'react';
import errorHandler from '../student/errorHandler';
import axiosInstance from '../student/axiosInstance';
import { ToastContainer,toast } from "react-toastify";


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
                    <Link to={`/admin/sessions/${id}/edit`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                            <BadgeIcon />
                        </ListItemIcon>
                        <Typography variant="inherit">التفاصيل</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon sx={{'color':UISettings.colors.red}}>
                        <Delete />
                    </ListItemIcon>
                    <Typography variant="inherit">حذف </Typography>
                </MenuItem>
            </Menu>
        </div>
        
    );  
  };


const AllSessions = ({windowSize}) => {

    const navigate = useNavigate()

    
    const [groups, setGroups] = useState([]);
    const [displayedGroups, setDisplayedGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getGroups() {
        try {
            const response = await axiosInstance.post('/adminApi/getGroups');
            console.log(response.data)
            if(response.data.response === 'done'){
                setGroups(response.data.groups)
                setDisplayedGroups(response.data.groups)
                setPrograms(response.data.programs)
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
            getGroups()
          }
      }, []);

      const [programs, setPrograms] = useState([]);
      const [program, setprogram] = useState("all");
      const [displayedPrograms, setDisplayedPrograms] = useState([]);

      useEffect(() => {
        if(program === "all"){
            setDisplayedGroups(groups)
        }else{
            var data = []
            for (let i = 0; i < groups.length; i++) {
                const item = groups[i];
                if(item.program === program){
                    data.push(item)
                }
            }
            setDisplayedGroups(data)
        }
      }, [program]);

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
            <main style={{'direction':'rtl',padding:'1rem',  paddingTop: '0px', marginTop: '0px'}}>
                <Typography variant='h5' fontWeight={800}>{'إدارة الحلقات > جميع الحلقات'}</Typography>
                <section className='flex flex-col items-start justify-center mt-20 gap-8' style={{marginTop: '25px'}}>
                    {/* CTA section */}
                    <section className='flex-col md:flex-row lg:flex-row justify-between gap-10 w-full'>
                        <p className='mb-8 md:mb-0 lg:mb-0'>مجموع الحلقات : {groups.length} حلقة</p>
                        <div className='flex items-center justify-start md:justify-end lg:justify-end gap-3'>
                            {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><PrintOutlined/></Button> */}
                            <FormControl dir="rtl" style={{'width':'7rem'}} >
                    <InputLabel id="program" > البرنامج </InputLabel>
                        <Select
                            dir="rtl"
                            style={{paddingTop: "0px", paddingBottom: '0px'}}
                            labelId="program"
                            id="program"
                            value={program}
                            label="البرنامج"
                            onChange={(e)=> setprogram(e.target.value)}
                        >
                            <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                            {programs.map((program,index)=>(
                                <MenuItem key={index} value={program.name} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                            ))}
                        </Select>
                            </FormControl>
                            <Button variant='primary' onClick={()=> navigate('/admin/sessions/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة حلقة</Button>
                        </div>
                    </section>
    
                    <div dir="rtl" style={{  height: windowSize.width > UISettings.devices.phone? 'calc(100vh - 270px)' : 'calc(100vh - 300px)', width: '100%' }}>
                        <DataGrid
                            rows={displayedGroups}
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
                            }},
                            }}
                        />
                    </div>
                </section>
            </main>
        );
    }
};

export default AllSessions;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>إسم الحلقة</span>), 
        minWidth: 150, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/sessions/${params.row.id}/edit`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'number', 
        headerName: 'عدد الطلاب', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/sessions/${params.row.id}/edit`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.students}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'program', 
        headerName: 'البرنامج', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/sessions/${params.row.id}/edit`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.program}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'teacher', 
        headerName: 'الأستاذ المسؤول', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/sessions/${params.row.id}/edit`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.teacher}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'createdAt', 
        headerName: 'تاريخ الإنشاء', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/sessions/${params.row.id}/edit`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.createdAt ? params.row.createdAt.split('T')[0] : '__'}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'details', 
        headerName: '', 
        width: 50, 
        renderCell: (params) => { 
            return (
                <TeacherMenu id={params.row.id} />
            );
        }, 
    },
];

  
const rows = [
    { id: 1, name: 'حلقة المعالي', number: '45', program: 'برنامج الأساس', teacher: 'الأستاذ العيد عبود' },
    { id: 2, name: 'حلقة العلم والتعلم', number: '30', program: 'برنامج التميز', teacher: 'الأستاذة فاطمة خليل' },
    { id: 3, name: 'حلقة النور', number: '20', program: 'برنامج الهمم', teacher: 'الأستاذ محمد علي' },
    { id: 4, name: 'حلقة التدبر', number: '15', program: 'برنامج الإتقان', teacher: 'الأستاذة سارة حسن' },
    { id: 5, name: 'حلقة القراءة', number: '10', program: 'برنامج الأساس', teacher: 'الأستاذ عبد الرحمن محمد' },
    { id: 6, name: 'حلقة التجويد', number: '25', program: 'برنامج التميز', teacher: 'الأستاذة ليلى علي' },
    { id: 7, name: 'حلقة الحفظ', number: '18', program: 'برنامج الهمم', teacher: 'الأستاذ يوسف صالح' },
    { id: 8, name: 'حلقة التفسير', number: '22', program: 'برنامج الإتقان', teacher: 'الأستاذة نورة أحمد' }
      
      
];