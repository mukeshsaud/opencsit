CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"questionid" integer NOT NULL,
	"answer" jsonb NOT NULL,
	CONSTRAINT "answers_questionid_unique" UNIQUE("questionid")
);
--> statement-breakpoint
CREATE TABLE "userdetails" (
	"username" varchar PRIMARY KEY NOT NULL,
	"password" varchar NOT NULL,
	"semester" integer NOT NULL,
	"role" "role" DEFAULT 'user',
	CONSTRAINT "userdetails_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionid_questions_id_fk" FOREIGN KEY ("questionid") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;