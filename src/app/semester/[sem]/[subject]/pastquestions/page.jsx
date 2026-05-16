
import { redirect } from "next/navigation";
import { getAllQuestions } from "@/app/lib/data";

export default async function page({params}){
    const {sem,subject}=await params;
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const questions= await getAllQuestions(filteredsubject);
    const questionByyear= Object.groupBy(questions.questions , (q)=>q.year);
    const years=Object.keys(questionByyear).toReversed()
    redirect(`/semester/${sem}/${subject}/pastquestions/${years[0]}`)  //redirect to top year

}