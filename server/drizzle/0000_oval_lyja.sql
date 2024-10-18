CREATE TABLE `event_follows` (
	`eventId` integer NOT NULL,
	`userId` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`eventId`, `userId`),
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_tags` (
	`name` text NOT NULL,
	`eventId` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`name`, `eventId`),
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organisationId` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`isPublic` integer DEFAULT true NOT NULL,
	`timeStart` integer,
	`timeEnd` integer,
	`location` text,
	`bannerURI` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`organisationId`) REFERENCES `organisations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `form_submissions` (
	`formId` integer NOT NULL,
	`userId` integer NOT NULL,
	`answers` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`formId`, `userId`),
	FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`eventId` integer NOT NULL,
	`templateId` integer,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`role` text,
	`canEditResponses` integer DEFAULT false NOT NULL,
	`isPublic` integer DEFAULT true NOT NULL,
	`fields` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`templateId`) REFERENCES `templates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notification_rules` (
	`userId` integer NOT NULL,
	`keyword` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`userId`, `keyword`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`read` integer DEFAULT false NOT NULL,
	`type` text,
	`eventId` integer,
	`formId` integer,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "id_null_check" CHECK("notifications"."eventId" IS NOT NULL OR "notifications"."formId" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE `organisation_roles` (
	`organisationId` integer NOT NULL,
	`userId` integer NOT NULL,
	`role` text DEFAULT 'follower' NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`organisationId`, `userId`),
	FOREIGN KEY (`organisationId`) REFERENCES `organisations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `organisations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`avatarURI` text,
	`bannerURI` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `spotlights` (
	`week` integer NOT NULL,
	`eventId` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `template_autofills` (
	`userId` integer NOT NULL,
	`templateId` integer NOT NULL,
	`templateFieldId` integer NOT NULL,
	`value` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`userId`, `templateId`, `templateFieldId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`templateId`) REFERENCES `templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organisationId` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`role` text,
	`canEditResponses` integer DEFAULT false NOT NULL,
	`isPublic` integer DEFAULT true NOT NULL,
	`fields` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`organisationId`) REFERENCES `organisations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_autofills` (
	`userId` integer NOT NULL,
	`fieldType` text NOT NULL,
	`value` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	PRIMARY KEY(`userId`, `fieldType`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`avatarURI` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);