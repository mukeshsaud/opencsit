import { userdetails } from "@/app/lib/schema";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req){
    const {username,password,select}= await req.json();
    try{
        const hashedPass=await bcrypt.hash(password,12);
        const dbpost=await db.insert(userdetails).values({username,password:hashedPass,semester:select});
         return Response.json({sucess:dbpost});

    }
    catch(e){
        return Response.json({error:e.message});
    }
   
}
