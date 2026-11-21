CREATE UNIQUE INDEX `toppings_name_kind_unique` ON `toppings` (`name`,`kind`);--> statement-breakpoint
DROP INDEX `toppings_name_unique`;
