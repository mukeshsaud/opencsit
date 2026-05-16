// import NotesPygLayout from "@/component/NotesPyqLayout"

// export default async function layout({ children, params }) {
//   const { sem, subject, unit } = await params

//   return (
//     <>
//       <script dangerouslySetInnerHTML={{ __html: `
//         window.MathJax = {
//           tex: {
//             inlineMath: [['\\\\(', '\\\\)']],
//             displayMath: [['\\\\[', '\\\\]']]
//           },
//           startup: { typeset: false }
//         };
//       `}} />
//       <script
//         src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
//         async
//       />

      
//           {/* <MathText content="\(\sqrt{3 - x}\)" /> */}
//        {/* <span ref={ref} className="whitespace-pre-line">{content}</span> */}

    
//         <NotesPygLayout />
//         {children}
//     </>
//   )
// }


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
      
                 
                    <NotesPyqLayout 
                    sidebar={<PyqYear years={years}  params={{sem,subject}} />}
                    > 
                  {children}
    
                  </NotesPyqLayout>

         
           
    )
}
