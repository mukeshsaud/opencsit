


import {  getSubjectChapters,getNotes } from "@/app/lib/data";
import NotesContent from "@/component/NotesContent";
import { notFound } from "next/navigation";
import { getUser } from "@/app/lib/getUser";


export default async function page({params}){
    const {sem,subject,unit}=await params;
   
    const chapters= await getSubjectChapters(sem,subject);
   
    
    const filteredunit=chapters.chapters.filter((value)=> value.unit.toString() === unit)

    if(filteredunit.length!==1) notFound();

     const user=await getUser();
     
      const notes=await getNotes({coursecode:chapters.subjectcodefk},unit);
   

    return(
                  <NotesContent children={{sem,subject,unit,coursecode:chapters.subjectcodefk,notes}} role={user?.role}/>
           
    )
}
