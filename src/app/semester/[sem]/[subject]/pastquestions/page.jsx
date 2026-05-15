

import Navbar from "@/component/Navbar";
import Link from "next/link";

export default async function page({params}){
    const {sem,subject}=await params;
    console.log(sem,subject,"s");
    const subjectRealFormat=`${subject}`.replaceAll("-"," ");
    console.log(subjectRealFormat)
    return(
        <div className="flex flex-col gap-7">  
            <div>
            </div>
        </div>
    )
}