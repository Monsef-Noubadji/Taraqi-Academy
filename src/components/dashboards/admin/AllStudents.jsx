import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, TextField, Typography } from '@mui/material';
import UISettings from '../../../theme/UISettings';
import { Clear, Error, FilterList, OpenInNew, Print } from '@mui/icons-material';
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


const AllStudents = ({windowSize}) => {

    const sessions = [
        {id:0, name:"حلقة عمرو بن العاص"},
        {id:1, name:"حلقة عثمان بن عفان"},
        {id:2, name:"حلقة مصعب بن عمير"},
        {id:3, name:"حلقة طلحة بن عبيد الله"},
        
    ]
    
    // const programs = [
    //     {id:0, name:"برنامح الهمم"},
    //     {id:1, name:"برنامج التميز"},
    //     {id:2, name:"برنامح الأساس"},
    // ]
    
    const navigate = useNavigate()
    
    const [students, setStudents] = useState([]);
    const [displayedStudents, setDisplayedStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPaymentDetails() {
        try {
            const response = await axiosInstance.post('/adminApi/getStudents');
            console.log(response.data)
            if(response.data.response === 'done'){
                setGroups(response.data.groups)
                setPrograms(response.data.programs)
                setStudents(response.data.students)
                setDisplayedStudents(response.data.students)
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
            getPaymentDetails()
          }
      }, []);

      const [openFilterPopup, setOpenFilterPopup] = React.useState(false);
      const handleCloseFilterPopup = () => {
          setOpenFilterPopup(false);
      }

      const [programs, setPrograms] = useState([]);
      const [groups, setGroups] = useState([]);

      const [selectedProgram, setSelectedProgram] = useState('');
      const [selectedGender, setSelectedGender] = useState('');
      const [selectedGroup, setSelectedGroup] = useState('');
      const [filterParams, setFilterParams] = useState({program: '', gender: '', group: ''});

      const [loadingFilter, setLoadingFilter] = useState(false);
      
      function filterStudents(){
        setLoadingFilter(true)
        var data = students
        var dataAfetProgram = []
        var dataAfterGeneder = []
        var dataAfterGroup = []
        // program filter
        for (let i = 0; i < data.length; i++) {
            const student = data[i];
            if(selectedProgram === ''){
                dataAfetProgram.push(student)
            }else{
                if(student && student.studyPrograms &&  student.studyPrograms[0] && student.studyPrograms[0].id === selectedProgram){
                    dataAfetProgram.push(student)
                }
            }
        }

        for (let i = 0; i < dataAfetProgram.length; i++) {
            const student = dataAfetProgram[i];
            if(selectedGender === ''){
                dataAfterGeneder.push(student)
            }else{
                if(student && student.gender === selectedGender){
                    dataAfterGeneder.push(student)
                }
            }
        }

        for (let i = 0; i < dataAfterGeneder.length; i++) {
            const student = dataAfterGeneder[i];
            if(selectedGroup === ''){
                dataAfterGroup.push(student)
            }else{
                if(student && student.groups && student.groups[0] && student.groups[0].id === selectedGroup){
                    dataAfterGroup.push(student)
                }
            }
        }

        setDisplayedStudents(dataAfterGroup)
        setOpenFilterPopup(false)
        setLoadingFilter(false)
      }

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
                    <Typography variant='h5' fontWeight={800}>{'إدارة الطلاب > جميع الطلاب'}</Typography>
                    <section className='flex flex-col items-start justify-center mt-20 gap-8' style={{marginTop: '25px'}}>
                        {/* filter section */}
                        <Typography variant='h7' style={{display: 'none'}}  fontWeight={700}>حدد طلاب الحلقة المراد عرضها</Typography>
                        {/* <section className='flex items-center justify-start gap-2 w-full' style={{display: 'none'}} >
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
                            <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                            <MenuItem value={"ذكر"} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>ذ..كر</span> </MenuItem>
                            <MenuItem value={"أنثى"} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> أنثى</span> </MenuItem>
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
                                <MenuItem selected value={''} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                {sessions.map((session,index)=>(
                                    <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
        
                        </section> */}
                        {/* CTA section */}
                        <section className='flex items-center justify-between gap-2 w-full' style={{flexDirection: windowSize.width > UISettings.devices.phone? 'row': 'column'}}>
                            <p style={{alignSelf: 'start'}}>مجموع الطلاب : {students.length} طالب</p>
                            <div className='flex items-center justify-center gap-3' style={{alignSelf: 'end'}}>
                                {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} ><Print/></Button> */}
                                <Button variant='primary'  style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<FilterList sx={{'marginLeft':'10px'}}/>} onClick={()=> setOpenFilterPopup(true)} >تصفية الطلاب</Button>
                                <Button variant='primary'  onClick={()=> navigate('/admin/students/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة طالب</Button>
                            </div>
                        </section>
        
                        <div dir="rtl" style={{ height: windowSize.width > UISettings.devices.phone? 'calc(100vh - 250px)' : 'calc(100vh - 300px)', width: '100%' }}>
                        <DataGrid
                            rows={displayedStudents}
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
                            }}
                            }}
                        />
                        </div>
                    </section>
                    {/* // filter popup */}
                    <Dialog
                        fullWidth
                        maxWidth={"sm"}
                        open={openFilterPopup}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseFilterPopup}
                        aria-describedby="alert-dialog-slide-description"
                        style={{borderRadius: '20px'}}
                        >
                        {/* <DialogTitle><Clear onClick={()=> setOpenFilterPopup(false)} style={{cursor: 'pointer'}}/></DialogTitle> */}
                        <DialogContent>
                            <Clear onClick={()=> setOpenFilterPopup(false)} style={{cursor: 'pointer', position: 'absolute'}}/>
                            <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* <Error style={{fontSize: '100px', color:'red'}}></Error> */}
                            <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', width: '100%', marginBottom: '10px', marginTop: "0px"}}>تصفية الطالب</Typography>
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start', width: '100%', marginBottom: '10px'}}>هنا يمكنك تصفية الطلاب لتسهيل العثور عليهم</Typography>
                            
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginTop: '10px', color: UISettings.colors.secondary, textAlign: 'start', width: '100%', marginBottom: '10px'}}>البرنامج</Typography>
                            <Select
                                fullWidth
                                id="program"
                                name="program"
                                label=""
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                                onChange={(e,)=> {setSelectedProgram(e.target.value)}}
                                defaultValue={filterParams.program ? filterParams.program : ''}
                                >
                                    <MenuItem value={''} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>

                                {programs.map((program,index)=>(
                                    <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                                ))}
                            </Select>
                            
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginTop: '10px', color: UISettings.colors.secondary, textAlign: 'start', width: '100%', marginBottom: '10px'}}>الجنس</Typography>
                            <Select
                                fullWidth
                                id="gender"
                                name="gender"
                                label=""
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                                onChange={(e,)=> {setSelectedGender(e.target.value)}}
                                defaultValue={filterParams.gender ? filterParams.gender : ''}
                                >
                                    <MenuItem value={''} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                    <MenuItem value={'ذكر'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>ذكر</span> </MenuItem>
                                    <MenuItem value={'أنثى'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>أنثى</span> </MenuItem>
                            </Select>

                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginTop: '10px', color: UISettings.colors.secondary, textAlign: 'start', width: '100%', marginBottom: '10px'}}>الحلقة</Typography>
                            <Select
                                fullWidth
                                id="group"
                                name="group"
                                label=""
                                sx={{'direction':'rtl','fontFamily':'Cairo'}}
                                // onChange={(e,)=> {setCountry(e.target.value); setCountryError('')}}
                                // error={countryError.length > 0 ? true : false}
                                // helperText={countryError}
                                // value={country}
                                onChange={(e,)=> {setSelectedGroup(e.target.value)}}
                                defaultValue={filterParams.group ? filterParams.group : ''}
                                >
                                    <MenuItem value={''} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                                {groups.map((group,index)=>(
                                    <MenuItem key={index} value={group.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{group.name}</span> </MenuItem>
                                ))}
                            </Select>
                            <Buttons style={{justifyContent: 'center'}}>
                                <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenFilterPopup(false)}>رجوع</Button>
                                <LoadingButton loading={loadingFilter} loadingPosition='center'  variant='primary' onClick={()=> filterStudents()} style={{backgroundColor: UISettings.colors.green}} >تصفية الطالب</LoadingButton >
                            </Buttons>
                            </DialogContentText>
                        </DialogContent>
                        
                    </Dialog>  
                </main>
            );
        }

};

