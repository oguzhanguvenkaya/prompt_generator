CREATE TABLE "boost_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt_id" uuid NOT NULL,
	"iteration" integer NOT NULL,
	"score" real NOT NULL,
	"feedback" text,
	"revised_prompt" text,
	"result_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generated_prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"agent_id" varchar(50) NOT NULL,
	"target_model" varchar(100) NOT NULL,
	"prompt" text NOT NULL,
	"negative_prompt" text,
	"parameters" jsonb,
	"boost_score" real,
	"boost_iterations" integer DEFAULT 0 NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "model_configs" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"category" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"provider" varchar(50) NOT NULL,
	"prompt_format" varchar(20) NOT NULL,
	"supported_sizes" jsonb,
	"quality_options" jsonb,
	"style_presets" jsonb,
	"supports_negative_prompt" boolean DEFAULT false NOT NULL,
	"max_prompt_length" integer,
	"documentation_url" text,
	"specific_rules" text,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_datasets" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(20) NOT NULL,
	"target_model" varchar(100),
	"prompt" text NOT NULL,
	"negative_prompt" text,
	"tags" jsonb,
	"quality" real,
	"source" varchar(200)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_id" varchar(50) NOT NULL,
	"target_model" varchar(100),
	"title" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usage_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" varchar(50) NOT NULL,
	"model" varchar(100) NOT NULL,
	"input_tokens" integer DEFAULT 0 NOT NULL,
	"output_tokens" integer DEFAULT 0 NOT NULL,
	"cost_usd" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "boost_results" ADD CONSTRAINT "boost_results_prompt_id_generated_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."generated_prompts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_prompts" ADD CONSTRAINT "generated_prompts_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;