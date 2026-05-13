
import Navbar from "@/component/Navbar";


export default async function Layout({children}){

 
    return(
        <div className="flex flex-col gap-7">
          <Navbar />
            {children}
        </div>
    )
}