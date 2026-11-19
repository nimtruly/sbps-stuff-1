CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`student_name` text NOT NULL,
	`gender` text NOT NULL,
	`dob` text NOT NULL,
	`grade` text NOT NULL,
	`aadhaar_child` text,
	`previous_school` text,
	`previous_board` text,
	`last_class_percentage` text,
	`father_name` text NOT NULL,
	`father_occupation` text,
	`mother_name` text NOT NULL,
	`mother_occupation` text,
	`mobile` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`declaration` integer NOT NULL,
	`ip` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `career_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`position` text NOT NULL,
	`experience` text,
	`qualifications` text,
	`cover_note` text,
	`ip` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_name` text NOT NULL,
	`student_name` text NOT NULL,
	`grade` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`preferred_contact` text DEFAULT 'phone',
	`message` text,
	`ip` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`url` text,
	`channel` text NOT NULL,
	`status` text NOT NULL,
	`sent_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`payment_id` text,
	`signature` text,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'INR',
	`status` text NOT NULL,
	`fee_category` text NOT NULL,
	`student_name` text,
	`parent_email` text,
	`parent_phone` text,
	`notes` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`reset_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`channel` text DEFAULT 'web',
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_unique` ON `subscribers` (`email`);