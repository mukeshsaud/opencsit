
import { semesters } from "../data/semester";
import Navbar from "@/component/Navbar";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-4 pt-0 h-fit">
            <Navbar heading='Pick your semester' slug="Explore syllabus, notes,and question papers."/>
     
     
     <div className="flex justify-center ">
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  ">
      {
        semesters.map((semester)=>{
          const Icon=semester.icon;
          const Subject=semester.subjects;
          return(
          <Link key={semester.name} className={`h-20 ${semester.color} w-[40vw] md:w-60 lg:w-70 rounded 
          flex items-center  md:gap-5 gap-2 pl-1 pr-1 md:pl-5 cursor-pointer hover:bg-[#0088FF] hover:text-white`} 
          href={`semester/${semester.name}`} >
          <Icon  className="text-[30px] md:text-[50px]"/>
          <div>
          <div className=" whitespace-nowrap text-sm md:text-lg lg:text-xl"> {semester.name} semester</div>
          <span className="text-xs md:text-sm ">{Subject} subjects </span>
          </div>
          </Link>)
          })
          
      }
      </div>
      </div>
    </div>
  );
}
