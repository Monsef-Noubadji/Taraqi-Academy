import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../src/assets/logo.svg'
import UISettings from '../../../theme/UISettings'
import HomeIcon from '@mui/icons-material/Home';
import { Assignment, LogoutOutlined, MenuOpenOutlined, Notifications, Person2Outlined, RouteOutlined, SchoolOutlined, SettingsOutlined } from '@mui/icons-material';
import { Route, Routes, useNavigate } from 'react-router';
import {useLocation } from 'react-router-dom';
import Exams from './Exams';
import Profile from './Profile';
import NotFound from './NotFound';
import { IconButton, List, Typography } from '@mui/material';
import HomeAfterInit from './HomeAfterInit';
import Program from './programDetailes';
import Subscribe from './Subscribe';
import EditProfile from './ProfileEdit';
import Settings from './Settings';
import SchoolIcon from '@mui/icons-material/School';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
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
    const handleClick = () => {
      setOpen(!open);
    };
    const handleClickTeacher = () => {
        setOpenTeacher(!openTeacher);
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

  return (
    <Body
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        //onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
        <SideBare windowSize={windowSize} open={sidebarOpen}>
            <IconButton style={{display: windowSize.width > UISettings.devices.phone ? 'none' : 'unset', alignSelf: 'start'}} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuOpenOutlined style={{ fontSize: '38px'}}/></IconButton>
            <img src={logo} alt="academy_logo" width={100} style={{margin: '20px 0px'}} />
            <SubSideBare>
                <SubSideBareActions>
                    <SubSideBareAction open={page === '' ? true : false} onClick={()=> {navigate(''); setPage(''); setSidebarOpen(false)}}>
                        <HomeIcon style={{marginLeft: '10px'}}></HomeIcon>
                        الرئيسية
                    </SubSideBareAction>
                    <div>
                    <SubSideBareAction open={page === 'all' || page === 'addNew'} onClick={handleClick}>
                        <SchoolIcon style={{marginLeft: '10px'}}></SchoolIcon>
                        إدارة الطلاب
                    {open ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                    </SubSideBareAction>   
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                        <SubSideBareAction open={page === 'all' ? true : false} onClick={()=> {navigate('/admin/students/all'); setPage('all'); setSidebarOpen(false)}}>
                            <Person2Outlined style={{marginLeft: '10px'}}></Person2Outlined>
                            جميع الطلاب
                            </SubSideBareAction>
                        <SubSideBareAction open={page === 'addNew' ? true : false} onClick={()=> {navigate('/admin/students/new'); setPage('addNew'); setSidebarOpen(false)}}>
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
                    {open ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                    </SubSideBareAction>   
                    <Collapse in={openTeacher} timeout="auto" unmountOnExit>
                        <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                        <SubSideBareAction open={page === 'allTeachers' ? true : false} onClick={()=> {navigate('/admin/teachers/all'); setPage('allTeachers'); setSidebarOpen(false)}}>
                            <GroupIcon style={{marginLeft: '10px'}}></GroupIcon>
                            جميع المعلمين
                            </SubSideBareAction>
                        <SubSideBareAction open={page === 'recentTeachers' ? true : false} onClick={()=> {navigate('/admin/teachers/recent'); setPage('recentTeachers'); setSidebarOpen(false)}}>
                            <PersonSearchIcon style={{marginLeft: '10px'}}></PersonSearchIcon>
                            المسجلون حديثا
                        </SubSideBareAction>
                        <SubSideBareAction open={page === 'newTeacher' ? true : false} onClick={()=> {navigate('/admin/teachers/new'); setPage('newTeacher'); setSidebarOpen(false)}}>
                            <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                            إضافة أستاذ
                        </SubSideBareAction>
                        </List>
                    </Collapse>                  
                    </div>
                    <div>
                    <SubSideBareAction open={page === 'all' || page === 'addNew'} onClick={handleClick}>
                        <SchoolIcon style={{marginLeft: '10px'}}></SchoolIcon>
                        إدارة الإمتحانات
                    {open ? <ExpandLess style={{marginRight: 'auto'}}/> : <ExpandMore style={{marginRight: 'auto'}}/>} 
                    </SubSideBareAction>   
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" sx={{'display':'flex',flexDirection:'column',justifyContent:'start',direction:'rtl',marginRight:'20px'}} disablePadding>
                        <SubSideBareAction open={page === 'allExams' ? true : false} onClick={()=> {navigate('/admin/exams/all'); setPage('allExams'); setSidebarOpen(false)}}>
                            <SchoolOutlined style={{marginLeft: '10px'}}></SchoolOutlined>
                            جميع الإمتحانات
                            </SubSideBareAction>
                        <SubSideBareAction open={page === 'addNewExam' ? true : false} onClick={()=> {navigate('/admin/exams/new'); setPage('addNewExam'); setSidebarOpen(false)}}>
                            <AddIcon style={{marginLeft: '10px'}}></AddIcon>
                            إضافة امتحان
                        </SubSideBareAction>
                        </List>
                    </Collapse>                  
                    </div>
                    <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                        <Assignment style={{marginLeft: '10px'}}></Assignment>
                        إدارة التقارير
                    </SubSideBareAction>
                    <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                        <PaymentIcon style={{marginLeft: '10px'}}></PaymentIcon>
                        إدارة الإشتراكات
                    </SubSideBareAction>
                    <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                        <AirplayIcon style={{marginLeft: '10px'}}></AirplayIcon>
                        إدارة الحلقات
                    </SubSideBareAction>
                    <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                        <RouteOutlined style={{marginLeft: '10px'}}></RouteOutlined>
                        إدارة البرامج
                    </SubSideBareAction>
                    <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                        <PersonOutlineOutlinedIcon style={{marginLeft: '10px'}}></PersonOutlineOutlinedIcon>
                        حسابي  
                    </SubSideBareAction>
                    <SubSideBareAction open={page === 'settings' ? true : false} onClick={()=> {navigate('settings'); setPage('settings'); setSidebarOpen(false)}}>
                        <SettingsOutlined style={{marginLeft: '10px'}}></SettingsOutlined>
                        الإعدادات
                    </SubSideBareAction>
                </SubSideBareActions>

                <SubSideBareActions>
                    <NavbarSubInfo windowSize={windowSize} position={"sidebare"}>
                        <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={50} style={{margin: '0px 0px', marginLeft: '5px'}} />
                        <NavbarSubInfoData>
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{adminInfos.name}</Typography>
                            <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>{adminInfos.isAdmin === true ? 'المشرف العام' : 'معلم'}</Typography>
                        </NavbarSubInfoData>
                    </NavbarSubInfo>
                    <SubSideBareAction open={false}>
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
                            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{adminInfos.name}</Typography>
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
                <Route exact path="/teachers/recent" element={<RecentTeachers  windowSize={windowSize} />}></Route>
                <Route exact path="/students/:id" element={<StudentDetails  windowSize={windowSize} />}></Route>
                <Route exact path="/teachers/:id" element={<TeacherDetails  windowSize={windowSize} />}></Route>
                <Route exact path="/students/new" element={<AddStudent  windowSize={windowSize} />}></Route>
                <Route exact path="/teachers/new" element={<AddTeacher  windowSize={windowSize} />}></Route>
                <Route exact path="/programs/program/*" element={<Program  windowSize={windowSize} />}></Route>
                <Route exact path="/subscribe" element={<Subscribe  windowSize={windowSize} />}></Route>
                <Route exact path="/exams/all" element={<Exams  windowSize={windowSize} />}></Route>
                <Route exact path="/exams/:id" element={<ExamDetails  windowSize={windowSize} />}></Route>
                <Route exact path="/profile" element={<Profile  windowSize={windowSize} />}></Route>
                <Route exact path="/profile/edit" element={<EditProfile  windowSize={windowSize} />}></Route>
                <Route exact path="/settings" element={<Settings  windowSize={windowSize} />}></Route>
                <Route exact path="/*" element={<NotFound />}></Route>
            </Routes>
        </Container>
    </Body>
  )
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