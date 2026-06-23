'use client';
import { useRef,useState } from "react";
import { getEditorConfig } from "../../editorConfig";



export default function NotesContent({children,role,notes}){
    const [edit,setEdit]=useState({[children.unit]:false});
    const toogleEdit=()=>{setEdit((prev)=>({[children.unit]:!prev[children.unit]}))}
    
    const editorsRef=useRef({});

       const initEditorNotes = async () => {
        console.log(editorsRef.current[children.unit],children.unit);
    
            if (editorsRef.current[children.unit]) return; // already exists, user can still type/edit
    
            editorsRef.current[children.unit] = true;
                console.log( editorsRef.current[children.unit]);
        const EditorJS=(await import('@editorjs/editorjs')).default;
        const config=await getEditorConfig({data:{slug:'note',sem:children.sem,coursecode:children.coursecode,year:children.year,qno:children.unit}}); //qno is unit
        const existingData=children.notes?.note;
        
    
        editorsRef.current[children.unit] = new EditorJS({
          holder: `editorjsnotes-${children.sem}${children.subject}${children.unit}`, // unique id per question
          placeholder: 'Start writing...',
          data: {blocks:existingData}, 
        //   data:{blocks: [{ type: 'paragraph', data: { text: 'sfas' } }]},
          ...config,
        });
    };
    
    
    const handleSave = async () => {
      const {blocks} = await editorsRef.current[children.unit].save();
      console.log(blocks);
    
      const res= await fetch("/api/note",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({blocks,coursecode:children.coursecode,unit:children.unit})
      })
       
      const data= await res.json();
      
      console.log(data,"data from notescontentsave");
     
    };
   

    return(
       
        
            <div className="">
                 
                 {role==='admin' &&
                    (
                        <div  className={ `mt-5`}>

                                    <div className="flex justify-end gap-5 ">
                                 <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                 px-3 py-2 rounded text-white cursor-pointer" onClick={()=>toogleEdit()}><span>✏️</span><span>edit</span> </button>
                                 <button className="flex gap-1.5 bg-[#3b63ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                                 px-3 py-2 rounded text-white cursor-pointer" onClick={()=>handleSave()} ><span>💾</span><span>save</span></button>
                                     </div>
                                    
                                  <div
                                  id={`editorjsnotes-${children.sem}${children.subject}${children.unit}`}  // unique id 
                                  ref={() => initEditorNotes()} // init when div appears
                                  className={edit[children.unit] ? 'block' : 'hidden'}/>
                                
                        </div>
                    )
                        } 

                           
                        {(role==='user' || edit[children.unit]===false) &&
                        (
                               
                                <div  className="text-center align-center overflow-x-auto shadow-[0_0_20px_rgba(200,195,180,0.8)]  mt-5 ">
                                
                                        {!children.notes && <div className="  border-l-4 border-[#c4b5fd] px-4  py-4 text-start   ">notes will be added soon ....</div>}
                                         
                                         <div className="border-l-4 border-[#c4b5fd] px-4  py-4 text-start flex flex-col items-center ">
                                         {children.notes?.note.map((ans,i)=>
                                         {

                                           if (ans.type==="image") 
                                             return <img src={ans.data.file.url} alt={ans.data.file.caption} key={i} className=""/>;
                                           else if(ans.type==='table')
                                            return <table key={i} className="border-sky-100 border-collapse items-center ">
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
                                            const sizeMap = { 1: 'text-4xl', 2: 'text-3xl', 3: 'text-2xl', 4: 'text-xl'}
                                            return <HeadingTag  key={i} className={`font-bold ${sizeMap[ans.data.level]}`}>{ans.data.text}</HeadingTag>;}

                                         else if (ans.type==='paragraph')
                                           return <div key={i} 
                                         dangerouslySetInnerHTML={{__html:ans.data.text}} className="text-left self-start"/>;

                                         else 
                                           return <div key={i} 
                                         dangerouslySetInnerHTML={{__html:ans.data.text}}/>;
                                         }
                                        )}
                                        </div>
                              </div>
                        )
                    }
                    </div>

    )
}
