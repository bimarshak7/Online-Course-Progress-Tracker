CREATE TABLE IF NOT EXISTS users (
  id             SERIAL PRIMARY KEY,
  name           VARCHAR(50) NOT NULL,
  email          VARCHAR(50) NOT NULL,
  password          VARCHAR(50) NOT NULL,
  grad_year      INT NULL,
  path          VARCHAR(50) NULL
);
