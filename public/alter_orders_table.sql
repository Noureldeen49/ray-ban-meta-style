-- Run this in phpMyAdmin to add customer columns to the orders table
-- (Only needs to be run once)

USE rayban_meta;

ALTER TABLE orders
    ADD COLUMN email   VARCHAR(255) NOT NULL DEFAULT '' AFTER total,
    ADD COLUMN name    VARCHAR(255) NOT NULL DEFAULT '' AFTER email,
    ADD COLUMN country VARCHAR(100) NOT NULL DEFAULT '' AFTER name,
    ADD COLUMN city    VARCHAR(100) NOT NULL DEFAULT '' AFTER country,
    ADD COLUMN address VARCHAR(255) NOT NULL DEFAULT '' AFTER city,
    ADD COLUMN zip     VARCHAR(20)  NOT NULL DEFAULT '' AFTER address,
    ADD COLUMN phone   VARCHAR(30)  NOT NULL DEFAULT '' AFTER zip;
