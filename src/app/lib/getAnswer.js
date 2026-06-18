import { unstable_cache } from "next/cache";
import { db } from "./db";
import { answers,questions } from "./schema";
import { eq, inArray,and } from "drizzle-orm";

export const getAnswerByYear=({coursecode,year})=>
    unstable_cache(async()=>{
        try{
            
    const qs= await db.select({id:questions.id}).from(questions)
        .where(
            and
            (
                eq(questions.coursecode,coursecode),
                eq(questions.year,year),
            )
            )
            const questionIds= qs.map((q)=>q.id);
    return await db.select().from(answers).where(
        inArray(answers.questionid,questionIds))}
        catch(e){
            return e.message;
        }


},[`answerbyyear-${coursecode}-${year}`],{revalidate:false})()