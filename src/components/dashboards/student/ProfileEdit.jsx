import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import { BorderColorOutlined, Delete, DeleteOutlineOutlined, EditOutlined, Person, PersonOutlineOutlined, RemoveOutlined, Upload, UploadFileOutlined, UploadOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import errorHandler from './errorHandler'
import axiosInstance from './axiosInstance'
import { ToastContainer,toast } from "react-toastify";
import countriesArabic from './countries'
import AlgerianWilayas from './algerianWialays'
import { DatePicker, LoadingButton } from '@mui/lab'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';


export default function EditProfile({windowSize}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});

  async function getProfileData() {
    try {
        const response = await axiosInstance.post('/studentApi/getProfileData', { withCredentials: true });
        if(response.data.response === 'done'){
           setLoading(false)
           setStudent(response.data.student)
           setFirstName(response.data.student.firstName)
           setFamilyName(response.data.student.familyName)
           setPhoneNumber(response.data.student.phoneNumber)
           setDescription(response.data.student.description)
           setBirthDate(response.data.student.birthDate)
           setCountry(response.data.student.country)
           setWilaya(response.data.student.wilaya)
           setImage(response.data.student.image)
           setHizbCount(response.data.student.hizbCount)
           setStudyLevel(response.data.student.studyLevel)
           setGender(response.data.student.gender)
           setStatus(response.data.student.status)
        }
    } catch (error) {
        errorHandler(error, toast, navigate)
    }
}

async function uploadPhoto(selectedFile) {
  try {
      if (selectedFile){
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', 'mohamed');
        const response = await axiosInstance.post('/studentApi/uploadPhoto', formData, {
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

const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
async function saveChanges() {
  try {
      setLoadingSaveChanges(true)
      const response = await axiosInstance.post('/studentApi/saveProfileChanges', {firstName, familyName, phoneNumber, birthDate, gender, description, country, wilaya, studyLevel, status, hizbCount, image });
      toast.success(response.data.message, {
        position: 'top-right',
        progress: undefined,
        autoClose: 3000,
        theme: 'colored'
      });
      setLoadingSaveChanges(false)
      getProfileData()
  } catch (error) {
      setLoadingSaveChanges(false)
      if(error.response && error.response.status  === 400 && error.response.data && error.response.data.response === 'invalid_params'){
          const errors = error.response.data.errors
          toast.error(error.response.data.message, {
              position: 'top-right',
              progress: undefined,
              autoClose: 5000,
              theme: 'colored'
          });
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
              } else if(error.field === 'hizbCount'){
                  setHizbCountError(error.message)
              } else if(error.field === 'gender'){
                  setGenderError(error.message)
              } else if(error.field === 'description'){
                  setDescriptionError(error.message)
              } else if(error.field === 'studyLevel'){
                setStudyLevelError(error.message)
              } else if(error.field === 'status'){
                setStatusError(error.message)
              } 
          }
      }else{
          errorHandler(error, toast, navigate)
      }
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
        getProfileData()
      }
  }, []);

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
  const [imageError, setImageError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [studyLevelError, setStudyLevelError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [hizbCountError, setHizbCountError] = useState('');

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
          <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/student/profile')} style={{cursor: 'pointer'}} >بروفايلي </span> <span> {">"} تعديل المعلومات  </span></Typography>
          <LoadingButton loading={loadingSaveChanges} loadingPosition='center' onClick={()=> saveChanges()} variant='primary' style={{alignSelf: 'left', width: "fit-content"}} >حفظ التغييرات</LoadingButton>
          
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
                  placeholder='(السنة / اليوم / الشهر) تاريخ الميلاد' 
                  defaultValue={birthDate} 
                  onChange={(e)=> {setBirthDate(e.target.value); setBirthDateError('')}}
                  error={birthDateError.length > 0 ? true : false}
                  helperText={birthDateError}
                />
                   
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الجنس</Typography>
                <Select
                    fullWidth
                    id="gender"
                    name="gender"
                    label=""
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    value={gender}
                    onChange={(e)=> {setGender(e.target.value); setGenderError('')}}
                    error={genderError.length > 0 ? true : false}
                    helperText={genderError}
                    >
                    <MenuItem style={{direction: 'rtl'}} value={'أنثى'}>{'أنثى'}</MenuItem>
                    <MenuItem style={{direction: 'rtl'}} value={'ذكر'}>{'ذكر'}</MenuItem>
                </Select>
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
          
          <Container>
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
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>المستوى الدراسي</Typography>
                <Select
                    fullWidth
                    id="studyLevel"
                    name="studyLevel"
                    label=""
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    value={studyLevel}
                    onChange={(e)=> {setStudyLevel(e.target.value); setStudyLevelError('')}}
                    error={studyLevelError.length > 0 ? true : false}
                    helperText={studyLevelError}
                    >
                    <MenuItem style={{direction: 'rtl'}} value={'المرحلة المتوسطة'}>{'المرحلة المتوسطة'}</MenuItem>
                    <MenuItem style={{direction: 'rtl'}} value={'المرحلة الثانوية'}>{'المرحلة الثانوية'}</MenuItem>
                    <MenuItem style={{direction: 'rtl'}} value={'المرحلة الجامعية'}>{'المرحلة الجامعية'}</MenuItem>
                </Select>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>النشاط</Typography>
                <Select
                    fullWidth
                    id="status"
                    name="status"
                    label=""
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    value={status}
                    onChange={(e)=> {setStatus(e.target.value); setStatusError('')}}
                    error={statusError.length > 0 ? true : false}
                    helperText={statusError}
                    >
                    <MenuItem style={{direction: 'rtl'}} value={'طالب'}>{'طالب'}</MenuItem>
                    <MenuItem style={{direction: 'rtl'}} value={'عامل'}>{'عامل'}</MenuItem>
                    <MenuItem style={{direction: 'rtl'}} value={'عاطل عن العمل'}>{'عاطل عن العمل'}</MenuItem>
                </Select>
              </ProfileDatas>
              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>عدد الأحزاب المحفوظة</Typography>
                <Select
                    fullWidth
                    id="hizbCount"
                    name="hizbCount"
                    label=""
                    sx={{'direction':'rtl','fontFamily':'Cairo'}}
                    value={hizbCount}
                    onChange={(e)=> {setHizbCount(e.target.value); setHizbCountError('')}}
                    error={hizbCountError.length > 0 ? true : false}
                    helperText={hizbCountError}
                    >
                    {Array.from({ length: 61 }, (_, i) => (
                      <MenuItem style={{direction: 'rtl'}} key={i} value={i.toString()}>{i.toString()}</MenuItem>
                    ))}
                </Select>
              </ProfileDatas>
            </SubContainer>
          </Container>
          <LoadingButton LoadingButton loading={loadingSaveChanges} loadingPosition='center' onClick={()=> saveChanges()} variant='primary' style={{alignSelf: 'left', width: "fit-content"}} >حفظ التغييرات</LoadingButton>
  
      </Body>
    )
  }
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
  width: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  direction: rtl;
`