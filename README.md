# GameTimeTracker

cd server
npm install
npx prisma migrate dev
npm run dev

## 🟨 **Backend README (server/README.md)**

```markdown
# 🧠 Game Time Tracker – Backend (API Server)

This is the **backend** of the Game Time Tracker application.  
It’s built using **Node.js + Express + TypeScript** and connects to a **PostgreSQL** database using **Prisma ORM**.

---

## ⚙️ Overview

The backend provides REST API endpoints for:

- Registering users
- Uploading profile pictures
- Managing games
- Tracking play sessions
- Generating game statistics
- Returning live weather data via OpenWeatherMap API

## 🧱 Database (ERD)

User ───< Session >─── Game

User(id, firstName, lastName, email, profilePic)
Game(id, name, genre, image)
Session(id, userId, gameId, minutes, startedAt, endedAt)

## 🧾 Environment Variables (.env)

DATABASE_URL="postgresql://user:password@localhost:5432/gametracker"
WEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY
PORT=4000
```
