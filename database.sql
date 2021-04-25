CREATE DATABASE ExerciseTracker;

CREATE TABLE Users(
    userId SERIAL PRIMARY KEY,
    username VARCHAR(255)
);

CREATE TABLE Exercises(
    exerciseId SERIAL PRIMARY KEY,
    userId INT,
    description VARCHAR(255),
    duration INT,
    date DATE,
    FOREIGN KEY(userId)
        REFERENCES Users(userId)
);