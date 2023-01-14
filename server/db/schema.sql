DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id             SERIAL,
  puid           VARCHAR(36) NOT NULL DEFAULT (UUID()),
  name           VARCHAR(50) NOT NULL,
  email          VARCHAR(50) NOT NULL,
  password       VARCHAR(60) NOT NULL,
  grad_year      INT,
  path           VARCHAR(50),
  
  PRIMARY KEY(puid,id,email)
);

CREATE TABLE IF NOT EXISTS courses (
  id             SERIAL,
  pcid           VARCHAR(36) DEFAULT (UUID()),
  name           VARCHAR(50) NOT NULL,
  chapters       INT DEFAULT 1,
  category       VARCHAR(50),
  puid           VARCHAR(36),
  
  PRIMARY KEY(id,pcid),
  FOREIGN KEY (puid) REFERENCES users(puid) ON DELETE CASCADE
);
