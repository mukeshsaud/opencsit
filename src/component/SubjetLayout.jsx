"use client";
import { FaQuestionCircle } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { LuNotebookPen } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const skeletonArray=[{name:"Syllabus",icon:FiBookOpen},{name:"Notes",icon:LuNotebookPen},{name:"PastQuestions",icon:FaQuestionCircle},{name:"Youtube",icon:FaYoutube}]

export default function SubjetLayout({params})
{
  const pathName=usePathname();


    return(
            <div className="w-full flex justify-center">
                <div className=" w-fit flex text-xs gap-3 md:text-base md:gap-10 justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] px-5 py-2 rounded">
                {skeletonArray.map((skeleton)=>
                { const Icon=skeleton.icon;
                    const href=`/semester/${params.sem}/${params.subject}/${skeleton.name.toLowerCase()}`
                    const isActive= pathName.startsWith(href);
                    return(
                        <Link  href={href} key={skeleton.name} >
                        
                            <div className={`flex items-center gap-2 hover:text-[#0088FF] ${isActive ? 'text-[#0088FF] border-b-2':'text-black'}`}
                            >
                                <span> <Icon /></span>
                                <span>{skeleton.name}</span>
                            </div>
                          
                        </Link>
                    )
                }
               
                )}
                </div>
            </div>
         
           
    )


}

