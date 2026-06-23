import { revalidatePath, unstable_cache } from "next/cache";
import {db} from "./db"
import { questions,syllabus, semesters,subjects,chapters,notes } from "./schema";
import { eq, sql,and } from "drizzle-orm";

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
            }
        }

     })

},['allQuestions'],{revalidate:false})

export const getQuestionBy=unstable_cache(async(coursename)=>{
     return await db.query.subjects.findFirst({
        where:eq(sql`lower(${subjects.title})`,coursename),
        with:{
            questions:{
                orderBy:(questions,{asc})=>[asc(questions.year),asc(questions.qno)],
            }
        }

     })

},['allQuestions'],{revalidate:false})

export const getNotes = unstable_cache(async (coursecode, unit) => {
  const [s] = await db.select().from(syllabus).where(
    eq(syllabus.subjectcodefk, coursecode.coursecode)
  );
  const [chapter] = await db.select().from(chapters).where(
    and(
      eq(chapters.syllabusidfk, s.id),
      eq(chapters.unit, unit)
    )
  );

 return await db.query.notes.findFirst({
    where: eq(notes.chapterid, chapter.id)
  });
  
  

}, ['notes'], { revalidate: false });
