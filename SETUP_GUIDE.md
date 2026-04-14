# Quiz Multiplayer App - Setup Guide

## 🚀 Quick Start

### Step 1: Set Up PostgreSQL Database

You have two options:

#### Option A: Local PostgreSQL (Recommended for development)

1. **Install PostgreSQL** if you haven't already:
   - Download from https://www.postgresql.org/download/
   - During installation, remember your password for the `postgres` user

2. **Create the database:**
   ```bash
   psql -U postgres
   # Enter your password
   
   CREATE DATABASE quiz_multiplayer;
   \q
   ```

#### Option B: Cloud Database (Easier)

Use **Neon** (https://neon.tech/) - Free PostgreSQL hosting:

1. Sign up for free
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:password@host/dbname`)

---

### Step 2: Configure Backend

```bash
cd packages/backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit with your settings:
# DATABASE_URL=postgresql://user:password@localhost:5432/quiz_multiplayer
# JWT_SECRET=your_secret_key_here_change_in_production
# ANTHROPIC_API_KEY=sk-xxx (for AI features, optional for now)

# Run database migrations
npx prisma migrate dev --name init

# Start the server
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

---

### Step 3: Configure Frontend

In a **new terminal**:

```bash
cd packages/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend should be running on `http://localhost:5173`

---

### Step 4: Test the App

1. Open browser to `http://localhost:5173`
2. Register a new account (use any email/password)
3. You'll see the quiz list (currently empty)
4. Create a quiz (requires backend setup for questions)

---

## 📊 Creating Sample Data

To populate your app with sample quizzes, you can use Prisma Studio:

```bash
cd packages/backend
npx prisma studio
```

This opens an admin UI where you can:
1. Create a User
2. Create Quizzes
3. Add Questions and Answers
4. Mark answers as correct/incorrect

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "Can't connect to database"**
```
❌ Check DATABASE_URL in .env
❌ Ensure PostgreSQL is running
❌ Run: npx prisma migrate dev
```

**Error: "Port 5000 already in use"**
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>
```

### Frontend won't connect to backend

**Error: "Failed to fetch quizzes"**
```
❌ Ensure backend is running (http://localhost:5000)
❌ Check CORS settings in backend index.ts
❌ Open browser console (F12) for error details
```

### WebSocket connection failed

**Error: "Socket.io connection refused"**
```
❌ Backend must be running
❌ Check network tab in DevTools
❌ Verify socket.io is initialized in backend
```

---

## 🎯 Next Steps

### 1. Create a Quiz Programmatically

Create `packages/backend/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      username: "testuser",
      password: "hashedpassword",
    },
  });

  // Create a quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: "General Knowledge",
      description: "Test your general knowledge",
      creatorId: user.id,
      questions: {
        create: [
          {
            text: "What is the capital of France?",
            order: 1,
            answers: {
              create: [
                { text: "Paris", isCorrect: true },
                { text: "London", isCorrect: false },
                { text: "Berlin", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Created quiz:", quiz);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run: `npx ts-node seed.ts`

### 2. Set Up Claude API (Optional)

For AI-powered quiz generation:

1. Get API key from https://console.anthropic.com/
2. Add to `.env`: `ANTHROPIC_API_KEY=sk-xxx`
3. We'll add this feature next!

### 3. Add Quiz Creation UI

The admin panel for creating quizzes (coming next phase).

---

## 📁 File Structure Explained

```
backend/
├── src/
│   ├── index.ts          # Main server file
│   ├── routes/
│   │   ├── auth.ts       # Login/Register
│   │   ├── quiz.ts       # Quiz CRUD
│   │   └── game.ts       # Game sessions
│   ├── socket/
│   │   └── handlers.ts   # Real-time events
│   └── utils/
│       ├── jwt.ts        # Token generation
│       └── auth.ts       # Middleware
├── prisma/
│   └── schema.prisma     # Database schema
└── .env                  # Configuration

frontend/
├── src/
│   ├── pages/
│   │   ├── Login.tsx     # Auth page
│   │   ├── Home.tsx      # Quiz list
│   │   └── GamePage.tsx  # Game play
│   ├── contexts/
│   │   └── AuthContext.tsx # User state
│   ├── App.tsx           # Main component
│   └── main.tsx          # Entry point
└── vite.config.ts        # Build config
```

---

## 💡 Tips

- **Development Mode:** Both servers auto-reload on file changes
- **Database:** Use `npx prisma studio` to view/edit data
- **API Testing:** Use Postman or VSCode REST Client
- **Debugging:** Check browser DevTools (F12) and terminal logs

---

## 🚨 Important Notes

⚠️ **Before Production:**
- Change `JWT_SECRET` to a strong random string
- Set `NODE_ENV=production`
- Use environment-specific CORS
- Set up proper error handling
- Add rate limiting
- Use HTTPS only

---

## Need Help?

1. Check error messages in terminal and browser console
2. Read the README.md for API documentation
3. Check Prisma docs: https://www.prisma.io/docs/
4. Check Express docs: https://expressjs.com/

Good luck! 🎉