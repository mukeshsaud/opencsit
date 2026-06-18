import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getUser(){
      const cookieStore = await cookies();

      const token = cookieStore.get("token");


    if(!token) return null;

    const {payload}= await jwtVerify(token.value,new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
}