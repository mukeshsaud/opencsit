"use client";
import NotesContent from "@/component/NotesContent";
import NotesChapter from "@/component/NotesChapter";
import { useState } from "react";
export default function NotesWrapper({chapters,params}){
    const [hide,setHide]=useState(false)
    console.log(hide)
    return(<>
          <NotesChapter chapters={chapters} params={params} active={hide}/>
          <NotesContent onSelect={setHide} active={hide}/>
          </>
    )
}