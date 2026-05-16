    'use client';
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NotesPyqLayout({sidebar,children}){
    // export default function NotesChapter({chapters,params,active}){
        const [active,sectActive]=useState(false)
    return(
    <>
     <div className="flex flex-col pt-5 mr-1 md:mx-4  gap-5">  
    <div className="flex gap-2">

                 <div className={`w-fit shadow-[0_0_10px_rgba(0,0,0,0.9)] p-4  ${active?'hidden':'flex  flex-col gap-2'} `}>

                  {sidebar}

                 </div>
        

        <div className='flex flex-col  gap-4 shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-full'>

            <div className=' shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-2 h-4 flex items-center justify-center '
            onClick={()=>sectActive(!active)} >
            <span ><RxHamburgerMenu className="text-2xl"/> </span>
            </div>

            <div className="">
               {children}
            </div>

         </div>

                     
    </div>   
    </div>
       
</>
    )

}
       
  