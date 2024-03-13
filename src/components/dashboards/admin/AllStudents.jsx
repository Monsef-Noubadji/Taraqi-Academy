import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { FilterList, OpenInNew, Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const AllStudents = () => {

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
            <Typography variant='h5' fontWeight={800}>{'إدارة الطلاب > جميع الطلاب'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-8'>
                <Typography variant='h7' fontWeight={700}>حدد طلاب الحلقة المراد عرضها</Typography>
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
                <FormControl dir="rtl" style={{width: "33%"}}>
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
                <section className='flex items-center justify-between gap-2 w-full'>
                    <p>مجموع الطلاب : {rows.length} طالب</p>
                    <div className='flex items-center justify-center gap-3'>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><Print/></Button>
                        <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<FilterList sx={{'marginLeft':'10px'}}/>} >تصفية الطلاب</Button>
                        <Button variant='primary' startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة طالب</Button>
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
        headerName: (<span>نوع الاشتراك</span>), 
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
        headerName: 'الشهر', 
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
        field: 'exams', 
        headerName: 'تاريخ دفع الاشتراك', 
        width: 200, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.exams}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'planType', 
        headerName: 'المبلغ المستحق', 
        minWidth: 200, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <Link to={`/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.plantype}</span>
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
                <Link style={{'color':UISettings.colors.green}} to={`/students/${params.row.id}`}>
                    <OpenInNew />
                </Link>
            );
        }, 
    },
];

  
const rows = [
    { id: 1, name: 'عبد الإله', email: 'noubadjimonsef@gmail.com', exams: '5 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 2, name: 'محمد', email: 'mohammed@example.com', exams: '3 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 3, name: 'فاطمة', email: 'fatima@example.com', exams: '2 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 4, name: 'علي', email: 'ali@example.com', exams: '4 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 5, name: 'خديجة', email: 'khadija@example.com', exams: '1 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 6, name: 'يوسف', email: 'youssef@example.com', exams: '6 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 7, name: 'نور', email: 'nour@example.com', exams: '3 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 8, name: 'أمينة', email: 'amina@example.com', exams: '2 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 9, name: 'عبد الرحمن', email: 'abdelrahman@example.com', exams: '5 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 10, name: 'مريم', email: 'maryam@example.com', exams: '4 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 11, name: 'ياسين', email: 'yassine@example.com', exams: '2 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 12, name: 'ريم', email: 'reem@example.com', exams: '3 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 13, name: 'عمر', email: 'omar@example.com', exams: '1 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 14, name: 'رضا', email: 'reda@example.com', exams: '4 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 15, name: 'سارة', email: 'sara@example.com', exams: '2 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 16, name: 'أحمد', email: 'ahmed@example.com', exams: '3 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 17, name: 'ليلى', email: 'laila@example.com', exams: '5 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 18, name: 'عماد', email: 'imad@example.com', exams: '1 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 19, name: 'مهدي', email: 'mahdi@example.com', exams: '6 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 20, name: 'أميرة', email: 'amira@example.com', exams: '2 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 21, name: 'عبد الوهاب', email: 'abdulwahab@example.com', exams: '3 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 22, name: 'نادية', email: 'nadia@example.com', exams: '4 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 23, name: 'حسين', email: 'hussein@example.com', exams: '2 إمتحانات', plantype: 'اشتراك شهري' },
    { id: 24, name: 'زينب', email: 'zeinab@example.com', exams: '5 إمتحانات', plantype: 'اشتراك سنوي' },
    { id: 25, name: 'خالد', email: 'khaled@example.com', exams: '1 إمتحانات', plantype: 'اشتراك شهري' },

];