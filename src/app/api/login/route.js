import { userdetails } from "@/app/lib/schema";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(req){
    const {username,password,select}= await req.json();
    try{
        const dbpost=await db.query.userdetails.findFirst({where:(table,{eq})=>eq(table.username,username)});
        const hashCompare= await bcrypt.compare(password,dbpost.password);
        if(hashCompare){
        const signedjwt= await jwt.sign({username:dbpost.username,semester:dbpost.semester,role:dbpost.role},process.env.JWT_SECRET);
        const cookieStore=await cookies();
        cookieStore.set('token',signedjwt,{
            httpOnly:true,
            secure:true,
            maxAge:60*60*24*365*10
        })
        }
         return Response.json({sucess:hashCompare});

    }
    catch(e){
        return Response.json({error:e.message});
    }
   
}
