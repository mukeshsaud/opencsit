    'use client';
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";



export default function NotesPyqLayout({sidebar,children}){
        const [active,setActive]=useState(false);
     
      
    return(
    <>
     <div className="flex flex-col pt-5 mr-1 md:mx-4  gap-5">  
    <div className="flex gap-2">

                 <div className={`w-fit min-w-[120px] md:min-w-[282px] shadow-[0_0_10px_rgba(0,0,0,0.9)] p-4 sticky top-0 h-screen overflow-y-auto  ${active?'hidden':'flex  flex-col gap-2'} `}>

                  {sidebar}

                 </div>
        

        {/* <div className='flex flex-col  gap-4 shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-full '> */}
        <div className='block  gap-4 shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-full '>

            <div className='sticky top-0  flex items-center justify-between bg-white w-full  '
             >
            <span className="shadow-[0_0_10px_rgba(0,0,0,0.5)] w-fit p-1 md:p-5 h-4 mt-2  flex items-center cursor-pointer "
            onClick={()=>setActive(!active)} >
                <RxHamburgerMenu className="text-2xl"/>
             </span>
                
             
            </div>

            <div className="mt-4">
               {children}
            </div>

         </div>

                     
    </div>   
    </div>
       
</>
    )

}
       
  