import { Button, CircularProgress, FormControl, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { useEffect, useRef, useState } from "react";
import { ErrorOutlineOutlined, Save } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import errorHandler from "../student/errorHandler";
import axiosInstance from "../student/axiosInstance";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { LoadingButton } from "@mui/lab";


const SessionDetails = ({windowSize}) => {
    const programs = [
        {id:0, name:"الأستاذ ياسين"},
        {id:1, name:"الأستاد محمد دليحر"},
        {id:2, name:"الأستاذة خولة"},
    ]


      const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
      const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
      const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
      const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
      const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
      const width = isXs ? '100%' : isSm ? '100%' : isMd ? '100%' : isLg ? '100%' : isXl ? '60%' : '80%';

      
    const navigate = useNavigate()


    
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState({});
    const [teacher, setTeacher] = useState({});
    const [program, setProgram] = useState({});
    const [students, setStudents] = useState();
    const [displayedStudents, setDisplayedStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const  id  = useParams();

    const [status, setStatus] = useState('');
    
    async function getGroup() {
        try {
            const response = await axiosInstance.post('/adminApi/getGroup', {id});
            console.log(response.data)
            if(response.data.response === 'done'){
                setLoading(false)
                setGroupName(response.data.group.name)
                setGroup(response.data.group)
                setTeacher(response.data.teacher)
                setProgram(response.data.program)
                setStudents(response.data.students)
                setTeachers(response.data.teachers)
                setDisplayedStudents(response.data.students)
                setSelectedTeacher(response.data.teacher ? response.data.teacher.id : '')
                const data = []
                for (let i = 0; i < response.data.selectedStudents.length; i++) {
                  const item = response.data.selectedStudents[i];
                  data.push(item.id) 
                }
                setSelectedStudents(data)
            }else if (response.data.response === 'notFound'){
              setLoading(false)
              setStatus('notFound')
            }
        } catch (error) {
            errorHandler(error, toast, navigate)
        }
    }


    const [loadingUpdate, setLoadingUpdate] = useState(false);
    async function updateGroup() {
      try {
        setLoadingUpdate(true)
          const response = await axiosInstance.post('/adminApi/updateGroup', {id, name: groupName, teacher: selectedTeacher, students: selectedStudents});
          console.log(response.data)
          setLoadingUpdate(false)
          if(response.data.response === 'done'){
            toast.success(response.data.message, {
              position: 'top-right',
              progress: undefined,
              autoClose: 1000,
              theme: 'colored'
            });
            setTimeout(() => {
              navigate('/admin/sessions/all')
            }, 1000);
          }else if (response.data.response === 'notFound'){
            setLoadingUpdate(false)
            setStatus('notFound')
          }
      } catch (error) {
        setLoadingUpdate(false)
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
            getGroup()
          }
      }, []);

      const [groupName, setGroupName] = useState('');

      const handleSelectionChange = (selection) => {
        console.log(selection)
        setSelectedStudents(selection);
      };

      const [selectedTeacher, setSelectedTeacher] = useState('');

      if(loading){
        return(
            <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ToastContainer rtl="true"/>
                <CircularProgress style={{color: UISettings.colors.green}}/>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
            </div>
        )
      }else if(status === 'notFound'){
        return(
           <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <ToastContainer rtl="true"/>
               <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على الحلقة</Typography>
             </div>
           )
      }else{
        return ( 
            <Body>
                <ToastContainer rtl="true"/>
                <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/admin/sessions/all')} style={{cursor: 'pointer'}} >إدارة الحلقات </span> <span> {">"} {group.name}  </span></Typography>
                <Container>
              <ProfileHeader  style={{marginBottom: '15px'}}>
                <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                <ProfileInfos>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الحلقة</Typography>
                </ProfileInfos>
              </ProfileHeader>
              <SubContainer>
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إسم الحلقة</Typography>
                  <TextField style={{width: '100%'}} value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='إسم الحلقة' />
                </ProfileDatas>
                <ProfileDatas width={windowSize.width}>
                </ProfileDatas>
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
                  <TextField style={{width: '100%'}} disabled value={program.name} placeholder="البرنامج" />
                </ProfileDatas>
                <ProfileDatas width={windowSize.width}>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المسؤول</Typography>
                  <FormControl dir="rtl" style={{width: "100%"}}>
                        <Select
                            dir="rtl"
                            style={{paddingTop: "0px", paddingBottom: '0px'}}
                            id="teacher"
                            value={selectedTeacher}
                            onChange={(e)=> setSelectedTeacher(e.target.value)}
                        >
                            <MenuItem selected value={teacher.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> {teacher.firstName + ' ' + teacher.familyName + ' ( ' + teacher.email + ' )'}</span> </MenuItem>
                            {teachers.map((teacher,index)=>(
    
                                <MenuItem key={index} value={teacher.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{teacher.firstName + ' ' + teacher.familyName + ' ( ' + teacher.email + ' )'}</span> </MenuItem>
                            ))}
                        </Select>
                  </FormControl>
                </ProfileDatas>
                <ProfileDatas>
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
                      onRowSelectionModelChange={handleSelectionChange}
                      rowSelectionModel={selectedStudents}
                      componentsProps={{
                        pagination: { style: {
                          direction: 'ltr'
                        }},
                      }}
                    />
                  </div>
                </ProfileDatas>
              </SubContainer>
              <LoadingButton loading={loadingUpdate} loadingPosition="center"  variant='primary' onClick={()=> updateGroup()} endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color: loadingUpdate ? 'transparent' : 'white',border:'1px solid' + UISettings.colors.green}} >حفظ التعديلات</LoadingButton>
                </Container>
            </Body>
         );
      }
  
}
 
export default SessionDetails;



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
},{ 
  field: 'group', 
  headerName: 'الحلقة', 
  width: 150, 
  renderCell: (params) => { 
      return (
        <span style={{color: UISettings.colors.secondary}}>{params.row.studyPrograms && params.row.groups[0] ? params.row.groups[0].name : '--'}</span>
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
