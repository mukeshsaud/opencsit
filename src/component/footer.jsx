import Image from "next/image"


export default function Footer(){
    return(
    <div className="flex justify-center gap-2 "  >

        <div className="flex">
            <Image src="/email.svg" alt="mail:" width={20} height={10} />
            <span>opencsit@gmail.com</span>
        </div>
        <div className="border-l-2 border-black h-5"></div>
        <div>
            <Image src="/facebook.svg" alt="fb" width={20} height={10}/>
        </div>
    </div>
    )
}