import { getAllData } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Layout({children,params}){

  const {sem}= await params;
 
     const alldata= await getAllData();
     const allsubjects= alldata.map((value)=> value.subjects )
 
       const filteredSubjects=allsubjects.filter((sub)=> sub.semesters.name===sem)
        
         
       if (filteredSubjects.length==0)
         notFound();
 
     
    return(
        <div className="flex flex-col gap-7" >
            {children}
        </div>
    )
}