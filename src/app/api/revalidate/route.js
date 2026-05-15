
import { revalidateTag } from "next/cache";

export async function GET(request){
    const secret=request.nextUrl.searchParams.get('secret');  //https://yoursite.com/api/revalidate?secret=yoursecretkey123
    if(secret !==process.env.REVALIDATE_SECRET)
        return Response.json({message:'invalid secret'})

    revalidateTag('all-syllabus-data')
    return Response.json({message:'revalidated'});
    
}
