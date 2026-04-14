/**
 * Seed script with 75+ question pool
 * Each question MUST have exactly 4 answers
 * Each game selects a random subset of questions
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed with large question pool...\n");

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

  // Create large pool quiz (75+ questions)
  const largeQuiz = await prisma.quiz.create({
    data: {
      title: "Ultimate Knowledge Quiz 2024",
      description: "75+ rotating questions! Get different questions every login - Peep Show, Music, Trending, Sports & more! 🌍📺🎵⚽🚀",
      creatorId: user.id,
      questions: {
        create: [
          // PEEP SHOW QUESTIONS (15 questions)
          {
            text: "What are the names of the two main characters in 'Peep Show'?",
            order: 1,
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
            order: 2,
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
            text: "What is Mark Corrigan's job in 'Peep Show'?",
            order: 3,
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
            order: 4,
            answers: {
              create: [
                { text: "First-person internal monologue", isCorrect: true },
                { text: "Third-person narration", isCorrect: false },
                { text: "Documentary style", isCorrect: false },
                { text: "Animated sequences", isCorrect: false },
              ],
            },
          },
          {
            text: "Which network aired 'Peep Show'?",
            order: 5,
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
            order: 6,
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
            text: "What is Jez Usborne's primary character flaw?",
            order: 7,
            answers: {
              create: [
                { text: "Lack of responsibility", isCorrect: true },
                { text: "Extreme jealousy", isCorrect: false },
                { text: "Violent temper", isCorrect: false },
                { text: "Obsession with money", isCorrect: false },
              ],
            },
          },
          {
            text: "What does Mark obsess over throughout the series?",
            order: 8,
            answers: {
              create: [
                { text: "Social anxiety and self-image", isCorrect: true },
                { text: "Becoming rich", isCorrect: false },
                { text: "Winning awards", isCorrect: false },
                { text: "Meeting celebrities", isCorrect: false },
              ],
            },
          },
          {
            text: "Which character was a struggling musician in 'Peep Show'?",
            order: 9,
            answers: {
              create: [
                { text: "Jez Usborne", isCorrect: true },
                { text: "Mark Corrigan", isCorrect: false },
                { text: "Super Hans", isCorrect: false },
                { text: "Zahra Karim", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the apartment building called in 'Peep Show'?",
            order: 10,
            answers: {
              create: [
                { text: "New Cross", isCorrect: true },
                { text: "Tower Bridge", isCorrect: false },
                { text: "Camden Heights", isCorrect: false },
                { text: "Elephant Court", isCorrect: false },
              ],
            },
          },
          {
            text: "Who was Super Hans in relation to Jez?",
            order: 11,
            answers: {
              create: [
                { text: "Best friend", isCorrect: true },
                { text: "Brother", isCorrect: false },
                { text: "Therapist", isCorrect: false },
                { text: "Boss", isCorrect: false },
              ],
            },
          },
          {
            text: "How many characters were in the main cast of 'Peep Show'?",
            order: 12,
            answers: {
              create: [
                { text: "4 main characters", isCorrect: true },
                { text: "2 main characters", isCorrect: false },
                { text: "6 main characters", isCorrect: false },
                { text: "5 main characters", isCorrect: false },
              ],
            },
          },
          {
            text: "What was the setting of most 'Peep Show' episodes?",
            order: 13,
            answers: {
              create: [
                { text: "London", isCorrect: true },
                { text: "Manchester", isCorrect: false },
                { text: "Bristol", isCorrect: false },
                { text: "Liverpool", isCorrect: false },
              ],
            },
          },
          {
            text: "Did 'Peep Show' have a laugh track?",
            order: 14,
            answers: {
              create: [
                { text: "No", isCorrect: true },
                { text: "Yes, continuous", isCorrect: false },
                { text: "Sometimes", isCorrect: false },
                { text: "Only in later seasons", isCorrect: false },
              ],
            },
          },
          {
            text: "What decade was 'Peep Show' most popular?",
            order: 15,
            answers: {
              create: [
                { text: "2000s and 2010s", isCorrect: true },
                { text: "1990s", isCorrect: false },
                { text: "2020s", isCorrect: false },
                { text: "1980s", isCorrect: false },
              ],
            },
          },

          // MUSIC QUESTIONS (18 questions)
          {
            text: "Who released 'Thriller', the best-selling album ever?",
            order: 16,
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
            text: "Which artist won the most Grammy Awards in history?",
            order: 17,
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
            text: "Who was the biggest artist of the 2000s?",
            order: 18,
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
            text: "What is the most-streamed song on Spotify?",
            order: 19,
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
            text: "Which British singer dominated the 2010s?",
            order: 20,
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
            text: "Who won the Grammy Award for Album of the Year in 2024?",
            order: 21,
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
            text: "Which K-pop group surpassed The Beatles on Spotify?",
            order: 22,
            answers: {
              create: [
                { text: "BTS", isCorrect: true },
                { text: "NewJeans", isCorrect: false },
                { text: "BLACKPINK", isCorrect: false },
                { text: "Stray Kids", isCorrect: false },
              ],
            },
          },
          {
            text: "What is Taylor Swift's Eras Tour named after?",
            order: 23,
            answers: {
              create: [
                { text: "Her album eras/time periods", isCorrect: true },
                { text: "Fashion eras", isCorrect: false },
                { text: "Music genres", isCorrect: false },
                { text: "Tour locations", isCorrect: false },
              ],
            },
          },
          {
            text: "Which female artist has the most Grammys ever?",
            order: 24,
            answers: {
              create: [
                { text: "Taylor Swift", isCorrect: true },
                { text: "Beyoncé", isCorrect: false },
                { text: "Billie Eilish", isCorrect: false },
                { text: "Adele", isCorrect: false },
              ],
            },
          },
          {
            text: "What genre is Billie Eilish known for?",
            order: 25,
            answers: {
              create: [
                { text: "Alternative/Indie", isCorrect: true },
                { text: "Country", isCorrect: false },
                { text: "Gospel", isCorrect: false },
                { text: "Heavy Metal", isCorrect: false },
              ],
            },
          },
          {
            text: "Who is known as the 'King of Pop'?",
            order: 26,
            answers: {
              create: [
                { text: "Michael Jackson", isCorrect: true },
                { text: "Prince", isCorrect: false },
                { text: "Elvis Presley", isCorrect: false },
                { text: "David Bowie", isCorrect: false },
              ],
            },
          },
          {
            text: "Which artist released 'Lemonade' in 2016?",
            order: 27,
            answers: {
              create: [
                { text: "Beyoncé", isCorrect: true },
                { text: "Rihanna", isCorrect: false },
                { text: "Alicia Keys", isCorrect: false },
                { text: "Mary J. Blige", isCorrect: false },
              ],
            },
          },
          {
            text: "Who sang 'Bohemian Rhapsody'?",
            order: 28,
            answers: {
              create: [
                { text: "Queen", isCorrect: true },
                { text: "The Beatles", isCorrect: false },
                { text: "Pink Floyd", isCorrect: false },
                { text: "Led Zeppelin", isCorrect: false },
              ],
            },
          },
          {
            text: "What is The Weeknd's real name?",
            order: 29,
            answers: {
              create: [
                { text: "Abel Makkonen Tesfaye", isCorrect: true },
                { text: "Christopher Maurice Brown", isCorrect: false },
                { text: "Aubrey Drake Graham", isCorrect: false },
                { text: "Armando Christian Pérez", isCorrect: false },
              ],
            },
          },
          {
            text: "Which artist famously dropped an album without warning in 2013?",
            order: 30,
            answers: {
              create: [
                { text: "Beyoncé", isCorrect: true },
                { text: "Taylor Swift", isCorrect: false },
                { text: "Drake", isCorrect: false },
                { text: "Kanye West", isCorrect: false },
              ],
            },
          },
          {
            text: "Who is known for their high vocal range and operatic style?",
            order: 31,
            answers: {
              create: [
                { text: "Ariana Grande", isCorrect: true },
                { text: "Billie Eilish", isCorrect: false },
                { text: "Dua Lipa", isCorrect: false },
                { text: "Selena Gomez", isCorrect: false },
              ],
            },
          },
          {
            text: "Which rapper released '90210'?",
            order: 32,
            answers: {
              create: [
                { text: "The Weeknd", isCorrect: true },
                { text: "Drake", isCorrect: false },
                { text: "Kendrick Lamar", isCorrect: false },
                { text: "J. Cole", isCorrect: false },
              ],
            },
          },

          // TRENDING TOPICS (15 questions)
          {
            text: "Which streaming platform premiered 'The Rings of Power'?",
            order: 33,
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
            order: 34,
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
            text: "Which country hosted the 2024 Summer Olympics?",
            order: 35,
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
            text: "Which AI company released ChatGPT-4?",
            order: 36,
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
            text: "What is the unique feature of Apple Intelligence?",
            order: 37,
            answers: {
              create: [
                { text: "On-device AI processing", isCorrect: true },
                { text: "Cloud-only AI", isCorrect: false },
                { text: "Voice recognition only", isCorrect: false },
                { text: "Text generation only", isCorrect: false },
              ],
            },
          },
          {
            text: "Which social media platform introduced 'Threads'?",
            order: 38,
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
            text: "Which major global event significantly impacted 2024?",
            order: 39,
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
            text: "Which renewable energy source saw biggest growth in 2024?",
            order: 40,
            answers: {
              create: [
                { text: "Solar power", isCorrect: true },
                { text: "Wind power", isCorrect: false },
                { text: "Hydroelectric", isCorrect: false },
                { text: "Geothermal", isCorrect: false },
              ],
            },
          },
          {
            text: "Who replaced Elon Musk as Twitter CEO?",
            order: 41,
            answers: {
              create: [
                { text: "Linda Yaccarino", isCorrect: true },
                { text: "Jack Dorsey", isCorrect: false },
                { text: "Parag Agrawal", isCorrect: false },
                { text: "Evan Williams", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the most popular AI chatbot as of 2024?",
            order: 42,
            answers: {
              create: [
                { text: "ChatGPT", isCorrect: true },
                { text: "Bard", isCorrect: false },
                { text: "Claude", isCorrect: false },
                { text: "LLaMA", isCorrect: false },
              ],
            },
          },
          {
            text: "Which streaming service became the most profitable in 2024?",
            order: 43,
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
            text: "What tech trend dominated 2024 discussions?",
            order: 44,
            answers: {
              create: [
                { text: "Artificial Intelligence", isCorrect: true },
                { text: "Crypto currencies", isCorrect: false },
                { text: "Virtual Reality", isCorrect: false },
                { text: "Blockchain", isCorrect: false },
              ],
            },
          },
          {
            text: "Which Netflix series became a global phenomenon in 2023?",
            order: 45,
            answers: {
              create: [
                { text: "Wednesday", isCorrect: true },
                { text: "Stranger Things", isCorrect: false },
                { text: "Squid Game: The Challenge", isCorrect: false },
                { text: "Oppenheimer", isCorrect: false },
              ],
            },
          },
          {
            text: "What does API stand for in tech?",
            order: 46,
            answers: {
              create: [
                { text: "Application Programming Interface", isCorrect: true },
                { text: "Advanced Programming Integration", isCorrect: false },
                { text: "Application Protocol Integration", isCorrect: false },
                { text: "Application Programming Infrastructure", isCorrect: false },
              ],
            },
          },
          {
            text: "Which major cloud provider is AWS?",
            order: 47,
            answers: {
              create: [
                { text: "Amazon", isCorrect: true },
                { text: "Microsoft", isCorrect: false },
                { text: "Google", isCorrect: false },
                { text: "Apple", isCorrect: false },
              ],
            },
          },

          // SPORTS QUESTIONS (12 questions)
          {
            text: "Who won the 2024 Super Bowl?",
            order: 48,
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
            text: "Which athlete is the GOAT of basketball?",
            order: 49,
            answers: {
              create: [
                { text: "Michael Jordan", isCorrect: true },
                { text: "LeBron James", isCorrect: false },
                { text: "Kobe Bryant", isCorrect: false },
                { text: "Kareem Abdul-Jabbar", isCorrect: false },
              ],
            },
          },
          {
            text: "Who became the first-ever female NBA G League player in 2024?",
            order: 50,
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
            text: "Which sport uses the term 'Checkmate'?",
            order: 51,
            answers: {
              create: [
                { text: "Chess", isCorrect: true },
                { text: "Tennis", isCorrect: false },
                { text: "Golf", isCorrect: false },
                { text: "Cricket", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won the most Olympic medals ever?",
            order: 52,
            answers: {
              create: [
                { text: "Michael Phelps", isCorrect: true },
                { text: "Usain Bolt", isCorrect: false },
                { text: "Simone Biles", isCorrect: false },
                { text: "Roger Federer", isCorrect: false },
              ],
            },
          },
          {
            text: "Which football team won the 2024 Super Bowl halftime show?",
            order: 53,
            answers: {
              create: [
                { text: "Kansas City Chiefs", isCorrect: true },
                { text: "San Francisco 49ers", isCorrect: false },
                { text: "Buffalo Bills", isCorrect: false },
                { text: "Detroit Lions", isCorrect: false },
              ],
            },
          },
          {
            text: "Who is known as the 'GOAT' of tennis?",
            order: 54,
            answers: {
              create: [
                { text: "Roger Federer", isCorrect: true },
                { text: "Rafael Nadal", isCorrect: false },
                { text: "Novak Djokovic", isCorrect: false },
                { text: "Andy Murray", isCorrect: false },
              ],
            },
          },
          {
            text: "Which sport is played on ice?",
            order: 55,
            answers: {
              create: [
                { text: "Ice Hockey", isCorrect: true },
                { text: "Basketball", isCorrect: false },
                { text: "Tennis", isCorrect: false },
                { text: "Badminton", isCorrect: false },
              ],
            },
          },
          {
            text: "How many players are on a basketball team on court?",
            order: 56,
            answers: {
              create: [
                { text: "5 players", isCorrect: true },
                { text: "6 players", isCorrect: false },
                { text: "7 players", isCorrect: false },
                { text: "4 players", isCorrect: false },
              ],
            },
          },
          {
            text: "Which country dominates in sumo wrestling?",
            order: 57,
            answers: {
              create: [
                { text: "Japan", isCorrect: true },
                { text: "Russia", isCorrect: false },
                { text: "South Korea", isCorrect: false },
                { text: "China", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won the 2024 Wimbledon Men's Singles?",
            order: 58,
            answers: {
              create: [
                { text: "Carlos Alcaraz", isCorrect: true },
                { text: "Jannik Sinner", isCorrect: false },
                { text: "Novak Djokovic", isCorrect: false },
                { text: "Andrey Rublev", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the most popular sport in the world?",
            order: 59,
            answers: {
              create: [
                { text: "Football (Soccer)", isCorrect: true },
                { text: "Basketball", isCorrect: false },
                { text: "Tennis", isCorrect: false },
                { text: "Golf", isCorrect: false },
              ],
            },
          },

          // ENTERTAINMENT & MOVIES (15 questions)
          {
            text: "Which film won Best Picture at the 2024 Oscars?",
            order: 60,
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
            text: "Who hosted the Oscars ceremony in 2024?",
            order: 61,
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
            text: "Which superhero movie had the biggest opening in 2024?",
            order: 62,
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
            text: "What is the most-watched Netflix series of all time?",
            order: 63,
            answers: {
              create: [
                { text: "Squid Game", isCorrect: true },
                { text: "Bridgerton", isCorrect: false },
                { text: "Stranger Things", isCorrect: false },
                { text: "The Crown", isCorrect: false },
              ],
            },
          },
          {
            text: "Who is the director of the 'Oppenheimer' film?",
            order: 64,
            answers: {
              create: [
                { text: "Christopher Nolan", isCorrect: true },
                { text: "Quentin Tarantino", isCorrect: false },
                { text: "David Fincher", isCorrect: false },
                { text: "Steven Spielberg", isCorrect: false },
              ],
            },
          },
          {
            text: "Which movie was the highest-grossing film of 2023?",
            order: 65,
            answers: {
              create: [
                { text: "Barbie", isCorrect: true },
                { text: "Oppenheimer", isCorrect: false },
                { text: "Killers of the Flower Moon", isCorrect: false },
                { text: "Dune: Part Two", isCorrect: false },
              ],
            },
          },
          {
            text: "Who starred in the lead role of 'Barbie' (2023)?",
            order: 66,
            answers: {
              create: [
                { text: "Margot Robbie", isCorrect: true },
                { text: "Taylor Swift", isCorrect: false },
                { text: "Timothée Chalamet", isCorrect: false },
                { text: "Florence Pugh", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the franchise with the most movies?",
            order: 67,
            answers: {
              create: [
                { text: "James Bond", isCorrect: true },
                { text: "Marvel Cinematic Universe", isCorrect: false },
                { text: "Fast & Furious", isCorrect: false },
                { text: "Star Wars", isCorrect: false },
              ],
            },
          },
          {
            text: "Who won an Oscar for Best Actor in 2024?",
            order: 68,
            answers: {
              create: [
                { text: "Cillian Murphy", isCorrect: true },
                { text: "Adam Driver", isCorrect: false },
                { text: "Bradley Cooper", isCorrect: false },
                { text: "Timothée Chalamet", isCorrect: false },
              ],
            },
          },
          {
            text: "Which streaming platform has the most subscribers?",
            order: 69,
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
            text: "Who is the highest-paid actress in 2024?",
            order: 70,
            answers: {
              create: [
                { text: "Taylor Swift", isCorrect: true },
                { text: "Margot Robbie", isCorrect: false },
                { text: "Zendaya", isCorrect: false },
                { text: "Emma Stone", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the highest-rated movie on IMDB?",
            order: 71,
            answers: {
              create: [
                { text: "The Shawshank Redemption", isCorrect: true },
                { text: "The Godfather", isCorrect: false },
                { text: "The Dark Knight", isCorrect: false },
                { text: "Pulp Fiction", isCorrect: false },
              ],
            },
          },
          {
            text: "Who directed 'The Dark Knight' (2008)?",
            order: 72,
            answers: {
              create: [
                { text: "Christopher Nolan", isCorrect: true },
                { text: "Tim Burton", isCorrect: false },
                { text: "Michael Bay", isCorrect: false },
                { text: "Zack Snyder", isCorrect: false },
              ],
            },
          },
          {
            text: "Which actor played Iron Man in the MCU?",
            order: 73,
            answers: {
              create: [
                { text: "Robert Downey Jr.", isCorrect: true },
                { text: "Chris Evans", isCorrect: false },
                { text: "Mark Ruffalo", isCorrect: false },
                { text: "Tom Hiddleston", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the longest movie ever made?",
            order: 74,
            answers: {
              create: [
                { text: "Lasts over 24 hours", isCorrect: true },
                { text: "12 hours", isCorrect: false },
                { text: "6 hours", isCorrect: false },
                { text: "3 hours", isCorrect: false },
              ],
            },
          },

          // SCIENCE & KNOWLEDGE (10 questions)
          {
            text: "What does DNA stand for?",
            order: 75,
            answers: {
              create: [
                { text: "Deoxyribonucleic Acid", isCorrect: true },
                { text: "Diribonucleic Acid", isCorrect: false },
                { text: "Deoxynucleic Protein", isCorrect: false },
                { text: "Digital Nucleic Acid", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the chemical symbol for gold?",
            order: 76,
            answers: {
              create: [
                { text: "Au", isCorrect: true },
                { text: "Gd", isCorrect: false },
                { text: "Ag", isCorrect: false },
                { text: "Go", isCorrect: false },
              ],
            },
          },
          {
            text: "Which planet is known as the Red Planet?",
            order: 77,
            answers: {
              create: [
                { text: "Mars", isCorrect: true },
                { text: "Venus", isCorrect: false },
                { text: "Jupiter", isCorrect: false },
                { text: "Saturn", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the smallest unit of life?",
            order: 78,
            answers: {
              create: [
                { text: "Cell", isCorrect: true },
                { text: "Atom", isCorrect: false },
                { text: "Molecule", isCorrect: false },
                { text: "Organism", isCorrect: false },
              ],
            },
          },
          {
            text: "How many bones are in the human body?",
            order: 79,
            answers: {
              create: [
                { text: "206", isCorrect: true },
                { text: "186", isCorrect: false },
                { text: "256", isCorrect: false },
                { text: "176", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the speed of light?",
            order: 80,
            answers: {
              create: [
                { text: "299,792,458 meters per second", isCorrect: true },
                { text: "200,000,000 meters per second", isCorrect: false },
                { text: "400,000,000 meters per second", isCorrect: false },
                { text: "100,000,000 meters per second", isCorrect: false },
              ],
            },
          },
          {
            text: "Who developed the theory of relativity?",
            order: 81,
            answers: {
              create: [
                { text: "Albert Einstein", isCorrect: true },
                { text: "Isaac Newton", isCorrect: false },
                { text: "Stephen Hawking", isCorrect: false },
                { text: "Galileo Galilei", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the largest organ in the human body?",
            order: 82,
            answers: {
              create: [
                { text: "Skin", isCorrect: true },
                { text: "Brain", isCorrect: false },
                { text: "Heart", isCorrect: false },
                { text: "Liver", isCorrect: false },
              ],
            },
          },
          {
            text: "What does NASA stand for?",
            order: 83,
            answers: {
              create: [
                { text: "National Aeronautics and Space Administration", isCorrect: true },
                { text: "National Aerospace and Space Agency", isCorrect: false },
                { text: "National Aviation and Space Administration", isCorrect: false },
                { text: "National Aeronautics Society of America", isCorrect: false },
              ],
            },
          },
          {
            text: "What year did humans first land on the moon?",
            order: 84,
            answers: {
              create: [
                { text: "1969", isCorrect: true },
                { text: "1965", isCorrect: false },
                { text: "1972", isCorrect: false },
                { text: "1971", isCorrect: false },
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

  console.log(`✅ Created quiz: "${largeQuiz.title}"`);
  console.log(`   Total Questions: ${largeQuiz.questions.length}`);
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
  console.log(`   Total Questions in Large Pool: ${largeQuiz.questions.length}`);
  console.log(`   Programming Questions: ${quiz2.questions.length}`);
  console.log(`   Total Answers: ${(largeQuiz.questions.length + quiz2.questions.length) * 4}`);
  console.log(`\n💡 Each game randomly selects ~29 questions from the ${largeQuiz.questions.length}-question pool!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
