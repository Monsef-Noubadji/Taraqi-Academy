import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Typography } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@mui/material/styles';
import CustomPagination from './CustomPagination'
import ExamCard from './examCard'
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';


export const TeacherMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
      <div>
          <MoreVert onClick={handleClick} style={{ cursor: 'pointer' }} />
          <Menu
              sx={{direction:'rtl'}}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
          >
              <MenuItem >
                  <Link to={`/teacher/exams/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
                      <ListItemIcon sx={{'color':UISettings.colors.secondary}}>
                          <BadgeIcon />
                      </ListItemIcon>
                      <Typography variant="inherit">التفاصيل</Typography>
                  </Link>
              </MenuItem>
          </Menu>
      </div>
      
  );
};

export default function Exams({windowSize}) {

  const navigate = useNavigate()
  const sessions = [
    {id:0, name:"حلقة عمرو بن العاص"},
    {id:1, name:"حلقة عثمان بن عفان"},
    {id:2, name:"حلقة مصعب بن عمير"},
    {id:3, name:"حلقة طلحة بن عبيد الله"},

]

const programs = [
    {id:0, name:"برنامح الهمم"},
    {id:1, name:"برنامج التميز"},
    {id:2, name:"برنامح الأساس"},
]
  
  
  return (
    <Body>
        <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px'}}>إدارة الإمتحانات {">"} جميع الامتحانات</Typography>
        
        {/* CTA section */}
        <section className='flex flex-row-reverse items-center justify-between my-4 gap-2 w-full'>
                    <p>مجموع الإمتحانات : {rows.length} {rows.length > 11 ? 'إمتحانا' : 'إمتحانات'}</p>
                    <div className='flex items-center justify-center gap-3'>
                        <Button variant='primary' onClick={()=> navigate('/teacher/exams/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة إمتحان</Button>
                    </div>
        </section>
        <Title style={{ marginBottom: '10px'}}>
          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
          <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>إمتحانات تم برمجتها</Typography>
        </Title>
        
        <CardsContainer>
          <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={true} status={"scheduled"} date={'18 فيفري 2024'} width={windowSize.width} />
          <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={true} status={"scheduled"} date={'18 فيفري 2024'} width={windowSize.width} />
        </CardsContainer>
        
        <section className='flex flex-col md:flex-row-reverse lg:flex-row-reverse justify-center items-center w-full'>
        <Title style={{ marginBottom: '10px',width:'100%'}}>
          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
          <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>جميع الامتحانات</Typography>
        </Title>
          <div className='flex flex-col md:flex-row lg:flex-row w-full my-2 items-center gap-3 justify-center'>
          <FormControl dir="rtl" style={{width: "100%"}}>
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
              <MenuItem value={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.greenBG, color: UISettings.colors.green, borderRadius: "10px", float: 'right'}} >تم تصحيحه </span> </MenuItem>
              <MenuItem value={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> <span style={{width: 'max-content', padding: '3px 10px', backgroundColor: UISettings.colors.redBG, color: UISettings.colors.red, borderRadius: "10px", float: 'right'}} >لم يصحح</span> </MenuItem>
            </Select>
          </FormControl>

          <FormControl dir="rtl" style={{width: "100%"}}>
        <InputLabel id="program" > البرنامج </InputLabel>
            <Select
                dir="rtl"
                style={{paddingTop: "3px", paddingBottom: '3px'}}
                labelId="program"
                id="program"
                //value={age}
                label="البرنامج"
                defaultValue={'all'}
                //onChange={handleChange}
            >
                <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>الكل</span> </MenuItem>
                {programs.map((program,index)=>(

                    <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>{program.name}</span> </MenuItem>
                ))}
            </Select>
          </FormControl>
          </div>
        </section>


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

  { field: 'organiser', headerName: (<span>محرر الامتحان</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.organiser}</span> </>);}, },

  { field: 'start', headerName: 'تاريخ بداية الامتحان', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.start}</span> </>);}, },
  { field: 'end', headerName: 'تاريخ نهاية الامتحان', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.end}</span> </>);}, },
  { field: 'status', headerName: 'الحالة', width: 110, renderCell: (params) => {
      if(params.row.status === 'corrected'){
        return (
            <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم تصحيحه</span> </>
        );
      }else if(params.row.status === 'notCorrected'){
        return (
            <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم يصحح بعد</span> </>
        );
      }
    }, 
  },
  { field: 'result', headerName: 'النتيجة', minWidth: 110, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.result}</span> </>);}, },

  { 
    field: 'details', 
    headerName: 'التفاصيل', 
    width: 200, 
    renderCell: (params) => { 
        return (
            <TeacherMenu id={params.row.id} />
        );
    }, 
},
];

const rows = [
  { id: 1, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'corrected', result: '16/17' },
  { id: 2, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'corrected', result: '16/17' },
  { id: 3, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notCorrected', result: "--" },
  { id: 4, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'corrected', result: '16/17' },
  { id: 5, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'corrected', result: "18/20" },
  { id: 6, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notCorrected', result: "--" },
  { id: 7, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'corrected', result: "18/20" },
  { id: 8, title: 'الاختبار التفاعلي 1',organiser:'الأستاذ محمد علي', start: '02 فيفري 2024', end: '05 فيفري 2024', status: 'notCorrected', result: "--" },
];