CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"link_original" text NOT NULL,
	"link_shortened" text NOT NULL,
	"number_of_accesses" numeric DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_link_shortened_unique" UNIQUE("link_shortened")
);
