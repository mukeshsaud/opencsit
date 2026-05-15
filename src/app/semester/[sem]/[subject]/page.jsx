
import { redirect } from "next/navigation"

export default async function page({params}){
    const {subject,sem}= await params;
   redirect(`/semester/${sem}/${subject}/syllabus`);    //default redirect to syllabus
}