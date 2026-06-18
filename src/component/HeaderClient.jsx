"use client";
import Image from "next/image"
import { MdOutlinePerson2 } from "react-icons/md";
import { useState,useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function HeaderClient({semesters}){
    const[clicked,setClicked]=useState(false);
    const dropDownRef=useRef(null)
    const pathname=usePathname();

         useEffect(()=>{ 
                  function handleClickedOutside(event) {
                     if(dropDownRef.current && !dropDownRef.current.contains(event.target))
                           setClicked(false);
                   }
                        document.addEventListener("pointerdown",handleClickedOutside);
                        return () => document.removeEventListener("pointerdown",handleClickedOutside) //if i go to any other /page it will remove this listner
                },[])

    function handlePointerEnter(e) {
        if(e.pointerType=='touch') return;
        setClicked(true)
    }

    function handlePointerLeave(e) {
        if(e.pointerType=='touch') return;
        setClicked(false);
    }
     
    function handleClick(e) {
        setClicked((prev)=>!prev)
    }
    function handleLogin(){
        searchParams.set("callback",pathname);

    }
 
   
    return(<div>
        <div className="flex  h-8 md:h-10 lg:h-15 w-full items-center justify-between   pl-1 md:pl-5 lg:pl-15 pr-1 md:pr-5 lg:pr-15">
            <Link className="flex items-center cursor-pointer" href="/">
                <div className="text-[#3b63ff] flex flex-col w-10px">
                    <span className={`font-black text-[10px] md:text-base lg:text-2xl `}>Opencsit</span>
                    <span className={`font-antic font-black text-[7px] md:text-xs lg:text-base whitespace-nowrap `}>
                    FREE FOREVER
                    </span>
                </div>
            </Link>
           
            <div className="flex gap-5 items-center  md:gap-7 lg:gap-10 text-base md:text-lg lg:text-xl"> 
                <div className="cursor-pointer h-20 flex items-center justify-center hover:text-[#0088FF]" 
                    onPointerEnter={handlePointerEnter}  onPointerLeave={handlePointerLeave}
                     onClick={handleClick}
                     ref={dropDownRef}
                > 
                    <span>Semester</span>
                    <span className="text-[10px] justify-self-center-safe">▼</span>
                    {
                        clicked &&
                        <div className="fixed rounded   text-[#0088FF] bg-white text-base flex flex-col top-8 md:top-10 lg:top-13 pb-2 pt-1  
                        shadow-[0_0_10px_rgba(0,0,0,0.4)] "
                      
                           onClick={(e) =>{e.stopPropagation(); setClicked(false);} } // prevent bubbling to parent toggle
                        >
                            {
                                semesters.map((semester)=>
                                    <Link key={semester.name} className="hover:bg-[#0088FF] hover:text-white rounded pr-10 pl-5 pb-1 pt-1  "
                                    href={`/semester/${semester.name}`} >
                                        {semester.name} semester</Link>
                                )
                            }    
                        </div>
                    }
                </div>
                <div className="cursor-pointer hover:text-[#0088FF] "  
                    
                > 
                Notices</div>
                
            </div>
                    <Link href={`/login?callback=${pathname}`} onClick={handleLogin}>login</Link>
            <div className="flex  rounded  px-1  text-xs  md:text-base lg:text-xl lg py-1 md:px-5 lg:px-4 md:py-1 lg:py-2 hover:text-[#0088FF] cursor-pointer">
                <MdOutlinePerson2  className="text-base md:text-2xl lg:text-3xl"/>
               <span>Account</span> </div>
        </div>
            <hr />
            </div>
    )
}