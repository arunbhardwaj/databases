DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `username_id` SMALLINT NOT NULL UNIQUE KEY,
  `text` TEXT NOT NULL,
  `roomname_id` SMALLINT NOT NULL UNIQUE KEY,
  PRIMARY KEY(`id`)
);
/* should you make it unique? */
/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40) NOT NULL DEFAULT 'anonymous',
  PRIMARY KEY(`id`),
  -- CONSTRAINT username_unique UNIQUE (`username`),
  FOREIGN KEY(`id`) REFERENCES messages(`username_id`)
);

CREATE TABLE rooms (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`id`) REFERENCES messages(`roomname_id`)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

ALTER TABLE messages
ADD FOREIGN KEY(`username_id`)
REFERENCES users(`id`);

ALTER TABLE messages
ADD FOREIGN KEY(`roomname_id`)
REFERENCES rooms(`id`);