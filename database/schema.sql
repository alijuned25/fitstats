CREATE DATABASE IF NOT EXISTS fitstats;

USE fitstats;


-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- FITNESS PROFILE
-- ==========================================

CREATE TABLE IF NOT EXISTS fitness_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    age INT,
    gender VARCHAR(20),

    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),

    activity_level VARCHAR(50),
    fitness_goal VARCHAR(50),

    bmi DECIMAL(5,2),
    bmr DECIMAL(7,2),
    tdee DECIMAL(7,2),
    calorie_target DECIMAL(7,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ==========================================
-- DIET PREFERENCES
-- ==========================================

CREATE TABLE IF NOT EXISTS diet_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    diet_type VARCHAR(50),
    allergies TEXT,
    disliked_foods TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ==========================================
-- WORKOUT PROGRESS
-- ==========================================

CREATE TABLE IF NOT EXISTS workout_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    workout_day INT,
    workout_name VARCHAR(100),

    exercise_name VARCHAR(100),

    sets INT,
    reps INT,

    completed BOOLEAN DEFAULT FALSE,

    completed_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ==========================================
-- PLANNER TASKS
-- ==========================================

CREATE TABLE IF NOT EXISTS planner_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    task_name VARCHAR(150),
    category VARCHAR(50),

    task_date DATE,

    completed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);