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

  // Create 15-question Entertainment & Pop Culture trending quiz
  const trendingQuiz = await prisma.quiz.create({
    data: {
      title: "Entertainment & Pop Culture Trending Quiz",
      description: "Test your knowledge of the latest entertainment and pop culture trends! 🎬🎵🎭",
      creatorId: user.id,
      questions: {
        create: [
          {
            text: "Which streaming platform premiered 'The Rings of Power'?",
            order: 1,
            answers: {
              create: [
                { text: "Amazon Prime", isCorrect: true },
                { text: "Netflix", isCorrect: false },
                { text: "Disney+", isCorrect: false },
                { text: "Apple TV+", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won the Grammy Award for Album of the Year in 2024?",
            order: 2,
            answers: {
              create: [
                { text: "Taylor Swift", isCorrect: true },
                { text: "The Weeknd", isCorrect: false },
                { text: "Billie Eilish", isCorrect: false },
                { text: "Drake", isCorrect: false },
              ],
            },
          },
          {
            text: "Which Marvel movie broke box office records in 2023?",
            order: 3,
            answers: {
              create: [
                { text: "Barbie", isCorrect: false },
                { text: "Oppenheimer", isCorrect: false },
                { text: "Deadpool & Wolverine", isCorrect: true },
                { text: "Guardians of the Galaxy Vol. 3", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the name of Elon Musk's AI company?",
            order: 4,
            answers: {
              create: [
                { text: "OpenAI", isCorrect: false },
                { text: "xAI", isCorrect: true },
                { text: "Anthropic", isCorrect: false },
                { text: "DeepMind", isCorrect: false },
              ],
            },
          },
          {
            text: "Which K-pop group surpassed The Beatles on Spotify in 2023?",
            order: 5,
            answers: {
              create: [
                { text: "NewJeans", isCorrect: false },
                { text: "BTS", isCorrect: true },
                { text: "BLACKPINK", isCorrect: false },
                { text: "Stray Kids", isCorrect: false },
              ],
            },
          },
          {
            text: "Who hosted the Oscars in 2024?",
            order: 6,
            answers: {
              create: [
                { text: "Jimmy Kimmel", isCorrect: true },
                { text: "Conan O'Brien", isCorrect: false },
                { text: "Seth Meyers", isCorrect: false },
                { text: "John Mulaney", isCorrect: false },
              ],
            },
          },
          {
            text: "Which social media platform introduced 'Threads' in 2023?",
            order: 7,
            answers: {
              create: [
                { text: "Twitter", isCorrect: false },
                { text: "Meta (Instagram)", isCorrect: true },
                { text: "TikTok", isCorrect: false },
                { text: "Snapchat", isCorrect: false },
              ],
            },
          },
          {
            text: "Who became the youngest billionaire through content creation?",
            order: 8,
            answers: {
              create: [
                { text: "Addison Rae", isCorrect: false },
                { text: "Charli D'Amelio", isCorrect: false },
                { text: "Kylie Jenner", isCorrect: true },
                { text: "James Charles", isCorrect: false },
              ],
            },
          },
          {
            text: "Which superhero movie had the biggest opening weekend in 2024?",
            order: 9,
            answers: {
              create: [
                { text: "Captain America: Brave New World", isCorrect: false },
                { text: "Deadpool & Wolverine", isCorrect: true },
                { text: "Aquaman 3", isCorrect: false },
                { text: "Spider-Man: Beyond the Spider-Verse", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the name of Taylor Swift's recent album era tour?",
            order: 10,
            answers: {
              create: [
                { text: "Reputation Stadium Tour", isCorrect: false },
                { text: "Lover Tour", isCorrect: false },
                { text: "The Eras Tour", isCorrect: true },
                { text: "Midnights Tour", isCorrect: false },
              ],
            },
          },
          {
            text: "Which Netflix series became a global phenomenon in 2023?",
            order: 11,
            answers: {
              create: [
                { text: "Stranger Things", isCorrect: false },
                { text: "Squid Game: The Challenge", isCorrect: false },
                { text: "Oppenheimer", isCorrect: false },
                { text: "Wednesday", isCorrect: true },
              ],
            },
          },
          {
            text: "Who replaced Elon Musk as Twitter CEO?",
            order: 12,
            answers: {
              create: [
                { text: "Jack Dorsey", isCorrect: false },
                { text: "Linda Yaccarino", isCorrect: true },
                { text: "Parag Agrawal", isCorrect: false },
                { text: "Evan Williams", isCorrect: false },
              ],
            },
          },
          {
            text: "Which film won Best Picture at the 2024 Oscars?",
            order: 13,
            answers: {
              create: [
                { text: "Oppenheimer", isCorrect: true },
                { text: "Barbie", isCorrect: false },
                { text: "The Killers of the Flower Moon", isCorrect: false },
                { text: "American Fiction", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the most-watched Netflix series of all time?",
            order: 14,
            answers: {
              create: [
                { text: "Bridgerton", isCorrect: false },
                { text: "Squid Game", isCorrect: true },
                { text: "Stranger Things", isCorrect: false },
                { text: "The Crown", isCorrect: false },
              ],
            },
          },
          {
            text: "Which celebrity announced their retirement from music in 2024?",
            order: 15,
            answers: {
              create: [
                { text: "The Weeknd", isCorrect: false },
                { text: "Billie Eilish", isCorrect: false },
                { text: "Rihanna", isCorrect: false },
                { text: "Justin Bieber", isCorrect: true },
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

  console.log(`✅ Created quiz: "${trendingQuiz.title}"`);
  console.log(`   Questions: ${trendingQuiz.questions.length}`);
  console.log(`   Answers per question: 4`);

  // Keep the programming quiz
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
  console.log(`   Total Questions: ${trendingQuiz.questions.length + quiz2.questions.length}`);
  console.log(`   Total Answers: ${(trendingQuiz.questions.length + quiz2.questions.length) * 4}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
