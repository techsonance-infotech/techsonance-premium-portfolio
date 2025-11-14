CREATE TABLE `contact_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
