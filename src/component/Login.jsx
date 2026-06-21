"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
    const [show,setShow]=useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const router=useRouter();
    const searchParams=useSearchParams();
    const callback=searchParams.get("callback") || "/";

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch('/api/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        })
        const data=res.json();
        console.log(data);
        router.push(callback);
    }

    return(
    <div className="h-120  flex justify-center items-center">
                <form  className="bg-[#F5F5F0] flex flex-col gap-7 px-10 py-10 w-2xl h-full rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                    <div className=" flex flex-col">
                        <label htmlFor="username">Your Username:</label>
                        <input type="text" className="border px-3 py-2.5 rounded" 
                        placeholder="jhondoe" required value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>

                    <div className=" flex flex-col">
                        <label htmlFor="password">Your Password:</label>
                        <div className="relative">
                        <input type={show ?'text':'password'} className="border px-3 py-2.5 rounded w-full" 
                        placeholder="••••••••" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button onClick={(e)=>{e.preventDefault(); return setShow(!show)}} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                            {show?<EyeOff size={18}/>:<Eye size={18}/>}
                        </button>
                        </div>
                    </div>

                    <button className="text-white bg-blue-500 rounded px-3 py-2.5  text-xl cursor-pointer" onClick={handleSubmit}>
                       LOGIN</button>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 my-4">

                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-xl">or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                        </div>
                        
                        <div className="flex justify-center ">
                            <button className="border flex gap-2 items-center justify-center text-2xl py-3 px-4 rounded bg-white cursor-pointer">
                                <FcGoogle size={40} /> 
                            <span>Continue with Google</span></button>
                        </div>
                    </div>
                </form>

            </div>
    )
    
}