import { questions } from "@/app/lib/schema";
import { and,eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/getUser";
import { db } from "@/app/lib/db";


export async  function  POST({req})
{ 
    const {blocks,coursecode,year,qno,type}=req.json();
    let src=null;
    if(type==='image')
        src=blocks;

     const user=await getUser();
    if(!user)  return NextResponse.redirect(new URL('/login',req.url));
    if(user.role!=='admin') return NextResponse.json({error:"forbidden"},{status:404});

   
    try {
          const resonsefromdb= await db.update(questions).set({
           coursecode:coursecode, year:year, qno:qno, content:blocks,type,src
           }).where(
            and
            (
            eq(questions.coursecode,coursecode),
            eq(questions.year,year),
            eq(questions.qno,qno),
             ))

           return Response.json({sucess:resonsefromdb});
        }
        
        catch (error) {
        return Response.json({error:error.message});
        }

}