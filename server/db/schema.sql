DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id              SERIAL,
  puid            VARCHAR(36) NOT NULL DEFAULT (UUID()),
  name            VARCHAR(50) NOT NULL,
  email           VARCHAR(50) NOT NULL,
  password        VARCHAR(60) NOT NULL,
  grad_year       INT,
  path            VARCHAR(50),
  public          BOOLEAN DEFAULT 0,
  PRIMARY KEY(puid,id,email)
);

CREATE TABLE IF NOT EXISTS courses (
  id              INT AUTO_INCREMENT,
  pcid            VARCHAR(36) NOT NULL DEFAULT (UUID()),
  name            VARCHAR(50) NOT NULL,
  chapters        INT DEFAULT 1,
  category        VARCHAR(50),
  added_on        DATE DEFAULT (CURDATE()),
  completed       BOOLEAN DEFAULT 0,
  puid            VARCHAR(36),
  
  PRIMARY KEY(id,pcid),
  FOREIGN KEY (puid) REFERENCES users(puid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chapters (
  id              SERIAL,
  title           VARCHAR(50) NOT NULL,
  remarks         VARCHAR(50) DEFAULT '',
  chNo            INT NOT NULL,
  completed       BOOLEAN DEFAULT 0,
  date_completed  DATE,
  cid            INT,
  
  PRIMARY KEY(id),
  FOREIGN KEY (cid) REFERENCES courses(id) ON DELETE CASCADE
);