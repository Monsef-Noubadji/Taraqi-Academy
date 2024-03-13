import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useRoutes, Outlet } from 'react-router-dom';
import UISettings from '../../../theme/UISettings';

const AllStudents = () => {

    return (
        <main style={{'direction':'rtl',padding:'1rem'}}>
            <Typography variant='h5' fontWeight={800}>{'إدارة الطلاب > جميع الطلاب'}</Typography>
            <section className='flex flex-col items-start justify-center mt-20 gap-4'>
                <Typography variant='h7' fontWeight={700}>حدد طلاب الحلقة المراد عرضها</Typography>
                <FormControl dir="rtl" style={{width: "350px"}}>
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
            </section>
        </main>
    );
};

export default AllStudents;
