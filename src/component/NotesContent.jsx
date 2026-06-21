import { RxHamburgerMenu } from "react-icons/rx";

export default function NotesContent({}){
    const [edit,setEdit]=useState(
            ()=>Object.fromEntries(questions.map(q=>[q.qno,false]))
        );
        
        const edittoggle=(qno)=>{
         setEdit(prev=>({...prev,[qno]:!prev[qno]}));
    }
       const initEditorAnswer = async (qno) => {
    
            if (editorsRef.current[qno]) return; // already exists, user can still type/edit
    
            editorsRef.current[qno] = true;
    
        const EditorJS=(await import('@editorjs/editorjs')).default;
        const config=await getEditorConfig({data:{slug:'answer',year:children.year,coursecode:children.coursecode,qno,sem:children.sem}});
        const existingData=answers.filter((q)=>q.qno===qno)[0]?.answer;
        console.log(existingData)
    
        editorsRef.current[qno] = new EditorJS({
          holder: `editorjsans-${children.coursecode}${children.year}${qno}`, // unique id per question
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
      
      console.log(data,"data from pyqcontentsave");
    
      console.log(`course code: ${children.coursecode} year: ${children.year} Q${qno} data:`, blocks,typeof(blocks),'s');
     
    };
    return(
       
        
            <div className="">
                <div className="flex justify-end gap-5 ">
                    <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                  px-3 py-2 rounded text-white cursor-pointer" ><span>➕</span><span>add</span></button>
                  <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                  px-3 py-2 rounded text-white cursor-pointer" ><span>✏️</span><span>edit</span> </button>
                  <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                  px-3 py-2 rounded text-white cursor-pointer" ><span>💾</span><span>save</span></button>
                </div>
                <div>notes will be added soon......</div>   </div>
                 {role==='admin' &&
                      everOpened[question.qno] &&
                    (
                                <div  className={`${open[question.qno] ? 'block' : 'hidden'} mt-5`}>
                                    <div className="flex justify-end gap-5 ">
                                        <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                        px-3 py-2 rounded text-white cursor-pointer" onClick={()=>edittoggle(question.qno)}><span>✏️</span><span>edit</span> </button>
                                        <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                        px-3 py-2 rounded text-white cursor-pointer" onClick={() => handleSave(question.qno)}><span>💾</span><span>save</span></button>
                                    </div>
                                    
                                        <div
                                  id={`editorjsans-${children.coursecode}${children.year}${question.qno}`}  // unique id 
                                  ref={() => initEditorAnswer(question.qno)} // init when div appears
                                  className={edit[question.qno] ? 'block' : 'hidden'}
                                />
                                
                              </div>
                    )
                        } 

    )
}