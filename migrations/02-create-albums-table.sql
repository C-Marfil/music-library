 CREATE TABLE Albums (
  id SERIAL PRIMARY KEY,
  artist_id INT,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  CONSTRAINT fk_artist
  FOREIGN KEY(artist_id) 
  REFERENCES Artists(id)
  ON DELETE CASCADE
  );