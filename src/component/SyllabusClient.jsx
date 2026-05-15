import Link from "next/link"
export default  function SyllabusClient({s,children}){
 console.log(children)
    return(
                        <div key={s.syllabusidfk} className='flex flex-col gap-7 '>

                            <h1 className='text-lg md:text-3xl font-bold self-center'>{s.subjects.title}</h1>

                            <div className='flex flex-col gap-1'>
                            <div className='flex justify-between  whitespace-nowrap'><span> 
                                <span className='font-bold md:text-lg'>Course No: </span> <span>{s.subjectcodefk}</span> 
                                </span>
                                <span>
                                <span className='font-bold md:text-lg'>Full Marks: </span> <span>{s.fullmarks}</span>
                                </span>
                            </div>

                       
                            <div className=' hidden md:flex md:justify-between'><span> 
                                <span className='font-bold text-sm  md:text-lg'>Nature of the Course: </span> <span >{s.natureofcourse}</span>
                                </span> 
                                <span>
                                    <span className='font-bold  text-sm md:text-lg'>Pass Marks: </span> <span>{s.passmarks}</span>
                                </span>
                            </div >

                            <div className='flex justify-between'>
                                <span> <span className='font-bold text-lg'>Semester: </span> <span className="md:text-lg">{children.sem}</span> </span> 
                                <span> <span className='font-bold text-lg'>Credit Hrs: </span> <span>{s.credithours}</span></span>
                            </div>
                           </div>

                            <div className='hidden md:block'>
                                <span className='font-bold whitespace-nowrap text-xl '>Course Description: </span><span>{s.description}</span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='font-bold text-2xl mb-3'>Course Contents:</span>
                                <div className='flex flex-col gap-5'>
                                    {s.chapters.map((chapter)=>
                                    <div key={chapter.unit} className=' cursor-pointer'>
                                        <div className='flex font-bold text-base md:text-xl' >
                                            <span>Unit&nbsp;</span>{chapter.unit}:&nbsp;<span >{chapter.title}</span> 
                                            <span ><span>&nbsp;(</span><span>{chapter.hours}</span><span>Hrs.)</span></span>
                                        </div>
                                        <Link className='text-xs md:text-base hover:text-[#058aff]' href={`/semester/${children.sem}/${children.subject}/notes/${chapter.unit}`}>
                                            {chapter.description}
                                        </Link>
                                        </div>
                                        )}
                                    </div>
                                </div>
                        </div>
                  
    
    )
}