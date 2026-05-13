import { CgAirplane } from "react-icons/cg";
import { FaBookMedical } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function Subjects({children}){
   const subjecttitle=`${children.title}`.replaceAll(" ","-")
    return(
        <Link className="flex flex-col gap-3 h-fit w-[60vw] md:w-[40vw] shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded p-2 cursor-pointer"
             href={`/semester/${children.sem}/${subjecttitle.toLowerCase()}`}   >
            <h3 className="font-bold text-xl md:text-2xl ">{children.title}</h3>
            <p className="hidden md:block">{children.description}</p>
            <div className="flex gap-2 md:gap-5">
                <span className="flex text-xs md:text-lg gap-1 items-center"><FaBookMedical className="text-base"/><span> {children.code}</span></span>
                <span className="flex text-xs md:text-lg gap-1 items-center"><FaBookOpen /><span>Chapter: {children.chapter}</span></span>
            </div>
            <hr/>
            <button className="flex items-center self-end px-5 py-2 bg-[#c4b5fd] rounded cursor-pointer
            hover:shadow-xl text-xs md:text-lg ">explore <CgAirplane /></button>

        </Link>
    )
}