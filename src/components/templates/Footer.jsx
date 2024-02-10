import footerFrame from '../../assets/footerFrame.svg'
import phone from '../../assets/phone.svg'
import pin from '../../assets/pin.svg'
import mail from '../../assets/mail.svg'
import { NavLink } from 'react-router-dom'
import '../../styles/footerLink.css'
import logo from '../../assets/logo.svg'
const Footer = () => {
    return ( 
        <footer
        id='contactUs'
         className=" flex flex-col w-full mt-52 h-full lg:h-[30rem] pb-1 relative bg-white text-black items-center justify-center py-6 text-lg"
         style={{boxShadow:'0 -3px 20px -1px rgba(0, 0, 0, 0.2)'}}
         >
            {/* side frames */}
            <img src={footerFrame} alt="footer_frame" width={"45px"} height={'auto'} className='absolute top-0 -left-4 md:left-2 lg:left-2'/>
            <img src={footerFrame} alt="footer_frame" width={"45px"} height={'auto'} className='absolute hidden md:block lg:block top-6 left-14'/>
            <img src={footerFrame} alt="footer_frame" width={"45px"} height={'auto'} className='absolute top-0 -right-4 md:right-2 lg:right-2'/>
            <img src={footerFrame} alt="footer_frame" width={"45px"} height={'auto'} className='absolute hidden md:block lg:block top-6 right-14'/>
            
            <section className='flex flex-col-reverse gap-12 md:flex-col-reverse lg:flex-row w-full h-full'>

                <div className='flex flex-col md:flex-row items-end md:items-start lg:items-start justify-start lg:flex-row w-auto'>
                    {/* contact infos */}
                    <section className='grid grid-cols-1 grid-rows-5 justify-items-end items-center gap-2 md:gap-1 lg:gap-1 pl-40 pr-24  h-4/5'>
                    <h2 className='font-bold text-2xl'>تواصل معنا</h2>
                    <span className='flex gap-1 items-center justify-center'>
                        <a href='tel:0799782760' className="footerLink">0799782760</a>
                        <img src={phone} alt="phone_icon" width={20} />
                    </span>

                    <span className='flex gap-2 items-center justify-center'>
                        <a href='mailto:info@taraqiacademy.com' className="footerLink">info@taraqiacademy.com</a>
                        <img src={mail} alt="mail_icon" width={20} />
                    </span>

                    <span className='flex gap-2 items-center justify-center'>
                        <a href='https://maps.google.com' className="footerLink">مثال عن العنوان</a>
                        <img src={pin} alt="pin_icon" width={20} />
                    </span>
                    </section>

                    {/* website links */}
                    <section className='grid grid-cols-1 grid-rows-5 gap-2 md:gap-1 lg:gap-1 px-24 justify-items-end items-center h-4/5'>
                    <h2 className='font-bold text-2xl'>أهم الروابط</h2>
                    <span className='flex gap-2 items-center justify-center'>
                        <a href='#' className="footerLink">تعرف علينا</a>
                    </span>

                    <span className='flex gap-2 items-center justify-center'>
                        <NavLink to={"/"} className="footerLink">الرئيسية</NavLink>
                    </span>

                    <span className='flex gap-2 items-center justify-center'>
                        <NavLink to={'programs'} className="footerLink">برامج الأكاديمية</NavLink>
                    </span>

                    <span className='flex gap-2 items-center justify-center'>
                        <a href='https://maps.google.com' className="footerLink">كيفية التسجيل</a>
                    </span>
                    </section>
                </div>

                <section className='flex flex-col items-end justify-start w-full md:w-full lg:w-2/5 px-16 md:px-32 lg:px-0 lg:pr-24 gap-4'>
                    <img src={logo} alt="academy_logo" width={130} />
                    <p style={{'direction':'rtl'}} className='text-paragraph text-base leading-7'> هي مؤسسة تعنى بتعليم القرآن الكريم وعلومه، وتحفيظه لجميع الفئات. نقدم برامجًا شاملة ومتنوعة تحت إشراف أساتذة ومشرفين مؤهلين لتلبية احتياجات المتعلمين. تهدف أكاديمية الترقي إلى بناء الطلاب في مجالات تلاوة القرآن و التعليم و التزكية، ليصبحوا لبنة صالحة في أمتهم الإسلامية بإذن الله.</p>
                </section>

            </section>
            <p className='text-paragraph text-base mt-12 md:mt-12 lg:mt-0'>جميع الحقوق محفوظة © 2024 </p>
        </footer>
     );
}
 
export default Footer;