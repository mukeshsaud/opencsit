"use client";
import { FaQuestionCircle } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { LuNotebookPen } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const skeletonArray=[{name:"Syllabus",icon:FiBookOpen},{name:"Notes",icon:LuNotebookPen},{name:"PastQuestions",icon:FaQuestionCircle},{name:"Youtube",icon:FaYoutube}]

export default function Layout({children,params})
{
  const {sem,subject}= use(params);
  console.log(sem,'me')
  const pathName=usePathname();

    return(
        <div>
            <div className="flex gap-10 justify-center items-center">
                {skeletonArray.map((skeleton)=>
                { const Icon=skeleton.icon;
                    const href=`/semester/${sem}/${subject}/${skeleton.name.toLowerCase()}`
                    const isActive= pathName===href;
                    return(
                        <Link  href={href} key={skeleton.name}
                            >
                            
                            <div className={`flex items-center gap-2 hover:text-[#0088FF] ${isActive ? 'text-[#0088FF]':'text-black'}`}
                            >
                                <span> <Icon /></span>
                                <span>{skeleton.name}</span>
                            </div>
                          
                        </Link>
                    )
                }
               
                )}
            </div>
            {children}
        </div>
         
           
    )


}

