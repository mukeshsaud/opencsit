import PyqContent from "@/component/PyqContent";
import { getAllQuestions } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { getUser } from "@/app/lib/getUser";
import {getAnswerByYear} from "@/app/lib/getAnswer"

export default async function page({params}){
const {sem,subject,year}=await params;
   
    
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const questions= await getAllQuestions(filteredsubject);
    const questionByyear= Object.groupBy(questions.questions , (q)=>q.year);
    const years=Object.keys(questionByyear).toReversed()
    

    if(!questionByyear[year])  notFound();
    const user=await getUser();

      const answers= await getAnswerByYear({coursecode:questions.code,year:year});
        console.log(answers)
 
    return(<>
        <PyqContent questions={questionByyear[year]} children={{coursecode:questions.code,title:questions.title ,sem:sem,year:year}} role={user?.role}  answers={answers}/>
    </>
    )
}