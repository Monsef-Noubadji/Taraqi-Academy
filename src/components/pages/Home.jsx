import { Box, Container, Typography } from "@mui/material";
import landingPic from '../../assets/landing-picture.svg'
import SouthIcon from '@mui/icons-material/South';
import WestIcon from '@mui/icons-material/West';
import titleStar from '../../assets/titleStar.svg'
import valueIcon1 from '../../assets/valueIcon_1.svg'
import rightFrame from '../../assets/FrameRight.svg'
import leftFrame from '../../assets/FrameLeft.svg'
import star from '../../assets/Star.svg'
import { NavLink } from "react-router-dom";

const Home = () => {

    const programs = [
        {
            id:1,
            name:'برنامج الهمم',
            description:'برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة ثلاث سنوات.'
        },
        {
            id:2,
            name:'برنامج التميز',
            description:'برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة أربع سنوات.'
        },
        {
            id:3,
            name:'برنامج الأساس',
            description:'برنامج لحفظ القرآن الكريم كاملا مع التجويد  في مدة خمس سنوات.'
        },
    ]    

    return ( 
        <main className="bg-BackgroundWhite flex flex-col gap-32">

            {/* Hero Section */}
            <section
                className="flex flex-col pt-20 lg:pt-12 px-12 lg:flex-row items-center gap-6"
            >
                <img className="hidden lg:block" src={landingPic} alt="boy-reading-Quran" width={500} height={100} />
                <Box sx={{'display':'flex','flexDirection':'column','gap':'1rem','direction':'rtl'}}>
                    <Typography variant="h3" sx={{'fontFamily':'Cairo','fontWeight':600,'textWrap':'wrap','direction':'rtl','width':'80%'}}>أكاديمية الترقي لتعليم القرآن الكريم و علومه</Typography>
                    <Typography variant="p" sx={{'whiteSpace':'normal'}}>في أكاديميتنا  نستخدم عدة برامج نافعة بمناهج دراسية مرنة لتناسب مختلف الطلاب من جميع المستويات التعليمية.</Typography>
                    <Box sx={{'display':'flex','gap':4}}>
                    <NavLink to="register" className="btn-primary">سجل في الأكاديمية</NavLink>
                    <button className="btn-outline px-3 inline-flex gap-1">
                        <p>تعرف علينا أكثر</p>
                        <SouthIcon sx={{'width':'20px'}}/>
                    </button>
                    </Box>
                </Box>
            </section>

            {/* About us */}
            <Container maxWidth="lg" sx={{'display':'flex','flexDirection':'column','alignItems':'center','justifyContent':'center','gap':'3rem'}}>
                <section id="aboutUs" className="flex gap-2 items-center justify-center">
                    <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':600,'direction':'rtl'}}>تعرف على أكاديمية الترقي</Typography>
                    <img src={titleStar} alt="star_icon" width={40} height={40} />
                </section>
                <p className="text-center w-3/4 leading-7 text-paragraph">
                     هي مؤسسة تعنى بتعليم القرآن الكريم وعلومه، وتحفيظه لجميع الفئات. نقدم برامجًا شاملة ومتنوعة تحت إشراف أساتذة ومشرفين مؤهلين لتلبية احتياجات المتعلمين. تهدف أكاديمية الترقي إلى بناء الطلاب في مجالات تلاوة القرآن و التعليم و التزكية، ليصبحوا لبنة صالحة في أمتهم الإسلامية بإذن الله.
                </p>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-12">
                    <span className="flex relative flex-col gap-3 w-[17rem] h-[13rem] rounded-3xl drop-shadow-xl items-center justify-start bg-smokeWhite py-6">
                        <img className="absolute top-0 right-0 opacity-50" src={rightFrame} alt="right_frame" width={120} height={120} />
                        <img src={valueIcon1} alt="value_icon_1" width={65} height={65} />
                        <p className="paragraph text-center">توفير مدرسين ومرشدين مؤهلين لمساعدة الطلاب في رحلتهم لتعلم القرآن الكريم </p>
                    </span>

                    <span className="flex relative flex-col gap-3 w-[17rem] h-[13rem] rounded-3xl drop-shadow-xl items-center justify-start bg-smokeWhite py-6">
                        <img className="absolute top-0 left-0 opacity-50" src={leftFrame} alt="right_frame" width={120} height={120} />
                        <img src={valueIcon1} alt="value_icon_1" width={65} height={65} />
                        <p className="paragraph text-center">توفر المنصة برامجا متنوعة بمناهج دراسية مرنة لتناسب جميع الطلاب </p>
                    </span>

                    <span className="flex relative flex-col gap-3 w-[17rem] h-[13rem] rounded-3xl drop-shadow-xl items-center justify-start bg-smokeWhite py-6">
                        <img className="absolute top-0 right-0 opacity-50" src={rightFrame} alt="right_frame" width={120} height={120} />
                        <img src={valueIcon1} alt="value_icon_1" width={65} height={65} />
                        <p className="paragraph text-center">تحصيل الطالب لأهم العلوم المتعلقة بفهم القرآن الكريم مثل علم التدبر و التفسير </p>
                    </span>

                    <span className="flex relative flex-col gap-3 w-[17rem] h-[13rem] rounded-3xl drop-shadow-xl items-center justify-start bg-smokeWhite py-6">
                        <img className="absolute top-0 left-0 opacity-50" src={leftFrame} alt="right_frame" width={120} height={120} />
                        <img src={valueIcon1} alt="value_icon_1" width={65} height={65} />
                        <p className="paragraph text-center">حفظ القرآن الكريم كاملا أو أجزاء منه بالتجويد مع معرفة و حفظ  غريبه. </p>
                    </span>
                </section>
            </Container>

            {/* Programs */}
            <Container maxWidth="xl" sx={{'display':'flex','flexDirection':'column','alignItems':'center','justifyContent':'center','gap':'3rem'}}>
                <section className="flex gap-2 items-center justify-center">
                    <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':600,'direction':'rtl'}}>برامج الأكاديمية</Typography>
                    <img src={titleStar} alt="star_icon" width={40} height={40} />
                </section>

                <p className="text-center w-3/4 lg:w-1/2 paragraph">
                    تتنوع برامج الأكاديمية ما بين برامج لحفظ القرآن الكريم كاملا, وحفظ بعض السور أو الأجزاء منه مع اشتمالها جميعا على جوانب التلاوة، التزكية و التعليم 
                </p>

                <section className="flex w-full flex-col flex-wrap lg:flex-row-reverse items-center justify-center lg:justify-center gap-10 px-auto">
                    {programs.map((program,index) => (
                        <div key={program.id} className="flex flex-col drop-shadow-xl bg-white p-6 rounded-2xl items-end gap-3">
                            <span  className="flex items-start gap-4 w-[20rem] ">
                                <div className="flex flex-col items-end gap-4">
                                    <Typography variant="h5" sx={{'fontFamily':'Cairo','fontWeight':600,'direction':'rtl'}}>{program.name}</Typography>
                                    <p className="text-right w-full leading-7 text-paragraph">{program.description}</p>
                                </div>
                                <div className="relative inline-block">
                                    <img src={star} alt="star_icon" width={70} />
                                    <div className="absolute top-1 right-3.5 text-primaryGreen font-bold rounded-full text-2xl">{index+1}</div>
                                 </div>
                            </span>
                        <button className="btn-outline px-3 inline-flex gap-1">
                            <WestIcon sx={{'width':'20px'}}/>
                            <p>إقرأ المزيد</p>
                        </button>
                        </div>
                    )) }
                </section>

                <button className="btn-primary self-center inline-flex gap-1">
                    <WestIcon sx={{'width':'20px'}}/>
                    <p>إكتشف برامج أخرى</p>
                </button>
            </Container>

            {/* CTA Section */}
            <section className=" flex flex-col items-center justify-center gap-6 w-full h-56 text-center bg-tertiaryGreen">
                <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':800,'fontSize':'2.5rem','direction':'rtl','color':'white'}}>
                إنضم إلينا و كن من حفاظ كتاب الله تعالى 
                </Typography>
                <NavLink to="register" className="btn-outline bg-white border-white">سجل الآن</NavLink>
            </section>

            {/* How To Register Section */}
            <Container maxWidth="2xl" sx={{'display':'flex','flexDirection':'column','alignItems':'center','justifyContent':'center','gap':'1.5rem'}}>
                <section id="howToRegister" className="flex gap-2 items-center justify-center">
                    <Typography variant="h4" sx={{'fontFamily':'Cairo','fontWeight':600,'direction':'rtl'}}>كيفية التسجيل</Typography>
                    <img src={titleStar} alt="star_icon" width={40} height={40} />
                </section>
                <p className="text-center w-3/4 leading-7 text-paragraph">
                    عملية التسجيل في المنصة سهلة و بسيطة جدا و لن تستغرق وقتا طويلا.
                </p>

                <section className="w-full flex flex-col-reverse lg:flex-row items-start justify-evenly gap-12 mt-10">
                    <span className=" flex flex-col items-center justify-center gap-2">
                        <div className="relative inline-block">
                            <img src={star} alt="star_icon" width={55} />
                            <p className="absolute top-2.5 right-[1.3rem] text-primaryGreen font-bold rounded-full text-2xl">{4}</p>
                        </div>
                        <h3 className="text-center w-full lg:w-3/4 paragraph font-bold">
                                إبدأ رحلة التعلم في رحاب القرآن الكريم 
                        </h3>
                    </span>

                    <span className=" flex flex-col items-center justify-center gap-2">
                        <div className="relative inline-block">
                            <img src={star} alt="star_icon" width={55} />
                            <p className="absolute top-2.5 right-[1.3rem] text-primaryGreen font-bold rounded-full text-2xl">{3}</p>
                        </div>
                        <h3 className="text-center w-full lg:w-3/4 paragraph font-bold">
                            إدفع تكلفة البرنامج 
                        </h3>
                    </span>

                    <span className=" flex flex-col items-center justify-center gap-2">
                        <div className="relative inline-block">
                            <img src={star} alt="star_icon" width={55} />
                            <p className="absolute top-2.5 right-[1.3rem] text-primaryGreen font-bold rounded-full text-2xl">{2}</p>
                        </div>
                        <h3 className="text-center w-full lg:w-3/4 paragraph font-bold">
                        اختر البرنامج الذي يناسبك من صفحة البرامج تجدها  
                        <NavLink to={'programs'} className="text-primaryGreen font-bold"> هنا </NavLink>
                        </h3>
                    </span>

                    <span className=" flex flex-col items-center justify-center gap-2">
                        <div className="relative inline-block">
                            <img src={star} alt="star_icon" width={55} />
                            <p className="absolute top-2.5 right-[1.3rem] text-primaryGreen font-bold rounded-full text-2xl">{1}</p>
                        </div>
                        <h3 className="text-center w-full lg:w-3/4 paragraph font-bold">
                        قم بإنشاء حساب في منصتنا
                        </h3>
                    </span>
                </section>
            </Container>

        </main>
     );
}
 
export default Home;