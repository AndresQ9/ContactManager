CREATE DATABASE IF NOT EXISTS contactmanager;

USE contactmanager;

CREATE TABLE IF NOT EXISTS users (
	userID INT AUTO_INCREMENT PRIMARY KEY,
	userName VARCHAR(50),
	password VARCHAR(50),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
	contactID INT AUTO_INCREMENT PRIMARY KEY,	
	email VARCHAR(50),
	phone VARCHAR(50),
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	userID INT,
	FOREIGN KEY(userID) REFERENCES users(userID) ON DELETE CASCADE
);	
