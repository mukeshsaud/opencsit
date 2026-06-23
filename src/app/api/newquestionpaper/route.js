import { db } from "@/app/lib/db";
import { questions } from "@/app/lib/schema";
import { and,eq } from "drizzle-orm";

export async function POST(req){
    const {newYear,courseCode}=await req.json();
  
    try {
        const yearExist= await db.query.questions.findFirst({
            where:(
                and(
                    eq(questions.coursecode,courseCode),
                    eq(questions.year,newYear)
                )
            )
        })

        if(!yearExist) {
        const responsefromdb= await db.insert(questions).values(
            Array.from({length:12},(_,i)=>
        ({coursecode:courseCode,year:newYear,qno:i+1,content:'dummy question'})
        ))
     return Response.json({success:responsefromdb});}

       else return Response.json({error:`year already exists id: ${yearExist.id}`});

         
    } catch (error) {
        return Response.json({error:error.message});
    }
   
    // INSERT INTO questions (course_code, year, q_no, content,type,src) VALUES
}