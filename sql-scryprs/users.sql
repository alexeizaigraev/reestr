DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  subscription TEXT,
  status TEXT,
  token TEXT,
  avatarurl TEXT,
  verify BOOLEAN DEFAULT FALSE,
  verificationtoken TEXT,
  createdat DATE DEFAULT LOCALTIMESTAMP,
  updateat DATE
)
