import { unstable_cache } from "next/cache";
import {db} from "./db"
import { semesters } from "./schema";

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

