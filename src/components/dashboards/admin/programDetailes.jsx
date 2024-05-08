import styled from 'styled-components'
import UISettings from '../../../theme/UISettings'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBack, EditOutlined, ErrorOutlineOutlined } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import errorHandler from '../student/errorHandler'
import axiosInstance from '../student/axiosInstance'
import { ToastContainer,toast } from "react-toastify";


export default function Program({windowSize}) {
    const navigate = useNavigate()

    const [displayedProgram, setDisplayedProgram] = useState({});
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);

    const  id  = useParams();

    async function getProgram() {
        try {
            const response = await axiosInstance.post('/adminApi/getProgram', {id: id.id});
            console.log(response.data)
            if(response.data.response === 'done'){
              if(response.data.program){
                setDisplayedProgram(response.data.program)
                if(response.data.program && response.data.program.levelsDescription){
                  if(JSON.parse(response.data.program.levelsDescription)){
                    setSemesters(JSON.parse(response.data.program.levelsDescription))
                  }
                }
                setLoading(false)
                setStatus('')
              }else{
                setLoading(false)
                setStatus('notFound')
              }
            }else if (response.data.response === 'notFound'){
              setLoading(false)
              setStatus('notFound')
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
            getProgram()
          }
      }, []);

      const [status, setStatus] = useState('notFound');

      if(loading){
        return(
           <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <ToastContainer rtl="true"/>
               <CircularProgress style={{color: UISettings.colors.green}}/>
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>تحميل البيانات ....</Typography>
             </div>
           )
      }else if(status === 'notFound'){
        return(
           <div style={{height: "calc(100vh - 150px)", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <ToastContainer rtl="true"/>
               <ErrorOutlineOutlined style={{color: UISettings.colors.green, fontSize: '35px'}}/>
               <Typography variant="p" sx={{'fontFamily':'Cairo','fontWeight':'bold','direction':'rtl', marginBottom: '-25px', marginTop: '25px', color: UISettings.colors.secondary}}>لم يتم العثور على البرنامج</Typography>
             </div>
           )
      }else{
        return (
          <Body>
               <ToastContainer rtl="true"/>
              <Typography variant={windowSize.width > UISettings.devices.phone ?  "h5" : 'h6'} sx={{'fontFamily':'Cairo','fontWeight':800,'textWrap':'wrap','direction':'rtl', color: UISettings.colors.black, textAlign: 'start',marginBottom: '25px'}}><span onClick={()=> navigate('/admin/programs/all')} style={{cursor: 'pointer'}} >برامج الأكاديمية </span> <span> {">"} تفاصيل البرنامج  </span></Typography>
              <Box display={'flex'} alignItems={'center'} justifyContent={'start'} gap={'1rem'}>
                <Button variant='primary' onClick={()=> navigate('/admin/programs/all')} startIcon={<ArrowBack/>} style={{alignSelf: 'start'}} >العودة </Button>
                <Button variant='primary' onClick={()=> navigate('/admin/programs/'+id.id+'/edit')} startIcon={<EditOutlined/>} style={{alignSelf: 'start',color:UISettings.colors.green,backgroundColor:'white',border:'1px solid' + UISettings.colors.green}} >تعديل </Button>
              </Box>
              <Container>
                  <Info width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>عنوان البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width} style={{color: UISettings.colors.black, fontWeight: 600}}> 
                          <img src={'../../../../src/assets/titleStar.svg'} alt="academy_logo" width={"35"} style={{margin: '0px 0px', marginLeft: '10px'}} />
                        {displayedProgram.name}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>وصف البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.description}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>السن المقترح</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.age}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة البرنامج كاملا</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.duration}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة الدراسة الفعلية</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.studyDuration}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>مدة العطل و الامتحانات</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.vacationDuration}</InfosContent> 
                  </Info>
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>عدد المستويات</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.levels} مستويات</InfosContent> 
                  </Info>
                  {
                    semesters.map((semester, key)=>(
                      <Info key={key}  width={windowSize.width}>
                          <InfosTitle  width={windowSize.width}>{semester.name}</InfosTitle> 
                          <InfosContent  width={windowSize.width}>{semester.message}</InfosContent> 
                      </Info>
                    ))
                  }
                  <Info  width={windowSize.width}>
                      <InfosTitle  width={windowSize.width}>سعر البرنامج</InfosTitle> 
                      <InfosContent  width={windowSize.width}>{displayedProgram.price}.00 دج</InfosContent> 
                  </Info>
              </Container>
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
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #F3F3F3;
`

const Info = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: ${props => props.width > UISettings.devices.phone ? 'row-reverse' : 'column'};
  justify-content: start;
`

const InfosTitle = styled.div`
  width: ${props => props.width > UISettings.devices.phone ? '20%' : '100%'};
  min-width: 130px;
  border-left: ${props => props.width > UISettings.devices.phone ? '1px solid ' + UISettings.colors.secondary : 'none'};
  border-bottom: ${props => props.width > UISettings.devices.phone ? 'none' : '1px solid ' + UISettings.colors.secondary};
  text-align: end;
  padding: 10px;
`

const InfosContent = styled.div`
  width:${props => props.width > UISettings.devices.phone ? '80%' : '100%'};
  padding: 10px;
  text-align: end;
  color: ${UISettings.colors.secondary};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  direction: rtl;
`
