import PyqContent from "@/component/PyqContent";
import { getAllQuestions } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function page({params}){
const {sem,subject,year}=await params;
   
    
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const questions= await getAllQuestions(filteredsubject);
    const questionByyear= Object.groupBy(questions.questions , (q)=>q.year);
    const years=Object.keys(questionByyear).toReversed()
    

    if(!questionByyear[year])  notFound();
 
    return(<>

        <PyqContent questions={questionByyear[year]} children={{coursecode:questions.code,title:questions.title ,sem:sem,year:year}}/>
    </>
    )
}