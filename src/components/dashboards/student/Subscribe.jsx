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


export default function Subscribe({windowSize}) {
  return (
    <Body>
        <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}>اشتراكاتي</Typography>
        <AdvancedAlert text={'تذكير باقتراب دفع اشتراك الشهر القادم فقد تبقى 10 أيام على انتهاء الاشتراك الحالي'} title={"تذكير بدفع الاشتراك"} />
        <Title style={{ marginBottom: '10px'}}>
          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
          <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>جميع الاشتراكات</Typography>
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
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم الدفع</span> </MenuItem>
              <MenuItem value={11} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.brownBG, color: UISettings.colors.brown, borderRadius: "10px", float: 'right'}} >فترة إضافية</span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يدفع</span> </MenuItem>
            </Select>
          </FormControl>
          <Button variant='primary' style={{backgroundColor: 'white', border: '1px solid ' + UISettings.colors.green, color: UISettings.colors.green, marginRight: '10px'}} startIcon={<SaveAltOutlined/>} >تحميل الفاتورة</Button>
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
  { field: 'type', headerName: (<span>نوع الاشتراك</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.type}</span> </>);}, },
  { field: 'month', headerName: 'الشهر', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.month}</span> </>);}, },
  { field: 'paymentDate', headerName: 'تاريخ دفع الاشتراك', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.paymentDate}</span> </>);}, },
  { field: 'status', headerName: 'الحالة', width: 200, renderCell: (params) => {
      if(params.row.status === 'payed'){
        return (
            <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم الدفع</span> </>
        );
      }else if(params.row.status === 'notPayed'){
        return (
            <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم يدفع</span> </>
        );
      }else if(params.row.status === 'snoozed'){
        return (
            <><span style={{color: UISettings.colors.brown, backgroundColor: UISettings.colors.brownBG, padding: '5px 10px', borderRadius: '10px'}}>فترة إضافية</span> </>
         );
      }
    }, 
  },
  { field: 'amount', headerName: 'المبلغ المستحق', minWidth: 200, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.amount}</span> </>);}, },
];

const rows = [
  { id: 1, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 2, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 3, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
  { id: 4, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 5, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 6, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 7, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 8, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 10, type: 'اشتراك شهري', month: ' فيفري 2025', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 20, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 30, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'notPayed', amount: "2000" },
  { id: 40, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 50, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 60, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
  { id: 70, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'snoozed', amount: "2000" },
  { id: 80, type: 'اشتراك شهري', month: ' فيفري 2024', paymentDate: '05 فيفري 2024', status: 'payed', amount: "2000" },
];