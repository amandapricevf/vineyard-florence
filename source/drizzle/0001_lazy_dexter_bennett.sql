CREATE TABLE `prayer_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`request` text NOT NULL,
	`contact_permission` text NOT NULL,
	`confidentiality` text NOT NULL,
	`delivery_status` text DEFAULT 'stored' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
