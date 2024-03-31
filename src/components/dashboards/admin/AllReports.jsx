import { Button, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Delete, MoreVert, PrintOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

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
                    <Link to={`/admin/reports/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
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


const AllReports = () => {

    const navigate = useNavigate()

    const programs = [
        {id:0, name:"برنامح الهمم"},
        {id:1, name:"برنامج التميز"},
        {id:2, name:"برنامح الأساس"},
    ]
    const sessions = [
        {id:0, name:"حلقة عمرو بن العاص"},
        {id:1, name:"حلقة عثمان بن عفان"},
        {id:2, name:"حلقة مصعب بن عمير"},
        {id:3, name:"حلقة طلحة بن عبيد الله"},

    ]

    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة التقارير > جميع التقارير'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
            <Typography variant='h7' fontWeight={700}>حدد التقارير المراد عرضها</Typography>

                {/* filter section */}
                <section className='flex items-center justify-start gap-2 w-full'>
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

                </section>
                {/* CTA section */}
                <section className='flex-col md:flex-row lg:flex-row justify-between gap-10 w-full'>
                    <p className='mb-8 md:mb-0 lg:mb-0'>مجموع التقارير : {rows.length} تقرير</p>
                    <div className='flex items-center justify-start md:justify-end lg:justify-end gap-3'>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><PrintOutlined/></Button>
                        <FormControl dir="rtl" style={{'width':'7rem'}} >
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        labelId="program"
                        id="program"
                        //value={age}
                        label=""
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                        <MenuItem  value={'des = -1'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الأقدم</span> </MenuItem>
                        <MenuItem  value={'des = 1'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الأحدث</span> </MenuItem>
                        
                    </Select>
                        </FormControl>
                        <Button variant='primary' onClick={()=> navigate('/admin/reports/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >طلب تقرير</Button>
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
        </main>
    );
};

export default AllReports;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>عنوان التقرير</span>), 
        minWidth: 150, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'date', 
        headerName: 'تاريخ رفع التقرير', 
        width: 200, 
        renderCell: (params) => { 
            return (
                <span style={{color: UISettings.colors.secondary}}>{params.row.date}</span>
            );
        }, 
    },
    { 
        field: 'teacher', 
        headerName: 'الأستاذ المسؤول', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <span style={{color: UISettings.colors.secondary}}>{params.row.teacher}</span>
            );
        }, 
    },
    { 
        field: 'details', 
        headerName: <span><MoreVertIcon/></span>, 
        width: 300, 
        renderCell: (params) => { 
            return (
                <TeacherMenu id={params.row.id} />
            );
        }, 
    },
];

  
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