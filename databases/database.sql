--C:/Users/eemil/OneDrive/Desktop/Koulutiedostot/Lukuvuosi-II/ucad/databases/database.sql

DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- create tables

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- add users
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

-- add media items
--INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
--VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 1606, 'image/jpeg', NULL);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('ffd89.jpg', 887247, 'lol', null, 305, 'image/jpeg'),
         ('fxd.jpg', 887247, 'xd', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');