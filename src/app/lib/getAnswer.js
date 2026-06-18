import { unstable_cache } from "next/cache";
import { db } from "./db";
import { answers,questions } from "./schema";
import { eq, inArray,and } from "drizzle-orm";

export const getAnswerByYear=({coursecode,year})=>
    unstable_cache(async()=>{
        try{
            
    const qs= await db.select({id:questions.id,qno:questions.qno}).from(questions)
        .where(
            and
            (
                eq(questions.coursecode,coursecode),
                eq(questions.year,year),
            )
            )
        
            const questionIds= qs.map((q)=>q.id );
           console.log("cache tag:", `answerbyyear-${coursecode}-${year}`);
     return await db.select({
        ...answers,qno:questions.qno
     }).from(answers)
     .innerJoin(questions,eq(questions.id,answers.questionid))
     .where(
        inArray(answers.questionid,questionIds))


    }

     

        catch(e){
            return e.message;
        }


},[`answerbyyear-${coursecode}-${year}`],{revalidate:false})()