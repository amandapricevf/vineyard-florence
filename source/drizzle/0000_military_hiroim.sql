CREATE TABLE `sermon_streams` (
	`video_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`published_at` text NOT NULL,
	`thumbnail` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
