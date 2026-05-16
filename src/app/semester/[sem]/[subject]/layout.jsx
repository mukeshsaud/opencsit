
import SubjetLayout from "@/component/SubjetLayout";
import { getSubjectChapters } from "@/app/lib/data";
import { notFound } from "next/navigation";


export default async function Layout({children,params})
{
  const {sem,subject}= await params;
  const chapters= await getSubjectChapters(sem,subject)
    
      if(!chapters) notFound();
  

    return(
        <div>
            <SubjetLayout params={{sem,subject}} />
            {children}
        </div>
         
           
    )


}

