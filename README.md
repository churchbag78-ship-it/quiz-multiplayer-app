# Quiz Multiplayer App

A real-time multiplayer quiz application built with React, Node.js, Express, Socket.io, and PostgreSQL.

## Features

✨ **Real-time Multiplayer** - Play quizzes with friends in real-time with instant score updates
👥 **User Accounts** - Register and login to track your progress
📊 **Leaderboards** - See how you rank against other players
🎯 **Quiz Management** - Create, edit, and manage custom quizzes
🤖 **AI-Powered Quizzes** - Generate quiz questions using Claude AI (coming soon)
⚡ **Instant Feedback** - Get immediate feedback on your answers

## Project Structure

```
quiz-multiplayer-app/
├── packages/
│   ├── backend/          # Express.js server
│   │   ├── src/
│   │   │   ├── routes/   # API routes
│   │   │   ├── socket/   # Socket.io handlers
│   │   │   ├── utils/    # Auth, JWT utilities
│   │   │   ├── services/ # Business logic
│   │   │   └── index.ts  # Entry point
│   │   ├── prisma/       # Database schema
│   │   └── package.json
│   └── frontend/         # React app
│       ├── src/
│       │   ├── pages/    # Page components
│       │   ├── components/
│       │   ├── contexts/ # React contexts
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── package.json
└── package.json          # Root workspace config
```

## Tech Stack

**Backend:**
- Node.js + TypeScript
- Express.js - Web framework
- Prisma - ORM
- PostgreSQL - Database
- Socket.io - Real-time communication
- JWT - Authentication
- Anthropic SDK - AI-powered quiz generation

**Frontend:**
- React 18 - UI framework
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- Socket.io Client - Real-time updates
- Axios - HTTP client

## Setup Instructions

### Prerequisites

- Node.js 18+ (Already installed ✓)
- PostgreSQL 12+ (Required)
- Git

### 1. Database Setup

First, set up PostgreSQL:

```bash
# On Windows with PostgreSQL installed:
# Create a new database
psql -U postgres -c "CREATE DATABASE quiz_multiplayer;"
```

Or use an online PostgreSQL service like Neon, Supabase, or Railway.

### 2. Backend Setup

```bash
cd packages/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd packages/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Run Both (from root)

```bash
npm run dev
```

This will start both backend and frontend servers.

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quizzes
- `GET /api/quiz` - Get all public quizzes
- `GET /api/quiz/:id` - Get quiz with questions
- `POST /api/quiz` - Create new quiz (auth required)
- `PUT /api/quiz/:id` - Update quiz (auth required)
- `DELETE /api/quiz/:id` - Delete quiz (auth required)

### Game Sessions
- `POST /api/game/session` - Create game session
- `GET /api/game/session/:id` - Get game session
- `POST /api/game/session/:id/join` - Join game session
- `POST /api/game/session/:id/answer` - Submit answer
- `GET /api/game/leaderboard/:sessionId` - Get leaderboard

## WebSocket Events

### Client → Server
- `join-session` - Join a game session
- `start-game` - Start the game
- `answer-submitted` - Submit an answer
- `next-question` - Move to next question
- `end-game` - End current game
- `leave-session` - Leave game session

### Server → Client
- `player-joined` - New player joined
- `game-started` - Game has started
- `answer-result` - Result of submitted answer
- `question-changed` - Question changed
- `game-ended` - Game ended with leaderboard
- `player-left` - Player left session

## Upcoming Features

- [ ] AI-powered quiz generation with Claude API
- [ ] Quiz creator admin panel
- [ ] User profiles and stats
- [ ] Categories and difficulty levels
- [ ] Timed quizzes
- [ ] Mobile app (React Native)
- [ ] Social features (friends, invites)
- [ ] Analytics and reporting

## Development

### Build
```bash
npm run build
```

### Start Production
```bash
npm start
```

## Troubleshooting

**WebSocket connection issues:**
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify token is being passed correctly

**Database connection errors:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Run `npx prisma migrate dev` to sync schema

**API errors:**
- Check browser console for error messages
- Check backend logs
- Verify request headers include Authorization token

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.