export default AllStudents;


const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`


const columns = [
    { 
        field: 'name', 
        headerName: (<span>الاسم</span>), 
        minWidth: 150, 
        flex: 1, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.firstName + ' ' + params.row.familyName}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'email', 
        headerName: 'البريد الإلكتروني', 
        width: 250, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.email}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'program', 
        headerName: ' البرنامج', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>                
                    <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms &&  params.row.studyPrograms[0] && params.row.studyPrograms[0].name ? params.row.studyPrograms[0].name : '--' }</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'group', 
        headerName: 'الحلقة', 
        width: 150, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row.groups && params.row.groups[0] ? params.row.groups[0].name : '--'}</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'level', 
        headerName: 'المستوى', 
        minWidth: 100, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms && params.row.studyPrograms[0] && params.row.studyPrograms[0].studentStudyProgram && params.row.studyPrograms[0].studentStudyProgram.level ? params.row.studyPrograms[0].studentStudyProgram.level : '--' }</span>
                </Link>
            );
        }, 
    },
    { 
        field: 'expirationDate', 
        headerName: 'انتهاء الاشتراك', 
        width: 120, 
        renderCell: (params) => { 
            return (
                <Link to={`/admin/students/${params.row.id}`}>
                    <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms && params.row.studyPrograms[0] && params.row.studyPrograms[0].studentStudyProgram && params.row.studyPrograms[0].studentStudyProgram.experationDate ? params.row.studyPrograms[0].studentStudyProgram.experationDate.slice(0, 10) : '--' }</span>
                </Link>
            );
        }, 
    },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });