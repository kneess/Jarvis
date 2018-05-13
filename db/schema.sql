### Schema
DROP DATABASE IF EXISTS jarvis_db;
CREATE DATABASE jarvis_db;
USE jarvis_db;

CREATE TABLE hospitals
(
	id int NOT NULL AUTO_INCREMENT,
	hospital_name varchar(255) NOT NULL,
	procedure varchar(255) NOT NULL,
    cost integer not null,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE hospitals
(
	id int NOT NULL AUTO_INCREMENT,
	provider varchar(255) NOT NULL,
	patients varchar(255) NOT NULL,
    hotel varchar(255) NOT NULL,
    gas_prices INTEGER NOT NULL,
	PRIMARY KEY (id)
);
