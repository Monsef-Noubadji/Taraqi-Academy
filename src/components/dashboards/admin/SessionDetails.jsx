import { Button, FormControl, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { useState } from "react";
import { Save } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const SessionDetails = ({windowSize}) => {
    const [isSubscribed,setIsSubscribed] = useState(false)
    const programs = [
        {id:0, name:"الأستاذ ياسين"},
        {id:1, name:"الأستاد محمد دليحر"},
        {id:2, name:"الأستاذة خولة"},
    ]

    const duration = [
        {id:0, name:"سنتين"},
        {id:1, name:" ثلاث سنوات"},
        {id:2, name:"أربع سنوات"},
      ]

      const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
      const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
      const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
      const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
      const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  
    const width = isXs ? '100%' : isSm ? '100%' : isMd ? '100%' : isLg ? '100%' : isXl ? '60%' : '80%';
    return ( 
        <Body>
            <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span style={{cursor: 'pointer'}} >إدارة الحلقات </span> <span> {">"} حلقة الفردوس   </span></Typography>
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
              <TextField style={{width: '100%'}} defaultValue={'حلقة الفردوس'} placeholder='إسم الحلقة' />
            </ProfileDatas>
            <ProfileDatas width={windowSize.width}>
              <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}>الأستاذ المسؤول</Typography>
              <FormControl dir="rtl" style={{width: "100%"}}>
                    <Select
                        dir="rtl"
                        style={{paddingTop: "0px", paddingBottom: '0px'}}
                        id="program"
                        //value={age}
                        defaultValue={'all'}
                        //onChange={handleChange}
                    >
                        <MenuItem selected disabled value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span> الأستاذ العيد عبود </span> </MenuItem>
                        {programs.map((program,index)=>(

                            <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{program.name}</span> </MenuItem>
                        ))}
                    </Select>
              </FormControl>
            </ProfileDatas>
            <ProfileDatas>
            <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', marginBottom: "10px"}}> إختر طلاب الحلقة</Typography>
              <div dir="rtl" style={{ height: 370, width: width }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection
                  componentsProps={{
                    pagination: { style: {
                      direction: 'ltr'
                    }},
                  }}
                />
              </div>
            </ProfileDatas>
          </SubContainer>
          <Button  variant='primary' endIcon={<Save/>} style={{alignSelf: 'left', width: "fit-content",backgroundColor:UISettings.colors.green,color:'white',border:'1px solid' + UISettings.colors.green}} >حفظ التعديلات</Button>
            </Container>
        </Body>
     );
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
      minWidth: 100, 
      flex: 1, 
      renderCell: (params) => { 
          return (
            <span style={{color: UISettings.colors.secondary}}>{params.row.name}</span>
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
    field: 'plantype', 
    headerName: 'نوع الإشتراك', 
    width: 250, 
    renderCell: (params) => { 
        return (
          <span style={{color: UISettings.colors.secondary}}>{params.row.plantype}</span>
        );
    }, 
},
];


const rows = [
  { id: 1, name: 'عبد الإله', email: 'noubadjimonsef@gmail.com', plantype: 'اشتراك شهري' },
  { id: 2, name: 'محمد', email: 'mohammed@example.com', plantype: 'اشتراك سنوي' },
  { id: 3, name: 'فاطمة', email: 'fatima@example.com', plantype: 'اشتراك شهري' },
  { id: 4, name: 'علي', email: 'ali@example.com', plantype: 'اشتراك سنوي' },
  { id: 5, name: 'خديجة', email: 'khadija@example.com', plantype: 'اشتراك شهري' },
  { id: 6, name: 'يوسف', email: 'youssef@example.com', plantype: 'اشتراك شهري' },
  { id: 7, name: 'نور', email: 'nour@example.com', plantype: 'اشتراك سنوي' },
  { id: 8, name: 'أمينة', email: 'amina@example.com', plantype: 'اشتراك سنوي' },
  { id: 9, name: 'عبد الرحمن', email: 'abdelrahman@example.com', plantype: 'اشتراك شهري' },
  { id: 10, name: 'مريم', email: 'maryam@example.com', plantype: 'اشتراك سنوي' },
  { id: 11, name: 'ياسين', email: 'yassine@example.com', plantype: 'اشتراك شهري' },
  { id: 12, name: 'ريم', email: 'reem@example.com', plantype: 'اشتراك سنوي' },
  { id: 13, name: 'عمر', email: 'omar@example.com', plantype: 'اشتراك شهري' },
  { id: 14, name: 'رضا', email: 'reda@example.com', plantype: 'اشتراك شهري' },
  { id: 15, name: 'سارة', email: 'sara@example.com', plantype: 'اشتراك سنوي' },
  { id: 16, name: 'أحمد', email: 'ahmed@example.com', plantype: 'اشتراك شهري' },
  { id: 17, name: 'ليلى', email: 'laila@example.com', plantype: 'اشتراك سنوي' },
  { id: 18, name: 'عماد', email: 'imad@example.com', plantype: 'اشتراك سنوي' },
  { id: 19, name: 'مهدي', email: 'mahdi@example.com', plantype: 'اشتراك شهري' },
  { id: 20, name: 'أميرة', email: 'amira@example.com', plantype: 'اشتراك سنوي' },
  { id: 21, name: 'عبد الوهاب', email: 'abdulwahab@example.com', plantype: 'اشتراك شهري' },
  { id: 22, name: 'نادية', email: 'nadia@example.com', plantype: 'اشتراك سنوي' },
  { id: 23, name: 'حسين', email: 'hussein@example.com', plantype: 'اشتراك شهري' },
  { id: 24, name: 'زينب', email: 'zeinab@example.com', plantype: 'اشتراك سنوي' },
  { id: 25, name: 'خالد', email: 'khaled@example.com', plantype: 'اشتراك شهري' },

];