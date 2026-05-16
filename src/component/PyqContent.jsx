'use client';
import { ChevronDown } from "lucide-react";
import { useState } from "react";


export default function PyqContent({questions,children}){
    const [open,setOpen]=useState({});
    const toggle=(qno)=>setOpen(prev=>({...prev,[qno]:!prev[qno]}))
{/* <PyqContent questions={questionByyear[year]} children={{coursecode:questions.code,title:questions.title ,sem:sem,year:year}}/> */}
return(
    

<div key={children.code} className='flex flex-col gap-7 p-5'>

         <div className='text-lg md:text-2xl font-bold text-center'>
          <p >Tribhuvan University</p>
          <p>Institute of Science and Technology</p>
          <p className="font-medium text-base md:text-xl">{children.year}</p>
         </div>


         <div className='flex flex-col gap-4'>

        <div className='flex flex-col'>
         <div className='flex justify-between  whitespace-nowrap md:text-xl'><span> 
             <span className=''>Bachelor Level/ </span> <span>{children.sem}&nbsp;Semester</span> 
             </span>
             <span>
             <span className='md:text-lg'>Full Marks: </span> <span>60</span>
             </span>
         </div>

                       
        <div className='  md:flex md:justify-between '>
            <span className=' text-lg  md:text-xl'> 
            <span>({children.title}) </span> <span >{children.coursecode}</span>
            </span> 
            <span className=' text-sm md:text-lg'>
                <span >Pass Marks: </span> <span>24</span>
            </span>
        </div >
        </div>
        
         
             <div className='  text-lg '>Candidates are required to give their answers in their own words as for as practicable.</div>
        

         <div className='flex flex-col gap-3'>
            <div>
             <div className='font-bold text-2xl mb-3 underline text-center'>Section A</div>
             <span className="font-semibold text-xl">Attempt any TWO questions.</span>
             </div>

             <div className='flex flex-col gap-7 '>
                 {questions.map((question)=>
                 <div key={question.qno} className=' cursor-pointer    ' onClick={()=>toggle(question.qno)}>
                    {question.qno==4 &&
                     <div className="pb-5 hover:text-black">
                        <div className='font-bold text-2xl mb-3 underline text-center '>Section B</div>
                        <span className="font-semibold text-xl">Attempt any EIGHT questions.</span>
                        </div>
                        }
                     <div className='flex  text-base md:text-lg  justify-between hover:text-red-500' onClick={()=>setOpen(!open)} >
                        <span className=" flex">
                         <span>{question.qno}.&nbsp;&nbsp;&nbsp;</span><span >{question.content}</span> 
                       </span>
                       <div><ChevronDown className={`transition-transform duration-300 ${open[question.qno] ? 'rotate-180' : ''}`} /></div>
                     </div>

                    {
                            open[question.qno]&&(
                                <div>hlo</div>
                            )
                        }

                     </div>
                     )}
                 </div>
             </div>
     </div>
</div>
                  
)
}
 {/* <Link className='text-xs md:text-base hover:text-[#058aff]' href={`/semester/${children.sem}/${children.subject}/notes/${chapter.unit}`}>
                         {chapter.description}
                     </Link> */}