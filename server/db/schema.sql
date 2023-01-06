CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;

CREATE TABLE IF NOT EXISTS users (
  id             UUID DEFAULT gen_random_uuid(),
  name           VARCHAR(50) NOT NULL,
  email          VARCHAR(50) NOT NULL,
  password       VARCHAR(60) NOT NULL,
  grad_year      INT,
  path           VARCHAR(50),

 PRIMARY KEY(id,email)
);

CREATE TABLE IF NOT EXISTS courses (
  id             UUID DEFAULT gen_random_uuid(),
  name           VARCHAR(50) NOT NULL,
  chapters       INT DEFAULT 1,
  category       VARCHAR(50),
  owner           VARCHAR(60),
 PRIMARY KEY(id)
);
