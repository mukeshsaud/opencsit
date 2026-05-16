import { revalidatePath, unstable_cache } from "next/cache";
import {db} from "./db"
import { questions, semesters,subjects } from "./schema";
import { eq, sql } from "drizzle-orm";

export const getAllData=unstable_cache(async()=>
    {
    return await db.query.syllabus.findMany({
            with:{
                    chapters:{ orderBy:(chapters,{asc})=>[asc(chapters.unit)]
                             },
                    subjects:{
                    with:{ semesters:true }
                            }}
                        })
     
},
['all-syllabus-data'],{revalidate:false})

export const getAllSemester=unstable_cache(async()=>
    { return await db.select().from(semesters);}
,['all-semesters-data'],{revalidate:false})

 export const getSubjectChapters= unstable_cache(async(sem,subject)=>{
    const unitdb=await getAllData();
    const filteredsubject=`${subject.replaceAll('-',' ')}`
    const filteredsubject1=unitdb.filter((value)=> value.subjects.semesters.name===sem && value.subjects.title.toLocaleLowerCase()===filteredsubject )

   
   return filteredsubject1[0] ?? null;
},['subjectChapters'],{revalidate:false});

export const getAllQuestions=unstable_cache(async(coursename)=>{
     return await db.query.subjects.findFirst({
        where:eq(sql`lower(${subjects.title})`,coursename),
        with:{
            questions:{
                orderBy:(questions,{asc})=>[asc(questions.year),asc(questions.qno)],
            columns:{
                year:true,
                qno:true,
                content:true
                
            }},
        }

     })

},['allQuestions'],{revalidate:false})
