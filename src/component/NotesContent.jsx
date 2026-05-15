import { RxHamburgerMenu } from "react-icons/rx";

export default function NotesContent({onSelect,active}){
    return(
       
        <div className='flex flex-col shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-full'>
            <div className=' shadow-[0_0_10px_rgba(0,0,0,0.5)] p-1 md:p-5 w-2 h-4 flex items-center justify-center '
            onClick={()=>onSelect(!active)} >
            <span ><RxHamburgerMenu className="text-2xl"/> </span>
            </div>
            <div className="">
                notes will be added soon......
            </div>
         </div>

    )
}