
import { redirect } from "next/navigation";

export default async function page({params}){
    const {sem,subject}= await params;
  redirect(`/semester/${sem}/${subject}/notes/1`)
}