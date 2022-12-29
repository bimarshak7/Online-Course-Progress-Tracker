CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id             UUID DEFAULT gen_random_uuid(),
  name           VARCHAR(50) NOT NULL,
  email          VARCHAR(50) NOT NULL,
  password       VARCHAR(60) NOT NULL,
  grad_year      INT,
  path           VARCHAR(50),

 PRIMARY KEY(id,email)
);
