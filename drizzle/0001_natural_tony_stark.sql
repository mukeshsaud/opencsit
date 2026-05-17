CREATE TYPE "public"."type" AS ENUM('text', 'image');--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"syllabus_id" integer NOT NULL,
	"unit" integer,
	"title" varchar,
	"hours" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_code" varchar NOT NULL,
	"year" integer NOT NULL,
	"q_no" integer NOT NULL,
	"content" text NOT NULL,
	"type" "type" DEFAULT 'text' NOT NULL,
	"src" text,
	CONSTRAINT "src_check" CHECK (("questions"."type"='image' AND "questions"."src" IS NOT NULL) OR ("questions"."type"='text' AND "questions"."src" IS NULL))
);
--> statement-breakpoint
CREATE TABLE "semesters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"subjects" integer NOT NULL,
	"icon" varchar NOT NULL,
	"color" varchar NOT NULL,
	CONSTRAINT "semesters_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"semester_id" integer NOT NULL,
	"code" varchar NOT NULL,
	"title" varchar NOT NULL,
	"chapter" integer,
	"short_description" text,
	CONSTRAINT "subjects_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "syllabus" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject_code" varchar NOT NULL,
	"full_marks" varchar,
	"pass_marks" varchar,
	"nature_of_course" varchar,
	"credit_hours" varchar,
	"description" varchar
);
--> statement-breakpoint
DROP TABLE "posts" CASCADE;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_syllabus_id_syllabus_id_fk" FOREIGN KEY ("syllabus_id") REFERENCES "public"."syllabus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_course_code_subjects_code_fk" FOREIGN KEY ("course_code") REFERENCES "public"."subjects"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "syllabus" ADD CONSTRAINT "syllabus_subject_code_subjects_code_fk" FOREIGN KEY ("subject_code") REFERENCES "public"."subjects"("code") ON DELETE cascade ON UPDATE no action;