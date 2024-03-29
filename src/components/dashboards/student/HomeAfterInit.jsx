import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Button, Typography } from '@mui/material'
import { AutoStoriesOutlined, KeyboardArrowLeft } from '@mui/icons-material'
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import 'dayjs/locale/ar'; // Import the Arabic locale for dayjs
import Tafseer from '../../../../public/tafseer'
dayjs.locale('ar');
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
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



export default function HomeAfterInit({windowSize, student}) {

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
    const [myTafseer, setMyTafseer] = useState({});
    function findTafseer(){
      const myRandom = Math.floor(Math.random() * 11); // Generate a random integer between 0 and 12
      var content = Tafseer.find((item) => item.id === myRandom);
      if(content){
        setMyTafseer(content);
      }
    }
    useEffect(() => {
      findTafseer()
    }, []);
  
  return (
    <Body>
        <WelcomeMessage>
            <Typography variant= {windowSize.width > UISettings.devices.phone ? "h5" : 'h4'} sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl','width':'90%', color: 'white', textAlign: 'center', marginBottom: '20px'}}>السلام عليكم و رحمة الله و بركاته {student.firstName} </Typography>
            <Typography variant="p" sx={{'whiteSpace':'normal', color: 'white', textAlign: 'center'}}>توكل على الله و لنبدأ رحلة التعلم </Typography>
        </WelcomeMessage>
        <Container width={windowSize.width}>
            {/* <SubContainer1 width={windowSize.width}>
                <Element>
                    <img src={'../../../../src/assets/valueIcon2.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "50" : '40'} style={{margin: '0px 0px'}} />
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>مقررات اليوم / الأسبوع</Typography>
                </Element>
                <Element>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <AutoStoriesOutlined/> </Typography>
                    <ElementVertical>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>مقرر حفظ القرآن الكريم </Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>الطريق إلى القرآن من الصفحة 15 إلى الصفحة 25</Typography>
                    </ElementVertical>
                </Element>
                <Element>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <AutoStoriesOutlined/> </Typography>
                    <ElementVertical>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>مقرر حفظ القرآن الكريم </Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>حلقة حفظ القرآن الكريم مع الأستاذ اسم الأستاذ</Typography>
                    </ElementVertical>
                </Element>
                <Element>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <AutoStoriesOutlined/> </Typography>
                    <ElementVertical>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>مقرر حفظ القرآن الكريم </Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>حلقة حفظ القرآن الكريم مع الأستاذ اسم الأستاذ</Typography>
                    </ElementVertical>
                </Element>
                <Element>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px'}}> <AutoStoriesOutlined/> </Typography>
                    <ElementVertical>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>مقرر حفظ القرآن الكريم </Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>حلقة حفظ القرآن الكريم مع الأستاذ اسم الأستاذ</Typography>
                    </ElementVertical>
                </Element>
            </SubContainer1>  */}

            <SubContainer1 width={windowSize.width}>
                <Element>
                    <img src={'../../../../src/assets/valueIcon2.svg'} alt="academy_logo" width={windowSize.width > UISettings.devices.phone ? "50" : '40'} style={{margin: '0px 0px'}} />
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>بلاغة القرآن</Typography>
                </Element>
                <Element>
                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.brown, textAlign: 'center',marginLeft: '10px', padding: '15px', backgroundColor: UISettings.colors.brownBG, borderRadius: '10px', alignSelf: 'start', display: windowSize.width > UISettings.devices.phone ? 'flex' : 'none'}}> <AutoStoriesOutlined/> </Typography>
                    <ElementVertical>
                        <Typography variant="h6" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '5px'}}>الوقفات التدبرية</Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>{ myTafseer.content }</Typography>
                        <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':400,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.secondary, textAlign: 'start',marginBottom: '5px'}}>المصدر: { myTafseer.source }</Typography>
                        <Button style={{alignSelf: 'start'}} variant={"primary"} onClick={findTafseer} startIcon={<KeyboardArrowLeft/>} >التالي</Button>
                    </ElementVertical>
                </Element>
            </SubContainer1> 
            <SubContainer width={windowSize.width}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DateCalendar
                       style={{width: '100%'}}
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
            </SubContainer> 
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
const WelcomeMessage = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${UISettings.colors.darkGreen};
    border-radius: 20px;
    background-image: url('./../../../../src/assets/lightStar.svg');
    background-repeat: space;
    background-size: 30%;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'} ;
    justify-content: space-between;
    align-items: start;
    `

const SubContainer = styled.div`
    background-color: white ;
    width:${props => props.width > UISettings.devices.phone ? 'calc(40% - 10px)' : 'calc(100% - 10px)'} ;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 20px;
    border: 1px solid #F3F3F3;
    margin-top: 10px;
    padding: 10px;
`
const SubContainer1 = styled.div`
    background-color: white ;
    width:${props => props.width > UISettings.devices.phone ? 'calc(60% - 10px)' : 'calc(100% - 10px)'};
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 20px;
    border: 1px solid #F3F3F3;
    margin-top: 10px;
    padding: 10px;
`

const Element = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
    margin-bottom: 10px;
`
const ElementVertical = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
`


