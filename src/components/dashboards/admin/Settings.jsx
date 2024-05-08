import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, IconButton, MenuItem, Select, TextField, Typography, makeStyles } from '@mui/material'
import { BorderColorOutlined, Delete, EditOutlined, LaptopMac, NotificationAdd, Notifications, Person, PersonOutlineOutlined, Save, SaveOutlined, Security, Upload } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.css'
import SwitchIcon from './switchIcon'
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab'
import AlgerianWilayas from '../student/algerianWialays'
import countriesArabic from '../student/countries'





export default function Settings({windowSize}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const [admin, setAdmin] = useState({});
  

  async function getProfileData() {
    try {
      setLoading(true)
        const response = await axiosInstance.post('/adminApi/getProfileData', { withCredentials: true });
        if(response.data.response === 'done'){
           setLoading(false)
           setStudent(response.data.admin)
           setAdmin(response.data.admin)
           setFirstName(response.data.admin.firstName)
           setFamilyName(response.data.admin.familyName)
           setPhoneNumber(response.data.admin.phoneNumber)
           setDescription(response.data.admin.description)
           setCountry(response.data.admin.country)
           setWilaya(response.data.admin.wilaya)
           setImage(response.data.admin.image)
           setBirthDate(response.data.admin.birthDate)
        }
        setLoading(false)
    } catch (error) {
        setLoading(false)
        errorHandler(error, toast, navigate)
    }
  }

  const [loadingFetchNotif, setLoadingFetchNotif] = useState(true);

  async function getStudentNotif() {
    try {
        setLoadingFetchNotif(true)
        const response = await axiosInstance.post('/adminApi/getNotifications', { withCredentials: true });
        if(response.data.response === 'done'){
          console.log(response.data)
           setSubsNotif(response.data.notification.subscriptionNotification)
           setReportNotif(response.data.notification.reportNotification)
           setNewTeacherNotif(response.data.notification.newTeacherNotification)
           if(response.data.notification.examNotification === false && response.data.notification.subscriptionNotification === false && response.data.notification.newTeacherNotif === false && response.data.notification.reportNotification === false ){
            setAllNotif(false)
           }
        }
        setLoadingFetchNotif(false)
    } catch (error) {
        setLoadingFetchNotif(false)
        errorHandler(error, toast, navigate)
    }
  }


  const [loadingGetPlatformData, setLoadingGetPlatformData] = useState(true);

  async function getPlatformData() {
    try {
      setLoadingGetPlatformData(true)
        const response = await axiosInstance.post('/adminApi/getPlatformData', { withCredentials: true });
        if(response.data.response === 'done'){
          console.log(response.data)
          if(response.data.platform){
            setsitePhoneNumber(response.data.platform.phoneNumber)
            setsitePostalKey(response.data.platform.postalKey)
            setSitePostalNumber(response.data.platform.postalNumber)
          }
        }
        setLoadingGetPlatformData(false)
    } catch (error) {
      setLoadingGetPlatformData(false)
      errorHandler(error, toast, navigate)
    }
  }
 

  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
  async function saveChanges() {
    try {
        setLoadingSaveChanges(true)
        const response = await axiosInstance.post('/adminApi/saveProfileChanges', {firstName, familyName, phoneNumber, birthDate, description, country, wilaya, image });
        toast.success(response.data.message, {
          position: 'top-right',
          progress: undefined,
          autoClose: 3000,
          theme: 'colored'
        });
        setLoadingSaveChanges(false)
        //getProfileData()
    } catch (error) {
        setLoadingSaveChanges(false)
        if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
            toast.error(error.response.data.message, {
                position: 'top-right',
                progress: undefined,
                autoClose: 5000,
                theme: 'colored'
            });
            const errors = error.response.data.errors
            for (let i = 0; i < errors.length; i++) {
                const error = errors[i];
                if(error.field === 'firstName'){
                    setFirstNameError(error.message)
                } else if(error.field === 'familyName'){
                    setFamilyNameError(error.message)
                } else if(error.field === 'phoneNumber'){
                    setPhoneNumberError(error.message)
                } else if(error.field === 'birthDate'){
                    setBirthDateError(error.message)
                } else if(error.field === 'country'){
                    setCountryError(error.message)
                } else if(error.field === 'wilaya'){
                    setWilayaError(error.message)
                } else if(error.field === 'description'){
                    setDescriptionError(error.message)
                } 
            }
        }else{
            errorHandler(error, toast, navigate)
        }
    }
  }

  const [loadingSavePlatformChanges, setLoadingSavePlatformChanges] = useState(false);
  async function savePlatformChanges() {
    try {
      setLoadingSavePlatformChanges(true)
        const response = await axiosInstance.post('/adminApi/savePlatformChanges', {sitePhoneNumber, sitePostalNumber, sitePostalKey });
        toast.success(response.data.message, {
          position: 'top-right',
          progress: undefined,
          autoClose: 3000,
          theme: 'colored'
        });
        setLoadingSavePlatformChanges(false)
        //getProfileData()
    } catch (error) {
        setLoadingSavePlatformChanges(false)
        if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
            toast.error(error.response.data.message, {
                position: 'top-right',
                progress: undefined,
                autoClose: 5000,
                theme: 'colored'
            });
            const errors = error.response.data.errors
            for (let i = 0; i < errors.length; i++) {
                const error = errors[i];
                if(error.field === 'sitePostalNumber'){
                    setSitePostalNumberError(error.message)
                } else if(error.field === 'sitePostalKey'){
                    setsitePostalKeyError(error.message)
                } else if(error.field === 'sitePhoneNumber'){
                    setsitePhoneNumberError(error.message)
                } 
            }
        }else{
            errorHandler(error, toast, navigate)
        }
    }
  }

