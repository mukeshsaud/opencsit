import {writeFile,mkdir} from 'fs/promises'
import path from 'path';
import { URL } from 'url';
export async function POST(req){
        const {searchParams}= new URL(req.url);
        const slug= searchParams.get('slug');
        const year= searchParams.get('year');
        const coursecode= searchParams.get('coursecode');
        const qno= searchParams.get('qno');
        const sem= searchParams.get('sem');
        console.log("uploadfile");
        console.log(slug,year,coursecode,qno,sem)

    const formData= await req.formData();
    const file= formData.get('image');

    const bytes= await file.arrayBuffer();  // Web API type - can't write to disk directly
    const buffer= Buffer.from(bytes);       // convert to Node.js Buffer - fs can write this
    let uploadDir=null;

    if(slug==='answer'){
     uploadDir=path.join(process.cwd(),'public','answersImgs',`${sem}`,`${coursecode}`,`${year}`,`${qno}`);   
    }
    else if(slug==='question'){
         uploadDir=path.join(process.cwd(),'public','questionsImgs',`${sem}`,`${coursecode}`,`${year}`,`${qno}`); 
    }
    else if(slug==='note'){
     uploadDir=path.join(process.cwd(),'public','notesImgs',`${sem}`,`${coursecode}`,`${qno}`); //qno is refrenced to unit for notes
    }
    await mkdir(uploadDir, { recursive: true }); //create dir if not exists


    const fileName=`${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    await writeFile(path.join(uploadDir, fileName), buffer);

            let url=null;
        if(slug==='question'|| slug==='answer')
         url=`/${slug}sImgs/${sem}/${coursecode}/${year}/${qno}/${fileName}`;
        
        else if(slug==='note'){
            url=`/${slug}sImgs/${sem}/${coursecode}/${qno}/${fileName}`; //qno is unit for notes
        }

    return Response.json({
        success:1,
        file: {url:url}
    });
}