'use client';
import { ChevronDown } from "lucide-react";
import { useState,useEffect,useRef } from "react";
import MathContent from "./MathContent";
import Image from "next/image";
import { getEditorConfig } from "../../editorConfig";


export default function PyqContent({questions,children,role,answers}){
    const [open,setOpen]=useState({});
    const [everOpened, setEverOpened] = useState({});
    const [edit,setEdit]=useState(
        ()=>Object.fromEntries(questions.map(q=>[q.qno,false]))
    );
   
    const toggle=(qno)=>{
           setEverOpened(prev => ({ ...prev, [qno]: true })); // mark as ever opened, never reset
             setOpen(prev=>({...prev,[qno]:!prev[qno]}));
            
    }
    const edittoggle=(qno)=>{
         setEdit(prev=>({...prev,[qno]:!prev[qno]}));

    }
    const editorsRef = useRef({}); 
{/* <PyqContent questions={questionByyear[year]} children={{coursecode:questions.code,title:questions.title ,sem:sem,year:year}}/> */}

    const initEditor = async (qno) => {

        if (editorsRef.current[qno]) return; // ← already exists, user can still type/edit

        editorsRef.current[qno] = true;

    const EditorJS=(await import('@editorjs/editorjs')).default;
    const config=await getEditorConfig({data:{slug:'answer',year:children.year,coursecode:children.coursecode,qno,sem:children.sem}});
    const existingData=answers[qno-1]?.answer;

    editorsRef.current[qno] = new EditorJS({
      holder: `editorjs-${children.coursecode}${children.year}${qno}`, // unique id per question
      placeholder: 'Start writing...',
      data: {blocks:existingData}, // {data:{blocks: [{ type: 'paragraph', data: { text: 'sfas' } }]}}
      ...config,
    });
};


const handleSave = async (qno) => {
  const {blocks} = await editorsRef.current[qno].save();
  console.log(editorsRef.current[qno]);

  const res= await fetch("/api/answer",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({blocks,coursecode:children.coursecode,year:children.year,qno:qno})
  })
   
  const data=await res.json();
  console.log(data);

  console.log(`course code: ${children.coursecode} year: ${children.year} Q${qno} data:`, blocks,typeof(blocks),'s');
 
};

