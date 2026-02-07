-- Create the Musichub Database
CREATE DATABASE IF NOT EXISTS musichub;
USE musichub;

-- Users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    profile_pic VARCHAR(255),
    description TEXT
);

-- Artists Table
CREATE TABLE artists (
    artist_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    social_instagram VARCHAR(255),
    social_twitter VARCHAR(255)
);

-- Albums Table
CREATE TABLE albums (
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    cover_image VARCHAR(255)
);

-- Songs Table
CREATE TABLE songs (
    song_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    cover_image VARCHAR(255),
    duration VARCHAR(10),
    artist_id INT,
    album_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id)
);

-- Favorites Table
CREATE TABLE favorites (
    favorite_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    song_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);

-- Insert Sample User
INSERT INTO users (username, profile_pic, description)
VALUES ('Udayraje', 'profile-pic.jpg', 'Music Lover | Developer');

-- Insert Artists
INSERT INTO artists (name, social_instagram, social_twitter)
VALUES 
('Cartoon', 'https://instagram.com/cartoon', 'https://twitter.com/cartoon'),
('DEAF KEV', 'https://instagram.com/deafkev', 'https://twitter.com/deafkev'),
('Janji', 'https://instagram.com/janji', 'https://twitter.com/janji'),
('Tobu', 'https://instagram.com/tobuofficial', 'https://twitter.com/tobuofficial'),
('Elektronomia', 'https://instagram.com/elektronomia', 'https://twitter.com/elektronomia');

-- Insert Album
INSERT INTO albums (title, cover_image)
VALUES ('Best of NCS', 'covers/ncs.jpg');

-- Insert Songs (10 total)
INSERT INTO songs (title, file_path, cover_image, duration, artist_id, album_id)
VALUES 
('On & On - Cartoon', 'songs/1.mp3', 'covers/1.jpg', '3:30', 1, 1),
('Invincible - DEAF KEV', 'songs/2.mp3', 'covers/2.jpg', '4:10', 2, 1),
('Mortals - Warriyo', 'songs/3.mp3', 'covers/3.jpg', '3:20', 2, 1),
('Shine - Spektrem', 'songs/4.mp3', 'covers/4.jpg', '3:45', 4, 1),
('Why We Lose - Cartoon', 'songs/5.mp3', 'covers/5.jpg', '3:55', 1, 1),
('Sky High - Elektronomia', 'songs/6.mp3', 'covers/6.jpg', '3:40', 5, 1),
('Symbolism - Electro-Light', 'songs/7.mp3', 'covers/7.jpg', '4:00', 4, 1),
('Heroes Tonight - Janji', 'songs/8.mp3', 'covers/8.jpg', '3:50', 3, 1),
('Feel Good - Syn Cole', 'songs/9.mp3', 'covers/9.jpg', '4:20', 5, 1),
('My Heart - Different Heaven', 'songs/10.mp3', 'covers/10.jpg', '3:35', 4, 1);

-- Insert Favorite Songs for Udayraje
INSERT INTO favorites (user_id, song_id)
VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);