const [loadingPassword, setLoadingPassword] = useState(false);
async function savePassword() {
  try {
      setLoadingPassword(true)
      const response = await axiosInstance.post('/adminApi/savePassword', {currentPassword, password, confirmPassword});
      setPassword('')
      setCurrentPassword('')
      setConfirmPassword('')
      toast.success(response.data.message, {
        position: 'top-right',
        progress: undefined,
        autoClose: 3000,
        theme: 'colored'
      });
      setLoadingPassword(false)
      //getProfileData()
  } catch (error) {
      setLoadingPassword(false)
      if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
          toast.error(error.response.data.message, {
              position: 'top-right',
              progress: undefined,
              autoClose: 5000,
              theme: 'colored'
          });
          const errors = error.response.data.errors
          for (let i = 0; i < errors.length; i++) {
              const error = errors[i];
              if(error.field === 'password'){
                  setPasswordError(error.message)
              } else if(error.field === 'confirmPassword'){
                  setConfirmPasswordError(error.message)
              } else if(error.field === 'currentPassword'){
                  setCurrentPasswordError(error.message)
              }
          }
      }else{
          errorHandler(error, toast, navigate)
      }
  }
}

const [loadingNotif, setLoadingNotif] = useState(false);
async function saveNotifChanges() {
  try {
      setLoadingNotif(true)
      const response = await axiosInstance.post('/adminApi/saveNotifChanges', {reportNotif, subsNotif, newTeacherNotif});
      toast.success(response.data.message, {
        position: 'top-right',
        progress: undefined,
        autoClose: 3000,
        theme: 'colored'
      });
      setLoadingNotif(false)
  } catch (error) {
      setLoadingNotif(false)
      errorHandler(error, toast, navigate)
  }
}

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [currentPassword, setCurrentPassword] = useState('');

const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');
const [currentPasswordError, setCurrentPasswordError] = useState('');

