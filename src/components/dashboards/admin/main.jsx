import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../src/assets/logo.svg'
import UISettings from '../../../theme/UISettings'
import HomeIcon from '@mui/icons-material/Home';
import { Assignment, Clear, Error, LogoutOutlined, MenuOpenOutlined, Notifications, Person2Outlined, RouteOutlined, SchoolOutlined, SettingsOutlined } from '@mui/icons-material';
import { Route, Routes, useNavigate } from 'react-router';
import {useLocation } from 'react-router-dom';
import Exams from './Exams';
import Profile from './Profile';
import NotFound from './NotFound';
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, List, Slide } from '@mui/material';
import HomeAfterInit from './HomeAfterInit';
import Program from './programDetailes';
import AllSubscribers from './AllSubscribers';
import EditProfile from './ProfileEdit';
import Settings from './Settings';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import AirplayIcon from '@mui/icons-material/Airplay';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import AllStudents from './AllStudents.jsx'
import StudentDetails from './StudentDetails.jsx';
import AddStudent from './AddStudent.jsx';
import AllTeachers from './AllTeachers.jsx';
import GroupIcon from '@mui/icons-material/Group';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TeacherDetails from './TeacherDetails.jsx';
import RecentTeachers from './RecentTeachers.jsx'
import AddTeacher from './AddTeacher.jsx';
import ExamDetails from './ExamDetails.jsx';
import AddExam from './AddExam.jsx';
import SubscriptionsTypes from './SubscritpionsTypes.jsx';
import SubscriberDetails from './SubscriberDetails.jsx';
import AddSubscription from './AddSubscription.jsx';
import EditSubscription from './EditSubscription.jsx';
import './style.css'
import AllSessions from './AllSessions.jsx';
import AddSession from './AddSession.jsx';
import SessionDetails from './SessionDetails.jsx';
import AllReports from './AllReports.jsx';
import ReportDetails from './ReportDetails.jsx';
import AskForReport from './AskForReport.jsx'
import Programs from './Programs.jsx';
import AddProgram from './AddProgram.jsx';
import ProgramDetails from './programDetailes.jsx'
import EditProgram from './EditProgram draft.jsx'
import UpdateProgram from './EditProgramme.jsx';
import AddNewTeacher from './AddNewTeacher.jsx';
import TeacherDetailes from './teacherDetailes.jsx';
import AllRequestedTeachers from './AllRequestedTeachers.jsx';
import axiosInstance from '../student/axiosInstance.js';
import errorHandler from '../student/errorHandler.js';
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';




