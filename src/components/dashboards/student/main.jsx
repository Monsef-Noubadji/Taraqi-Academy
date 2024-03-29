import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../src/assets/logo.svg'
import UISettings from '../../../theme/UISettings'
import HomeIcon from '@mui/icons-material/Home';
import { Assignment, Clear, Error, ErrorOutline, LogoutOutlined, MenuOpenOutlined, Notifications, PaymentOutlined, Person, ReportProblem, RouteOutlined, SearchOutlined, SettingsOutlined } from '@mui/icons-material';
import { Route, Routes, useNavigate } from 'react-router';
import Home from './Home';
import Programs from './Programs';
import Exams from './Exams';
import Profile from './Profile';
import NotFound from './NotFound';
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Slide, TextField, Typography } from '@mui/material';
import HomeAfterInit from './HomeAfterInit';
import Program from './programDetailes';
import Subscribe from './Subscribe';
import EditProfile from './ProfileEdit';
import Settings from './Settings';
import axiosInstance from './axiosInstance';
import errorHandler from './errorHandler';
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import Payement from './payment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


export default function Main() {
    
    // Detecting page
    const [page, setPage] = useState('page');
    useEffect(() => {
        if(window.location.pathname.split('/')[2]){
            setPage(window.location.pathname.split('/')[2])
        }else{
            setPage('')
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNotification = Boolean(anchorEl);
    const handleClickNotification = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNotification = () => {
        setAnchorEl(null);
    };

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

    const [student, setStudent] = useState({firstName: '', familyName: '', email: '', programChosed: ''});
    // check student connexion
    const [loading, setLoading] = useState(true);
    async function CheckConnexion() {
        try {
            const response = await axiosInstance.post('/studentApi/CheckConnexion', { withCredentials: true });
            if(response.data.response === 'done'){
               setLoading(false)
               setStudent(response.data.student)
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

    const [openLogoutPopup, setOpenLogoutPopup] = React.useState(false);
    const handleCloseLogoutPopup = () => {
        setOpenLogoutPopup(false);
    }

    const [loadingLogout, setLoadingLogout] = useState(false);
    
    async function Logout() {
        try {
            setLoadingLogout(true)
            const response = await axiosInstance.post('/studentApi/logout', { withCredentials: true });
            if(response.data.response === 'done'){
               navigate('/student/login', {replace: true})
               setLoadingLogout(false)
            }
        } catch (error) {
            setLoadingLogout(false)
            errorHandler(error, toast, navigate)
        }
    }

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
              <SideBare windowSize={windowSize} open={sidebarOpen}>
                  <IconButton style={{display: windowSize.width > UISettings.devices.phone ? 'none' : 'unset', alignSelf: 'start'}} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuOpenOutlined style={{ fontSize: '38px'}}/></IconButton>
                  <img src={logo} alt="academy_logo" width={100} style={{margin: '20px 0px'}} />
                  <SubSideBare>
                      <SubSideBareActions>
                          <SubSideBareAction open={page === '' ? true : false} onClick={()=> {navigate(''); setPage(''); setSidebarOpen(false)}}>
                              <HomeIcon style={{marginLeft: '10px'}}></HomeIcon>
                              الرئيسية
                          </SubSideBareAction>
                          <SubSideBareAction open={page === 'programs' ? true : false} onClick={()=> {navigate('programs'); setPage('programs'); setSidebarOpen(false)}} >
                              <RouteOutlined style={{marginLeft: '10px'}}></RouteOutlined>
                              برامج الأكاديمية
                          </SubSideBareAction>
                          <SubSideBareAction open={page === 'subscribe' ? true : false} onClick={()=> {navigate('subscribe'); setPage('subscribe'); setSidebarOpen(false)}}>
                              <PaymentOutlined style={{marginLeft: '10px'}}></PaymentOutlined>
                              اشتراكاتي
                          </SubSideBareAction>
                          <SubSideBareAction open={page === 'exams' ? true : false} onClick={()=> {navigate('exams'); setPage('exams'); setSidebarOpen(false)}}>
                              <Assignment style={{marginLeft: '10px'}}></Assignment>
                              امتحاناتي
                          </SubSideBareAction>
                          <SubSideBareAction open={page === 'profile' ? true : false} onClick={()=> {navigate('profile'); setPage('profile'); setSidebarOpen(false)}}>
                              <Person style={{marginLeft: '10px'}}></Person>
                              بروفايلي
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
                                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{student.firstName + ' ' + student.familyName}</Typography>
                                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>طالب</Typography>
                              </NavbarSubInfoData>
                          </NavbarSubInfo>
                          <SubSideBareAction onClick={()=> setOpenLogoutPopup(true)} open={false}>
                              <LogoutOutlined style={{marginLeft: '10px'}}></LogoutOutlined>
                              تسجيل الخروج
                          </SubSideBareAction>
                      </SubSideBareActions>
                  </SubSideBare>
              </SideBare>
              <Container windowSize={windowSize}>
                  <Navbar>
                      <TextField
                          id="filled-start-adornment"
                          sx={{  'direction':'rtl','fontFamily':'Cairo','borderRadius':'10px'}}
                          style={{ width: '100%', maxWidth: '400px',  display: windowSize.width > UISettings.devices.phone ? 'flex' : 'none'}}
                          placeholder='ابحث هنا عما تريد'
                          InputProps={{
                              //style: {height: '100%'},
                              endAdornment: <InputAdornment style={{backgroundColor: UISettings.colors.green, color: 'white', padding: '12px 8px ', height: '100px', borderRadius: '10px',}} position="end"><SearchOutlined ></SearchOutlined></InputAdornment>,
                          }}
                      />
      
                      <IconButton style={{display: windowSize.width > UISettings.devices.phone ? 'none' : 'block',}} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuOpenOutlined style={{ fontSize: '38px'}}/></IconButton>
                      <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openNotification}
                            onClose={handleCloseNotification}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                             <List sx={{ width: '100%', maxWidth: 360, minWidth: 320, bgcolor: 'background.paper' }} style={{direction: 'rtl'}}>
                                <Title style={{ marginBottom: '10px', marginRight: '15px', marginTop: '-5px'}}>
                                    <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
                                    <Typography variant={windowSize.width > UISettings.devices.phone ? "h6" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start'}}>الإشعارات</Typography>
                                </Title>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG}}>
                                        <Assignment />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText style={{textAlign: 'start'}} primary="الامتحان  التفاعلي الخامس" secondary="تم رفع الامتحان التفاعلي الخامس " />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG}}>
                                        <PaymentOutlined />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText style={{textAlign: 'start'}} primary="اشتراك الشهر" secondary="يوشك اشتراك هذا الشهر على الانتهاء" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG}}>
                                        <Assignment />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText style={{textAlign: 'start'}} primary="رفعت نتائج الامتحان" secondary="تم تصحيح الامتحان التفاعلي الرابع و رفعت النتائج" />
                                </ListItem>
                                </List>
                        </Menu>
                      <img  src={logo} alt="academy_logo" width={70} style={{margin: '0px 0px',  display: windowSize.width > UISettings.devices.phone ? 'none' : 'block'}} />
      
                      <NavbarInfo>
                          <NavbarSubInfo windowSize={windowSize} position={"navbare"}>
                              <img src={'../../../../src/assets/user.png'} alt="academy_logo" width={50} style={{margin: '0px 0px', marginLeft: '5px'}} />
                              <NavbarSubInfoData>
                                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>{ student.firstName + ' ' + student.familyName }</Typography>
                                  <Typography variant="p" sx={{'whiteSpace':'normal', color: UISettings.colors.darkIcons}}>طالب</Typography>
                              </NavbarSubInfoData>
                          </NavbarSubInfo>
                          <IconButton
                            id="basic-button"
                            aria-controls={openNotification ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openNotification ? 'true' : undefined}
                            onClick={handleClickNotification}
                            style={{marginRight: "10px"}}><Notifications style={{ fontSize: '33²px'}}/></IconButton>
                      </NavbarInfo>
                      
      
                  </Navbar>
                  <Routes >
                      
                      <Route exact path="/" element={student.programChosed === false ? <Home windowSize={windowSize} student={student}/> : <HomeAfterInit windowSize={windowSize} student={student} />}></Route>
                      <Route exact path="/programs" element={<Programs  windowSize={windowSize} />}></Route>
                      <Route exact path="/programs/program/*" element={<Program  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscribe" element={<Subscribe  windowSize={windowSize} />}></Route>
                      <Route exact path="/subscribe/payment" element={<Payement  windowSize={windowSize} />}></Route>
                      <Route exact path="/exams" element={<Exams  windowSize={windowSize} />}></Route>
                      <Route exact path="/profile" element={<Profile  windowSize={windowSize} />}></Route>
                      <Route exact path="/profile/edit" element={<EditProfile  windowSize={windowSize} />}></Route>
                      <Route exact path="/settings" element={<Settings  windowSize={windowSize} mainToast={toast} />}></Route>
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
`

const SubSideBare = styled.div`
    min-height: "20px";
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
`

const SubSideBareActions = styled.div`
    width: 100%;
    //height: 100%;
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