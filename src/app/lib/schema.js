
import { Many, One, relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const semesters=pgTable('semesters',{
id:serial('id').primaryKey(),
name:varchar('name').notNull().unique(),
subjects:integer('subjects').notNull(),
icon:varchar('icon').notNull(),
color:varchar('color').notNull(),
})

export const subjects=pgTable('subjects',{
id:serial('id').primaryKey(),
semesterfk:integer('semester_id').notNull().references(()=> semesters.id,{onDelete:'cascade'}),
code:varchar('code').notNull().unique(),
title:varchar('title').notNull(),
chapter:integer('chapter'),
shortdescription:text('short_description'),
})

export const syllabus= pgTable('syllabus',{
id:serial('id').primaryKey(),
subjectcodefk:varchar('subject_code').notNull().references(()=>subjects.code,{onDelete:'cascade'}),
fullmarks:varchar('full_marks'),
passmarks:varchar('pass_marks'),
natureofcourse:varchar('nature_of_course'),
credithours:varchar('credit_hours'),
description:varchar('description'),

})
export const chapters=pgTable("chapters",{
id:serial('id').primaryKey(),
syllabusidfk:integer('syllabus_id').notNull().references(()=>syllabus.id,{onDelete:'cascade'}),
unit:integer('unit'),
title:varchar('title'),
hours:integer('hours'),
description:text('description')
})

export const syllabusRelations= relations(syllabus,({many,one})=>({
chapters:many(chapters),
subjects:one(subjects,{
       fields:[syllabus.subjectcodefk],
        references:[subjects.code]
}),

}))

export const chaptersRelations= relations(chapters,({one})=>({
    syllabus: one(syllabus,{
        fields:[chapters.syllabusidfk], //fk
        references:[syllabus.id]        //pk
    })}))

export const subjectRelations= relations(subjects,({one})=>({
syllabus:one(syllabus),
semesters:one(semesters,{
    fields:[subjects.semesterfk],
    references:[semesters.id]
})
}))

export const semesterRelations=relations(semesters,({many})=>({
    subjects:many(subjects)
}))


