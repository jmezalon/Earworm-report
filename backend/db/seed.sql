DROP DATABASE IF EXISTS max_mezalon_final_practical;
CREATE DATABASE max_mezalon_final_practical;

\c max_mezalon_final_practical;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre VARCHAR NOT NULL UNIQUE
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  img_url VARCHAR NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  genre_id INT REFERENCES genres(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  song_id INT REFERENCES songs(id) ON DELETE CASCADE NOT NULL
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  song_id INT REFERENCES songs(id) ON DELETE CASCADE NOT NULl
);




INSERT INTO users (username) VALUES ('Maxymax'), ('Kimmy'), ('Crymall'), ('McCorey'), ('Jojo'), ('Nikki'), ('Nielene'), ('Trayway'), ('Angie'), ('Kiki');


INSERT INTO genres (genre) VALUES ('Hip-Hop/Rap'), ('Kompa'), ('R&B'), ('Raggae'), ('Christian');


INSERT INTO songs (title, img_url, user_id, genre_id) VALUES
('Lord, I Need You', 'https://pbs.twimg.com/media/BId5rQICMAAfErg.jpg', 9, 5),
('Map Marye', 'https://i1.sndcdn.com/artworks-000157378894-0mfzyi-t500x500.jpg', 1, 2),
('Start Over', 'https://images.genius.com/9ff72ecce321980c87eed95e7304bd5f.1000x1000x1.jpg', 2, 1),
('Lots Of Love', 'https://www.musiconvinyl.com/fotos/3910_foto1_product_xl.jpg', 5, 4),
('My boo', 'https://i.ytimg.com/vi/t4z6M7Tbpk0/hqdefault.jpg', 10, 3),
('Middle Child', 'https://i.ytimg.com/vi/LTNdtIq4IwY/maxresdefault.jpg', 3, 1),
('Pitit Deyo', 'https://i.ytimg.com/vi/8sPUHKML2Yw/maxresdefault.jpg', 6, 2),
('With You', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/WithYouChrisBrown.jpg/220px-WithYouChrisBrown.jpg', 8, 3),
('Do Not Worry, Be Happy', 'https://i.ytimg.com/vi/bbcv96muNBc/maxresdefault.jpg', 7, 4),
('Break Every Chain', 'https://images-na.ssl-images-amazon.com/images/I/716x8wAvBxL._SL1500_.jpg', 4, 5),
('Kenbel La', 'https://direct.rhapsody.com/imageserver/images/Alb.269570892/500x500.jpg', 1, 2),
('Fok Mwen Ale', 'http://www.sawpanse.com/wp-content/uploads/2011/02/pjay-flav-fok-mwen-ale-video-shoot.jpg', 2, 3),
('All I Need Is You', 'https://images.genius.com/a548e7726899041022be8afdf51b1b08.1000x1000x1.jpg', 9, 1),
('Se Pa Pou Dat', 'https://i.ytimg.com/vi/bRj4cixh1hE/hqdefault.jpg', 1, 2),
('Victory Belongs To Jesus', 'https://i.ytimg.com/vi/IkASX8Fd1tE/maxresdefault.jpg', 10, 5);


INSERT INTO favorites (user_id, song_id) VALUES
(9, 1),
(1, 1),
(2, 5),
(5, 3),
(10, 4),
(3, 15),
(6, 6),
(8, 4),
(7, 15),
(4, 8),
(1, 2),
(2, 9),
(9, 10),
(1, 11),
(10, 1),
(9, 12),
(1, 8),
(2, 10),
(8, 7),
(10, 13),
(3, 14),
(6, 15),
(8, 15),
(7, 9),
(4, 14),
(9, 5),
(2, 2),
(2, 11),
(5, 11),
(10, 12),
(3, 9),
(6, 8),
(8, 1),
(7, 6),
(4, 15),
(1, 4),
(2, 12),
(9, 11),
(1, 12),
(10, 15);


INSERT INTO comments (comment, user_id, song_id) VALUES
('best song ever', 9, 15),
('yes I do', 1, 10),
('fok mwen marye kamen', 2, 2),
('good job', 5, 3),
('my dream song', 10, 4),
('i love this song', 3, 5),
('thumbs up', 6, 6),
('the best of the best', 8, 4),
('this is lit', 7, 7),
('i have to blast this one', 4, 8),
('omg i love hearing this song', 1, 6),
('why not!!!', 2, 9),
('break the chains Jesus, please please please!!!', 9, 10),
('please do not let her go', 1, 11),
('yo, where do these guys get them lyrics', 10, 8),
('oh man, this is thriller', 9, 12),
('wow, simply wow!!!', 1, 1),
('omggggg', 2, 13),
('it has been a whil, i love this girl', 5, 14),
('yes the victory belongs to Jesus', 10, 15);
