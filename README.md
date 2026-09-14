# FitStats - AI-Powered Fitness Management Platform

FitStats is a full-stack fitness management web application designed to help users track their fitness information, manage workouts and diet preferences, plan fitness-related tasks, calculate health metrics, and interact with an AI fitness assistant called Sensei.

The application combines a modern React frontend, Node.js/Express backend, MySQL database, and Gemini AI to provide a centralized platform for fitness planning and progress management.

---

## Features

### 1. Fitness Profile Management

Users can maintain their personal fitness information, including:

- Age
- Gender
- Height
- Weight
- Activity level
- Fitness goal
- BMI
- BMR
- TDEE
- Daily calorie target

The calculated fitness metrics can be stored and retrieved through the backend database.

---

### 2. Workout Management

FitStats provides workout tracking functionality where users can:

- View workout plans
- Track workout days
- Manage exercises
- Record sets and repetitions
- Mark exercises as completed
- Track workout progress
- Store workout progress in the database

This allows users to keep their workout information organized and monitor their progress over time.

---

### 3. Diet Management

The diet module allows users to manage their dietary preferences and restrictions.

Users can store:

- Diet type
- Food allergies
- Disliked foods
- Other dietary preferences

This information can also be used by Sensei to provide more personalized fitness and nutrition guidance.

---

### 4. Fitness Calculator

FitStats includes fitness-related calculators for commonly used metrics.

The application can calculate metrics such as:

- BMI (Body Mass Index)
- BMR (Basal Metabolic Rate)
- TDEE (Total Daily Energy Expenditure)
- Daily calorie targets

These calculations help users understand their estimated calorie requirements and fitness goals.

---

### 5. Fitness Planner

The planner allows users to organize fitness-related tasks.

Users can:

- Create tasks
- Categorize tasks
- Assign dates
- Mark tasks as completed
- Store planner tasks in the database

This provides a simple way to organize workouts, diet-related activities, and other fitness goals.

---

### 6. Sensei - AI Fitness Assistant

FitStats includes an AI-powered fitness assistant called **Sensei**.

Sensei uses the Gemini API to provide personalized responses based on the user's available fitness information.

Sensei can use information such as:

- Fitness profile
- Workout information
- Workout progress
- Diet preferences
- Planner tasks
- Calculator results

Instead of providing completely generic responses, Sensei can use the user's current FitStats data to provide more contextual fitness guidance.

> Sensei is intended as a fitness assistance feature and should not be considered a replacement for professional medical or nutritional advice.

---

### 7. Dashboard

The dashboard provides a centralized view of important fitness information.

It is designed to give users quick access to:

- Fitness statistics
- Workout information
- Planner information
- Fitness goals
- Calorie-related information
- Other important application features

---

### 8. Dark and Light Theme

FitStats supports both:

- Light mode
- Dark mode

The interface is designed to maintain consistent styling across the application while adapting the colors and components to the selected theme.

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST APIs
- CORS
- dotenv

### Database

- MySQL
- MySQL Workbench
- Aiven MySQL

### Artificial Intelligence

- Google Gemini API
- `@google/genai`

### Development and Deployment

- Git
- GitHub
- Vercel
- Render
- Aiven

---

## System Architecture

```text
                         FITSTATS
                            |
             +--------------+--------------+
             |                             |
        React Frontend                Node.js Backend
             |                             |
          Vite                         Express.js
             |                             |
             |              +--------------+--------------+
             |              |              |              |
             |          Profile API     Workout API    Diet API
             |              |              |              |
             |              +--------------+--------------+
             |                             |
             |                        Planner API
             |                             |
             |                         Sensei API
             |                             |
             |                    +--------+--------+
             |                    |                 |
             |                 MySQL           Gemini API
             |                    |
             |                 Aiven
             |
          User Interface
