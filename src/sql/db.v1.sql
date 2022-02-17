DROP DATABASE IF EXISTS TODO_events_app;

CREATE DATABASE IF NOT EXISTS TODO_events_app;

USE TODO_events_app;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR (50) NOT NULL,
    first_name VARCHAR (100),
    rol ENUM('ADMIN', 'USUARIO') NOT NULL DEFAULT 'USUARIO',
    pass VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS dependencies(
    id_dependency INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dependency_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS events(
    id_event INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(255),
    fk_dependency INT,
    is_active boolean NOT NULL DEFAULT true,
    FOREIGN KEY (fk_dependency) REFERENCES dependencies (id_dependency)
);



INSERT INTO dependencies(dependency_name) VALUES ("Gimnasio");
INSERT INTO dependencies(dependency_name) VALUES ("Tesoreria");

INSERT INTO events(event_name, fk_dependency) VALUES ("Evento 1", 1);
INSERT INTO events(event_name, fk_dependency) VALUES ("Evento 2", 1);
INSERT INTO events(event_name, fk_dependency) VALUES ("Evento 2", 2);
INSERT INTO events(event_name, fk_dependency) VALUES ("Evento 1", 2);



INSERT INTO users(user, first_name, pass, rol) VALUES ('IUSH','IUSH ADMIN', '$2a$08$LjwwQ5POn6Pu/evLnA4xeeLOGt5Ys1XmwjEEGwNgqH9OTP7rwd5f2', 'ADMIN');
