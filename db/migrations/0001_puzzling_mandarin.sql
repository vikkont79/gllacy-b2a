PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`base` text NOT NULL,
	`flavourId` integer NOT NULL,
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
INSERT INTO `__new_products`("id", "slug", "name", "base", "flavourId", "price", "calories", "shelfLife", "image", "description", "isAvailable", "isNew", "createdAt", "updatedAt") SELECT "id", "slug", "name", "base", "flavourId", "price", "calories", "shelfLife", "image", "description", "isAvailable", "isNew", "createdAt", "updatedAt" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);