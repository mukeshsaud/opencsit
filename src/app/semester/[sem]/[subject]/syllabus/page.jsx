
import { notFound } from 'next/navigation';
import SyllabusClient from "@/component/SyllabusClient";
import { getAllData } from "@/app/lib/data";

export default async function page({params}){

    
    const syllabus1=await getAllData();
  
    const {subject,sem}= await params;
   
    const filteredsubject=`${subject.replaceAll("-"," ")}`
    const filteredSyllabus =syllabus1.filter((s)=> s.subjects.title.toLowerCase()===filteredsubject && s.subjects.semesters.name===sem )


   if(filteredSyllabus.length!==1)
    {notFound();}   //404

   const s=filteredSyllabus[0];    //final syllabus list of one subject
  


    return(
        <div className="flex flex-col pt-5 md:p-10 ">  
            <div className=' shadow-[0_0_10px_rgba(0,0,0,0.5)] p-3 md:p-10'>

            <SyllabusClient s={s} children={{sem,subject}}/>

            </div>
        </div>
    )
}