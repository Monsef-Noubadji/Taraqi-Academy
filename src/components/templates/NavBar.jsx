import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ExpandLess, ExpandMore, School, SupervisedUserCircle } from '@mui/icons-material';
import Logo from '../../assets/logo.svg';
import UISettings from '../../theme/UISettings';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = () => {
        setAnchorEl(!anchorEl);
    };

    return (
        <header className="flex gap-12 w-full pt-6 items-center justify-center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <p onClick={handleOpenRegister} className="btn-primary register cursor-pointer">إنشاء حساب</p>
                <Dialog open={openRegister} onClose={handleCloseRegister} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>إختر نوع الحساب</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <NavLink to="/student/register">
                                <Button variant="primary" startIcon={<SupervisedUserCircle />} fullWidth>حساب طالب</Button>
                            </NavLink>
                            <NavLink to="/teacher/register">
                                <Button variant="primary" startIcon={<School />} fullWidth>حساب مدرس</Button>
                            </NavLink>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRegister} sx={{ color: UISettings.colors.green }}>إلغاء</Button>
                    </DialogActions>
                </Dialog>

                <Typography variant="p" fontWeight={600} sx={{ cursor: 'pointer' }} onClick={handleOpen}>تسجيل الدخول</Typography>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>إختر نوع الدخول</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <NavLink to="/student/login">
                                <Button variant="primary" startIcon={<SupervisedUserCircle />} fullWidth>تسجيل الدخول كطالب</Button>
                            </NavLink>
                            <NavLink to="/teacher/login">
                                <Button variant="primary" startIcon={<School />} fullWidth>تسجيل الدخول كمدرس</Button>
                            </NavLink>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: UISettings.colors.green }}>إلغاء</Button>
                    </DialogActions>
                </Dialog>

                <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="p" fontWeight={600} sx={{ cursor: 'pointer' }} onClick={handleClick}>
                    برامج الأكاديمية
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Typography>
                <Collapse in={anchorEl} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>
                            <NavLink to="/programs" className="list-link">
                                <ListItemText primary="لائحة البرامج" />
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/programs/goals" className="list-link">
                                <ListItemText primary="أهداف البرامج" />
                            </NavLink>
                        </ListItem>
                    </List>
                </Collapse>
                </Box>
            </Box>
            <a href="/#contactUs">تواصل معنا</a>
            <a href="/#howToRegister">كيفية التسجيل</a>
            <NavLink to="/#aboutUs">تعرف علينا</NavLink>
            <NavLink to="/">الرئيسية</NavLink>
            <img src={Logo} alt="academy_logo" width={70} height={70} />
        </header>
    );
}

export default NavBar;


/**
 *TODOS:
 
 1- Fix the Anchor link.
 2- Adjust the design.
 3- Add the Programs page.
 4- Check The Routing across the entire app.


 */