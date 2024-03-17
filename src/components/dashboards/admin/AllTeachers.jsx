import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { FilterList, OpenInNew, Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const AllTeachers = () => {

    const sessions = [
        {id:0, name:"حلقة عمرو بن العاص"},
        {id:1, name:"حلقة عثمان بن عفان"},
        {id:2, name:"حلقة مصعب بن عمير"},
        {id:3, name:"حلقة طلحة بن عبيد الله"},

    ]

    const programs = [
        {id:0, name:"برنامح الهمم"},
        {id:1, name:"برنامج التميز"},
        {id:2, name:"برنامح الأساس"},
    ]
    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة المعلمين > جميع المعلمين'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
                <Typography variant='h7' fontWeight={700}>حدد المعلمين المراد عرضهم</Typography>
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

                </section>
                {/* CTA section */}
                <section className='flex items-center justify-between gap-2 w-full'>
                    <p>مجموع المعلمين : {rows.length} معلما</p>
                    <div className='flex items-center justify-center gap-3'>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><Print/></Button>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<FilterList sx={{'marginLeft':'10px'}}/>} >تصفية المعلمين</Button>
                        <Button variant='primary' startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة معلم</Button>
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
        field: 'program', 
        headerName: 'البرنامج المدرس', 
        width: 200, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.program}</span>
            );
        }, 
    },
    { 
        field: 'studentsLength', 
        headerName: 'عدد الطلاب', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                    <span style={{color: UISettings.colors.secondary}}>{params.row.studentsLength}</span>
            );
        }, 
    },
    { 
        field: 'details', 
        headerName: 'التفاصيل', 
        width: 300, 
        renderCell: (params) => { 
            return (
                <Link style={{'color':UISettings.colors.green}} to={`/admin/teachers/${params.row.id}`}>
                    <OpenInNew />
                </Link>
            );
        }, 
    },
];

  
const rows = [
    { id: 1, name: 'عبد الإله', email: 'noubadjimonsef@gmail.com', program: 'برنامج الهمم', studentsLength: '50 طالب' },
    { id: 2, name: 'محمد', email: 'mohamed@example.com', program: 'برنامج التميز', studentsLength: '35 طالب' },
    { id: 3, name: 'سارة', email: 'sara@example.com', program: 'برنامج الأساس', studentsLength: '40 طالب' },
    { id: 4, name: 'علي', email: 'ali@example.com', program: 'برنامج الإتقان', studentsLength: '45 طالب' },
    { id: 5, name: 'ليلى', email: 'laila@example.com', program: 'برنامج الهمم', studentsLength: '55 طالب' },
    { id: 6, name: 'خالد', email: 'khaled@example.com', program: 'برنامج الهمم', studentsLength: '60 طالب' },
];