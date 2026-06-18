import { questions,answers } from "@/app/lib/schema";
import { and,eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/getUser";
import { db } from "@/app/lib/db";
import { revalidateTag } from "next/cache";

export async function POST(req){
    const {blocks,coursecode,year,qno}=await req.json();
    const user=await getUser();
    if(!user)  return NextResponse.redirect(new URL('/login',req.url));
    if(user.role!=='admin') return NextResponse.json({error:"forbidden"},{status:404});

    try{
    const [q]= await db.select().from(questions)
    .where(
        and
        (
            eq(questions.coursecode,coursecode),
            eq(questions.year,year),
            eq(questions.qno,qno)
        )
        )
  const resonsefromdb= await db.insert(answers).values({
    questionid:q.id,
    answer:blocks
   }).onConflictDoUpdate({
      target: answers.questionid,
      set:{answer:blocks}
   })
   revalidateTag(`answerbyyear-${coursecode}-${year}`);
   return Response.json({sucess:resonsefromdb});}
   catch(e){
    return Response.json({error:e.message})
   }
}