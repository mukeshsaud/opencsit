


import {  getSubjectChapters } from "@/app/lib/data";
import NotesContent from "@/component/NotesContent";
import { notFound } from "next/navigation";


export default async function page({params}){
    const {sem,subject,unit}=await params;
   
    const chapters= await getSubjectChapters(sem,subject);
    const filteredunit=chapters.chapters.filter((value)=> value.unit.toString() === unit)

    if(filteredunit.length!==1) notFound();

    return(
                  <NotesContent/>
           
    )
}
