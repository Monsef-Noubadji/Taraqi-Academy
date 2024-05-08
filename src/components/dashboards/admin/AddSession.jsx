import { Button, CircularProgress, FormControl, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { useEffect, useRef, useState } from "react";
import { Save } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer,toast } from "react-toastify";
import errorHandler from "../student/errorHandler";
import axiosInstance from "../student/axiosInstance";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";


const AddSession = ({windowSize}) => {
  const navigate = useNavigate()

    const [teachers, setTeachers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getCreateGroupBaseInfo() {
        try {
            const response = await axiosInstance.post('/adminApi/getCreateGroupBaseInfo');
            console.log(response.data)
            if(response.data.response === 'done'){
              setTeachers(response.data.teachers)
              setStudents(response.data.students)
              setDisplayedStudents(response.data.students)
              setPrograms(response.data.programs)
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
            getCreateGroupBaseInfo()
          }
      }, []);

      const [groupName, setGroupName] = useState('');
      const [teacher, setTeacher] = useState('all');
      const [program, setProgram] = useState('all');
      const [selectedStudents, setSelectedStudents] = useState([]);

      const handleSelectionChange = (selection) => {
        console.log(selection)
        setSelectedStudents(selection);
      };

      const [loadingCreate, setLoadingCreate] = useState(false);
      
      async function createGroup() {
        try {
            setLoadingCreate(true)
            const response = await axiosInstance.post('/adminApi/createGroup', {name: groupName, teacher, program, students: selectedStudents});
            console.log(response.data)
            if(response.data.response === 'done'){
              setLoadingCreate(false)
              toast.success(response.data.message, {
                position: 'top-right',
                progress: undefined,
                autoClose: 1000,
                theme: 'colored'
              });
              setTimeout(() => {
                navigate('/admin/sessions/all')
              }, 1000);
            }
        } catch (error) {
            setLoadingCreate(false)
            errorHandler(error, toast, navigate)
        }
    }

    const [displayedStudents, setDisplayedStudents] = useState([]);
      
    useEffect(() => {
      if(program === "all"){
        setDisplayedStudents(students)
      }else{
        const data = []
        for (let i = 0; i < students.length; i++) {
          const student = students[i];
          if(student.studyPrograms && student.studyPrograms[0] && student.studyPrograms[0].id === program){
            data.push(student)
          }
        }
        setDisplayedStudents(data)
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
          <Body>
              <ToastContainer rtl="true"/>
              <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} onClick={()=> navigate('/admin/sessions/all')} >إدارة الحلقات </span> <span> {">"} إضافة حلقة  </span></Typography>
              <Container>
            <ProfileHeader  style={{marginBottom: '15px'}}>
              <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
              <ProfileInfos>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الحلقة</Typography>
              </ProfileInfos>
            </ProfileHeader>
            <SubContainer>
              
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إسم الحلقة</Typography>
                <TextField style={{width: '100%', maxWidth: '600px'}} placeholder='إسم الحلقة' value={groupName} onChange={(e)=> setGroupName(e.target.value)} />
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
              </ProfileDatas>
              
              <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
                <FormControl dir="rtl" style={{width: "100%"}}>
                      <Select
                          dir="rtl"
                          style={{paddingTop: "0px", paddingBottom: '0px'}}
                          id="program"
                          value={program}
                          onChange={(e)=> setProgram(e.target.value)}
                      >
                          <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر البرنامج </span> </MenuItem>
                          {programs.map((program,index)=>(
                              <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                          ))}
                      </Select>
                </FormControl>
              </ProfileDatas>
  
              <ProfileDatas width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المسؤول</Typography>
                <FormControl dir="rtl" style={{width: "100%"}}>
                      <Select
                          dir="rtl"
                          style={{paddingTop: "0px", paddingBottom: '0px'}}
                          id="teacher"
                          value={teacher}
                          onChange={(e)=> setTeacher(e.target.value)}
                      >
                          <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر الأستاذ المسؤول </span> </MenuItem>
                          {teachers.map((teacher,index)=>(
                              <MenuItem key={index} value={teacher.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{teacher.firstName + ' ' + teacher.familyName + ' ( ' + teacher.email + ' )'}</span> </MenuItem>
                          ))}
                      </Select>
                </FormControl>
              </ProfileDatas>
              
              
              
              <ProfileDatas width={windowSize.width} style={{width: '100%'}}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إختر طلاب الحلقة</Typography>
                <div dir="rtl" style={{ height: 370, width: '100%' }}>
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
                    // onRowSelectionModelChange={}
                    onRowSelectionModelChange={handleSelectionChange}
                    componentsProps={{
                      pagination: { style: {
                        direction: 'ltr'
                      }},
                    }}
                  />
                </div>
              </ProfileDatas>
            </SubContainer>
            <LoadingButton loading={loadingCreate} loadingPosition={"center"} onClick={()=> createGroup()}  variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color: loadingCreate ? 'transparent' : 'white',border:'1px solid' + UISettings.colors.green}} >حفظ الحلقة</LoadingButton>
  
              </Container>
          </Body>
      );
    }
}
 
export default AddSession;



const Body = styled.div`
   background-image: url('./../../../../src/assets/lightStar.svg');
  background-position: -80px 0px;
  background-size: 300px;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px 0px;
`

const ProfileInfos = styled.div`
    margin-right: 10px;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`

const SubContainer = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`

const Container = styled.div`
  background-color: white;
  width: calc(100%);
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
`


const ProfileDatas = styled.div`
    margin: ${(props) => props.width > UISettings.devices.phone ? '7px 10px' : '7px 0px' };
    width: ${(props) => props.width > UISettings.devices.phone ? 'calc(50% - 20px)' : 'calc(100%)' } ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    direction: rtl;
`

const Notif = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
`

const ProfileHeader = styled.div`
    width: 100%;
    padding: 0;
    display: flex;
    display: flex ;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
`



const columns = [
  { 
      field: 'name', 
      headerName: (<span>إسم الطالب</span>), 
      minWidth: 150, 
      flex: 1, 
      renderCell: (params) => { 
          return (
            <span style={{color: UISettings.colors.secondary}}>{params.row.firstName + ' ' + params.row.familyName}</span>
          );
      }, 
  },
  { 
      field: 'email', 
      headerName: 'البريد الإلكتروني', 
      width: 250, 
      renderCell: (params) => { 
          return (
            <span style={{color: UISettings.colors.secondary}}>{params.row.email}</span>
          );
      }, 
  },
  { 
    field: 'program', 
    headerName: 'البرنامج', 
    width: 150, 
    renderCell: (params) => { 
        return (
          <span style={{color: UISettings.colors.secondary}}>{params.row.studyPrograms && params.row.studyPrograms[0] ? params.row.studyPrograms[0].name : '--'}</span>
        );
    }, 
} ,
{ 
  field: 'group', 
  headerName: 'الحلقة', 
  width: 150, 
  renderCell: (params) => { 
      return (
        <span style={{color: UISettings.colors.secondary}}>{'--'}</span>
      );
  }, 
} ,
{ 
  field: 'data', 
  headerName: 'تاريخ اختيار البرنامج', 
  width: 180, 
  renderCell: (params) => { 
      return (
        <span style={{color: UISettings.colors.secondary}}>{params.row.studyPrograms && params.row.studyPrograms[0] && params.row.studyPrograms[0].studentStudyProgram && params.row.studyPrograms[0].studentStudyProgram.createdAt ? params.row.studyPrograms[0].studentStudyProgram.createdAt.split('T')[0] : '--'}</span>
      );
  }, 
}
];