const [firstName, setFirstName] = useState('');
const [familyName, setFamilyName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [country, setCountry] = useState('');
const [wilaya, setWilaya] = useState('');
const [image, setImage] = useState('');
const [birthDate, setBirthDate] = useState('');
const [description, setDescription] = useState('');
const [gender, setGender] = useState('');
const [studyLevel, setStudyLevel] = useState('');
const [status, setStatus] = useState('');
const [hizbCount, setHizbCount] = useState();


const [firstNameError, setFirstNameError] = useState('');
const [familyNameError, setFamilyNameError] = useState('');
const [phoneNumberError, setPhoneNumberError] = useState('');
const [countryError, setCountryError] = useState('');
const [wilayaError, setWilayaError] = useState('');
const [birthDateError, setBirthDateError] = useState('');
const [descriptionError, setDescriptionError] = useState('');

const [sitePhoneNumber, setsitePhoneNumber] = useState();
const [sitePostalNumber, setSitePostalNumber] = useState();
const [sitePostalKey, setsitePostalKey] = useState();

const [sitePhoneNumberError, setsitePhoneNumberError] = useState('');
const [sitePostalNumberError, setSitePostalNumberError] = useState('');
const [sitePostalKeyError, setsitePostalKeyError] = useState('');


const [selectedFile, setSelectedFile] = useState(null);
const fileInputRef = useRef(null);

const handleFileChange = async (event) => {
  setSelectedFile(event.target.files[0]);
  await uploadPhoto(event.target.files[0])
};

const handleImageLoad = (event) => {
  const img = event.target;
  if (img.naturalWidth > img.naturalHeight) {
    img.style.width = 'auto';
    img.style.height = '100%';
  } else {
    img.style.width = '100%';
    img.style.height = 'auto';
  }
};
async function uploadPhoto(selectedFile) {
  try {
      if (selectedFile){
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', 'mohamed');
        const response = await axiosInstance.post('/adminApi/uploadPhoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setImage(response.data.image)
        setSelectedFile(null);
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        
      }else{
        toast.error('لم يتم اختيار أي صورة', {
          position: 'top-right',
          progress: undefined,
          autoClose: 3000,
          theme: 'colored'
      });
      }
  } catch (error) {
      errorHandler(error, toast, navigate)
  }
}

  useEffect(() => {
    console.log(value)
    if(value === 0){
      getProfileData()
    }else if (value === 2) {
      getStudentNotif()
    }else if (value === 3){
      getPlatformData()
    }
  }, [value]);

  useEffect(() => {
      getProfileData()
  }, []);

  const [allNotif, setAllNotif] = useState(true);
  const [subsNotif, setSubsNotif] = useState(true);
  const [reportNotif, setReportNotif] = useState(true);
  const [newTeacherNotif, setNewTeacherNotif] = useState(true);

  useEffect(() => {
      if(allNotif === true && newTeacherNotif === false && subsNotif === false && reportNotif === false){
        setReportNotif(true)
        setSubsNotif(true)
        setNewTeacherNotif(true)
      }else if(allNotif === false){
        setReportNotif(false)
        setSubsNotif(false)
        setNewTeacherNotif(false)
      }
  }, [allNotif]);

  useEffect(() => {
    if(newTeacherNotif === true || subsNotif === true || reportNotif === true){
      setAllNotif(true)
    }else if(newTeacherNotif === false && subsNotif === false && reportNotif === false){
      setAllNotif(false)
    }
}, [newTeacherNotif, subsNotif, reportNotif]);



  return (
    <Body>
        <ToastContainer rtl="true"/>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '20px'}}>الإعدادات </Typography>
        <Container className='mui-tabs-Global'>

        {
                [''].map((key) => {
                  if(windowSize.width < UISettings.devices.phone){
                    return(
                      <div key={key} style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', width: '100%'}} >
                        <IconButton style={{color: value === 0 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 0) }><Person/></IconButton>
                        <IconButton style={{color: value === 3 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 3) }><LaptopMac/></IconButton>
                        <IconButton style={{color: value === 1 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 1) }><Security/></IconButton>
                        <IconButton style={{color: value === 2 ? UISettings.colors.black : UISettings.colors.secondary}} onClick={(e)=> handleChange(e, 2) }><Notifications/></IconButton>
                      </div>
                    )
                  }
                })
              }

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', direction: 'rtl', }}
            >
              {
                [''].map((key) => {
                  if(windowSize.width > UISettings.devices.phone){
                    return(
                      <Tabs
                          key={key}
                          orientation="vertical"
                          value={value}
                          onChange={handleChange}
                          aria-label="Vertical tabs example"
                          sx={{ borderLeft: 0, borderColor: 'divider', width:'200px' }}
                      >
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الحساب" icon={<Person style={{marginLeft: '10px'}}/>} iconPosition='end' {...a11yProps(0)} />
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الحماية" icon={<Security style={{marginLeft: '10px'}}/>} iconPosition='end'  {...a11yProps(1)} />
                          <Tab  style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="الإشعارات" icon={<Notifications style={{marginLeft: '10px'}}/>} iconPosition='end'  {...a11yProps(2)} />
                          <Tab style={{direction: 'ltr', display: 'flex', flexDirection: 'row', justifyContent: 'end'}} label="المنصة" icon={<LaptopMac style={{marginLeft: '10px'}}/>} iconPosition='end' {...a11yProps(3)} />
                      </Tabs>
                    )
                  }
                })
              }
            
            <TabPanel value={value} style={{width: 'calc(100%)', minHeight: windowSize.width > UISettings.devices.phone ? "calc(100vh - 200px)" : "calc(100vh - 240px)"}} index={0}>
              {loading ? 
                  <div style={{height: windowSize.width > UISettings.devices.phone ? "calc(100vh - 250px)" : "calc(100vh - 300px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <CircularProgress style={{color: UISettings.colors.green}}/>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ..</Typography>
                </div> :
                  <>
                  <Container>
                    <ProfileHeader  style={{marginBottom: '15px'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل المعلومات الشخصية</Typography>
                      </ProfileInfos>
                    </ProfileHeader>
          
                    <div   style={{width: '280px', alignSelf: 'center', height: '100%', backgroundColor: '#3BB3490D', border: '2px dashed #5FCE6C', borderRadius: "5px", padding: "20px 10px" , display: 'flex', flexDirection: 'column', justifyContent: 'start', marginBottom: '20px'}}>
                      {
                        image && image.length > 0 ?
                        <div style={{height: '90px', width: "90px", borderRadius: '100%', alignSelf:'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                          <img src={image} onLoad={handleImageLoad}  crossorigin={"anonymous | use-credentials"} alt="academy_logo" style={{margin: '0px 0px', borderRadius: '100%',  alignSelf: 'center',}} />
                        </div>
                        : <PersonOutlineOutlined style={{padding: '10px', borderRadius: '50%', color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, fontSize: '90px', alignSelf: 'center'}}/>
                      }
                      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}} >
                        <Button variant='secondary' onClick={()=> setImage('')} endIcon={<Delete/>} >حذف</Button>
                        <Button variant='primary' onClick={() => fileInputRef.current.click()} endIcon={<Upload/>} style={{marginLeft:'10px'}} >تحميل</Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                    
                    <SubContainer>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الاسم</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='الاسم' 
                          defaultValue={firstName} 
                          onChange={(e)=> {setFirstName(e.target.value); setFirstNameError('')}}
                          error={firstNameError.length > 0 ? true : false}
                          helperText={firstNameError}
                        />
                      </ProfileDatas>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>اللقب</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='اللقب' 
                          defaultValue={familyName} 
                          onChange={(e)=> {setFamilyName(e.target.value); setFamilyNameError('')}}
                          error={familyNameError.length > 0 ? true : false}
                          helperText={familyNameError}
                        />
                      </ProfileDatas>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تاريخ الميلاد  (السنة / اليوم / الشهر)</Typography>
                        <TextField 
                          type='date' 
                          style={{width: '100%'}} 
                          placeholder='تاريخ الميلاد' 
                          defaultValue={birthDate} 
                          onChange={(e)=> {setBirthDate(e.target.value); setBirthDateError('')}}
                          error={birthDateError.length > 0 ? true : false}
                          helperText={birthDateError}
                        />
                      </ProfileDatas>
                     
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>رقم الهاتف</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='رقم الهاتف' 
                          defaultValue={phoneNumber} 
                          type='number'
                          onChange={(e)=> {setPhoneNumber(e.target.value); setPhoneNumberError('')}}
                          error={phoneNumberError.length > 0 ? true : false}
                          helperText={phoneNumberError}
                        />
                      </ProfileDatas>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الوصف</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='الوصف' 
                          defaultValue={description} 
                          onChange={(e)=> {setDescription(e.target.value); setDescriptionError('')}}
                          error={descriptionError.length > 0 ? true : false}
                          helperText={descriptionError}
                        />
                      </ProfileDatas>
                    </SubContainer>
                  </Container>
          
                <Container style={{marginTop: '20px'}}>
                  <ProfileHeader  style={{marginBottom: '15px'}}>
                    <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                    <ProfileInfos>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل المعلومات الإضافية</Typography>
                    </ProfileInfos>
                  </ProfileHeader>
                  <SubContainer>
                    <ProfileDatas  width={windowSize.width}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البلد</Typography>
                      <Select
                          fullWidth
                          id="country"
                          name="country"
                          label=""
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                          defaultValue={country}
                          value={country}
                          onChange={(e)=> {setCountry(e.target.value); setCountryError('')}}
                          error={countryError.length > 0 ? true : false}
                          helperText={countryError}
                          >
                      {countriesArabic.map((country,index) => (
                          <MenuItem style={{direction: 'rtl'}}  key={index} value={country}>{country}</MenuItem>
                          ))}
                      </Select>
                    </ProfileDatas>
                    <ProfileDatas style={{display: country === 'الجزائر' ? 'none' : 'flex'}}  width={windowSize.width}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الولاية</Typography>
                      <TextField 
                        style={{width: '100%',}} 
                        placeholder='الولاية' 
                        value={wilaya} 
                        onChange={(e)=> {setWilaya(e.target.value); setWilayaError('')}}
                        error={wilayaError.length > 0 ? true : false}
                        helperText={wilayaError}
                      />
                    </ProfileDatas>
                    <ProfileDatas style={{display: country === 'الجزائر' ? 'flex' : 'none'}}  width={windowSize.width}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الولاية</Typography>
                      <Select
                          fullWidth
                          id="wilaya"
                          name="wilaya"
                          label=""
                          value={wilaya}
                          onChange={(e)=> {setWilaya(e.target.value); setWilayaError('')}}
                          error={wilayaError.length > 0 ? true : false}
                          helperText={wilayaError}
                          sx={{'direction':'rtl','fontFamily':'Cairo'}}
                      >
                      {AlgerianWilayas.map((country,index) => (
                          <MenuItem style={{direction: 'rtl'}} key={index} value={country}>{country}</MenuItem>
                      ))}
                      </Select>
                    </ProfileDatas>
                  </SubContainer>
                </Container>
                <LoadingButton LoadingButton loading={loadingSaveChanges} loadingPosition='center' onClick={()=> saveChanges()} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</LoadingButton>
                </>
              }

            </TabPanel>
            <TabPanel value={value}  style={{width: 'calc(100%)', minHeight: windowSize.width > UISettings.devices.phone ? "calc(100vh - 200px)" : "calc(100vh - 240px)"}} index={1}>
              <Container>
                <ProfileHeader  style={{marginBottom: '15px'}}>
                  <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                  <ProfileInfos>
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل كلمة المرور</Typography>
                  </ProfileInfos>
                </ProfileHeader>
                <SubContainer>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>كلمة المرور الحالية</Typography>
                    <TextField 
                      style={{width: '100%'}} 
                      placeholder='كلمة المرور الحالية' 
                      value={currentPassword} 
                      type='password'
                      onChange={(e)=> {setCurrentPassword(e.target.value); setCurrentPasswordError('')}}
                      error={currentPasswordError.length > 0 ? true : false}
                      helperText={currentPasswordError}
                      />
                  </ProfileDatas>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>كلمة المرور الجديدة</Typography>
                    <TextField 
                      style={{width: '100%'}} 
                      placeholder='كلمة المرور الجديدة' 
                      value={password} 
                      type='password'
                      onChange={(e)=> {setPassword(e.target.value); setPasswordError('')}}
                      error={passwordError.length > 0 ? true : false}
                      helperText={passwordError}
                      />
                  </ProfileDatas>
                  <ProfileDatas width={100}>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تأكيد كلمة المرور الجديدة</Typography>
                    <TextField 
                      style={{width: '100%'}} 
                      placeholder='تأكيد كلمة المرور الجديدة' 
                      value={confirmPassword} 
                      type='password'
                      onChange={(e)=> {setConfirmPassword(e.target.value); setConfirmPasswordError('')}}
                      error={confirmPasswordError.length > 0 ? true : false}
                      helperText={confirmPasswordError}  
                    />
                  </ProfileDatas>
                </SubContainer>
              
                <LoadingButton loading={loadingPassword} loadingPosition='center' onClick={()=> savePassword()} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</LoadingButton>

              </Container>
            </TabPanel>
            <TabPanel style={{width: 'calc(100%)', minHeight: windowSize.width > UISettings.devices.phone ? "calc(100vh - 200px)" : "calc(100vh - 240px)"}} value={value} index={2}>
            {loadingFetchNotif ? 
                  <div style={{height: windowSize.width > UISettings.devices.phone ? "calc(100vh - 250px)" : "calc(100vh - 300px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <CircularProgress style={{color: UISettings.colors.green}}/>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ..</Typography>
                </div> : 
                <Container>
                    <ProfileHeader  style={{marginBottom: '15px'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>إعدادات الإشعارات</Typography>
                      </ProfileInfos>
                    </ProfileHeader>
                    <SubContainer>
                      <Notif>
                        <SwitchIcon open={allNotif} change={setAllNotif}/>
                        <ProfileDatas  width={100}>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تفعيل الإشعارات</Typography>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات الامتحانات الجديدة، إشعارات الاشتراكات و إشعارات النتائج </Typography>
                        </ProfileDatas>
                      </Notif>
                      <Notif>
                        <ProfileDatas  width={100}>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>تخصيص الإشعارات</Typography>
                        </ProfileDatas>
                      </Notif>
                      <Notif>
                        <SwitchIcon open={subsNotif} change={setSubsNotif}/>
                        <ProfileDatas  width={100}>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات تسجيل الطلاب</Typography>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات تسجيل الطلاب</Typography>
                        </ProfileDatas>
                      </Notif>
                      <Notif>
                        <SwitchIcon open={newTeacherNotif} change={setNewTeacherNotif}/>
                        <ProfileDatas  width={100}>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات المعلم الجديد</Typography>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات طلبات المعلمين الجدد</Typography>
                        </ProfileDatas>
                      </Notif>
                      <Notif>
                        <SwitchIcon open={reportNotif} change={setReportNotif} />
                        <ProfileDatas  width={100}>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إشعارات التقارير</Typography>
                          <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل اشعارات التقارير</Typography>
                        </ProfileDatas>
                      </Notif>
                    </SubContainer>
                    <LoadingButton loading={loadingNotif} loadingPosition='center' onClick={()=> saveNotifChanges()} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</LoadingButton>
                </Container>
              }
            </TabPanel>
            <TabPanel value={value} style={{width: 'calc(100%)', minHeight: windowSize.width > UISettings.devices.phone ? "calc(100vh - 200px)" : "calc(100vh - 240px)"}} index={3}>
              {loadingGetPlatformData ? 
                  <div style={{height: windowSize.width > UISettings.devices.phone ? "calc(100vh - 250px)" : "calc(100vh - 300px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <CircularProgress style={{color: UISettings.colors.green}}/>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ..</Typography>
                </div> 
                :
                  <>
                  <Container>
                    <ProfileHeader  style={{marginBottom: '15px'}}>
                      <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
                      <ProfileInfos>
                          <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>تعديل معلومات المنصة</Typography>
                      </ProfileInfos>
                    </ProfileHeader>
          
                    <SubContainer>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الرقم البريدي</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='الرقم البريدي' 
                          defaultValue={sitePostalNumber} 
                          onChange={(e)=> {setSitePostalNumber(e.target.value); setSitePostalNumberError('')}}
                          error={sitePostalNumberError.length > 0 ? true : false}
                          helperText={sitePostalNumberError}
                        />
                      </ProfileDatas>
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>المفتاح البريدي</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='المفتاح البريدي' 
                          defaultValue={sitePostalKey} 
                          onChange={(e)=> {setsitePostalKey(e.target.value); setsitePostalKeyError('')}}
                          error={sitePostalKeyError.length > 0 ? true : false}
                          helperText={sitePostalKeyError}
                        />
                      </ProfileDatas>
                     
                      <ProfileDatas width={windowSize.width}>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>رقم الهاتف</Typography>
                        <TextField 
                          style={{width: '100%'}} 
                          placeholder='رقم الهاتف' 
                          defaultValue={sitePhoneNumber} 
                          type='number'
                          onChange={(e)=> {setsitePhoneNumber(e.target.value); setsitePhoneNumberError('')}}
                          error={sitePhoneNumberError.length > 0 ? true : false}
                          helperText={sitePhoneNumberError}
                        />
                      </ProfileDatas>
                      
                    </SubContainer>
                  </Container>
          
                <LoadingButton LoadingButton loading={loadingSavePlatformChanges} loadingPosition='center' onClick={()=> savePlatformChanges()} variant='primary' startIcon={<Save style={{marginLeft: '10px'}}/>} style={{color: UISettings.colors.black, backgroundColor: 'white', border: '1px solid ' +  UISettings.colors.black, float: 'left', width: "max-content", marginTop: '10px'}} >حفظ التغييرات</LoadingButton>
                </>
              }
            </TabPanel>
            </Box>
        </Container>

    </Body>
  )
}



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  



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

const Container = styled.div`
  direction: ltr;
  //width: calc(100%);
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 20px ;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
  background-color: white;
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

const ProfileInfos = styled.div`
    margin-right: 10px;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
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


const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`