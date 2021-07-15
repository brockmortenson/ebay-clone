CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR ( 255 ),
  hash VARCHAR ( 255 ),
  username VARCHAR ( 50 ),
  birthday DATE,
  created_on TIMESTAMPTZ
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (user_id)
);

CREATE TABLE saved_items_list (
  saved_items_list_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (user_id)
);

SET timezone = 'America/Los_Angeles'; 