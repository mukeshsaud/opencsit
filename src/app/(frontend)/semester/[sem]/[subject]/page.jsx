
import { redirect } from "next/navigation"

export default async function page({params}){
    const {subject,sem}= await params;
   redirect(`/semester/${sem}/${subject}/syllabus`);
    return(
        <div className="flex flex-col gap-7">  
           
        </div>
    )
}