return(
    <>
<div key={children.code} className='flex flex-col gap-7 p-5'>
         <div className='text-lg md:text-2xl font-bold text-center'>
          <p >Tribhuvan University</p>
          <p>Institute of Science and Technology</p>
          <p className="font-medium text-base md:text-xl">{children.year}</p>
         </div>


         <div className='flex flex-col gap-4'>

        <div className='flex flex-col'>
         <div className='flex justify-between  text-sm sm:text-xl'>
            <span> 
             <span className=''>Bachelor Level/ </span> <span>{children.sem}&nbsp;Semester</span> 
             </span>
             <span className='text-sm  sm:text-xl'>
             <span >Full Marks: </span> <span>60</span>
             </span>
         </div>

                       
        <div className='  flex justify-between '>
            <span className=' text-sm  sm:text-xl'> 
            <span>({children.title}) </span> <span >{children.coursecode}</span>
            </span> 
            <span className=' text-sm sm:text-lg'>
                <span >Pass Marks: </span> <span>24</span>
            </span>
        </div >
        </div>
        
         
             <div className='  text-lg '>Candidates are required to give their answers in their own words as for as practicable.</div>
        

         <div className='flex flex-col gap-3'>
            <div>
             <div className='font-bold text-2xl mb-3 underline text-center'>Section A</div>
             <span className="font-semibold text-xl">Attempt any TWO questions.</span>
             </div>

             <div className='flex flex-col gap-7 '>
                 {questions.map((question)=>{
                
                return( <div key={question.qno} className=' cursor-pointer    ' >
                    {question.qno==4 &&
                     <div className="pb-5 ">
                        <div className='font-bold text-2xl mb-3 underline text-center '>Section B</div>
                        <span className="font-semibold text-xl">Attempt any EIGHT questions.</span>
                        </div>
                        }
                     <div className={`flex  text-base md:text-lg  justify-between `} >
                        <span className=" flex flex-col">
                            <div className="flex" onClick={()=>toggle(question.qno)}>
                         <span >{question.qno}.&nbsp;&nbsp;&nbsp;</span>

                         <span><MathContent content={question.content} /></span>
                         </div>
                         {
                            question.type==='image' &&(
                                <div className="self-center">
                                    <br/>
                            <Image src={question.src} width={300} height={250} alt='image'/>
                           
                            </div>
                            )
                         }
                       </span>
                       {/* <div><ChevronDown className={`transition-transform duration-300 ${open[question.qno] ? 'rotate-180 ' : ''}`} /></div> */}
                     </div>
                        
                      {role==='admin' &&
                      everOpened[question.qno] &&
                    (
                                <div  className={open[question.qno] ? 'block' : 'hidden'}>
                                    <div className="flex justify-end gap-5 ">
                                        <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                        px-3 py-2 rounded text-white cursor-pointer" onClick={()=>edittoggle(question.qno)}><span>✏️</span><span>edit</span> </button>
                                        <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                        px-3 py-2 rounded text-white cursor-pointer" onClick={() => handleSave(question.qno)}><span>💾</span><span>save</span></button>
                                    </div>
                                    
                                        <div
                                  id={`editorjs-${children.coursecode}${children.year}${question.qno}`}  // unique id 
                                  ref={() => initEditor(question.qno)} // init when div appears
                                  className={edit[question.qno] ? 'block' : 'hidden'}
                                />
                                
                              </div>
                    )
                        } 

                        
                        {(role==='user' || edit[question.qno]===false)  && open[question.qno] &&
                        (
                                <div  className="text-center align-center overflow-x-auto">
                                        {!answers[question.qno-1] && <div>notes will be added</div>}
                                         {answers[question.qno-1]?.answer?.map((ans,i)=>
                                         {
                                           if (ans.type==="image") 
                                             return <img src={ans.data.file.url} alt={ans.data.file.caption} key={i}/>;
                                           else if(ans.type==='table')
                                            return <table key={i} className="border-sky-100 border-collapse mx-auto ">
                                                     {ans.data.withHeadings ?
                                                     <thead >
                                                        <tr >
                                                        {ans.data.content[0].map((c,index)=>
                                                             <th key={index} className="border-1 px-1 py-1 sm:px-3 sm:py-2">
                                                                {c}
                                                            </th>
                                                        )}
                                                        </tr>
                                                     </thead>
                                                     :null}

                                                     <tbody>
                                                         {ans.data.content.map((contentArray,count)=>
                                                         (
                                                            (ans.data.withHeadings && count===0) ? null :
                                                        <tr key={count}>
                                                            {contentArray.map((c,index)=>(
                                                                 <td key={index} className="border-1 px-1 py-1 sm:px-3 sm:py-2">{c}</td>
                                                            ))}
                                                        </tr>
                                                         ))}
                                                     </tbody>
                                                
                                                    </table>

                                           else if(ans.type==='header'){
                                            const HeadingTag=`h${ans.data.level}`;
                                            return <HeadingTag  key={i} >{ans.data.text}</HeadingTag>;}

                                         else if (ans.type==='paragraph')
                                           return <div key={i} 
                                         dangerouslySetInnerHTML={{__html:ans.data.text}} className="text-left"/>;

                                         else 
                                           return <div key={i} 
                                         dangerouslySetInnerHTML={{__html:ans.data.text}}/>;
                                         }
                                        )}
                              </div>
                        )
                    }

                     </div>
                    )})}
                 </div>
             </div>
     </div>
</div>
    </>              
)
}
 {/* <Link className='text-xs md:text-base hover:text-[#058aff]' href={`/semester/${children.sem}/${children.subject}/notes/${chapter.unit}`}>
                         {chapter.description}
                     </Link> */}