"use client";

import { Eye, EyeOff } from "lucide-react";
import { password } from "pg/lib/defaults";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
    const [show,setShow]=useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [select,setSelect]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const res= await fetch('/api/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
           body:JSON.stringify({username,password,select})
        } )
        const data=await res.json();
    }

    return(
    <div className="h-150  flex justify-center items-center">
                <form action="" className="bg-[#F5F5F0] flex flex-col gap-7 px-10 py-10 w-2xl h-full rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                    <div className=" flex flex-col">
                        <label htmlFor="username">Your Username:</label>
                        <input type="text" className="border px-3 py-2.5 rounded" 
                        placeholder="jhondoe" required name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className=" flex flex-col">
                        <label htmlFor="password">Your Password:</label>
                        <div className="relative">
                        <input type={show ?'text':'password'} className="border px-3 py-2.5 rounded w-full" 
                        placeholder="••••••••" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button onClick={(e)=>{e.preventDefault(); return setShow(!show)}} className="absolute right-3 top-1/2 -translate-y-1/2">
                            {show?<EyeOff size={18}/>:<Eye size={18}/>}
                        </button>
                        </div>
                    </div>
                    <div className=" flex flex-col ">
                        <label htmlFor="semsester">Your Semester:</label>
                        <select name="" id="" className=" border px-3 py-2.5 rounded" value={select} onChange={(e)=>(setSelect(e.target.value))}>
                            <option value="">select your semester</option>
                            <option value="1">first semester</option>
                            <option value="2">second semester</option>
                            <option value="3">third semester</option>
                            <option value="4">fourth semester</option>
                            <option value="5">fifth semester</option>
                            <option value="6">sixth semester</option>
                            <option value="7">seventh semester</option>
                            <option value="8">eighth semester</option>
                        </select>
                    </div>
                    <button className="text-white bg-blue-500 rounded px-3 py-2.5  text-xl"
                     onClick={handleSubmit}>
                        SIGN UP</button>

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