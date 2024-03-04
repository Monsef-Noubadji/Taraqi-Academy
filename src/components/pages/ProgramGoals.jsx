import { Typography } from "@mui/material";
import starPattern from '../../assets/lightStar.svg'
import titleStar from '../../assets/titleStar.svg'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import star from '../../assets/Star.svg'
import rightFrame from '../../assets/FrameRight.svg'
import leftFrame from '../../assets/FrameLeft.svg'
const ProgramGoals = () => {

    const goals = [
        {
            id:1,
            description:'حفظ القرآن الكريم كاملا مع التجويد.'
        },
        {
            id:2,
            description:'حفظ الكلمات الغريبة في القرآن الكريم.'
        },
        {
            id:3,
            description:'الاطلاع على تفسير القرآن الكريم كاملا بطريقة ميسرة.'
        },
        {
            id:4,
            description:'حفظ أهم المنظومات التي يحتاجها طالب القرآن الكريم من التحفة والجزرية والدرر اللوامع.'
        },
        {
            id:5,
            description:'تحصيل الطالب لأهم العلوم المتعلقة بفهم القرآن الكريم من علم التدبر والتفسير ومناسبات السور ومقاصد سور القرآن ومهارات التفسير.'
        },
        {
            id:6,
            description:'تزويد الطالب بمقدمات أساسية في علوم الآلة خدمة لكتاب الله عز وجل من نحو وصرف بلاغة بطريقة ميسرة بحيث يمكنه مواصلة الطريق بعدها للتخصص أكثر.'
        },
        {
            id:7,
            description:'بناء الطالب إيمانيا وسلوكيا حتى يكون شعار الطالب أخذ القرآن مع الإيمان, فلا بد للقرآن من حمل صالح حتى يكون الغرس مثمرا ويؤتي أكله.'
        },
        {
            id:8,
            description:'إنارة الطالب بسيرة الحبيب محمد صلى الله عليه و سلم, ومعرفة حقوقه علينا, فهو الرحمة المهداة الذي جاءنا بهذا النور العظيم من رب العالمين سبحانه.'
        },
    ]

    return ( 
        <main className="flex flex-col items-center justify-center pt-12"
        >
            <section className="flex flex-col items-center justify-center relative py-12 h-60 w-full"
                style={{ backgroundImage: `url(${starPattern})`,backgroundSize:'cover', backgroundPosition: 'center', backgroundRepeat:'repeat-x' }}
            >
                <Typography sx={{fontSize: {
                        xs: '1.5rem', // Custom font size for extra small screens
                        sm: '2rem',   // Default font size for small screens and above
                        },}} variant="h4" fontWeight={700} textAlign={'center'}>أهداف برامج أكاديمية الترقي
                </Typography>

            </section>
            {/*  breadcrumb */}
            <section className="flex items-end mt-12 w-full justify-end px-12">
            <Breadcrumbs aria-label="breadcrumb" style={{'fontSize':'.9rem',direction:'rtl'}}>
            <Link
                  underline="hover"
                  color="inherit"
                  to={'/'}
                  >
                  الرئيسية
                </Link>
                <Link underline="hover" color="inherit" to={"list"}>
                برامج الأكاديمية
                </Link>
                <Typography style={{'fontSize':'.9rem'}}>أهداف البرامج </Typography>
            </Breadcrumbs>
            </section>

            {/* Goals */}
            <section id="Goals" className="flex flex-col gap-5 mt-20 items-center justify-center">
                <div className="flex gap-2 mt-12 items-center justify-center">
                    <Typography variant="h4" sx={{
                        fontSize: {
                        xs: '1.5rem', // Custom font size for extra small screens
                        sm: '2rem',   // Default font size for small screens and above
                        },'fontFamily':'Cairo','fontWeight':700,'direction':'rtl','alignSelf':'center'}} >تعرف على أهداف برامجنا
                    </Typography>
                    
                    <img src={titleStar} alt="star_icon" width={40} height={40} />
                </div>
                <p className=" text-paragraph rtl:text-lg" style={{'direction':'rtl'}}>تهدف الأكاديمية من خلال برامجها المختلفة إلى :</p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-24 px-20 md:px-12 lg:px-12" style={{"direction":'rtl'}}>
               {goals.map((goal,index) => (
                 <span key={index} className="flex flex-col relative h-76 items-center justify-stretch  gap-4 drop-shadow-xl bg-white rounded-xl px-6 py-8">
                    <img src={leftFrame} alt="left_frame"  className="absolute top-0 left-0 opacity-35"/>
                    <img src={rightFrame} alt="right_frame" className="absolute top-0 right-0 opacity-35" />
                    <span className="relative">
                        <img src={star} alt="star_icon" width={60} />
                        <div className="absolute top-2.5 right-5 text-primaryGreen font-bold rounded-full text-3xl">{goal.id}</div>
                    </span>
                    <p className="text-paragraph text-center leading-7">{goal.description}</p>
                </span>
               ))}
            </section>
        </main>
     );
}
 
export default ProgramGoals;