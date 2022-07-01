CREATE DATABASE offchaindao;

CREATE TABLE proposal(
  proposal_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  ipfs VARCHAR(255),
  description VARCHAR(255),
  total_votes INTEGER,
  total_passed INTEGER
);

CREATE TABLE votes(
  proposal_id INTEGER,
  voter VARCHAR(255),
  vote_status BOOLEAN
);