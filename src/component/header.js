
import { getAllSemester } from "@/app/lib/data";
import HeaderClient from "./HeaderClient";


export default async function Header(){
    const semestersInHeader=await getAllSemester();

   
    return(
        <HeaderClient semesters={semestersInHeader}/>
    )
}