
import { getSubjectChapters } from "@/app/lib/data";
import NotesChapter from "@/component/NotesChapter";
import { notFound } from "next/navigation";
import NotesPyqLayout from "@/component/NotesPyqLayout";


export default async function layout({children,params}){
    const {sem,subject}=await params;
   
    const chapters= await getSubjectChapters(sem,subject);
   
    return(
      
                 
                    <NotesPyqLayout 
                    sidebar={<NotesChapter chapters={chapters.chapters} params={{sem,subject}} />}
                    > 
                  {children}
    
                  </NotesPyqLayout>

         
           
    )
}
