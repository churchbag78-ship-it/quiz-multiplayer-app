# 4 Multiple Choice Answers - Implementation Guide

## Overview

Every question in your quiz app **must have exactly 4 answer choices**, with **exactly 1 correct answer**.

This is enforced at the backend API level with comprehensive validation.

---

## Why 4 Answers?

✅ **Balanced difficulty** - 25% chance of guessing correctly  
✅ **Standard format** - Most standardized tests use 4 options (SAT, GRE, etc.)  
✅ **User friendly** - Not too many to be overwhelming  
✅ **Statistical validity** - Good for measuring knowledge vs. luck  

---

## Validation Rules

### Backend Validation (Enforced)

Every question must have:

1. **Exactly 4 Answer Choices**
   ```
   ❌ 3 answers → Error: "Question must have exactly 4 answer choices (found 3)"
   ❌ 5 answers → Error: "Question must have exactly 4 answer choices (found 5)"
   ✅ 4 answers → Success
   ```

2. **Exactly 1 Correct Answer**
   ```
   ❌ 0 correct → Error: "Question must have exactly one correct answer"
   ❌ 2 correct → Error: "Question cannot have multiple correct answers (found 2)"
   ✅ 1 correct → Success
   ```

3. **No Empty Answer Text**
   ```
   ❌ "text": "" → Error: "Answer 1: Text is required"
   ✅ "text": "Valid answer" → Success
   ```

### Frontend Validation (User Experience)

The CreateQuiz component prevents users from:
- Submitting without 4 answer fields filled
- Submitting without selecting one correct answer
- Showing disabled radio buttons until filled

---

## API Usage

### Creating a Question with 4 Answers

**Endpoint:** `POST /api/quiz/:quizId/questions`

**Example Request:**
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

**Response (201 Created):**
```json
{
  "id": "q1_abc123",
  "text": "What is the capital of France?",
  "order": 1,
  "quizId": "quiz_xyz789",
  "answers": [
    {
      "id": "a1",
      "text": "Paris",
      "isCorrect": true,
      "questionId": "q1_abc123"
    },
    {
      "id": "a2",
      "text": "London",
      "isCorrect": false,
      "questionId": "q1_abc123"
    },
    {
      "id": "a3",
      "text": "Berlin",
      "isCorrect": false,
      "questionId": "q1_abc123"
    },
    {
      "id": "a4",
      "text": "Madrid",
      "isCorrect": false,
      "questionId": "q1_abc123"
    }
  ]
}
```

---

## Error Examples

### Error 1: Not Enough Answers
**Request:**
```json
{
  "text": "Which planet is closest to the sun?",
  "order": 1,
  "answers": [
    { "text": "Mercury", "isCorrect": true },
    { "text": "Venus", "isCorrect": false },
    { "text": "Earth", "isCorrect": false }
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Question must have exactly 4 answer choices (found 3)"
}
```

### Error 2: Multiple Correct Answers
**Request:**
```json
{
  "text": "Which of these are planets?",
  "order": 1,
  "answers": [
    { "text": "Mercury", "isCorrect": true },
    { "text": "Venus", "isCorrect": true },
    { "text": "Moon", "isCorrect": false },
    { "text": "Asteroid", "isCorrect": false }
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Question cannot have multiple correct answers (found 2)"
}
```

### Error 3: No Correct Answer
**Request:**
```json
{
  "text": "What is the largest planet?",
  "order": 1,
  "answers": [
    { "text": "Mercury", "isCorrect": false },
    { "text": "Venus", "isCorrect": false },
    { "text": "Earth", "isCorrect": false },
    { "text": "Mars", "isCorrect": false }
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Question must have exactly one correct answer"
}
```

### Error 4: Empty Answer Text
**Request:**
```json
{
  "text": "What is 2 + 2?",
  "order": 1,
  "answers": [
    { "text": "4", "isCorrect": true },
    { "text": "", "isCorrect": false },
    { "text": "6", "isCorrect": false },
    { "text": "8", "isCorrect": false }
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Answer 2: Text is required"
}
```

---

## Creating Quizzes with Sample Data

### Using Seed Script

The project includes a seed script that creates sample quizzes with properly formatted 4-answer questions.

```bash
cd packages/backend
npm install
npx prisma migrate dev --name init
npm run seed
```

This creates:
- ✅ User: "testuser"
- ✅ Quiz 1: "General Knowledge Quiz" (4 questions × 4 answers)
- ✅ Quiz 2: "Programming Fundamentals" (3 questions × 4 answers)

---

### Manual Database Entry

Using Prisma Studio:
```bash
cd packages/backend
npx prisma studio
```

