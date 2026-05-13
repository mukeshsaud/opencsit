import Subjects from '@/component/Subjects';
import subjects0 from '@/data/subjects.json'
import { notFound } from "next/navigation";


export default async function page({params}){
   const {sem}= await params;
      const filteredsem=subjects0.filter((v)=> 
          { if(v.semester===sem)
              return v.semester
          })
      if (filteredsem.length==0)
        notFound();
      const subjects=filteredsem[0].subjects;


    return(
        <div className="flex flex-col gap-7">
           <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 w-fit gap-5 md:gap-10 ">
            { subjects.map((subject)=>
              
                <Subjects children={{title:`${subject.title}`,code:`${subject.code}`,chapter:`${subject.chapter}`,description:`${subject.description}`,sem}} key={subject.code}/>
            )
            }
            </div>
            </div>

        </div>
    )
}