'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function PyqYear({years,params}){
        const pathname=usePathname();
        
       
    return(
                    <>
       
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
                   
                    </>
    )

}