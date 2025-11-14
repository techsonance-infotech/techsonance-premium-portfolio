CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`position_id` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`resume_url` text NOT NULL,
	`cover_letter` text,
	`linkedin_url` text,
	`experience_years` integer,
	`status` text DEFAULT 'pending' NOT NULL,
	`applied_date` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`position_id`) REFERENCES `positions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`department` text NOT NULL,
	`location` text NOT NULL,
	`employment_type` text NOT NULL,
	`description` text NOT NULL,
	`requirements` text NOT NULL,
	`responsibilities` text NOT NULL,
	`salary_range` text,
	`status` text DEFAULT 'open' NOT NULL,
	`posted_date` text NOT NULL,
	`created_at` text NOT NULL
);
