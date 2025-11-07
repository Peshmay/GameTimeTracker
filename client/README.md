Frontend Setup
cd client
npm install
npm run dev

Frontend runs at:
http://localhost:5173

## 🚀 Overview

The frontend is built using **React**, **TypeScript**, and **TailwindCSS**, and communicates with a Node.js + Express backend through REST APIs.

It includes pages for:

- User registration
- Viewing all users
- Choosing a game
- Tracking gameplay time
- Displaying statistics with charts

## 🧩 Features

### 🧍 User Registration

- Register with **Email**, **First Name**, and optional **Profile Picture**.
- If no image is uploaded, a random avatar is assigned.
- Uses **Zod** for input validation.

### 👥 Users Page

- Displays all registered users with photos and names.
- Option to add or delete users.

### 🕹️ Choose Game

- Displays 4 interactive game cards.
- Clicking a card starts a game timer.

### ⏱️ Game Timer

- Start/Stop buttons control session timer.
- User info displayed on screen.
- After stopping, the session is sent to backend.

### 📊 Statistics

- Recharts visualizations:
  - Total playtime per game
  - Weekly trends
  - Leaderboard of top players
- Dropdowns for game/user selection.

### 🌤️ Weather Widget

- Displays **current temperature**, **city**, and **date**.
- Fetches from the backend weather endpoint.

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies

```bash
cd client
npm install
```
