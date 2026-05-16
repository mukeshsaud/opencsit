
import SyllabusClient from "@/component/SyllabusClient";
import { getAllData, getSubjectChapters } from "@/app/lib/data";

export default async function page({params}){
const {sem,subject}= await params;
    
   const s= await getSubjectChapters(sem,subject);



    return(
        <div className="flex flex-col pt-5 md:p-10 ">  
            <div className=' shadow-[0_0_10px_rgba(0,0,0,0.5)] p-3 md:p-10'>

            <SyllabusClient s={s} children={{sem,subject}}/>

            </div>
        </div>
    )
}