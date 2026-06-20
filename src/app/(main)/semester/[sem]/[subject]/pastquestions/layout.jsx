
      
//           {/* <MathText content="\(\sqrt{3 - x}\)" /> */}
//        {/* <span ref={ref} className="whitespace-pre-line">{content}</span> */}

import { getAllData, getAllQuestions } from "@/app/lib/data";
import { notFound } from "next/navigation";
import NotesPyqLayout from "@/component/NotesPyqLayout";
import PyqYear from "@/component/PyqYear";



export default async function layout({children,params}){
    const {sem,subject}=await params;
   
    
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const questions= await getAllQuestions(filteredsubject);
    const questionByyear= Object.groupBy(questions.questions , (q)=>q.year);
    const years=Object.keys(questionByyear).toReversed()

    if(questions.title.toLowerCase()!==filteredsubject)
        notFound();

    return(
        <>

                    <NotesPyqLayout 
                    sidebar={<PyqYear years={years}  params={{sem,subject}} />}
                    > 
                  {children}
    
                  </NotesPyqLayout>

         </>
    )
}
