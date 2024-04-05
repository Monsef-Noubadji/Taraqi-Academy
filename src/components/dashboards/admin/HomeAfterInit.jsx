import React from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Typography } from '@mui/material'
import { AutoStoriesOutlined, DeleteOutline, LinkOffOutlined, OpenInBrowserOutlined, OpenInNewOutlined, RouteOutlined } from '@mui/icons-material'
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { DataGrid } from "@mui/x-data-grid";
import { BarChart } from '@mui/x-charts/BarChart';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import 'dayjs/locale/ar'; // Import the Arabic locale for dayjs
import MiniStats from './MiniStats'
import { Link } from 'react-router-dom'


dayjs.locale('ar');
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <p style={{fontSize: '30px', color: 'orange', margin: '0px', padding: '0px'}}>.</p> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

const columns = [
  { field: 'teacher', headerName: (<span>إسم الأستاذ</span>), minWidth: 150, flex: 1, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.teacher}</span> </>);}, },
  { field: 'email', headerName: 'البريد الإلكتروني', width: 200, renderCell: (params) => { return (<><span style={{color: UISettings.colors.secondary}}>{params.row.email}</span> </>);}, },

  { field: 'id', headerName: ' الإعدادات', width: 200, renderCell: (params) => { return (
  <div className='flex gap-2 items-center justify-center'>
    <Link to={`/admin/teachers/${params.row.id}`} style={{color: UISettings.colors.green,backgroundColor:UISettings.colors.greenBG,padding:'.5rem',borderRadius:'7px',cursor:'pointer'}}><OpenInNewOutlined/></Link>
    <span onClick={()=>{alert(params.row.id)}} style={{color: UISettings.colors.red,backgroundColor:UISettings.colors.redBG,padding:'.5rem',borderRadius:'7px',cursor:'pointer'}}><DeleteOutline/></span>
   </div>);}, },

];

const rows = [
  { id: 1, teacher: 'العيد عبود', email: 'teacher1@gmail.com' },
  { id: 2, teacher: 'ياسين عبود', email: 'teacher2@gmail.com' },
  { id: 3, teacher: 'العيد عبود', email: 'teacher3@gmail.com' },
  { id: 4, teacher: 'العيد عبود', email: 'teacher4@gmail.com' },
  { id: 5, teacher: 'العيد عبود', email: 'teacher5@gmail.com' },

];



