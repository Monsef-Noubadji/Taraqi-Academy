import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import AdvancedAlert from './advancedAlert'
import { SaveAltOutlined, Upload } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import CustomPagination from './CustomPagination'
import ExamCard from './examCard'



export default function Exams({windowSize}) {

  
  
  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px'}}>امتحاناتي {">"} جميع الامتحانات</Typography>
        
        <Title style={{ marginBottom: '10px'}}>
          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
          <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>امتحانات لم تنجز بعد</Typography>
        </Title>
        
        <CardsContainer>
          <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={false} status={"notStarted"} date={'18 فيفري 2024'} width={windowSize.width} />
          <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={false} status={"started"} date={'18 فيفري 2024'} width={windowSize.width} />
        </CardsContainer>
        
        <Title style={{ marginBottom: '10px'}}>
          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
          <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>جميع الامتحانات</Typography>
          <FormControl dir="rtl" style={{width: "150px"}}>
            <InputLabel id="demo-simple-select-label"> الحالة </InputLabel>
            <Select
              dir="rtl"
              style={{paddingTop: "0px", paddingBottom: '0px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="الحالة"
              defaultValue={0}
              //onChange={handleChange}
            >
              <MenuItem selected value={0} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الكل</span> </MenuItem>
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم إنجازه </span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >لم ينتهي</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم ينجز</span> </MenuItem>
            </Select>
          </FormControl>

          <FormControl dir="rtl" style={{width: "180px"}}>
            <InputLabel id="demo-simple-select-label"> فلترة المتحانات </InputLabel>
            <Select
              dir="rtl"
              style={{paddingTop: "0px", paddingBottom: '0px', marginRight: '10px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="فلترة المتحانات"
              defaultValue={0}
              //onChange={handleChange}
            >
              <MenuItem selected value={0} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >كل الامتحانات</span> </MenuItem>
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الامتحانات الأحدث</span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >الامتحانات الأقدم</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{width: 'max-content', padding: '3px 10px', borderRadius: "10px", float: 'right'}} >امتحانات نهاية المستوى</span> </MenuItem>
            </Select>
          </FormControl>
          {/* <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<SaveAltOutlined/>} >تحميل الفاتورة</Button> */}
        </Title>
        <div dir="rtl" style={{ height: 370, width: '100%' }}>
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

      

    </Body>
  )
}





const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px 0px;
  background-image: url('./../../../../src/assets/lightStar.svg');
  background-position: -80px 0px;
  background-size: 300px;
  background-repeat: no-repeat;

`
const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
`
const CardsContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
`


const arabicTheme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        components: {
          Pagination: CustomPagination,
        },
      },
    },
  },
});

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px', // Adjust margin as needed
    marginTop: '10px', // Adjust margin as needed
    width: '100%'
  },
};




const columns = [
  { field: 'title', headerName: (<span>عنوان الامتحان</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.title}</span> </>);}, },
  { field: 'start', headerName: 'تاريخ بداية الامتحان', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.start}</span> </>);}, },
  { field: 'end', headerName: 'تاريخ نهاية الامتحان', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.end}</span> </>);}, },
  { field: 'status', headerName: 'الحالة', width: 200, renderCell: (params) => {
      if(params.row.status === 'finished'){
        return (
            <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم إنجازه</span> </>
        );
      }else if(params.row.status === 'notStarted'){
        return (
            <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم ينجز</span> </>
        );
      }else if(params.row.status === 'started'){
        return (
            <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>لم ينتهي</span> </>
         );
      }
    }, 
  },
  { field: 'result', headerName: 'النتيجة', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.result}</span> </>);}, },
];

const rows = [
  { id: 1, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 2, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 3, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notStarted', result: "--" },
  { id: 4, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: '16/17' },
  { id: 5, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 6, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 7, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 8, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 10, title: 'الاختبار التفاعلي 1', start: ' فيفري 2025', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 20, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 30, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notStarted', result: "--" },
  { id: 40, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 50, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 60, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', result: "--" },
  { id: 70, title: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'finished', result: "18/20" },
  { id: 80, type: 'الاختبار التفاعلي 1', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'started', amount: "--" },
];