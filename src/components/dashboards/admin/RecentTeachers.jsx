import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import {  Check, Close, MoreVert, Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BadgeIcon from '@mui/icons-material/Badge';
import {ToastContainer,toast} from 'react-toastify'


const approved = ()=>{
    toast('تم قبول طلب إنشاء الحساب',{
        position:'top-left',
        type:'success',
        progress:undefined,
        autoClose:3000,
        theme:'colored'
      })
}
const denied = ()=>{
    toast('تم رفض طلب إنشاء الحساب',{
        position:'top-left',
        type:'error',
        progress:undefined,
        autoClose:3000,
        theme:'colored'
      })
}
export const TeacherMenu = ({ id }) => {
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
                sx={{direction:'rtl'}}
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
                <MenuItem onClick={()=>{
                    approved()
                    handleClose()
                }}>
                    <ListItemIcon sx={{'color':UISettings.colors.green}}>
                        <Check />
                    </ListItemIcon>
                    <Typography variant="inherit">قبول الأستاذ</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{
                    denied()
                    handleClose()
                }}>
                    <ListItemIcon sx={{'color':UISettings.colors.red}}>
                        <Close />
                    </ListItemIcon>
                    <Typography variant="inherit">رفض الأستاذ</Typography>
                </MenuItem>
            </Menu>
        </div>
        
    );
};

const AllTeachers = () => {

    const navigate = useNavigate()
    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة المعلمين >  المعلمين المسجلين حديثا'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
                {/* CTA section */}
                <section className='flex items-center justify-between gap-2 w-full'>
                    <p>مجموع المعلمين : {rows.length} معلما</p>
                    <div className='flex items-center justify-center gap-3'>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><Print/></Button>
                        <Button variant='primary' onClick={()=> navigate('/admin/teachers/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة معلم</Button>
                    </div>
                </section>

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
            </section>
            <ToastContainer/>
        </main>
    );
};

export default AllTeachers;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>إسم المعلم</span>), 
        minWidth: 150, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
            );
        }, 
    },
    { 
        field: 'email', 
        headerName: 'البريد الإلكتروني', 
        width: 200, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.email}</span>
            );
        }, 
    },
    { 
        field: 'studyField', 
        headerName: 'المستوى الدراسي', 
        width: 200, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.studyField}</span>
            );
        }, 
    },
    { 
        field: 'jobRole', 
        headerName: 'النشاط المهني', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.jobRole}</span>
            );
        }, 
    },
    { 
        field: 'details', 
        headerName: 'التفاصيل', 
        width: 300, 
        renderCell: (params) => { 
            return (
                <TeacherMenu id={params.row.id} />
            );
        }, 
    },
];

  
const rows = [
    { id: 2, name: 'محمد', email: 'mohamed@example.com', studyField: 'هندسة ميكانيكية', jobRole: 'مهندس' },
    { id: 3, name: 'سارة', email: 'sara@example.com', studyField: 'طب', jobRole: 'طبيبة' },
    { id: 4, name: 'علي', email: 'ali@example.com', studyField: 'تجارة', jobRole: 'تاجر' },
    { id: 5, name: 'ليلى', email: 'laila@example.com', studyField: 'علوم حاسوب', jobRole: 'مطور برامج' },
    { id: 6, name: 'خالد', email: 'khaled@example.com', studyField: 'تاريخ إسلامي', jobRole: 'أستاذ تاريخ' },
];