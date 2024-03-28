import { Button,ListItemIcon,Menu,MenuItem, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { MoreVert, Block, Delete, Comment, Info, Edit  } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import { useState } from 'react'
import BadgeIcon from '@mui/icons-material/Badge';
import { useMediaQuery } from '@mui/material';


const ban = ()=>{
    toast('تم تعديل الإشتراك',{
        position:'top-left',
        type:'success',
        progress:undefined,
        autoClose:3000,
        theme:'colored'
      })
}
const deleteTeacher = ()=>{
    toast('تم حذف الإشتراك',{
        position:'top-left',
        type:'success',
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
                <MenuItem onClick={()=>{
                    ban()
                    handleClose()
                }}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <Typography variant="inherit">تعديل</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{
                    deleteTeacher()
                    handleClose()
                }}>
                    <ListItemIcon sx={{'color':UISettings.colors.red}}>
                        <Delete />
                    </ListItemIcon>
                    <Typography variant="inherit">حذف </Typography>
                </MenuItem>
            </Menu>
        </div>
        
    );
};


const SubscriptionsTypes = () => {

    const navigate = useNavigate()

    const programs = [
        {id:0, name:"برنامح الهمم"},
        {id:1, name:"برنامج التميز"},
        {id:2, name:"برنامح الأساس"},
    ]
    const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  const width = isXs ? '100%' : isSm ? '100%' : isMd ? '100%' : isLg ? '100%' : isXl ? '60%' : '80%';

    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة الإشتراكات > أنواع الاشتراكات'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
                {/* CTA section */}
                <section className='flex items-center justify-between gap-2 w-full'>
                    <p>مجموع الإشتراكات : {rows.length} إشتراكات</p>
                    <div className='flex items-center justify-center gap-3'>
                        <Button variant='primary' onClick={()=> navigate('/admin/subscriptions/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة إشتراك</Button>
                    </div>
                </section>

                <div dir="rtl" style={{ height: 370, width: width }}>
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

export default SubscriptionsTypes;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>الإشتراك</span>), 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
            );
        }, 
    },
    { 
        field: 'period', 
        headerName: 'المدة', 
        width: 200, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.period}</span>
            );
        }, 
    },
    { 
        field: 'price', 
        headerName: 'المبلغ المستحق', 
        width: 200, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.price}</span>
            );
        }, 
    },
    { 
        field:'details' , 
        headerName: <span><MoreVert/></span>, 
        width: 100, 
        renderCell: (params) => { 
            return (
                <TeacherMenu id={params.row.id} />
            );
        }, 
    },
];

  
const rows = [
    { id: 1, name: 'إشتراك شهري', period: '2024 / 06 /12', price: '2000 دج', },
    { id: 2, name: 'إشتراك سنوي', period: '2024 / 06 /12', price: '2000 دج', },
    { id: 3, name: 'إشتراك شهري', period: '2024 / 06 /12', price: '2000 دج', },
    { id: 4, name: 'إشتراك سنوي', period: '2024 / 06 /12', price: '2000 دج', },
    { id: 5, name: 'إشتراك شهري', period: '2024 / 06 /12', price: '2000 دج', },
    { id: 6, name: 'إشتراك شهري', period: '2024 / 06 /12', price: '2000 دج', },
];