import { chapters,  notes , syllabus } from "@/app/lib/schema";
import { eq ,and} from "drizzle-orm";
import { db } from "@/app/lib/db";

export async function POST(req){
    const {blocks,coursecode,unit}= await req.json();
    try {
        const [s]= await db.select().from(syllabus).where(
                eq(syllabus.subjectcodefk,coursecode)
        )

        const [chapter]=await db.select().from(chapters)
        .where( and(
            eq(chapters.syllabusidfk,s.id),
            eq(chapters.unit,unit)
            ))
        const resonsefromdb=await db.insert(notes).values({
            chapterid:chapter.id,
            note:blocks
        }).onConflictDoUpdate({
            target:notes.chapterid,
            set:{note:blocks}
        })
           
        return Response.json({sucess:resonsefromdb})
    } catch (error) {
        return Response.json({error:error.message})
    }
    
}