export default function Main() {
    
    // Detecting page
    const [page, setPage] = useState('');
    useEffect(() => {
        if(window.location.pathname.split('/')[2]){
            setPage(window.location.pathname.split('/')[2])
        }else{
            setPage('')
        }
    }, []);
    const [open, setOpen] = useState(false);
    const [openTeacher, setOpenTeacher] = useState(false);
    const [openExams,setOpenExams] = useState(false)
    const [openSubs,setOpenSubs] = useState(false)
    const [openSessions,setOpenSessions] = useState(false)
    const [openReports,setOpenReports] = useState(false)
    const [openPrograms,setOpenPrograms] = useState(false)


    const handleClick = () => {
      setOpen(!open);
    };

    const handleClickTeacher = () => {
        setOpenTeacher(!openTeacher);
    };

    const handleClickExams = () => {
        setOpenExams(!openExams);
    };

    const handleClickSubs = () => {
        setOpenSubs(!openSubs);
    };

    const handleClickSessions = () => {
        setOpenSessions(!openSessions);
    };

    const handleClickReports = () => {
        setOpenReports(!openReports);
    };

    const handleClickPrograms = () => {
        setOpenPrograms(!openPrograms);
    };
  const location = useLocation()
  const path = location.pathname.split('/')
  

    // Getting Device Width
    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
      
    useEffect(() => {
        function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate()

    const [startX, setStartX] = useState(null);
    const swipeRef = useRef(null);

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchEnd = (event) => {
        const endX = event.changedTouches[0].clientX;
        const difference = startX - endX;

        if (Math.abs(difference) > 50) {
        setSidebarOpen(difference > 0); // If difference is positive, swipe to the left, otherwise to the right
        }

        setStartX(null);
    };
    const adminInfos = {
        name:'العيد عبود',
        isAdmin:true
    }

    const [openLogoutPopup, setOpenLogoutPopup] = React.useState(false);
    const handleCloseLogoutPopup = () => {
        setOpenLogoutPopup(false);
    }

    const [loadingLogout, setLoadingLogout] = useState(false);
    
    async function Logout() {
        try {
            setLoadingLogout(true)
            const response = await axiosInstance.post('/adminApi/logout', { withCredentials: true });
            if(response.data.response === 'done'){
               navigate('/admin/login', {replace: true})
               setLoadingLogout(false)
            }
        } catch (error) {
            setLoadingLogout(false)
            errorHandler(error, toast, navigate)
        }
    }

    const [admin, setAdmin] = useState({});
    // check student connexion
    const [loading, setLoading] = useState(true);
    async function CheckConnexion() {
        try {
            const response = await axiosInstance.post('/adminApi/CheckConnexion', { withCredentials: true });
            if(response.data.response === 'done'){
               setLoading(false)
               setAdmin(response.data.admin)
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
            CheckConnexion()
        }
    }, []);

    if(loading){
        return(
            <div style={{height: "100vh", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <ToastContainer rtl="true"/>
              <CircularProgress style={{color: UISettings.colors.green}}/>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>انتظر لحظة..</Typography>
            </div>
        )
    }else{
        return (
          <Body
              ref={swipeRef}
              onTouchStart={handleTouchStart}
              //onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
          >
              <ToastContainer rtl="true"/>
              <SideBare  className='adminSideBar' windowSize={windowSize} open={sidebarOpen}>
                  <IconButton style={{display: windowSize.width > UISettings.devices.phone ? 'none' : 'unset', alignSelf: 'start'}} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuOpenOutlined style={{ fontSize: '38px'}}/></IconButton>
                  <img src={logo} alt="academy_logo" width={100} style={{margin: '20px 0px'}} />
                  <SubSideBare className='adminSideBar' style={{background: 'transparent', flex: 1, overflow: 'auto', maxHeight:  'calc(100vh - 200px)'}}>
                      <SubSideBareActions>
                          <SubSideBareAction open={page === '' ? true : false} onClick={()=> {navigate(''); setPage(''); setSidebarOpen(false)}}>
                              <HomeIcon style={{marginLeft: '10px'}}></HomeIcon>
                              الرئيسية
                          </SubSideBareAction>
                          <div>
                          <SubSideBareAction open={page === 'allStudents' || page === 'addNewStudent'} onClick={handleClick}>
                              <SchoolIcon style={{marginLeft: '10px'}}></SchoolIcon>
                              إدارة الطلاب
                          {open ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse  in={open} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allStudents' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allStudents' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allStudents' ? true : false} onClick={()=> {navigate('/admin/students/all'); setPage('allStudents'); setSidebarOpen(false)}}>
                                  <Person2Outlined style={{marginLeft: '10px'}}></Person2Outlined>
                                  جميع الطلاب
                                  </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor: page === 'addNewStudent' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'addNewStudent' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'addNewStudent' ? true : false} onClick={()=> {navigate('/admin/students/new'); setPage('addNewStudent'); setSidebarOpen(false)}}>
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة طالب
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
                          <div>
                          <SubSideBareAction open={page === 'allTeachers' || page === 'recentTeachers' || page === 'newTeacher'} onClick={handleClickTeacher}>
                              <GroupIcon style={{marginLeft: '10px'}}></GroupIcon>
                              إدارة المعلمين
                          {openTeacher ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openTeacher} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allTeachers' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allTeachers' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allTeachers' ? true : false} onClick={()=> {navigate('/admin/teachers/all'); setPage('allTeachers'); setSidebarOpen(false)}}>
                                  <GroupIcon style={{marginLeft: '10px'}}></GroupIcon>
                                  جميع المعلمين
                                  </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'recentTeachers' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'recentTeachers' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'recentTeachers' ? true : false} onClick={()=> {navigate('/admin/teachers/recent'); setPage('recentTeachers'); setSidebarOpen(false)}}>
                                  <PersonSearchIcon style={{marginLeft: '10px'}}></PersonSearchIcon>
                                  المسجلون حديثا
                              </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'newTeacher' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'newTeacher' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'newTeacher' ? true : false} onClick={()=> {navigate('/admin/teachers/new'); setPage('newTeacher'); setSidebarOpen(false)}}>
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة أستاذ
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
                          <div>
                          <SubSideBareAction open={page === 'allExams' || page === 'addNewExam'} onClick={handleClickExams}>
                              <SchoolIcon style={{marginLeft: '10px'}}></SchoolIcon>
                              إدارة الإمتحانات
                          {openExams ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openExams} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allExams' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allExams' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allExams' ? true : false} onClick={()=> {navigate('/admin/exams/all'); setPage('allExams'); setSidebarOpen(false)}}>
                                  <SchoolOutlined style={{marginLeft: '10px'}}></SchoolOutlined>
                                  جميع الإمتحانات
                                  </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'addNewExam' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'addNewExam' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'addNewExam' ? true : false} onClick={()=> {navigate('/admin/exams/new'); setPage('addNewExam'); setSidebarOpen(false)}}>
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة امتحان
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
      
                          <div>
                          <SubSideBareAction open={page === 'allReports' || page === 'askForReport'} onClick={handleClickReports}>
                              <Assignment style={{marginLeft: '10px'}}></Assignment>
                                  إدارة التقارير      
                          {openReports ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openReports} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allReports' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allReports' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allReports' ? true : false} onClick={()=> {navigate('/admin/reports/all'); setPage('allReports'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'allReports' ? true : false} onClick={()=> {navigate('/admin/reports/all'); setPage('allReports'); setSidebarOpen(false)}}> */}
                                  <Assignment style={{marginLeft: '10px'}}></Assignment>
                              جميع التقارير
                              </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'askForReport' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'askForReport' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'askForReport' ? true : false} onClick={()=> {navigate('/admin/reports/demande'); setPage('askForReport'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'askForReport' ? true : false} onClick={()=> {navigate('/admin/reports/demande'); setPage('askForReport'); setSidebarOpen(false)}}> */}
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  طلب تقرير    
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
      
                          <div>
                          <SubSideBareAction open={page === 'allSubs' || page === 'addNewSub'} onClick={handleClickSubs}>
                              <PaymentIcon style={{marginLeft: '10px'}}></PaymentIcon>
                              إدارة الإشتراكات
                          {openSubs ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openSubs} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allSubs' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allSubs' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allSubs' ? true : false} onClick={()=> {navigate('/admin/subscriptions/all'); setPage('allSubs'); setSidebarOpen(false)}}>
                                  <PersonOutlineOutlinedIcon style={{marginLeft: '10px'}}></PersonOutlineOutlinedIcon>
                                  إشتراكات الطلاب
                              </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'addNewSub' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'addNewSub' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'addNewSub' ? true : false} onClick={()=> {navigate('/admin/subscriptions/new'); setPage('addNewSub'); setSidebarOpen(false)}}>
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة إشتراك    
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
      
                          {/* <SubSideBareAction open={page === 'allSubs' ? true : false} onClick={()=> {navigate('/admin/subscriptions/all'); setPage('allSubs'); setSidebarOpen(false)}}>
                              <PaymentIcon style={{marginLeft: '10px'}}></PaymentIcon>
                              إدارة الإشتراكات 
                          </SubSideBareAction> */}
      
                          <div>
                          <SubSideBareAction open={page === 'allSessions' || page === 'addNewSession'} onClick={handleClickSessions}>
                              <AirplayIcon style={{marginLeft: '10px'}}></AirplayIcon>
                              إدارة الحلقات
                          {openSessions ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openSessions} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allSessions' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allSessions' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allSessions' ? true : false} onClick={()=> {navigate('/admin/sessions/all'); setPage('allSessions'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'allSessions' ? true : false} onClick={()=> {navigate('/admin/sessions/all'); setPage('allSessions'); setSidebarOpen(false)}}> */}
                                  <AirplayIcon style={{marginLeft: '10px'}}></AirplayIcon>
                              جميع الحلقات
                              </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'addNewSession' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'addNewSession' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'addNewSession' ? true : false} onClick={()=> {navigate('/admin/sessions/new'); setPage('addNewSession'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'addNewSession' ? true : false} onClick={()=> {navigate('/admin/sessions/new'); setPage('addNewSession'); setSidebarOpen(false)}}> */}
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة حلقة    
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
                          <div>
                          <SubSideBareAction open={page === 'allPrograms' || page === 'addNewProgram'} onClick={handleClickPrograms}>
                              <RouteOutlined style={{marginLeft: '10px'}}></RouteOutlined>
                              إدارة البرامج
                          {openPrograms ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                          </SubSideBareAction>   
                          <Collapse in={openPrograms} timeout="auto" unmountOnExit>
                              <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                              <SubSideBareAction style={{backgroundColor:page === 'allPrograms' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'allPrograms' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'allPrograms' ? true : false} onClick={()=> {navigate('/admin/programs/all'); setPage('allPrograms'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'allPrograms' ? true : false} onClick={()=> {navigate('/admin/programs/all'); setPage('allPrograms'); setSidebarOpen(false)}}> */}
                                  <RouteOutlined style={{marginLeft: '10px'}}></RouteOutlined>
                              جميع البرامج
                              </SubSideBareAction>
                              <SubSideBareAction style={{backgroundColor:page === 'addNewProgram' ? UISettings.colors.greenBG : '#efefef3b', color:page === 'addNewProgram' ? UISettings.colors.green : UISettings.colors.secondary}} open={page === 'addNewProgram' ? true : false} onClick={()=> {navigate('/admin/programs/new'); setPage('addNewProgram'); setSidebarOpen(false)}}>
                              {/* <SubSideBareAction open={page === 'addNewProgram' ? true : false} onClick={()=> {navigate('/admin/programs/new'); setPage('addNewProgram'); setSidebarOpen(false)}}> */}
                                  <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                                  إضافة برنامج    
                              </SubSideBareAction>
                              </List>
                          </Collapse>                  
                          </div>
                          <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                              <PersonOutlineOutlinedIcon style={{marginLeft: '10px'}}></PersonOutlineOutlinedIcon>
                              حسابي  
                          </SubSideBareAction>
                          <SubSideBareAction open={page === 'settings' ? true : false} onClick={()=> {navigate('settings'); setPage('settings'); setSidebarOpen(false)}}>
                              <SettingsOutlined style={{marginLeft: '10px'}}></SettingsOutlined>
                              الإعدادات
                          </SubSideBareAction>
                      </SubSideBareActions>
      
                      <SubSideBareActions style={{minHeight: windowSize.width > UISettings.devices.phone ? '60px' : '120px', justifyContent: 'end', overflow: 'hidden'}}>
                          <NavbarSubInfo windowSize={windowSize} position={"sidebare"}>
                              <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={50} style={{margin: '0px 0px', marginLeft: '5px'}} />
                              <NavbarSubInfoData>
                                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{admin.firstName ? admin.firstName : ''} {admin.familyName ? admin.familyName : ''}</Typography>
                                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{'المشرف العام'}</Typography>
                              </NavbarSubInfoData>
                          </NavbarSubInfo>
                          <SubSideBareAction onClick={()=> setOpenLogoutPopup(true)} open={false}>
                              <LogoutOutlined style={{marginLeft: '10px',color: UISettings.colors.red}}></LogoutOutlined>
                             <p style={{color:UISettings.colors.red}}> تسجيل الخروج</p>
                          </SubSideBareAction>
                      </SubSideBareActions>
                  </SubSideBare>
              </SideBare>
              <Container windowSize={windowSize} style={{'paddingTop':'1rem'}}>
                  <Navbar>
              
      
                      <IconButton style={{display: windowSize.width > UISettings.devices.phone ? 'none' : 'block',}} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuOpenOutlined style={{ fontSize: '38px'}}/></IconButton>
      
                      <img  src={logo} alt="academy_logo" width={70} style={{margin: '0px 0px',  display: windowSize.width > UISettings.devices.phone ? 'none' : 'block'}} />
      
                 
                  <section className='flex justify-between items-center' style={{width: windowSize.width > UISettings.devices.phone ? '100%' : 'auto'}}>
                      <NavbarInfo>
                          <NavbarSubInfo windowSize={windowSize} position={"navbare"}>
                              <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={50} style={{margin: '0px 0px', marginLeft: '5px'}} />
                              <NavbarSubInfoData>
                                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{admin.firstName ? admin.firstName : ''} {admin.familyName ? admin.familyName : ''}</Typography>
                                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>المشرف العام</Typography>
                              </NavbarSubInfoData>
                          </NavbarSubInfo>
                          <IconButton style={{marginRight: "10px"}}><Notifications style={{ fontSize: '33²px'}}/></IconButton>
                      </NavbarInfo>
                      <Typography variant='h5' fontWeight={700} style={{display: windowSize.width > UISettings.devices.phone && path.length < 3 ? 'block' : 'none',}}>السلام عليكم أستاذ, هذه آخر التحديثات</Typography>
      
                  </section>
                      
                  </Navbar>
                  <Routes >
                      <Route exact path="/" element={<HomeAfterInit windowSize={windowSize}/>}></Route>
                      <Route exact path="/students/all" element={<AllStudents  windowSize={windowSize} />}></Route>
                      <Route exact path="/teachers/all" element={<AllTeachers  windowSize={windowSize} />}></Route>
                      <Route exact path="/teachers/recent1" element={<RecentTeachers  windowSize={windowSize} />}></Route>
                      <Route exact path="/teachers/recent" element={<AllRequestedTeachers  windowSize={windowSize} />}></Route>
                      <Route exact path="/students/:id" element={<StudentDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/teachers/:id" element={<TeacherDetailes  windowSize={windowSize} />}></Route>
                      <Route exact path="/students/new" element={<AddStudent  windowSize={windowSize} />}></Route>
                      <Route exact path="/teachers/new" element={<AddNewTeacher  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/program/*" element={<Program  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscriptions/all" element={<AllSubscribers  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscriptions/list" element={<SubscriptionsTypes  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscriptions/:id" element={<SubscriberDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscriptions/:id/edit" element={<EditSubscription  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscriptions/new" element={<AddSubscription  windowSize={windowSize} />}></Route>
                      <Route exact path="/exams/all" element={<Exams  windowSize={windowSize} />}></Route>
                      <Route exact path="/exams/:id" element={<ExamDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/exams/new" element={<AddExam  windowSize={windowSize} />}></Route>
                      <Route exact path="/sessions/all" element={<AllSessions  windowSize={windowSize} />}></Route>
                      <Route exact path="/sessions/new" element={<AddSession  windowSize={windowSize} />}></Route>
                      <Route exact path="/sessions/:id/edit" element={<SessionDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/reports/all" element={<AllReports  windowSize={windowSize} />}></Route>
                      <Route exact path="/reports/:id" element={<ReportDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/reports/demande" element={<AskForReport  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/all" element={<Programs  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/new" element={<AddProgram  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/:id" element={<ProgramDetails  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/:id/edit" element={<UpdateProgram  windowSize={windowSize} />}></Route>
                      <Route exact path="/profile" element={<Profile  windowSize={windowSize} />}></Route>
                      <Route exact path="/profile/edit" element={<EditProfile  windowSize={windowSize} />}></Route>
                      <Route exact path="/settings" element={<Settings  windowSize={windowSize} />}></Route>
                      <Route exact path="/*" element={<NotFound />}></Route>
                  </Routes>
              </Container>
      
              {/* // logout popup */}
              <Dialog
                  fullWidth
                  maxWidth={"sm"}
                  open={openLogoutPopup}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseLogoutPopup}
                  aria-describedby="alert-dialog-slide-description"
                  style={{borderRadius: '20px'}}
                  >
                  <DialogTitle><Clear onClick={()=> setOpenLogoutPopup(false)} style={{cursor: 'pointer'}}/></DialogTitle>
                  <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <Error style={{fontSize: '100px', color:'red'}}></Error>
                      <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'center',marginBottom: '10px', marginTop: "20px"}}>تسجيل الخروج</Typography>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'center',marginBottom: '10px'}}>هل أنت متأكد من أنك تريد تسجيل الخروج؟</Typography>
                      <Buttons style={{justifyContent: 'center'}}>
                          <Button variant='secondary' style={{marginLeft: '20px'}}onClick={()=> setOpenLogoutPopup(false)}>رجوع</Button>
                          <LoadingButton loading={loadingLogout} loadingPosition='center'  variant='primary' style={{backgroundColor: 'red'}} onClick={()=> Logout()}>نعم، سجل خروجي</LoadingButton >
                      </Buttons>
                      </DialogContentText>
                  </DialogContent>
                  
                  </Dialog>   
      
          </Body>
        )
    }

}


