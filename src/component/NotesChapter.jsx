'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function NotesChapter({chapters,params,active}){
        const pathname=usePathname();
       
    return(

        <div className={`w-fit shadow-[0_0_10px_rgba(0,0,0,0.9)] p-4  ${active?'hidden':'flex  flex-col gap-2'} `}>
                    { 
                        chapters.map((chapter)=>
                        { 
                            const href=`/semester/${params.sem}/${params.subject}/notes/${chapter.unit}`
                            const  notesClicked= pathname===href;
                            
                        return( <Link className={`w-[100px] text-xs md:w-[250px] md:text-base border-l-8 rounded-md
                            h-fit py-5 px-4 flex items-center ${notesClicked ?' border-[#c4b5fd] bg-[#c4b5fd]':' border-[#c4b5fd]  bg-gray-300'} `}
                             key={chapter.unit} href={href}
                            >
                        <span>{chapter.title}</span>
                        </Link>
                        )}
                        )
                    }
                   
        </div>
    )

}