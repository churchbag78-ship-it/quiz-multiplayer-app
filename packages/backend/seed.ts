/**
 * Seed script to populate database with sample data
 * Each question MUST have exactly 4 answers
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      username: "testuser",
      password: hashedPassword,
    },
  });
  console.log(`✅ Created user: ${user.username}`);

  // Create sample quiz with 4 questions
  const quiz = await prisma.quiz.create({
    data: {
      title: "General Knowledge Quiz",
      description: "Test your knowledge of geography, history, and science!",
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
                { text: "Madrid", isCorrect: false },
              ],
            },
          },
          {
            text: "Which planet is known as the Red Planet?",
            order: 2,
            answers: {
              create: [
                { text: "Venus", isCorrect: false },
                { text: "Mars", isCorrect: true },
                { text: "Jupiter", isCorrect: false },
                { text: "Saturn", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the largest ocean on Earth?",
            order: 3,
            answers: {
              create: [
                { text: "Atlantic Ocean", isCorrect: false },
                { text: "Indian Ocean", isCorrect: false },
                { text: "Pacific Ocean", isCorrect: true },
                { text: "Arctic Ocean", isCorrect: false },
              ],
            },
          },
          {
            text: "In what year did World War II end?",
            order: 4,
            answers: {
              create: [
                { text: "1943", isCorrect: false },
                { text: "1944", isCorrect: false },
                { text: "1945", isCorrect: true },
                { text: "1946", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  console.log(`✅ Created quiz: "${quiz.title}"`);
  console.log(`   Questions: ${quiz.questions.length}`);
  console.log(`   Answers per question: 4`);

  // Create another quiz
  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Programming Fundamentals",
      description: "Test your knowledge of programming concepts",
      creatorId: user.id,
      questions: {
        create: [
          {
            text: "What does HTML stand for?",
            order: 1,
            answers: {
              create: [
                { text: "Hyper Text Markup Language", isCorrect: true },
                { text: "High Tech Modern Language", isCorrect: false },
                { text: "Home Tool Markup Language", isCorrect: false },
                { text: "Hyperlinks and Text Markup Language", isCorrect: false },
              ],
            },
          },
          {
            text: "Which of these is a NoSQL database?",
            order: 2,
            answers: {
              create: [
                { text: "PostgreSQL", isCorrect: false },
                { text: "MongoDB", isCorrect: true },
                { text: "MySQL", isCorrect: false },
                { text: "SQLite", isCorrect: false },
              ],
            },
          },
          {
            text: "What does API stand for?",
            order: 3,
            answers: {
              create: [
                { text: "Application Programming Interface", isCorrect: true },
                { text: "Advanced Programming Integration", isCorrect: false },
                { text: "Application Protocol Integration", isCorrect: false },
                { text: "Application Programming Infrastructure", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  console.log(`✅ Created quiz: "${quiz2.title}"`);
  console.log(`   Questions: ${quiz2.questions.length}`);

  console.log("\n✨ Database seed completed successfully!");
  console.log(`\n📊 Summary:`);
  console.log(`   Users: 1`);
  console.log(`   Quizzes: 2`);
  console.log(`   Total Questions: ${quiz.questions.length + quiz2.questions.length}`);
  console.log(`   Total Answers: ${(quiz.questions.length + quiz2.questions.length) * 4}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
