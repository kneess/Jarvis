### Schema
DROP DATABASE IF EXISTS jarvis_db;
CREATE DATABASE jarvis_db;

CREATE TABLE hospitals
(
	id int NOT NULL AUTO_INCREMENT,
	hospital_name varchar(255) NOT NULL,
	zip_code INTEGER NOT NULL,
    surgery VARCHAR(255) NOT NULL,
    cost INTEGER NOT NULL
	PRIMARY KEY (id)
);
