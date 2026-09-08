CREATE TABLE `flavours` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `flavours_name_unique` ON `flavours` (`name`);--> statement-breakpoint
CREATE TABLE `product_toppings` (
	`productId` integer NOT NULL,
	`toppingId` integer NOT NULL,
	PRIMARY KEY(`productId`, `toppingId`),
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`toppingId`) REFERENCES `toppings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`base` text NOT NULL,
	`flavourId` integer,
	`price` integer NOT NULL,
	`calories` integer NOT NULL,
	`shelfLife` integer NOT NULL,
	`image` text NOT NULL,
	`description` text NOT NULL,
	`isAvailable` integer DEFAULT true NOT NULL,
	`isNew` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`flavourId`) REFERENCES `flavours`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `toppings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `toppings_name_unique` ON `toppings` (`name`);