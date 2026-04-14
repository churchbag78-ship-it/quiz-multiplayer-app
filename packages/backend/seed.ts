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

  // Create mixed quiz with Trending Topics, Peep Show, and Music
  const trendingQuiz = await prisma.quiz.create({
    data: {
      title: "Ultimate Knowledge Quiz 2024",
      description: "Trending topics, Peep Show trivia, music legends, sports & more! 🌍📺🎵⚽🚀",
      creatorId: user.id,
      questions: {
        create: [
          {
            text: "Which AI company released ChatGPT-4 in 2024?",
            order: 1,
            answers: {
              create: [
                { text: "OpenAI", isCorrect: true },
                { text: "Google DeepMind", isCorrect: false },
                { text: "Anthropic", isCorrect: false },
                { text: "Meta AI", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won the 2024 Super Bowl?",
            order: 2,
            answers: {
              create: [
                { text: "Kansas City Chiefs", isCorrect: true },
                { text: "San Francisco 49ers", isCorrect: false },
                { text: "Buffalo Bills", isCorrect: false },
                { text: "Los Angeles Rams", isCorrect: false },
              ],
            },
          },
          {
            text: "Which streaming platform premiered 'The Rings of Power' Season 2?",
            order: 3,
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
            text: "What is the name of Elon Musk's AI company?",
            order: 4,
            answers: {
              create: [
                { text: "xAI", isCorrect: true },
                { text: "OpenAI", isCorrect: false },
                { text: "Anthropic", isCorrect: false },
                { text: "DeepMind", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won the Grammy Award for Album of the Year in 2024?",
            order: 5,
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
            text: "Which country hosted the 2024 Summer Olympics?",
            order: 6,
            answers: {
              create: [
                { text: "France", isCorrect: true },
                { text: "Japan", isCorrect: false },
                { text: "Italy", isCorrect: false },
                { text: "Brazil", isCorrect: false },
              ],
            },
          },
          {
            text: "Which film won Best Picture at the 2024 Oscars?",
            order: 7,
            answers: {
              create: [
                { text: "Oppenheimer", isCorrect: true },
                { text: "Barbie", isCorrect: false },
                { text: "Killers of the Flower Moon", isCorrect: false },
                { text: "American Fiction", isCorrect: false },
              ],
            },
          },
          {
            text: "What major milestone did NASA achieve in 2024?",
            order: 8,
            answers: {
              create: [
                { text: "Private space station operations began", isCorrect: true },
                { text: "Mars colonization started", isCorrect: false },
                { text: "New moon base opened", isCorrect: false },
                { text: "First manned flight to Venus", isCorrect: false },
              ],
            },
          },
          {
            text: "Which social media platform introduced 'Threads'?",
            order: 9,
            answers: {
              create: [
                { text: "Meta (Instagram)", isCorrect: true },
                { text: "Twitter", isCorrect: false },
                { text: "TikTok", isCorrect: false },
                { text: "Snapchat", isCorrect: false },
              ],
            },
          },
          {
            text: "Who became the first-ever female NBA G League player in 2024?",
            order: 10,
            answers: {
              create: [
                { text: "Olivia Rozman", isCorrect: true },
                { text: "Jewell Loyd", isCorrect: false },
                { text: "Breanna Stewart", isCorrect: false },
                { text: "Satou Sabally", isCorrect: false },
              ],
            },
          },
          {
            text: "Which superhero movie had the biggest opening in 2024?",
            order: 11,
            answers: {
              create: [
                { text: "Deadpool & Wolverine", isCorrect: true },
                { text: "Captain America: Brave New World", isCorrect: false },
                { text: "Joker: Folie à Deux", isCorrect: false },
                { text: "Inside Out 2", isCorrect: false },
              ],
            },
          },
          {
            text: "What major tech announcement did Apple make at WWDC 2024?",
            order: 12,
            answers: {
              create: [
                { text: "Apple Intelligence AI features", isCorrect: true },
                { text: "New iPhone 16 specs", isCorrect: false },
                { text: "Mac Studio 2 release", isCorrect: false },
                { text: "Apple Watch 10 launch", isCorrect: false },
              ],
            },
          },
          {
            text: "Which world leader changed in a major 2024 election?",
            order: 13,
            answers: {
              create: [
                { text: "UK Prime Minister (Labour won)", isCorrect: true },
                { text: "German Chancellor", isCorrect: false },
                { text: "French President", isCorrect: false },
                { text: "Canadian Prime Minister", isCorrect: false },
              ],
            },
          },
          {
            text: "Who hosted the Oscars ceremony in 2024?",
            order: 14,
            answers: {
              create: [
                { text: "Jimmy Kimmel", isCorrect: true },
                { text: "Conan O'Brien", isCorrect: false },
                { text: "Seth Meyers", isCorrect: false },
                { text: "Stephen Colbert", isCorrect: false },
              ],
            },
          },
          {
            text: "Which streaming service became the most profitable in 2024?",
            order: 15,
            answers: {
              create: [
                { text: "Netflix", isCorrect: true },
                { text: "Amazon Prime Video", isCorrect: false },
                { text: "Disney+", isCorrect: false },
                { text: "Max (HBO)", isCorrect: false },
              ],
            },
          },
          {
            text: "Which artist won the most Grammy Awards in history (as of 2024)?",
            order: 16,
            answers: {
              create: [
                { text: "Taylor Swift", isCorrect: true },
                { text: "Beyoncé", isCorrect: false },
                { text: "Georg Solti", isCorrect: false },
                { text: "Quincy Jones", isCorrect: false },
              ],
            },
          },
          {
            text: "Who was the biggest artist of the 2000s, known for hits like 'Without Me'?",
            order: 17,
            answers: {
              create: [
                { text: "Eminem", isCorrect: true },
                { text: "50 Cent", isCorrect: false },
                { text: "Nelly", isCorrect: false },
                { text: "Ja Rule", isCorrect: false },
              ],
            },
          },
          {
            text: "Which song became the most-streamed song on Spotify in 2024?",
            order: 18,
            answers: {
              create: [
                { text: "Blinding Lights - The Weeknd", isCorrect: true },
                { text: "Shape of You - Ed Sheeran", isCorrect: false },
                { text: "Levitating - Dua Lipa", isCorrect: false },
                { text: "One Dance - Drake", isCorrect: false },
              ],
            },
          },
          {
            text: "Which British singer dominated the 2010s with hit albums like '÷' (Divide)?",
            order: 19,
            answers: {
              create: [
                { text: "Ed Sheeran", isCorrect: true },
                { text: "Harry Styles", isCorrect: false },
                { text: "Adele", isCorrect: false },
                { text: "The Weeknd", isCorrect: false },
              ],
            },
          },
          {
            text: "Who released 'Thriller', the best-selling album of all time?",
            order: 20,
            answers: {
              create: [
                { text: "Michael Jackson", isCorrect: true },
                { text: "Prince", isCorrect: false },
                { text: "David Bowie", isCorrect: false },
                { text: "Queen", isCorrect: false },
              ],
            },
          },
          {
            text: "What are the names of the two main characters in the UK series 'Peep Show'?",
            order: 21,
            answers: {
              create: [
                { text: "Mark and Jez", isCorrect: true },
                { text: "Tim and Daisy", isCorrect: false },
                { text: "Roy and Moss", isCorrect: false },
                { text: "Gordon and Jack", isCorrect: false },
              ],
            },
          },
          {
            text: "How many series did 'Peep Show' run before ending?",
            order: 22,
            answers: {
              create: [
                { text: "9 series", isCorrect: true },
                { text: "6 series", isCorrect: false },
                { text: "12 series", isCorrect: false },
                { text: "7 series", isCorrect: false },
              ],
            },
          },
          {
            text: "In 'Peep Show', what is Mark Corrigan's job profession?",
            order: 23,
            answers: {
              create: [
                { text: "Lawyer", isCorrect: true },
                { text: "Accountant", isCorrect: false },
                { text: "Banker", isCorrect: false },
                { text: "Therapist", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the unique storytelling style of 'Peep Show'?",
            order: 24,
            answers: {
              create: [
                { text: "First-person internal monologue from character's perspective", isCorrect: true },
                { text: "Third-person omniscient narration", isCorrect: false },
                { text: "Documentary style with interviews", isCorrect: false },
                { text: "Animated sequences", isCorrect: false },
              ],
            },
          },
          {
            text: "What is Jez Usborne's primary character flaw in 'Peep Show'?",
            order: 25,
            answers: {
              create: [
                { text: "His lack of responsibility and unreliability", isCorrect: true },
                { text: "His extreme jealousy", isCorrect: false },
                { text: "His violent temper", isCorrect: false },
                { text: "His obsession with money", isCorrect: false },
              ],
            },
          },
          {
            text: "Which British network aired 'Peep Show'?",
            order: 26,
            answers: {
              create: [
                { text: "Channel 4", isCorrect: true },
                { text: "BBC", isCorrect: false },
                { text: "ITV", isCorrect: false },
                { text: "Sky Atlantic", isCorrect: false },
              ],
            },
          },
          {
            text: "In what year did 'Peep Show' first premiere?",
            order: 27,
            answers: {
              create: [
                { text: "2003", isCorrect: true },
                { text: "2005", isCorrect: false },
                { text: "2001", isCorrect: false },
                { text: "2000", isCorrect: false },
              ],
            },
          },
          {
            text: "What major global event significantly impacted 2024?",
            order: 28,
            answers: {
              create: [
                { text: "Multiple elections across major countries", isCorrect: true },
                { text: "A major pandemic outbreak", isCorrect: false },
                { text: "A world war declaration", isCorrect: false },
                { text: "Economic collapse", isCorrect: false },
              ],
            },
          },
          {
            text: "Which renewable energy source saw the biggest growth in 2024?",
            order: 29,
            answers: {
              create: [
                { text: "Solar power", isCorrect: true },
                { text: "Wind power", isCorrect: false },
                { text: "Hydroelectric", isCorrect: false },
                { text: "Geothermal", isCorrect: false },
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
