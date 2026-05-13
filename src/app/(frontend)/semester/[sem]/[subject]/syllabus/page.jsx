
import syllabus from '@/data/syllabus.json'
import Navbar from "@/component/Navbar";
import Link from "next/link";
import { notFound } from 'next/navigation';

export default async function page({params}){
    const {subject}= await params;
    const filteredsubject=`${subject.replaceAll("-"," ")}`
   const filteredSyllabus =syllabus.filter((s)=> s.title.toLowerCase()===filteredsubject )
   
   if(filteredSyllabus.length===0)
    {notFound();}
   const s=filteredSyllabus[0];
   
    return(
        <div className="flex flex-col gap-7 bg-red-600">  
            <div>
                {
                        <div key={s.code}>

                            <h1>{s.title}</h1>
                            <div className='flex justify-end'><span> 
                                <span>Course No: </span> <span>{s.code}</span> 
                                </span>
                                <span>
                                <span>Full Marks: </span> <span>{s.fullMarks}</span>
                                </span>
                            </div>
                            <div className='flex justify-end'><span> 
                                <span>Nature of the Course:</span> <span>{s.natureOfCourse}</span>
                                </span> 
                                <span>
                                    <span>Pass Marks: </span> <span>{s.passMarks}</span>
                                </span>
                            </div >
                            <div className='flex justify-end'>
                                <span> <span>Semester:</span> <span>{s.semester}</span> </span> 
                                <span> <span>Credit Hrs:</span> <span>{s.creditHours}</span></span>
                            </div>

                            <div className='flex '>
                                <span>Course Description:</span><span>{s.description}</span>
                            </div>

                            <div className='flex flex-col'>
                                <span>Course Contents:</span>
                                <div>
                                    {s.chapters.map((chapter)=>
                                    <div key={chapter.unit}>
                                        <div className='flex'>
                                            <span>Unit</span>{chapter.unit}<span>{chapter.title}</span> 
                                            <span>'('</span><span>{chapter.hours}</span><span>Hrs.')'</span>
                                        </div>
                                        
                                        <div>
                                            {chapter.description}
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                  
                }
           
            </div>
        </div>
    )
}