export default function HomeAfterInit({windowSize}) {

    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  
    const fetchHighlightedDays = (date) => {
      const controller = new AbortController();
      fakeFetch(date, {
        signal: controller.signal,
      })
        .then(({ daysToHighlight }) => {
          setHighlightedDays([5,10,15]);
          setIsLoading(false);
        })
        .catch((error) => {
          // ignore the error if it's caused by `controller.abort`
          if (error.name !== 'AbortError') {
            throw error;
          }
        });
  
      requestAbortController.current = controller;
    };
  
    React.useEffect(() => {
      fetchHighlightedDays(initialValue);
      // abort request on unmount
      return () => requestAbortController.current?.abort();
    }, []);
  
    const handleMonthChange = (date) => {
      if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
      }
  
      setIsLoading(true);
      setHighlightedDays([]);
      fetchHighlightedDays(date);
    };

    const statistics = [
      {
        title:'عدد الطلاب المسجلين',
        icon:<SchoolIcon/>,
        color:UISettings.colors.green,
        bgColor:UISettings.colors.greenBG,
        number:1200
      },
      {
        title:'عدد أساتذة الأكاديمية ',
        icon:<SupervisorAccountIcon/>,
        color:UISettings.colors.brown,
        bgColor:UISettings.colors.brownBG,
        number:200
      },
      {
        title:'عدد البرامج المتاحة',
        icon:<RouteOutlined/>,
        color:UISettings.colors.orange,
        bgColor:UISettings.colors.orangeBG,
        number:1200
      },
    ]

    const availablePrograms = [
      {
        name:'برنامج الهمم',
        desc:'عدد المسجلين يفوق 100 طالب'
      },
      {
        name:'برنامج التميز',
        desc:'عدد المسجلين يفوق 300 طالب'
      },
      {
        name:'برنامج الأساس',
        desc:'عدد المسجلين يفوق 400 طالب'
      },
    ]

    const availableExams = [
      {
        desc:'الإمتحان التفاعلي الأول - حلقة الأستاذ العيد عبود'
      },
      {
        desc:'الإمتحان التفاعلي الرابع - حلقة الأستاذ ياسين عبود'
      },
      {
        desc:'الإمتحان التفاعلي الثالث - حلقة الأستاذ منصف عبد الإله'
      },
      {
        desc:'الإمتحان التفاعلي الثاني - حلقة الأستاذ مختار اعبود'
      },

    ]
  
  return (
    <Body>
      <Container width={windowSize.width}>
        <SubContainer style={{}} >
          <Box sx={{
              display:'flex',
              flexDirection:{
                xs:'column',
                sm:'row',
                md:'row',
                lg:'row',
                xl:'row'
              },
              width:{
                xs:'100%',
                sm:'100%',
                md:'auto',
                lg:'auto',
                xl:'auto'
              },
              paddingX:{
                xs:'2rem',
                sm:'2rem',
                md:'0rem',
                lg:'0rem',
                xl:'0rem'
              },
              justifyContent:'space-evenly',
              alignItems:'start',
              gap:'1rem',
          }} >
            {statistics && statistics.map((stat,index)=>(
              <MiniStats key={index} title={stat.title} icon={stat.icon} color={stat.color} bgColor={stat.bgColor} number={stat.number} />
            ))}
          </Box> 

              <Element style={{display:'flex',flexDirection:'column',justifyContent:'end',alignItems:'center',padding:'10px 10px 10px 10px', margin: '20px 0px', border: '1px solid #F3F3F3', borderRadius: '20px', width: '100%'}}>
                <Typography variant="h6" style={{'direction':'rtl'}}>
                 عدد الطلاب المسجلين في برامج الاكاديمية هذا الأسبوع
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['برنامج الهمم', 'برنامج التميز', 'برنامح الأساس', 'برنام0ح الأساس', 'برنا1مح الأساس', 'برنامح الأسا2س', '3برنامح الأساس'] }]}
                  series={[{ data: [4, 3, 5, 2 ,45,6,58] }]}
                  // width={'100%'}
                  height={300}
                  style={{width: '100%'}}
                />
              </Element>
                <Element style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', padding:'10px 10px 10px 10px', margin: '10px 0px', border: '1px solid #F3F3F3', borderRadius: '20px'}}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'end', marginBottom: '10px'}}>
                      <img src={'./../../../../src/assets/titleStar.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "35" : '30'} style={{margin: '0px 0px'}} />
                      <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '0px',marginRight:'10px'}}>الأساتذة المسجلين حديثا</Typography>
                    </div>
                    <DataGrid
                    style={{width: "100%"}}
                    sx={{'direction':'rtl'}}
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      checkboxSelection={false}
                      pageSize={5}
                      rowsPerPageOptions={[1]}
                      componentsProps={{
                        pagination: { style: {
                          direction: 'ltr'
                        }},
                      }}
                      rowSelection={false}
                    />
             
                </Element>
          
        </SubContainer>
        <SubContainer1 >
        <Box display={'flex'} style={{ border: '1px solid #F3F3F3', borderRadius: '20px', padding: '20px'}} flexDirection={'column'} gap={3} sx={{'backgroundColor':'#fff',width:'100%',paddingX:{
              xs:'4rem',
              sm:'2rem',
              md:'0rem',
              lg:'0rem',
              xl:'0rem'
            }}} >
          <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'direction':'rtl'}}> قائمة البرامج المتاحة </Typography>

            {availablePrograms && availablePrograms.map((program,index)=>(
              <Element key={index}>
                <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <RouteOutlined/> </Typography>
                <ElementVertical>
                    <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>{program.name}</Typography>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>{program.desc}</Typography>
                </ElementVertical>
              </Element>
            ))}
            </Box>

                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DateCalendar
                       style={{width: '100%', border: '1px solid #F3F3F3', borderRadius: '20px 20px 0px 0px', borderBottom: 'none', padding: '20px 10px 0px 10px', margin: '20px 0px'}}
                        defaultValue={initialValue}
                        loading={isLoading}
                        onMonthChange={handleMonthChange}
                        renderLoading={() => <DayCalendarSkeleton />}
                        slots={{
                        day: ServerDay,
                        }}
                        slotProps={{
                        day: {
                            highlightedDays,
                        },
                        }}
                    />
                </LocalizationProvider>
                <Box display={'flex'} flexDirection={'column'} sx={{'backgroundColor':'#fff'}} style={{border: '1px solid #F3F3F3', borderRadius: '0px 0px 20px 20px', borderTop: 'none', padding: '0px 10px 20px 10px', marginTop: '-20px'}} >
            {availableExams && availableExams.map((exam,index)=>(
              <Element key={index}>
                <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '12px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <ChecklistRtlIcon/> </Typography>
                <ElementVertical>
                    <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>{exam.desc}</Typography>
                </ElementVertical>
              </Element>
            ))}
            </Box>
        </SubContainer1>
      </Container>

      
        
       
    </Body>
  )
}

const Body = styled.div`
    background-image: url('./../../../../src/assets/lightStar.svg');
    background-position: -80px 0px;
    background-size: 300px;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 20px;
`


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'} ;
    justify-content: space-between;
    align-items: ${props => props.width > UISettings.devices.phone ? 'start' : 'center'} ;
    `

const SubContainer = styled.div`
    background-color: white ;
    width:${props => props.width > UISettings.devices.phone ? 'calc(40% - 10px)' : 'calc(100% - 10px)'} ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 20px;
    border: 0px solid #F3F3F3;
    margin-top: 10px;
    padding:${props => props.width > UISettings.devices.phone ? '10px' : '10px 0px'} ;

`
const SubContainer1 = styled.div`
    background-color: white ;
    width:${props => props.width > UISettings.devices.phone ? 'calc(60% - 10px)' : 'calc(100% - 10px)'};
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 20px;
    border: 0px solid #F3F3F3;
    margin-top: 10px;
    padding:${props => props.width > UISettings.devices.phone ? '10px' : '10px 0px'} ;
    margin: ${props => props.width > UISettings.devices.phone ? '10px 0px 0px 0px' : '10px 20px'};
`

const Element = styled.div`
    width: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-bottom: 10px;
    background-color:'#FFF';
`
const ElementVertical = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
`


