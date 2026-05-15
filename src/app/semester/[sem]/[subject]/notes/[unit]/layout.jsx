
import { getAllData } from "@/app/lib/data";
import NotesWrapper from "@/component/NotesWrapper";
import { notFound } from "next/navigation";


export default async function layout({children,params}){
    const {sem,subject,unit}=await params;
   
    const unitdb= await getAllData();
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const filteredsubject1=unitdb.filter((value)=> value.subjects.semesters.name===sem && value.subjects.title.toLocaleLowerCase()===filteredsubject )


    if(filteredsubject1.length!==1 )
        notFound();

   
    const filteredsubject2=filteredsubject1[0].chapters;
    const filteredunit=filteredsubject2.filter((value)=> value.unit.toString() === unit)

    if(filteredunit.length!==1)
        notFound();

    return(
       <div className="flex flex-col pt-5 mr-1 md:mx-4 ">  
        <div className="flex gap-2">
                    <NotesWrapper chapters={filteredsubject2} params={{sem,subject,unit}}/>
         
            </div>
           
        </div>
    )
}
