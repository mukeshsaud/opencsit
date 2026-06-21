import { db } from "@/app/lib/db";
import { questions } from "@/app/lib/schema";

export async function POST(req){
    const {newYear,courseCode}=await req.json();
    console.log(newYear);
    try {
        const responsefromdb= await db.insert(questions).values(
            Array.from({length:12},(_,i)=>
        ({coursecode:courseCode,year:newYear,qno:i+1,content:'dummy question'})
        ))
         return Response.json({success:responsefromdb});
    } catch (error) {
        return Response.json({error:error.message});
    }
   
    // INSERT INTO questions (course_code, year, q_no, content,type,src) VALUES
}