import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { FilterList, OpenInNew, Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';

const AllStudents = () => {

    const navigate = useNavigate()
    const programs = [
        {id:0, name:"برنامح الهمم"},
        {id:1, name:"برنامج التميز"},
        {id:2, name:"برنامح الأساس"},
    ]

    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة الطلاب > جميع الطلاب'}</Typography>
            <section className='flex flex-col items-start justify-between mt-20 gap-8'>
                {/* CTA section */}
                <section className='flex flex-col md:flex-row lg:flex-row items-start justify-between gap-8 w-full'>
                    <p>مجموع الطلاب : {rows.length} طالب</p>
                    <div className='flex items-center justify-start gap-3'>
                        <FormControl dir="rtl" style={{'width':'auto'}}>
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
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<FilterList sx={{'marginLeft':'10px'}}/>} >تصفية الطلاب</Button>
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

export default AllStudents;


const columns = [
    { 
        field: 'name', 
        headerName: (<span>إسم الطالب </span>), 
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
        field: 'email', 
        headerName: 'البريد الإلكتروني', 
        width: 200, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.email}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'program', 
        headerName: 'البرنامج المسجل فيه', 
        width: 200, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.program}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'exams', 
        headerName: 'الإمتحانات المنجزة', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.exams}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'details', 
        headerName: 'التفاصيل', 
        width: 300, 
        renderCell: (params) => { 
            return (
                <Link style={{'color':UISettings.colors.green}} to={`/teacher/students/${params.row.id}`}>
                    <OpenInNew />
                </Link>
            );
        }, 
    },
];

  
const rows = [
    { id: 1, name: 'عبد الإله', email: 'noubadjimonsef@gmail.com', exams: '5 إمتحانات', program: 'برنامج الهمم' },
    { id: 2, name: 'محمد', email: 'mohammed@example.com', exams: '3 إمتحانات', program: 'برنامج الأساس' },
    { id: 3, name: 'فاطمة', email: 'fatima@example.com', exams: '2 إمتحانات', program: 'برنامج الهمم' },
    { id: 4, name: 'علي', email: 'ali@example.com', exams: '4 إمتحانات', program: 'برنامج الأساس' },
    { id: 5, name: 'خديجة', email: 'khadija@example.com', exams: '1 إمتحانات', program: 'برنامج الهمم' },
    { id: 6, name: 'يوسف', email: 'youssef@example.com', exams: '6 إمتحانات', program: 'برنامج الهمم' },
    { id: 7, name: 'نور', email: 'nour@example.com', exams: '3 إمتحانات', program: 'برنامج الأساس' },
    { id: 8, name: 'أمينة', email: 'amina@example.com', exams: '2 إمتحانات', program: 'برنامج الأساس' },
    { id: 9, name: 'عبد الرحمن', email: 'abdelrahman@example.com', exams: '5 إمتحانات', program: 'برنامج الهمم' },
    { id: 10, name: 'مريم', email: 'maryam@example.com', exams: '4 إمتحانات', program: 'برنامج الأساس' },
    { id: 11, name: 'ياسين', email: 'yassine@example.com', exams: '2 إمتحانات', program: 'برنامج الهمم' },
    { id: 12, name: 'ريم', email: 'reem@example.com', exams: '3 إمتحانات', program: 'برنامج الأساس' },
    { id: 13, name: 'عمر', email: 'omar@example.com', exams: '1 إمتحانات', program: 'برنامج الهمم' },
    { id: 14, name: 'رضا', email: 'reda@example.com', exams: '4 إمتحانات', program: 'برنامج الهمم' },
    { id: 15, name: 'سارة', email: 'sara@example.com', exams: '2 إمتحانات', program: 'برنامج الأساس' },
    { id: 16, name: 'أحمد', email: 'ahmed@example.com', exams: '3 إمتحانات', program: 'برنامج الهمم' },
    { id: 17, name: 'ليلى', email: 'laila@example.com', exams: '5 إمتحانات', program: 'برنامج الأساس' },
    { id: 18, name: 'عماد', email: 'imad@example.com', exams: '1 إمتحانات', program: 'برنامج الأساس' },
    { id: 19, name: 'مهدي', email: 'mahdi@example.com', exams: '6 إمتحانات', program: 'برنامج الهمم' },
    { id: 20, name: 'أميرة', email: 'amira@example.com', exams: '2 إمتحانات', program: 'برنامج الأساس' },
    { id: 21, name: 'عبد الوهاب', email: 'abdulwahab@example.com', exams: '3 إمتحانات', program: 'برنامج الهمم' },
    { id: 22, name: 'نادية', email: 'nadia@example.com', exams: '4 إمتحانات', program: 'برنامج الأساس' },
    { id: 23, name: 'حسين', email: 'hussein@example.com', exams: '2 إمتحانات', program: 'برنامج الهمم' },
    { id: 24, name: 'زينب', email: 'zeinab@example.com', exams: '5 إمتحانات', program: 'برنامج الأساس' },
    { id: 25, name: 'خالد', email: 'khaled@example.com', exams: '1 إمتحانات', program: 'برنامج الهمم' },

];