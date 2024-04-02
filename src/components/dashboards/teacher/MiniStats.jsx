import Typography from '@mui/material/Typography'
const MiniStats = ({bgColor,color,icon,title,number}) => {
    return ( 

        <section className="flex flex-col items-center justify-center shadow-lg w-full md:w-44 lg:w-44 rounded-lg gap-2 p-4 bg-white">

            {/* header */}
            <div className='flex items-center justify-end gap-2 md:gap-1 lg:gap-0'>
                <p className=' w-full md:w-24 lg:w-24'>{title}</p>
                {/* icon */}
                <div className="flex items-center justify-center p-2 rounded-md" style={{'color': color,backgroundColor:bgColor}}>
                   {icon}
                </div>
                
            </div>

            {/* number */}
            <Typography variant="h4" fontWeight={800} sx={{color:color}}>{number}</Typography>
        </section>
     );
}
 
export default MiniStats;