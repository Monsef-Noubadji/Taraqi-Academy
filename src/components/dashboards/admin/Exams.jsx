import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, CircularProgress, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Select, Typography } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@mui/material/styles';
import CustomPagination from './CustomPagination'
import ExamCard from './examCard'
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import errorHandler from '../student/errorHandler';
import axiosInstance from '../student/axiosInstance';
import { ToastContainer,toast } from "react-toastify";


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
                  <Link to={`/admin/exams/${id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center', textDecoration: 'none', color: 'inherit' }}>
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

    const [programs, setPrograms] = useState([]);
    const [groups, setGroups] = useState([]);

    const [exams, setExams] = useState([]);
    const [displayedExams, setDisplayedExams] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getExams() {
        try {
            const response = await axiosInstance.post('/adminApi/getExams');
            console.log(response.data)
            if(response.data.response === 'done'){
              setExams(response.data.exams)
              setDisplayedExams(response.data.exams)
              setPrograms(response.data.programs)
              setGroups(response.data.groups)
              setLoading(false)
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
            getExams()
          }
      }, []);

      const [selectedProgram, setSelectedProgram] = useState('all');
      const [selectedGroup, setSelectedGroup] = useState('all');
      const [changes, setChanges] = useState(0);
      useEffect(() => {
        var data = exams
        var dataAfterProgramFilter = []
        var finalData = []
        // program filter
        if(selectedProgram === 'all'){
          dataAfterProgramFilter = data
        }else{
          for (let i = 0; i < data.length; i++) {
            const exam = data[i];
            if(exam && exam.groups && exam.groups[0] && exam.groups[0].studyProgramId === selectedProgram ){
              dataAfterProgramFilter.push(exam)
            }
          }
        }
        // froup filter
        if(selectedGroup === 'all'){
          finalData = dataAfterProgramFilter
        }else{
          for (let i = 0; i < dataAfterProgramFilter.length; i++) {
            const exam = dataAfterProgramFilter[i];
            if(exam && exam.groups && exam.groups[0] && exam.groups[0].id === selectedGroup ){
              finalData.push(exam)
            }
          }
        }

        setDisplayedExams(finalData)
        setChanges(changes + 1)
      }, [selectedGroup, selectedProgram, exams]);

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
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px', marginTop: '-20px'}}>إدارة الإمتحانات {">"} جميع الامتحانات</Typography>
         <ToastContainer rtl="true"/>
          
          {/* CTA section */}
          {/* <section className='flex flex-row-reverse items-center justify-between my-4 gap-2 w-full'>
                      <p>مجموع الإمتحانات : {rows.length} {rows.length > 11 ? 'إمتحانا' : 'إمتحانات'}</p>
                      <div className='flex items-center justify-center gap-3'>
                          <Button variant='primary' onClick={()=> navigate('/admin/exams/new')} startIcon={<AddIcon sx={{'marginLeft':'10px'}}/>} >إضافة إمتحان</Button>
                      </div>
          </section> */}
          {/* <Title style={{ marginBottom: '10px'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>إمتحانات تم برمجتها</Typography>
          </Title> */}
          
          {/* <CardsContainer>
            <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={true} status={"scheduled"} date={'18 فيفري 2024'} width={windowSize.width} />
            <ExamCard title='الاختبار التفاعلي الخامس'  desc='الاختبار التفاعلي الخامس للمستوى الأول من برنامج الهمم' index='1' available={true} disabled={true} status={"scheduled"} date={'18 فيفري 2024'} width={windowSize.width} />
          </CardsContainer> */}
          
          <section className='flex flex-col md:flex-row-reverse lg:flex-row-reverse justify-center items-center w-full'>
          <Title style={{ marginBottom: '10px',width:'100%'}}>
            <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '40'} style={{margin: '0px 0px', marginLeft: '10px'}} />
            <Typography variant={windowSize.width > UISettings.devices.phone ? "h5" : 'h5'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start', flex: 1, minWidth: '250px', margin: '15px 0px'}}>جميع الامتحانات</Typography>
          </Title>
            <div className='flex flex-col md:flex-row lg:flex-row w-full my-2 items-center gap-3 justify-center'>
  

            <FormControl dir="rtl" style={{width: "100%"}}>
              <InputLabel id="session" > الحلقة </InputLabel>
              <Select
                  dir="rtl"
                  style={{paddingTop: "3px", paddingBottom: '3px'}}
                  labelId="session"
                  id="session"
                  //value={age}
                  label="الحلقة"
                  value={selectedGroup}
                  onChange={(e)=> setSelectedGroup(e.target.value)}
              >
                  <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>الكل</span> </MenuItem>
                  {groups.map((session,index)=>(
                      <MenuItem key={index} value={session.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span>{session.name}</span> </MenuItem>
                  ))}
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
                      value={selectedProgram}
                      onChange={(e)=> setSelectedProgram(e.target.value)}
                  >
                  <MenuItem selected value={'all'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>الكل</span> </MenuItem>
                  {programs.map((program,index)=>(
                      <MenuItem key={index} value={program.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}> <span style={{padding: '3px 10px'}}>{program.name}</span> </MenuItem>
                  ))}
              </Select>
            </FormControl>
  
        
            </div>
          </section>
  
  
          <div dir="rtl" style={{ height: 'calc(100vh - 230px)', width: '100%' }}>
            <DataGrid
              rows={displayedExams}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection={false}
              rowSelection={false}
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
  { field: 'title', headerName: (<span>العنوان</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.title}</span> </>);}, },

  { field: 'group', headerName: (<span>الحلقة</span>), width: 150, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.groups && params.row.groups[0] ? params.row.groups[0].name : '--'}</span> </>);}, },

  { field: 'start', headerName: 'تاريخ بداية الامتحان', width: 130, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.startExam ? params.row.startExam.split(' ')[0] : ''}</span> </>);}, },
  { field: 'end', headerName: 'تاريخ نهاية الامتحان', width: 130, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.endExam ? params.row.endExam.split(' ')[0] : '' }</span> </>);}, },
  { field: 'time', headerName: 'مدة الامتحان', width: 120, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.time ? params.row.time : '0'} دقيقة</span> </>);}, },
  { field: 'note', headerName: 'مجموع النقاط', width: 120, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.note}</span> </>);}, },
  // { field: 'status', headerName: 'الحالة', width: 110, renderCell: (params) => {
  //     if(params.row.status === 'corrected'){
  //       return (
  //           <><span style={{color: UISettings.colors.green, backgroundColor: UISettings.colors.greenBG, padding: '5px 10px', borderRadius: '10px'}}>تم تصحيحه</span> </>
  //       );
  //     }else if(params.row.status === 'notCorrected'){
  //       return (
  //           <><span style={{color: UISettings.colors.red, backgroundColor: UISettings.colors.redBG, padding: '5px 10px', borderRadius: '10px'}}>لم يصحح بعد</span> </>
  //       );
  //     }
  //   }, 
  // },
  { field: 'type', headerName: 'نوع الامتحان', width: 150, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.type === "levelUpExam" ? 'امتحان رفع المستوى' : 'امتحان' } </span> </>);}, },

  { 
    field: 'details', 
    headerName: '', 
    width: 50, 
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