const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    padding: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    /* background-image: url('./../../../../src/assets/lightStar.svg'); */
    /* background-repeat: none ; */
    /* background-position-x: center; */
    /* background-position: center; */
    /* background-size: 150px; */
    /* background-size: cover; */
`

const SideBare = styled.div`
    height: calc(100vh - 30px);
    width: ${(props) => props.windowSize.width > UISettings.devices.phone ? 'calc(20% - 15px)' : 'calc(100% - 50px)' } ;
    height: ${(props) => props.windowSize.width > UISettings.devices.phone ? 'calc(100vh - 30px)' : 'calc(100vh)' } ;
    border-radius: ${(props) => props.windowSize.width > UISettings.devices.phone ? '20px' : '20px 0px 0px 20px' } ;
    box-shadow: 0px 4px 35px 0px #2929291A;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 20px;
    position: fixed;
    top: ${(props) => props.windowSize.width > UISettings.devices.phone ? '15px' : '0px' }  ;
    bottom: ${(props) => props.windowSize.width > UISettings.devices.phone ? '15px' : '0px' }  ;
    right: ${(props) => props.windowSize.width > UISettings.devices.phone ? '15px' : (props.open ? '0px' : '-100%')}  ;
    background-color: white;
    z-index: 10;
    transition: 200ms ;
    overflow-y: auto;
