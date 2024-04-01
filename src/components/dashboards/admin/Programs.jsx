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
                    <Link to={`/admin/programs/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
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


const AllPrograms = () => {

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
            <Typography variant='h5' fontWeight={800}>{'إدارة البرامج > جميع البرامج'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
                {/* CTA section */}
                <section className='flex-col md:flex-row lg:flex-row justify-between gap-10 w-full'>
                    <p className='mb-8 md:mb-0 lg:mb-0'>مجموع البرامج : {rows.length} برنامج</p>
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
                        <Button variant='primary' onClick={()=> navigate('/admin/programs/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة برنامج</Button>
                    </div>
                </section>

                <div dir="rtl" style={{ height: 420, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 6 },
              },
            }}
            pageSize={6}
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

export default AllPrograms;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>إسم البرنامج</span>), 
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
        field: 'number', 
        headerName: 'عدد الطلاب المسجلين', 
        width: 200, 
        renderCell: (params) => { 
            return (
                <span style={{color: UISettings.colors.secondary}}>{params.row.number}</span>
            );
        }, 
    },
    { 
        field: 'status', 
        headerName: 'حالة البرنامج', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <span style={{color: UISettings.colors.secondary}}>{params.row.status}</span>
            );
        }, 
    },
    { 
      field: 'duration', 
      headerName: 'مدة البرنامج', 
      minWidth: 200, 
      flex: 1, 
      renderCell: (params) => { 
          return (
              <span style={{color: UISettings.colors.secondary}}>{params.row.duration}</span>
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
    { id: 1, name: 'برنامج الهمم ', number: '200', status: <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>متاح</span>, duration: '3 سنوات' },
    { id: 2, name: 'برنامج الأساس ', number: '150', status: <span style={{'color':UISettings.colors.brown,backgroundColor:UISettings.colors.brownBG,padding:'.5rem',borderRadius:'10px'}}>غير متاح</span>, duration: '4 سنوات' },
    { id: 3, name: 'برنامج التميز ', number: '100', status: <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>متاح</span>, duration: '3 سنوات' },
    { id: 4, name: 'برنامج النخبة ', number: '150', status: <span style={{'color':UISettings.colors.brown,backgroundColor:UISettings.colors.brownBG,padding:'.5rem',borderRadius:'10px'}}>غير متاح</span>, duration: '4 سنوات' },
    { id: 5, name: 'برنامج المراقي ', number: '200', status: <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>متاح</span>, duration: '3 سنوات' },
    { id: 6, name: 'برنامج الحفاظ ', number: '100', status: <span style={{'color':UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'10px'}}>متاح</span>, duration: '3 سنوات' },

];