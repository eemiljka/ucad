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
         ('ffd89.jpg', 887247, 'FUNNY PICTURE', null, 305, 'image/jpeg'),
         ('fxd.jpg', 887247, 'Otter', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 260, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

-- create additional tables COMMENTS, LIKES
CREATE TABLE Comments (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
  like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- add comments
INSERT INTO Comments (comment_id, media_id, user_id, comment_text, created_at) 
  VALUES (1, 1, 260, 'nice drink!', NULL),
         (2, 2, 260, 'REALLY FUNNY HAHA!', NULL),
         (3, 3, 260, 'Funny otter', NULL),
         (4, 4, 305, 'Cool photo!', NULL),
         (5, 5, 305, 'Always fun to be around friends!', NULL);

 --add likes
INSERT INTO Likes (like_id, media_id, user_id, created_at) 
  VALUES (1, 1, 260, NULL),
         (2, 2, 260, NULL),
         (3, 3, 260, NULL),
         (4, 4, 305, NULL),
         (5, 5, 305, NULL);

-- use cases for the data. Updating, deleting and query.
-- updating username of 'VCHar'
UPDATE Users SET username = "Michelangelo" WHERE user_id = 260;

-- updating password of  'Donatello'
UPDATE Users SET password = "myNewSecret123" WHERE user_id = 305;

-- posting new media
INSERT INTO MediaItems (user_id, filename, filesize, title, description, media_type, created_at)
VALUES (260, 'view.jpg', 101111, 'View', 'What a beautiful view', 'image/jpeg', NOW());

-- deleting comments and posts
DELETE FROM Likes WHERE media_id = 1;
DELETE FROM Comments WHERE media_id = 1;
DELETE FROM MediaItems WHERE media_id = 1;

-- querying comments
SELECT * FROM Comments WHERE user_id = 260;

-- querying 'everything' at the end
SELECT * from Users;
SELECT * from MediaItems;
SELECT * from Comments;
SELECT * from Likes;
