# Quiz Multiplayer App - API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Authentication
All protected endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

Tokens are obtained from `/auth/login` or `/auth/register` and expire after 7 days.

---

## Auth Routes

### Register
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "username": "username"
  },
  "token": "eyJhbGc..."
}
```

**Errors:**
- `400` - Missing required fields
- `409` - User already exists
- `500` - Registration failed

---

### Login
**POST** `/auth/login`

Authenticate and get a token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "username": "username"
  },
  "token": "eyJhbGc..."
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Login failed

---

## Quiz Routes

### Get All Quizzes
**GET** `/quiz`

Fetch all public quizzes.

**Response:** `200 OK`
```json
[
  {
    "id": "cuid123",
    "title": "General Knowledge",
    "description": "Test your knowledge",
    "creatorId": "cuid456",
    "creator": {
      "username": "testuser"
    },
    "questions": [
      { "id": "q1" },
      { "id": "q2" }
    ],
    "isPublic": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### Get Quiz by ID
**GET** `/quiz/:id`

Get a single quiz with all questions and answers.

**Response:** `200 OK`
```json
{
  "id": "cuid123",
  "title": "General Knowledge",
  "description": "Test your knowledge",
  "creatorId": "cuid456",
  "creator": {
    "username": "testuser"
  },
  "questions": [
    {
      "id": "q1",
      "text": "What is the capital of France?",
      "order": 1,
      "answers": [
        {
          "id": "a1",
          "text": "Paris",
          "isCorrect": true
        },
        {
          "id": "a2",
          "text": "London",
          "isCorrect": false
        },
        {
          "id": "a3",
          "text": "Berlin",
          "isCorrect": false
        },
        {
          "id": "a4",
          "text": "Madrid",
          "isCorrect": false
        }
      ]
    }
  ],
  "isPublic": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Errors:**
- `404` - Quiz not found
- `500` - Failed to fetch quiz

---

### Create Quiz
**POST** `/quiz`
*Requires authentication*

Create a new quiz without questions.

**Request Body:**
```json
{
  "title": "My Quiz",
  "description": "A description of my quiz",
  "isPublic": true
}
```

**Response:** `201 Created`
```json
{
  "id": "cuid123",
  "title": "My Quiz",
  "description": "A description of my quiz",
  "creatorId": "cuid456",
  "isPublic": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Errors:**
- `400` - Title is required
- `401` - Missing or invalid token
- `500` - Failed to create quiz

---

### Update Quiz
**PUT** `/quiz/:id`
*Requires authentication*

Update quiz metadata (title, description, isPublic).

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "isPublic": false
}
```

**Response:** `200 OK`
```json
{
  "id": "cuid123",
  "title": "Updated Title",
  "description": "Updated description",
  "creatorId": "cuid456",
  "isPublic": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

**Errors:**
- `403` - Unauthorized (not the creator)
- `404` - Quiz not found
- `401` - Missing or invalid token
- `500` - Failed to update quiz

---

### Delete Quiz
**DELETE** `/quiz/:id`
*Requires authentication*

Delete a quiz and all associated questions and answers.

**Response:** `200 OK`
```json
{
  "message": "Quiz deleted"
}
```

**Errors:**
- `403` - Unauthorized (not the creator)
- `404` - Quiz not found
- `401` - Missing or invalid token
- `500` - Failed to delete quiz

---

## Question Routes

### ⭐ Add Question with 4 Answers
**POST** `/quiz/:id/questions`
*Requires authentication*

Add a question to a quiz. **Each question MUST have exactly 4 answers with exactly 1 correct answer.**

**Request Body:**
```json
{
  "text": "What is the capital of France?",
  "order": 1,
  "answers": [
    {
      "text": "Paris",
      "isCorrect": true
    },
    {
      "text": "London",
      "isCorrect": false
    },
    {
      "text": "Berlin",
      "isCorrect": false
    },
    {
      "text": "Madrid",
      "isCorrect": false
    }
  ]
}
```

**Validation Rules:**
- ✅ Question text is required and non-empty
- ✅ Order must be a positive number
- ✅ **MUST have exactly 4 answers**
- ✅ **MUST have exactly 1 correct answer**
- ✅ Each answer text must be non-empty

**Response:** `201 Created`
```json
{
  "id": "q1",
  "text": "What is the capital of France?",
  "order": 1,
  "quizId": "cuid123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "answers": [
    {
      "id": "a1",
      "text": "Paris",
      "isCorrect": true,
      "questionId": "q1"
    },
    {
      "id": "a2",
      "text": "London",
      "isCorrect": false,
      "questionId": "q1"
    },
    {
      "id": "a3",
      "text": "Berlin",
      "isCorrect": false,
      "questionId": "q1"
    },
    {
      "id": "a4",
      "text": "Madrid",
      "isCorrect": false,
      "questionId": "q1"
    }
  ]
}
```

**Errors:**
- `400` - Missing required fields
- `400` - "Question must have exactly 4 answer choices"
- `400` - "Question must have exactly one correct answer"
- `403` - Unauthorized (not the quiz creator)
- `404` - Quiz not found
- `401` - Missing or invalid token
- `500` - Failed to create question

**Example Error Response:**
```json
{
  "error": "Question must have exactly 4 answer choices (found 3)"
}
```

---

### Update Question
**PUT** `/quiz/:quizId/questions/:questionId`
*Requires authentication*

Update question text and answers.

**Request Body:**
```json
{
  "text": "Updated question text",
  "order": 2,
  "answers": [
    {
      "text": "Answer 1",
      "isCorrect": true
    },
    {
      "text": "Answer 2",
      "isCorrect": false
    },
    {
      "text": "Answer 3",
      "isCorrect": false
    },
    {
      "text": "Answer 4",
      "isCorrect": false
    }
  ]
}
```

**Validation Rules:**
- Same as creating a question
- **Must still have exactly 4 answers**
- **Must still have exactly 1 correct answer**

**Response:** `200 OK`
```json
{
  "id": "q1",
  "text": "Updated question text",
  "order": 2,
  "quizId": "cuid123",
  "answers": [...]
}
```

**Errors:**
- `400` - Validation errors (4 answers, 1 correct)
- `403` - Unauthorized
- `404` - Quiz or question not found
- `401` - Missing or invalid token
- `500` - Failed to update question

---

### Delete Question
**DELETE** `/quiz/:quizId/questions/:questionId`
*Requires authentication*

Delete a question and its answers.

**Response:** `200 OK`
```json
{
  "message": "Question deleted"
}
```

**Errors:**
- `403` - Unauthorized (not the quiz creator)
- `404` - Quiz or question not found
- `401` - Missing or invalid token
- `500` - Failed to delete question

---

## Game Routes

### Create Game Session
**POST** `/game/session`
*Requires authentication*

Create a new game session for a quiz.

**Request Body:**
```json
{
  "quizId": "cuid123"
}
```

**Response:** `201 Created`
```json
{
  "id": "session123",
  "quizId": "cuid123",
  "status": "waiting",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "startedAt": null,
  "endedAt": null,
  "quiz": {
    "id": "cuid123",
    "title": "General Knowledge",
    "questions": [...]
  },
  "participants": [
    {
      "id": "user123",
      "username": "player1"
    }
  ],
  "scores": []
}
```

**Errors:**
- `400` - Quiz ID is required
- `404` - Quiz not found
- `401` - Missing or invalid token
- `500` - Failed to create game session

---

### Get Game Session
**GET** `/game/session/:id`

Get details of a specific game session.

**Response:** `200 OK`
```json
{
  "id": "session123",
  "quizId": "cuid123",
  "status": "in_progress",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "startedAt": "2024-01-15T10:31:00.000Z",
  "endedAt": null,
  "quiz": {...},
  "participants": [...],
  "scores": [...]
}
```

**Errors:**
- `404` - Game session not found
- `500` - Failed to fetch game session

---

### Join Game Session
**POST** `/game/session/:id/join`
*Requires authentication*

Join an existing game session.

**Response:** `200 OK`
```json
{
  "id": "session123",
  "status": "waiting",
  "participants": [
    { "id": "user1", "username": "player1" },
    { "id": "user2", "username": "player2" }
  ],
  "scores": []
}
```

**Errors:**
- `400` - Already joined
- `404` - Game session not found
- `401` - Missing or invalid token
- `500` - Failed to join game session

---

### Submit Answer
**POST** `/game/session/:id/answer`
*Requires authentication*

Submit an answer and get the result.

**Request Body:**
```json
{
  "questionId": "q1",
  "answerId": "a1"
}
```

**Response:** `200 OK`
```json
{
  "isCorrect": true,
  "correctAnswerId": "a1"
}
```

**Errors:**
- `404` - Answer not found
- `401` - Missing or invalid token
- `500` - Failed to submit answer

---

### Get Leaderboard
**GET** `/game/leaderboard/:sessionId`

Get final scores and rankings for a game session.

**Response:** `200 OK`
```json
[
  {
    "id": "score1",
    "userId": "user1",
    "user": {
      "username": "player1"
    },
    "gameSessionId": "session123",
    "score": 100,
    "correctAnswers": 4,
    "totalQuestions": 4,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "score2",
    "userId": "user2",
    "user": {
      "username": "player2"
    },
    "gameSessionId": "session123",
    "score": 80,
    "correctAnswers": 3,
    "totalQuestions": 4,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## WebSocket Events

### Client → Server

#### join-session
Join a game session.
```javascript
socket.emit('join-session', sessionId, userId);
```

#### start-game
Start the game (host only).
```javascript
socket.emit('start-game', sessionId);
```

#### answer-submitted
Submit an answer.
```javascript
socket.emit('answer-submitted', {
  sessionId: 'session123',
  userId: 'user123',
  questionId: 'q1',
  answerId: 'a1'
});
```

#### next-question
Move to next question.
```javascript
socket.emit('next-question', {
  sessionId: 'session123',
  questionIndex: 1
});
```

#### end-game
End the game.
```javascript
socket.emit('end-game', sessionId);
```

#### leave-session
Leave the game.
```javascript
socket.emit('leave-session', sessionId, userId);
```

---

### Server → Client

#### player-joined
A new player joined.
```javascript
socket.on('player-joined', (data) => {
  // data: { userId, activePlayersCount }
});
```

#### game-started
The game has started.
```javascript
socket.on('game-started', (data) => {
  // data: { startedAt }
});
```

#### answer-result
Result of your answer submission.
```javascript
socket.on('answer-result', (data) => {
  // data: { userId, isCorrect, questionId }
});
```

#### question-changed
The question has changed.
```javascript
socket.on('question-changed', (data) => {
  // data: { questionIndex }
});
```

#### game-ended
The game has ended.
```javascript
socket.on('game-ended', (data) => {
  // data: { leaderboard, endedAt }
});
```

#### player-left
A player left the session.
```javascript
socket.on('player-left', (data) => {
  // data: { userId, activePlayersCount }
});
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Description of the error"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized (missing/invalid token) |
| 403  | Forbidden (not authorized for this action) |
| 404  | Not Found |
| 409  | Conflict (e.g., user already exists) |
| 500  | Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. In production:
- Implement rate limiting per IP/user
- Recommend: 100 requests per minute per user

---

## CORS Policy

The API allows requests from:
- **Development:** `http://localhost:5173`
- **Production:** Set in `process.env.CORS_ORIGIN`

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Create Quiz
```bash
curl -X POST http://localhost:5000/api/quiz \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Quiz",
    "description": "Quiz description",
    "isPublic": true
  }'
```

### Add Question (4 answers required!)
```bash
curl -X POST http://localhost:5000/api/quiz/QUIZ_ID/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "What is 2 + 2?",
    "order": 1,
    "answers": [
      { "text": "4", "isCorrect": true },
      { "text": "3", "isCorrect": false },
      { "text": "5", "isCorrect": false },
      { "text": "6", "isCorrect": false }
    ]
  }'
```

---

## Best Practices

1. **Token Storage:** Store tokens in secure httpOnly cookies
2. **Error Handling:** Always handle error responses
3. **Validation:** Validate data on client before sending
4. **4 Answers Requirement:** Always ensure questions have exactly 4 answers with 1 correct
5. **Polling:** Use WebSocket events instead of polling for updates
6. **Timeouts:** Implement request timeouts (30 seconds recommended)