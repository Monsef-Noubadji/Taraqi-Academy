import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { AddCircleOutlineOutlined, AddOutlined, Delete, Key, Password, PersonOutlineOutlined, Save, SaveAlt, Upload } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwitchIcon from './switchIcon'
import { useState } from 'react'
import axiosInstance from '../student/axiosInstance'
import errorHandler from '../student/errorHandler'
import { ToastContainer,toast } from "react-toastify";
import { LoadingButton } from '@mui/lab'


export default function AddNewTeacher({windowSize}) {
  const navigate = useNavigate()
  // const [isSubscribed,setIsSubscribed] = useState(true)

  // const programs = [
  //   {id:0, name:"برنامح الهمم"},
  //   {id:1, name:"برنامج التميز"},
  //   {id:2, name:"برنامح الأساس"},
  // ]

  // const sessions = [
  // {id:0, name:"حلقة الهمم"},
  // {id:1, name:"حلقة التميز"},
  // {id:2, name:"حلقة الأساس"},
  // ]

  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sendNotif, setSendNotif] = useState(false);



  const [firstNameError, setFirstNameError] = useState('');
  const [familyNameError, setFamilyNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function generatePassword(length) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#%&*()';

    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';

    // Ensure at least one character from each character set
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Generate the rest of the password
    for (let i = 0; i < length - 4; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(password)
    setPasswordError('')
  }

  const [loadingCreate, setLoadingCreate] = useState(false);

  async function createTeacher() {
    try {
      setLoadingCreate(true)
        const response = await axiosInstance.post('/adminApi/createTeacher', {firstName, familyName, phoneNumber, gender, email, password, sendNotif});
        if(response.data.response === 'done'){
            setLoadingCreate(false)
            toast.success(response.data.message, {
              position: 'top-right',
              progress: undefined,
              autoClose: 2000,
              theme: 'colored'
          });
          setTimeout(() => {
            navigate('/admin/teachers/' + response.data.teacherId)
          }, 1500);
        }
    } catch (error) {
      setLoadingCreate(false)
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
            } else if(error.field === 'gender'){
                setGenderError(error.message)
            } else if(error.field === 'email'){
              setEmailError(error.message)
            } else if(error.field === 'password'){
              setPasswordError(error.message)
            }
        }
    }else{
        errorHandler(error, toast, navigate)
    }
    }
}

 
  return (
    <Body>
          <ToastContainer rtl="true"/>
        <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} onClick={()=> navigate('/admin/teachers/all')} >إدارة المعلمين </span> <span> {">"} إضافة معلم  </span></Typography>
        <LoadingButton loading={loadingCreate} loadingPosition='center' onClick={()=> createTeacher()} variant='primary' endIcon={<AddCircleOutlineOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color: loadingCreate ? 'transparent' : UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >إضافة معلم</LoadingButton>
        
        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>المعلومات الشخصية</Typography>
            </ProfileInfos>
          </ProfileHeader>

          {/* profile picture not displayed */}
          {/* <div   style={{width: '280px', alignSelf: 'center', height: '100%', backgroundColor: '#3BB3490D', border: '2px dashed #5FCE6C', borderRadius: "5px", padding: "20px 10px" , display: 'flex', flexDirection: 'column', justifyContent: 'start', marginBottom: '20px'}}>
            <PersonOutlineOutlined style={{padding: '10px', borderRadius: '50%', color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, fontSize: '60px', alignSelf: 'center'}}/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}} >
              <Button variant='secondary' endIcon={<Delete/>} >حذف</Button>
              <Button variant='primary' endIcon={<Upload/>} style={{marginLeft:'10px'}} >تحميل</Button>
            </div>
          </div> */}
          
          <SubContainer>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الاسم</Typography>
              <TextField 
                style={{width: '100%'}} 
                placeholder='الاسم' 
                value={firstName} 
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
                value={familyName} 
                onChange={(e)=> {setFamilyName(e.target.value); setFamilyNameError('')}}
                error={familyNameError.length > 0 ? true : false}
                helperText={familyNameError}
              />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>رقم الهاتف</Typography>
              <TextField 
                style={{width: '100%'}} 
                placeholder='رقم الهاتف' 
                value={phoneNumber} 
                type='number'
                onChange={(e)=> {setPhoneNumber(e.target.value); setPhoneNumberError('')}}
                error={phoneNumberError.length > 0 ? true : false}
                helperText={phoneNumberError}
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
          </SubContainer>
        </Container>

        <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الدخول</Typography>
            </ProfileInfos>
          </ProfileHeader>
          
          <SubContainer>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البريد الإلكتروني</Typography>
              <TextField 
                style={{width: '100%'}} 
                placeholder='البريد الإلكتروني' 
                value={email} 
                onChange={(e)=> {setEmail(e.target.value); setEmailError('')}}
                error={emailError.length > 0 ? true : false}
                helperText={emailError}
              />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>كلمة المرور</Typography>
              <TextField 
                style={{width: '100%'}} 
                placeholder='كلمة المرور' 
                value={password} 
                onChange={(e)=> {setPassword(e.target.value); setPasswordError('')}}
                error={passwordError.length > 0 ? true : false}
                helperText={passwordError}
              />
            </ProfileDatas>
            
           
            
            <ProfileDatas style={{width: '100%'}} width={windowSize.width}>
              <Button onClick={()=> generatePassword(10)} variant='primary' endIcon={<Key style={{marginRight: '10px'}}/>} style={{alignSelf: 'end'}} >إنشاء كلمة مرور</Button>
            </ProfileDatas>
            
            <ProfileDatas width={windowSize.width}>
              <Notif>
                <SwitchIcon open={sendNotif} change={setSendNotif} />
                <ProfileDatas  width={100}>
                  <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>إرسال بيانات تسجيل الدخول</Typography>
                  <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>إرسال بيانات تسجيل الدخول عبر البريد الإلكتروني</Typography>
                </ProfileDatas>
              </Notif>
            </ProfileDatas>


          </SubContainer>
        </Container>
        
        {/* <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات العنوان</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البلد</Typography>
              <TextField style={{width: '100%'}} placeholder='البلد' />
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الولاية</Typography>
              <TextField style={{width: '100%'}} placeholder='الولاية' />
            </ProfileDatas>
          </SubContainer>
        </Container> */}

        {/* <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات البرنامج</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر البرنامج </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الحلقة</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر الحلقة</span> </MenuItem>
                        {sessions.map((session,index)=>(

                            <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
          </SubContainer>
        </Container> */}

        {/* <Container>
          <ProfileHeader  style={{marginBottom: '15px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={40} style={{margin: '0px 0px'}} />
            <ProfileInfos>
                <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl'}}>معلومات الاشتراك</Typography>
            </ProfileInfos>
          </ProfileHeader>
          <SubContainer style={{'flexDirection':'column'}}>
            <ProfileDatas  width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>البرنامج</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> إختر البرنامج </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            <ProfileDatas style={{'display':'flex',flexDirection:'row',alignItems:'center'}}  width={windowSize.width}>
              <ProfileDatas>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>تفعيل الإشتراك</Typography>
                <Notif onClick={()=> handleActivate()}>
                    <ProfileDatas style={{'display':'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}} width={100}>
                      <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', marginBottom: "10px", color: UISettings.colors.secondary}}>تفعيل إشتراك الطالب</Typography>
                        <SwitchIcon sx={{'marginRight':'10px'}}/>
                    </ProfileDatas>
                </Notif> 
              </ProfileDatas>    

              <ProfileDatas  width={windowSize.width}>
                <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "5px"}}>حالة الإشتراك</Typography>
                <Typography variant="p" sx={{'whiteSpace':'normal',padding:'6px',borderRadius:'5px', color: isSubscribed === true ? UISettings.colors.green : UISettings.colors.red, backgroundColor: isSubscribed === true ? UISettings.colors.greenBG : UISettings.colors.redBG}}>{isSubscribed === true ? 'الإشتراك مفعل' : ' الإشتراك غير مفعل'}</Typography>
              </ProfileDatas>   
            </ProfileDatas>
            
          </SubContainer>
        </Container> */}
        <LoadingButton loading={loadingCreate} loadingPosition='center' onClick={()=> createTeacher()} variant='primary' endIcon={<AddCircleOutlineOutlined/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:'white',color: loadingCreate ? 'transparent' : UISettings.colors.green,border:'1px solid' + UISettings.colors.green}} >إضافة معلم</LoadingButton>

    </Body>
  )
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

const Notif = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
`