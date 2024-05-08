import { Button, CircularProgress, FormControl, MenuItem, Select, TextField, InputLabel, Typography } from "@mui/material";
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import React, { useEffect, useRef, useState } from "react";
import { Save } from "@mui/icons-material";
import axiosInstance from "../student/axiosInstance";
import errorHandler from "../student/errorHandler";
import { ToastContainer,toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const AddSubscription = ({windowSize}) => {
    const [isSubscribed,setIsSubscribed] = useState(false)
    // const programs = [
    //     {id:0, name:"شهري"},
    //     {id:1, name:"دوري"},
    //     {id:2, name:"سنوي"},
    // ]

    const duration = [
        {id:0, name:"سنتين"},
        {id:1, name:" ثلاث سنوات"},
        {id:2, name:"أربع سنوات"},
      ]

      const navigate = useNavigate()
    
      const [students, setStudents] = useState([]);
      const [groups, setGroups] = useState([]);
      const [programs, setPrograms] = useState([]);
      const [displayedStudents, setDisplayedStudents] = useState([]);
      const [loading, setLoading] = useState(true);
  
      async function getAddSubsBaseInfo() {
          try {
              const response = await axiosInstance.post('/adminApi/getAddSubsBaseInfo');
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

      const [loadingAdding, setLoadingAdding] = useState(false);
      async function addSubs() {
        try {
          setLoadingAdding(true)
            const response = await axiosInstance.post('/adminApi/addSubs', { selectedStudents, type: selectedType, days: selectedDays, status: selectedStatus, paymentDate: selectedDate, price: selectedPrice});
            console.log(response.data)
            setLoadingAdding(false)
            if(response.data.response === 'done'){
                setOpenAddSubsModal(false)
                toast.success(response.data.message, {
                  position: 'top-right',
                  progress: undefined,
                  autoClose: 3000,
                  theme: 'colored'
              });
            }
        } catch (error) {
          setLoadingAdding(false)
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
              getAddSubsBaseInfo()
            }
        }, []);

        const [student, setStudent] = useState('');
        const [selectedProgram, setSelectedProgram] = useState('all');
        const [selectedGroup, setSelectedGroup] = useState('all');

        useEffect(() => {
          var data = students
          var dataAfterProgramFilter = []
          var dataAfterGroupFilter = []
          var dataAfterSearch = []
          if(selectedGroup === "all"){
            dataAfterProgramFilter = data
          }else{
            for (let i = 0; i < data.length; i++) {
              const item = data[i];
              if(item && item.studyPrograms && item.studyPrograms[0] && item.studyPrograms[0].id === selectedProgram ){
                dataAfterProgramFilter.push(item)
              }
            }
          }

          if(selectedGroup === 'all'){
            dataAfterGroupFilter = dataAfterProgramFilter
          }else{
            for (let i = 0; i < dataAfterProgramFilter.length; i++) {
              const item = dataAfterProgramFilter[i];
              if(item && item.groups && item.groups[0] && item.groups[0].id === selectedGroup ){
                dataAfterGroupFilter.push(item)
              }
            }
          }

          if(student === ''){
            dataAfterSearch = dataAfterGroupFilter
          }else{
            for (let i = 0; i < dataAfterGroupFilter.length; i++) {
              const item = dataAfterGroupFilter[i];
              const fullName = item.firstName + " " + item.firstName;
              const fullNameReversed = item.familyName + " " + item.familyName;
              if(item && (item.firstName.indexOf(student) !== -1 || item.familyName.indexOf(student) !== -1 || item.email.indexOf(student) !== -1 || item.phoneNumber.indexOf(student) !== -1 || fullName.indexOf(student) !== -1  || fullNameReversed.indexOf(student) !== -1 ) ){
                dataAfterSearch.push(item)
              }
            }
          }

          setDisplayedStudents(dataAfterSearch)

        }, [student, selectedProgram, selectedGroup]);
    
        const [openAddSubsModal, setOpenAddSubsModal] = React.useState(false);

        const handleClickOpenAddSubsModal = () => {
          if(selectedStudents.length > 0) {
            setOpenAddSubsModal(true);
          }else{
            toast.error('يجب أن تختار طالبًا واحدًا على الأقل', {
              position: 'top-right',
              progress: undefined,
              autoClose: 3000,
              theme: 'colored'
            });
          }
        };

        const handleCloseAddSubsModal = () => {
          setOpenAddSubsModal(false);
        };

        const [selectedType, setSelectedType] = useState('1');
        const [selectedDays, setSelectedDays] = useState('0');
        const [selectedStatus, setSelectedStatus] = useState('payed');
        const [selectedDate, setSelectedDate] = useState('');
        const [selectedPrice, setSelectedPrice] = useState(0);
        const [selectedStudents, setSelectedStudents] = useState([]);


        // Function to handle selection change
        const handleSelectionChange = (newSelection) => {
          console.log(newSelection)
          setSelectedStudents(newSelection);
        };

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
                  <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} >إدارة الإشتراكات </span> <span> {">"} إضافة اشتراك  </span></Typography>
                 
                  <SubContainer>
                  <ProfileDatas width={windowSize.width}>
                    <div style={{width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', direction: 'rtl', alignSelf: 'start', marginBottom: '0px'}}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", textAlign: 'start', width: '100%'}}>بحث عن طالب</Typography>
                      <TextField
                        style={{width: '100%'}} 
                        placeholder='أدخل اسم الطالب' 
                        value={student} 
                        onChange={(e)=> {setStudent(e.target.value)}}
                      />
                    </div>
                  </ProfileDatas>
                  <ProfileDatas width={windowSize.width} style={{flexDirection: 'row', justifyContent: 'end', alignItems: 'end', marginBottom: '0px'}}>
                   


                    <FormControl dir="rtl" style={{width: "40%", marginRight: '10px'}}>
                      <InputLabel id="program" > البرنامج </InputLabel>
                          <Select
                              dir="rtl"
                              style={{paddingTop: "3px", paddingBottom: '3px'}}
                              labelId="program"
                              id="program"
                              //value={age}
                              label="البرنامج"
                              value={selectedProgram}
                              onChange={(e)=> setSelectedProgram(e.target.value)}
                          >
                          <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>الكل</span> </MenuItem>
                          {programs.map((program,index)=>(
                              <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>{program.name}</span> </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <FormControl dir="rtl" style={{width: "40%", marginRight: '10px' }}>
                      <InputLabel id="session" > الحلقة </InputLabel>
                      <Select
                          dir="rtl"
                          style={{paddingTop: "3px", paddingBottom: '3px'}}
                          labelId="session"
                          id="session"
                          //value={age}
                          label="الحلقة"
                          value={selectedGroup}
                          onChange={(e)=> setSelectedGroup(e.target.value)}
                      >
                          <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                          {groups.map((session,index)=>(
                              <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    
                  </ProfileDatas>
                </SubContainer>
                 
                  <Container>
                    <ProfileHeader  style={{marginBottom: '15px'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos style={{flex: 1}}>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>جميع الطلاب</Typography>
                      </ProfileInfos>
                      <Button  variant='primary' onClick={()=> handleClickOpenAddSubsModal()} endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:'white',border:'1px solid' + UISettings.colors.green, marginRight: '10px'}} >إضافة اشتراك</Button>
                    </ProfileHeader>

                    
                

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
                          onRowSelectionModelChange={handleSelectionChange}
                          selectionModel={selectedStudents} // Tracks the selected rows
                          componentsProps={{
                          pagination: { style: {
                              direction: 'ltr'
                          }}
                          }}
                      />
                    </div>


                    <Dialog
                      fullWidth
                      maxWidth={'md'}
                      open={openAddSubsModal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCloseAddSubsModal}
                      aria-describedby="alert-dialog-slide-description"
                      style={{direction: 'rtl'}}
                    >
                      <DialogTitle>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>إضافة اشتراك</Typography>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'start'}}>
                        
                        <ProfileDatas width={windowSize.width} >
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'400','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px', marginTop: '0px'}}>نوع الاشتراك</Typography>
                          <FormControl dir="rtl" style={{ width: '100%', marginRight: '00px'}}>
                            {/* <InputLabel id="program" style={{direction: 'rtl'}} > البرنامج </InputLabel> */}
                                <Select
                                    dir="rtl"
                                    style={{paddingTop: "3px", paddingBottom: '3px'}}
                                    labelId="program"
                                    id="program"
                                    //value={age}
                                    // label="البرنامج"
                                    value={selectedType}
                                    onChange={(e)=> setSelectedType(e.target.value)}
                                >
                                <MenuItem selected value={'1'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>اشتراك شهر</span> </MenuItem>
                                <MenuItem selected value={'3'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>اشتراك 3 أشهر</span> </MenuItem>
                                <MenuItem selected value={'6'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>اشتراك 6 أشهر</span> </MenuItem>
                                <MenuItem selected value={'12'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>اشتراك سنة</span> </MenuItem>
                                <MenuItem selected value={'special'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>اشتراك خاص</span> </MenuItem>
                            </Select>
                          </FormControl>
                        </ProfileDatas>

                          <ProfileDatas width={windowSize.width}>
                          <Typography variant="p" sx={{ display: selectedType === 'special' ? 'block' : 'none', 'fontFamily':'Cairo','fontWeight':'400','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px', marginTop: '0px'}}>عدد الأيام</Typography>
                          <FormControl dir="rtl" style={{display: selectedType === 'special' ? 'block' : 'none', width: '100%', marginRight: '00px'}}>
                            {/* <InputLabel id="program" style={{direction: 'rtl'}} > البرنامج </InputLabel> */}
                            <TextField
                              style={{width: '100%'}} 
                              type="number"
                              placeholder='أدخل عدد الأيام' 
                              value={selectedDays} 
                              onChange={(e)=> {setSelectedDays(e.target.value)}}
                            />
                          </FormControl>

                          </ProfileDatas>
                            
                          <ProfileDatas width={windowSize.width}>
                         
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'400','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px', marginTop: '10px'}}>حالة الاشتراك</Typography>
                          <FormControl dir="rtl" style={{width: '100%', marginRight: '00px'}}>
                            {/* <InputLabel id="program" style={{direction: 'rtl'}} > البرنامج </InputLabel> */}
                                <Select
                                    dir="rtl"
                                    style={{paddingTop: "3px", paddingBottom: '3px'}}
                                    labelId="program"
                                    id="program"
                                    //value={age}
                                    // label="البرنامج"
                                    value={selectedStatus}
                                    onChange={(e)=> setSelectedStatus(e.target.value)}
                                >
                                <MenuItem selected value={'payed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>تم الدفع</span> </MenuItem>
                                <MenuItem selected value={'snoozed'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>فترة إضافية</span> </MenuItem>
                            </Select>
                          </FormControl>
                        </ProfileDatas>
                        <ProfileDatas width={windowSize.width}></ProfileDatas>
                        <ProfileDatas width={windowSize.width}>
                          <Typography variant="p" sx={{ display: selectedStatus === 'payed' ? 'block' : 'none', 'fontFamily':'Cairo','fontWeight':'400','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px', marginTop: '0px'}}>المبلغ المدفوع</Typography>
                          <FormControl dir="rtl" style={{display: selectedStatus === 'payed' ? 'block' : 'none', width: '100%', marginRight: '00px'}}>
                            {/* <InputLabel id="program" style={{direction: 'rtl'}} > البرنامج </InputLabel> */}
                            <TextField
                              style={{width: '100%'}} 
                              type="number"
                              placeholder='أدخل  المبلغ المدفوع' 
                              value={selectedPrice} 
                              onChange={(e)=> {setSelectedPrice(e.target.value)}}
                            />
                          </FormControl>
                          </ProfileDatas>
                        <ProfileDatas width={windowSize.width}>
                          <Typography variant="p" sx={{ display: selectedStatus === 'payed' ? 'block' : 'none', 'fontFamily':'Cairo','fontWeight':'400','textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '10px', marginTop: '0px'}}>تاريخ الدفع</Typography>
                          <FormControl dir="rtl" style={{display: selectedStatus === 'payed' ? 'block' : 'none', width: '100%', marginRight: '00px'}}>
                            {/* <InputLabel id="program" style={{direction: 'rtl'}} > البرنامج </InputLabel> */}
                            <TextField
                              style={{width: '100%'}} 
                              type="date"
                              placeholder='أدخل  تاريخ الدفع' 
                              value={selectedDate} 
                              onChange={(e)=> {setSelectedDate(e.target.value)}}
                            />
                          </FormControl>
                          </ProfileDatas>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button variant='primary' style={{backgroundColor: 'white', color: UISettings.colors.green, marginLeft: '10px'}} onClick={handleCloseAddSubsModal}>رجوع</Button>
                        <LoadingButton loading={loadingAdding} loadingPosition="center" variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} onClick={() => addSubs()}>حفظ</LoadingButton>
                      </DialogActions>
                    </Dialog>

      
                  </Container>
              </Body>
           );
        }
}
 
export default AddSubscription;


const columns = [
  { 
      field: 'name', 
      headerName: (<span>الاسم</span>), 
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
      headerName: ' البرنامج', 
      width: 150, 
      renderCell: (params) => { 
          return (
                  <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms &&  params.row.studyPrograms[0] && params.row.studyPrograms[0].name ? params.row.studyPrograms[0].name : '--' }</span>
          );
      }, 
  },
  { 
      field: 'group', 
      headerName: 'الحلقة', 
      width: 150, 
      renderCell: (params) => { 
          return (
                  <span style={{color: UISettings.colors.secondary}}>{params.row.groups && params.row.groups[0] ? params.row.groups[0].name : '--'}</span>
          );
      }, 
  },
  { 
      field: 'level', 
      headerName: 'المستوى', 
      minWidth: 100, 
      renderCell: (params) => { 
          return (
                  <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms && params.row.studyPrograms[0] && params.row.studyPrograms[0].studentStudyProgram && params.row.studyPrograms[0].studentStudyProgram.level ? params.row.studyPrograms[0].studentStudyProgram.level : '--' }</span>
          );
      }, 
  },
  { 
      field: 'expirationDate', 
      headerName: 'انتهاء الاشتراك', 
      width: 120, 
      renderCell: (params) => { 
          return (
                  <span style={{color: UISettings.colors.secondary}}>{params.row && params.row.studyPrograms && params.row.studyPrograms[0] && params.row.studyPrograms[0].studentStudyProgram && params.row.studyPrograms[0].studentStudyProgram.experationDate ? params.row.studyPrograms[0].studentStudyProgram.experationDate.slice(0, 10) : '--' }</span>
          );
      }, 
  },
];

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