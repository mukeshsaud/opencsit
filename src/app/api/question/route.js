import { questions } from "@/app/lib/schema";
import { and,eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/getUser";
import { db } from "@/app/lib/db";


export async  function  POST(req)
{ 
    const {blocks,coursecode,year,qno}= await req.json();

    const hasImage=!!blocks[1]?.data?.file?.url;
    console.log(hasImage,blocks[1]?.data?.file?.url);
    const updateData={
        coursecode:coursecode, year:year, qno:qno, content:blocks[0].data.text,
        type: hasImage ? 'image':'text',
        ...(hasImage ? {src:blocks[1].data.file.url} : {src:null} )
    }
    

     const user=await getUser();
    if(!user)  return NextResponse.redirect(new URL('/login',req.url));
    if(user.role!=='admin') return NextResponse.json({error:"forbidden"},{status:404});

   
    try {
    
          const resonsefromdb= await db.update(questions).set(updateData).where(
            and
            (
            eq(questions.coursecode,coursecode),
            eq(questions.year,year),
            eq(questions.qno,qno),
             ))
   
            console.log(resonsefromdb,'this is questioneditpost');

           return Response.json({sucess:resonsefromdb});
        }
        
        catch (error) {
        return Response.json({error:error.message});
        }

}