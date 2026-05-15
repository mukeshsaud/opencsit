import { getAllSemester } from "./lib/data";
import HomeClient from "@/component/HomeClient";


export default async function Home() {
  const semestersInHome= await getAllSemester();
 
  return (
  <HomeClient semesters={semestersInHome}/>
  );
}