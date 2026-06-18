import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {jwtVerify} from "jose";


export function middleware(req){
    const token=req.cookies.get('token');
    const {pathname}=req.nextUrl;
    
    if(!token){
        const loginUrl=new URL("/login",req.url);
        loginUrl.searchParams.set("callback",pathname)
       return NextResponse.redirect(loginUrl);
    }
    try{
        jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.next();
    }
    catch(e){
         const loginUrl=new URL("/login",req.url);
        loginUrl.searchParams.set("callback",pathname)
       return NextResponse.redirect(loginUrl);
    }
}
export const config={
    matcher:['/semester/:path*/notes/:path*','/semester/:path*/pastquestions/:path*','/semester/:path*/youtube/:path*']
}