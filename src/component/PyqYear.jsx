'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


export default function PyqYear({years,params,role}){
        const pathname=usePathname();
        const [question,setQuestion]=useState(false)
        const [newYear,setNewYear]=useState(null);
        const questionSubmit=async()=>{
            console.log(newYear);
                const res= await fetch("/api/newquestionpaper",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({newYear:newYear,courseCode:params.code})
                })
                const data=await res.json()
                console.log(data);
        }
       
    return(
                    <>
                        {
                        role==='admin' &&
                        (
                            <button className="text-end text-bold text-2xl cursor-pointer" onClick={()=>setQuestion(!question)}>+</button>
                        )
                                }

                    { 
                    
                        years.map((year)=>
                        { 
                            const href=`/semester/${params.sem}/${params.subject}/pastquestions/${year}`
                            const  notesClicked= pathname===href;
                            
                        return( <Link className={`w-[100px] text-xs md:w-[250px] md:text-base border-l-8 rounded-md
                            h-fit py-5 px-4 flex items-center ${notesClicked ?' border-[#c4b5fd] bg-[#c4b5fd]':' border-[#c4b5fd]  bg-gray-300'} `}
                             key={year} href={href}
                            >
                        <span>Question Paper {year}</span>
                        </Link>
                        )}
                        )
                    }
                   
                   {
                    role==='admin' && question &&
                    (
                        <div className={`w-[100px] text-xs md:w-[250px] md:text-base border-l-8 rounded-md
                            h-fit py-5 px-4 flex items-center  `}
                            >
                        <span>Question Paper
                             <input type="text" placeholder="year" className="w-10 md:w-30  border" onChange={(e)=>setNewYear(e.target.value)}/>
                         <button className="rounded px-3 py-2 border-[#c4b5fd] bg-[#c4b5fd]"  onClick={questionSubmit}>post</button></span>
                        </div>
                    )
                   }
                    </>
    )

}