DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(128) NOT NULL,
  state VARCHAR(2) NOT NULL,
  country VARCHAR(128) NOT NULL,
  zip VARCHAR(5) NOT NULL,
  birthday TIMESTAMP,
  website VARCHAR(255)
);