1. Open the `questions` table
2. For each question, ensure you create exactly 4 `answers` records
3. Set one answer's `isCorrect` to `true`
4. Set three answers' `isCorrect` to `false`

---

### Using the CreateQuiz Component

The frontend provides a user-friendly interface:

1. Navigate to "Create Quiz"
2. Enter quiz title and description
3. For each question:
   - Enter question text
   - Fill in all **4** answer fields
   - Click the radio button to mark **1** correct answer
   - Click "Add Question"
4. Review and submit

The form prevents:
- ❌ Submitting with empty answer fields
- ❌ Submitting without selecting a correct answer
- ❌ Submitting with multiple correct answers

---

## Data Model

### Database Schema

```prisma
model Question {
  id        String     @id @default(cuid())
  quizId    String
  quiz      Quiz       @relation(fields: [quizId], references: [id])
  text      String
  order     Int
  createdAt DateTime   @default(now())
  
  answers Answer[]     // MUST have exactly 4 of these
  
  @@map("questions")
}

model Answer {
  id         String     @id @default(cuid())
  questionId String
  question   Question   @relation(fields: [questionId], references: [id])
  text       String
  isCorrect  Boolean    @default(false)  // Exactly 1 should be true
  
  @@map("answers")
}
```

### Answer Selection During Gameplay

When a player selects an answer:

```json
{
  "sessionId": "session_123",
  "userId": "user_456",
  "questionId": "q1",
  "answerId": "a2"  // One of the 4 answers
}
```

The system:
1. Finds the answer by ID
2. Checks if `isCorrect === true`
3. Awards 10 points if correct
4. Broadcasts result to all players

---

## Frontend Example: Answer Display

```tsx
<div className="space-y-3">
  {question.answers.map((answer, idx) => (
    <button
      key={answer.id}
      onClick={() => submitAnswer(answer.id)}
      className={`p-4 text-left rounded ${
        selectedAnswer === answer.id && answer.isCorrect
          ? 'bg-green-500 text-white'
          : selectedAnswer === answer.id && !answer.isCorrect
          ? 'bg-red-500 text-white'
          : 'bg-gray-100'
      }`}
    >
      {answer.text}
    </button>
  ))}
</div>
```

The 4 answers are always displayed as a grid of buttons.

---

## Validation Service

The backend includes a comprehensive validation service:

```typescript
// src/services/quizValidation.ts

validateQuestion(question, questionIndex): void
  // Validates:
  // - Question text is required
  // - Exactly 4 answers present
  // - Each answer has text
  // - Exactly 1 correct answer

validateAnswer(answer, questionNum, answerNum): void
  // Validates:
  // - Answer text is required
  // - isCorrect is boolean
```

---

## Testing

### Test with cURL

```bash
# Create a question with 4 answers
curl -X POST http://localhost:5000/api/quiz/quiz123/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "Test question?",
    "order": 1,
    "answers": [
      { "text": "Option 1", "isCorrect": true },
      { "text": "Option 2", "isCorrect": false },
      { "text": "Option 3", "isCorrect": false },
      { "text": "Option 4", "isCorrect": false }
    ]
  }'
```

### Test with Postman

1. Create a new POST request
2. URL: `http://localhost:5000/api/quiz/quiz123/questions`
3. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN`
4. Body (raw JSON):
   ```json
   {
     "text": "Test question?",
     "order": 1,
     "answers": [
       { "text": "Option 1", "isCorrect": true },
       { "text": "Option 2", "isCorrect": false },
       { "text": "Option 3", "isCorrect": false },
       { "text": "Option 4", "isCorrect": false }
     ]
   }
   ```

---

## Migration to Existing Data

If you have quizzes with different numbers of answers:

1. **Identify non-conforming questions:**
   ```sql
   SELECT q.id, q.text, COUNT(a.id) as answer_count
   FROM questions q
   LEFT JOIN answers a ON q.id = a.question_id
   GROUP BY q.id
   HAVING COUNT(a.id) != 4;
   ```

2. **Delete and recreate:**
   ```sql
   DELETE FROM answers WHERE question_id = 'non_conforming_q_id';
   DELETE FROM questions WHERE id = 'non_conforming_q_id';
   ```

3. **Re-add questions with exactly 4 answers via API**

---

## Summary

| Requirement | Status |
|---|---|
| Exactly 4 answers per question | ✅ Enforced |
| Exactly 1 correct answer | ✅ Enforced |
| Non-empty answer text | ✅ Enforced |
| API validation | ✅ Backend |
| Frontend validation | ✅ CreateQuiz component |
| Seed data | ✅ seed.ts |
| Sample questions | ✅ 7 questions in seed |
| Documentation | ✅ This guide |

Everything is ready to use! 🎉