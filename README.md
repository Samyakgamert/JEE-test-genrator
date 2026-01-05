# JEE Adaptive Test Generator

A comprehensive JEE preparation platform that behaves like a real coaching institute, featuring adaptive practice, mock tests, and AI-powered question generation.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Gemini Pro
- **Auth**: Google OAuth (Mock/Simulated for MVP)

## Prerequisites
- Node.js (v18 or higher)
- Google Gemini API Key (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Setup & Installation

### 1. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (copy from `.env.example`):
```bash
cp .env.example .env
```
Edit `.env` and add your `GEMINI_API_KEY`.

### 2. Frontend Setup
```bash
cd client
npm install
```

## Running the Application

### Start the Backend
```bash
cd server
npm run dev
```
The server will start on `http://localhost:3000`.

### Start the Frontend
Open a new terminal:
```bash
cd client
npm run dev
```
The application will be available at `http://localhost:5173`.

## Features

### Practice Mode (Adaptive)
- Select Subject (Physics, Chemistry, Maths) and Topics.
- Difficulty adapts based on your performance (Streak logic).
- Questions are generated in real-time using Gemini AI.

### Mock Tests
- Full-length test environment.
- Timer and auto-submit on tab switch.

### Authentication
- Currently uses a simulated Google Login for ease of testing.
- Tracks user session locally.

## Project Structure
- `client/`: Frontend React application.
- `server/`: Backend Express API.
- `client/src/data/syllabus.ts`: Complete JEE Syllabus data.
- `server/src/services/geminiService.ts`: AI integration logic.
