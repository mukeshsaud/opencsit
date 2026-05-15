
import SemClient from '@/component/SemClient.jsx';
import { notFound } from "next/navigation";
import { getAllData } from '@/app/lib/data';


export default async function page({params}){
 
    const {sem}= await params;

    const alldata= await getAllData();
    const allsubjects= alldata.map((value)=> value.subjects )

      const filteredSubjects=allsubjects.filter((sub)=> sub.semesters.name===sem)
        
      if (filteredSubjects.length==0)
        notFound();

    return(
        <div className="flex flex-col gap-7">
            
           <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 w-fit gap-5 md:gap-10 ">
            { filteredSubjects.map((subject)=>
              
                <SemClient children={{title:`${subject.title}`,code:`${subject.code}`,chapter:`${subject.chapter}`,description:`${subject.shortdescription}`,sem}} key={subject.code}/>
            )
            }
            </div>
            </div>

        </div>
    )
}