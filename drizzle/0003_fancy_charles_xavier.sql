CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapterId" integer NOT NULL,
	"note" jsonb NOT NULL,
	CONSTRAINT "notes_chapterId_unique" UNIQUE("chapterId")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_chapterId_chapters_id_fk" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;