`

const SubSideBare = styled.div`
    min-height: "20px";
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const SubSideBareActions = styled.div`
    width: 100%;
    // height: 100vh;
    overflow-y:scroll;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-right: 5px;
`

const SubSideBareAction = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    background-color: ${prop => prop.open ? UISettings.colors.green : 'white'};
    padding: 12px 15px;
    border-radius: 10px;
    font-family:'Cairo';
    font-weight: bold;
    direction: rtl;
    color: ${prop => prop.open ? 'white' : UISettings.colors.secondary};
    cursor: pointer;
    margin: 3px 0px;
    transition: 400ms ease-in-out;

`


const Container = styled.div`
    height: max-content;
    width: calc(80% - 30px);
    width: ${(props) => props.windowSize.width > UISettings.devices.phone ? 'calc(80% - 30px)' : 'calc(100% - 30px)' } ;
    //margin-right: 20%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: absolute;
    top: 15px;
    left: 15px;
    bottom: 15px;

`

const Navbar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    //height: 100vh;
    //overflow: auto;
    background-color: white;
`

const NavbarInfo = styled.div`
    width: max-content;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
`

const NavbarSubInfo = styled.div`
    width: ${(props) => props.position === 'sidebare' ? '100%' : 'max-content'};
    padding: ${(props) => props.position === 'sidebare' ? '5px 10px' : '0px'};
    display: flex;
    display: ${(props) => props.windowSize.width > UISettings.devices.phone ? (props.position === 'navbare' ? 'flex' : 'none') : (props.position === 'navbare' ? 'none' : 'flex') } ;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
`

const NavbarSubInfoData = styled.div`
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 20px;
`

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });