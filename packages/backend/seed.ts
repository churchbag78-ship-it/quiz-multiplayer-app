/**
 * Large seed script with 180+ questions for maximum variety
 * Each question MUST have exactly 4 answers
 * Each game randomly selects 28 questions with ZERO repeats across games
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// All questions organized by category
const allQuestions = [
  // PEEP SHOW (30 questions)
  { text: "What are the names of the two main characters in 'Peep Show'?", answers: ["Mark and Jez", "Tim and Daisy", "Roy and Moss", "Gordon and Jack"], correct: 0 },
  { text: "How many series did 'Peep Show' run?", answers: ["9 series", "6 series", "12 series", "7 series"], correct: 0 },
  { text: "What is Mark Corrigan's job?", answers: ["Lawyer", "Accountant", "Banker", "Therapist"], correct: 0 },
  { text: "What is the unique storytelling style of 'Peep Show'?", answers: ["First-person internal monologue", "Third-person narration", "Documentary style", "Animated sequences"], correct: 0 },
  { text: "Which network aired 'Peep Show'?", answers: ["Channel 4", "BBC", "ITV", "Sky Atlantic"], correct: 0 },
  { text: "In what year did 'Peep Show' premiere?", answers: ["2003", "2005", "2001", "2000"], correct: 0 },
  { text: "What is Jez Usborne's primary flaw?", answers: ["Lack of responsibility", "Extreme jealousy", "Violent temper", "Obsession with money"], correct: 0 },
  { text: "What does Mark obsess over?", answers: ["Social anxiety", "Becoming rich", "Winning awards", "Meeting celebrities"], correct: 0 },
  { text: "Which character was a struggling musician?", answers: ["Jez Usborne", "Mark Corrigan", "Super Hans", "Zahra Karim"], correct: 0 },
  { text: "What is the apartment building called?", answers: ["New Cross", "Tower Bridge", "Camden Heights", "Elephant Court"], correct: 0 },
  { text: "Who was Super Hans to Jez?", answers: ["Best friend", "Brother", "Therapist", "Boss"], correct: 0 },
  { text: "How many main characters were in 'Peep Show'?", answers: ["4 main characters", "2 main characters", "6 main characters", "5 main characters"], correct: 0 },
  { text: "What was the main setting of 'Peep Show'?", answers: ["London", "Manchester", "Bristol", "Liverpool"], correct: 0 },
  { text: "Did 'Peep Show' have a laugh track?", answers: ["No", "Yes, continuous", "Sometimes", "Only in later seasons"], correct: 0 },
  { text: "What decade was 'Peep Show' most popular?", answers: ["2000s and 2010s", "1990s", "2020s", "1980s"], correct: 0 },
  { text: "What was Mark's biggest fear throughout the series?", answers: ["Social embarrassment", "Financial ruin", "Losing Jez", "Getting old"], correct: 0 },
  { text: "What job did Jez repeatedly fail at?", answers: ["Various odd jobs", "Programming", "Teaching", "Sales"], correct: 0 },
  { text: "Who was Mark's love interest?", answers: ["Sophie", "Lauren", "Rebecca", "Lisa"], correct: 0 },
  { text: "What was the show's signature humor style?", answers: ["Cringe comedy", "Slapstick", "Dark humor", "Satirical"], correct: 0 },
  { text: "How many seasons until the show ended?", answers: ["9 seasons", "8 seasons", "10 seasons", "11 seasons"], correct: 0 },
  { text: "What color was Mark obsessed with?", answers: ["Red", "Blue", "Green", "Yellow"], correct: 0 },
  { text: "What was Jez's most memorable catchphrase?", answers: ["You bloody idiot", "Oh God", "I'm not being funny", "Innit"], correct: 0 },
  { text: "Did Mark ever date Sophie long-term?", answers: ["Yes, multiple times", "Never", "Once briefly", "Off and on"], correct: 0 },
  { text: "What was the show's running time per episode?", answers: ["30 minutes", "45 minutes", "60 minutes", "20 minutes"], correct: 0 },
  { text: "Which character provided the most physical comedy?", answers: ["Super Hans", "Mark", "Jez", "Zahra"], correct: 0 },
  { text: "What industry did the show satirize most?", answers: ["Law and business", "Entertainment", "Media", "Technology"], correct: 0 },
  { text: "How many times did Mark and Jez move?", answers: ["Never, same apartment", "Once", "Twice", "Multiple times"], correct: 0 },
  { text: "What was Jez's biggest dream?", answers: ["Becoming a musician", "Getting rich", "Meeting celebrities", "Travel the world"], correct: 0 },
  { text: "Did the show win any major awards?", answers: ["Yes, multiple BAFTAs", "One BAFTA", "No major awards", "Golden Globes"], correct: 0 },
  { text: "What made 'Peep Show' revolutionary?", answers: ["POV camera technique", "First British mockumentary", "First sitcom on streaming", "First animated sitcom"], correct: 0 },

  // MUSIC (35 questions)
  { text: "Who released 'Thriller'?", answers: ["Michael Jackson", "Prince", "David Bowie", "Queen"], correct: 0 },
  { text: "Which artist won the most Grammy Awards?", answers: ["Taylor Swift", "Beyoncé", "Georg Solti", "Quincy Jones"], correct: 0 },
  { text: "Who was the biggest artist of the 2000s?", answers: ["Eminem", "50 Cent", "Nelly", "Ja Rule"], correct: 0 },
  { text: "What is the most-streamed song on Spotify?", answers: ["Blinding Lights", "Shape of You", "Levitating", "One Dance"], correct: 0 },
  { text: "Which British singer dominated the 2010s?", answers: ["Ed Sheeran", "Harry Styles", "Adele", "The Weeknd"], correct: 0 },
  { text: "Who won Grammy Album of the Year 2024?", answers: ["Taylor Swift", "The Weeknd", "Billie Eilish", "Drake"], correct: 0 },
  { text: "Which K-pop group surpassed The Beatles?", answers: ["BTS", "NewJeans", "BLACKPINK", "Stray Kids"], correct: 0 },
  { text: "What is Taylor Swift's Eras Tour named after?", answers: ["Her album eras", "Fashion eras", "Music genres", "Tour locations"], correct: 0 },
  { text: "Who has the most Grammys ever?", answers: ["Taylor Swift", "Beyoncé", "Billie Eilish", "Adele"], correct: 0 },
  { text: "What genre is Billie Eilish known for?", answers: ["Alternative/Indie", "Country", "Gospel", "Heavy Metal"], correct: 0 },
  { text: "Who is the 'King of Pop'?", answers: ["Michael Jackson", "Prince", "Elvis Presley", "David Bowie"], correct: 0 },
  { text: "Who released 'Lemonade' in 2016?", answers: ["Beyoncé", "Rihanna", "Alicia Keys", "Mary J. Blige"], correct: 0 },
  { text: "Who sang 'Bohemian Rhapsody'?", answers: ["Queen", "The Beatles", "Pink Floyd", "Led Zeppelin"], correct: 0 },
  { text: "What is The Weeknd's real name?", answers: ["Abel Makkonen Tesfaye", "Christopher Maurice Brown", "Aubrey Drake Graham", "Armando Christian Pérez"], correct: 0 },
  { text: "Which artist dropped an album without warning in 2013?", answers: ["Beyoncé", "Taylor Swift", "Drake", "Kanye West"], correct: 0 },
  { text: "Who is known for high vocal range?", answers: ["Ariana Grande", "Billie Eilish", "Dua Lipa", "Selena Gomez"], correct: 0 },
  { text: "Who released '90210'?", answers: ["The Weeknd", "Drake", "Kendrick Lamar", "J. Cole"], correct: 0 },
  { text: "Who is Drake's biggest rival in hip-hop?", answers: ["Kendrick Lamar", "J. Cole", "Lil Baby", "Travis Scott"], correct: 0 },
  { text: "What was Kanye West's first album?", answers: ["The College Dropout", "Late Registration", "Graduation", "808s"], correct: 0 },
  { text: "Who is the 'Queen of Pop'?", answers: ["Madonna", "Britney Spears", "Lady Gaga", "Cher"], correct: 0 },
  { text: "What is Dua Lipa's biggest hit?", answers: ["Levitating", "Don't Start Now", "Physical", "Break My Heart"], correct: 0 },
  { text: "Who sang 'Uptown Funk'?", answers: ["Mark Ronson & Bruno Mars", "The Weeknd", "Drake", "Kendrick Lamar"], correct: 0 },
  { text: "What is The Beatles' best-selling album?", answers: ["Sgt. Pepper's", "Abbey Road", "The White Album", "Revolver"], correct: 0 },
  { text: "Who is known for breaking streaming records?", answers: ["Bad Bunny", "Drake", "The Weeknd", "Post Malone"], correct: 0 },
  { text: "What genre did Billie Eilish pioneer?", answers: ["Whisper rap/pop", "Trap", "Drill", "Emo pop"], correct: 0 },
  { text: "Who collaborated with The Weeknd most?", answers: ["Daft Punk", "SZA", "Drake", "Kendrick Lamar"], correct: 0 },
  { text: "What is Olivia Rodrigo's first album?", answers: ["SOUR", "Guts", "Drivers License", "Good 4 U"], correct: 0 },
  { text: "Who is the youngest billionaire musician?", answers: ["Jay-Z", "Kanye West", "Dr. Dre", "Usher"], correct: 0 },
  { text: "What was Prince's most famous album?", answers: ["Purple Rain", "Sign O' the Times", "Around the World in a Day", "Controversy"], correct: 0 },
  { text: "Who had the biggest album of 2023?", answers: ["Taylor Swift (Midnights)", "Eminem", "Drake", "Bad Bunny"], correct: 0 },
  { text: "What artist influenced modern pop the most?", answers: ["David Bowie", "Prince", "Michael Jackson", "Madonna"], correct: 0 },
  { text: "Who is the fastest-selling artist ever?", answers: ["BTS", "Taylor Swift", "BLACKPINK", "Coldplay"], correct: 0 },
  { text: "What is Rihanna's real name?", answers: ["Robyn Rihanna Fenty", "Rihanna Fenty", "Robin Rihanna", "Rianna Fenty"], correct: 0 },
  { text: "Who holds the record for Grammy nominations?", answers: ["Beyoncé", "Jay-Z", "Taylor Swift", "Kanye West"], correct: 0 },
  { text: "What was the first music video to get 1 billion views?", answers: ["Gangnam Style", "Despacito", "Baby", "Shape of You"], correct: 0 },
];

// Continue with other categories...
// TRENDING TOPICS (35 questions)
const trendingQuestions = [
  { text: "Which platform premiered 'The Rings of Power'?", answers: ["Amazon Prime", "Netflix", "Disney+", "Apple TV+"], correct: 0 },
  { text: "What is Elon Musk's AI company?", answers: ["xAI", "OpenAI", "Anthropic", "DeepMind"], correct: 0 },
  { text: "Which country hosted 2024 Olympics?", answers: ["France", "Japan", "Italy", "Brazil"], correct: 0 },
  { text: "Which AI released ChatGPT-4?", answers: ["OpenAI", "Google DeepMind", "Anthropic", "Meta AI"], correct: 0 },
  { text: "What is Apple Intelligence's feature?", answers: ["On-device AI", "Cloud-only AI", "Voice only", "Text only"], correct: 0 },
  { text: "Which platform introduced 'Threads'?", answers: ["Meta/Instagram", "Twitter", "TikTok", "Snapchat"], correct: 0 },
  { text: "What major event impacted 2024?", answers: ["Multiple elections", "Pandemic", "War declaration", "Economic collapse"], correct: 0 },
  { text: "Which renewable energy grew most?", answers: ["Solar", "Wind", "Hydroelectric", "Geothermal"], correct: 0 },
  { text: "Who replaced Elon at Twitter?", answers: ["Linda Yaccarino", "Jack Dorsey", "Parag Agrawal", "Evan Williams"], correct: 0 },
  { text: "What is the most popular AI chatbot?", answers: ["ChatGPT", "Bard", "Claude", "LLaMA"], correct: 0 },
  { text: "Which streaming became most profitable?", answers: ["Netflix", "Prime Video", "Disney+", "Max"], correct: 0 },
  { text: "What tech trend dominated 2024?", answers: ["AI", "Crypto", "VR", "Blockchain"], correct: 0 },
  { text: "Which Netflix series went global?", answers: ["Wednesday", "Stranger Things", "Squid Game", "Oppenheimer"], correct: 0 },
  { text: "What does API stand for?", answers: ["Application Programming Interface", "Advanced Integration", "Protocol Integration", "Infrastructure"], correct: 0 },
  { text: "Which company is AWS?", answers: ["Amazon", "Microsoft", "Google", "Apple"], correct: 0 },
  { text: "What is the biggest AI concern?", answers: ["Job displacement", "Data privacy", "Misinformation", "All of above"], correct: 3 },
  { text: "Which country leads in 5G?", answers: ["China", "USA", "South Korea", "Japan"], correct: 0 },
  { text: "What is Web3?", answers: ["Decentralized internet", "New browser", "AI interface", "Cloud service"], correct: 0 },
  { text: "Who is leading the EV market?", answers: ["Tesla", "BMW", "Ford", "GM"], correct: 0 },
  { text: "What is the metaverse?", answers: ["Virtual reality space", "Social media", "Gaming platform", "Virtual headset"], correct: 0 },
  { text: "Which company focuses on quantum computing?", answers: ["IBM", "Google", "Microsoft", "All of above"], correct: 3 },
  { text: "What is blockchain used for?", answers: ["Cryptocurrency", "Data security", "Smart contracts", "All of above"], correct: 3 },
  { text: "Who invented cryptocurrency?", answers: ["Unknown (Satoshi Nakamoto)", "Elon Musk", "Mark Zuckerberg", "Steve Jobs"], correct: 0 },
  { text: "What is the most valuable crypto?", answers: ["Bitcoin", "Ethereum", "Dogecoin", "Ripple"], correct: 0 },
  { text: "Which company owns ChatGPT?", answers: ["OpenAI", "Microsoft", "Google", "Meta"], correct: 0 },
  { text: "What is machine learning?", answers: ["AI learning from data", "Robot learning", "Computer basics", "Programming"], correct: 0 },
  { text: "Who created Facebook?", answers: ["Mark Zuckerberg", "Elon Musk", "Bill Gates", "Steve Jobs"], correct: 0 },
  { text: "What is the dark web?", answers: ["Hidden internet part", "Bad websites", "Illegal sites only", "Private network"], correct: 0 },
  { text: "Which company makes Android?", answers: ["Google", "Apple", "Microsoft", "Samsung"], correct: 0 },
  { text: "What is the iOS?", answers: ["Apple's operating system", "Android version", "Windows mobile", "Linux version"], correct: 0 },
  { text: "Who is the richest person?", answers: ["Elon Musk / Jeff Bezos", "Bill Gates", "Bernard Arnault", "Mark Zuckerberg"], correct: 0 },
  { text: "Which country has the fastest internet?", answers: ["South Korea", "Japan", "Singapore", "Netherlands"], correct: 0 },
  { text: "What is cybersecurity?", answers: ["Protecting digital systems", "Computer repair", "Software coding", "Tech support"], correct: 0 },
  { text: "Who is leading social media?", answers: ["Meta", "ByteDance", "Twitter/X", "Snap"], correct: 0 },
  { text: "What is NFT?", answers: ["Non-fungible token", "Digital image", "Cryptocurrency", "Digital art"], correct: 0 },
];

// SPORTS (30 questions)
const sportsQuestions = [
  { text: "Who won the 2024 Super Bowl?", answers: ["Kansas City Chiefs", "San Francisco 49ers", "Buffalo Bills", "LA Rams"], correct: 0 },
  { text: "Who is the GOAT of basketball?", answers: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Kareem"], correct: 0 },
  { text: "Who was the first female NBA G League player?", answers: ["Olivia Rozman", "Jewell Loyd", "Breanna Stewart", "Satou Sabally"], correct: 0 },
  { text: "What sport uses 'Checkmate'?", answers: ["Chess", "Tennis", "Golf", "Cricket"], correct: 0 },
  { text: "Who won the most Olympic medals?", answers: ["Michael Phelps", "Usain Bolt", "Simone Biles", "Roger Federer"], correct: 0 },
  { text: "Who is the GOAT of tennis?", answers: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Andy Murray"], correct: 0 },
  { text: "What sport is played on ice?", answers: ["Ice Hockey", "Basketball", "Tennis", "Badminton"], correct: 0 },
  { text: "How many basketball players per team?", answers: ["5", "6", "7", "4"], correct: 0 },
  { text: "Which country dominates sumo?", answers: ["Japan", "Russia", "South Korea", "China"], correct: 0 },
  { text: "Who won 2024 Wimbledon Men's?", answers: ["Carlos Alcaraz", "Jannik Sinner", "Novak Djokovic", "Andrey Rublev"], correct: 0 },
  { text: "What is the most popular sport?", answers: ["Football/Soccer", "Basketball", "Tennis", "Golf"], correct: 0 },
  { text: "How many players in cricket?", answers: ["11", "9", "13", "15"], correct: 0 },
  { text: "What is the Tour de France?", answers: ["Cycling race", "Running race", "Swimming race", "Triathlon"], correct: 0 },
  { text: "Who won the most Super Bowls?", answers: ["Tom Brady", "Joe Montana", "Dan Marino", "John Elway"], correct: 0 },
  { text: "What is the FIFA World Cup?", answers: ["Soccer tournament", "Olympics", "Championship", "League"], correct: 0 },
  { text: "How many NFL teams are there?", answers: ["32", "30", "28", "35"], correct: 0 },
  { text: "What is the Stanley Cup?", answers: ["Hockey trophy", "Baseball trophy", "Basketball trophy", "Football trophy"], correct: 0 },
  { text: "Who is the GOAT of soccer?", answers: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Maradona"], correct: 0 },
  { text: "What is the Wimbledon?", answers: ["Tennis tournament", "Golf tournament", "Running race", "Swimming race"], correct: 0 },
  { text: "How many players in baseball?", answers: ["9", "11", "7", "13"], correct: 0 },
  { text: "What is the Olympics?", answers: ["International sports event", "National competition", "Regional event", "Local tournament"], correct: 0 },
  { text: "Who won the most NBA titles?", answers: ["Bill Russell", "Michael Jordan", "Lebron James", "Kareem Abdul-Jabbar"], correct: 0 },
  { text: "What is the Ryder Cup?", answers: ["Golf competition", "Tennis event", "Basketball event", "Soccer event"], correct: 0 },
  { text: "How many holes in golf?", answers: ["18", "9", "27", "36"], correct: 0 },
  { text: "What is the Masters?", answers: ["Golf tournament", "Tennis event", "Running race", "Swimming competition"], correct: 0 },
  { text: "Who won the most Wimbledon titles?", answers: ["Serena Williams / Margaret Court", "Martina Navratilova", "Billie Jean King", "Chris Evert"], correct: 0 },
  { text: "What is the Daytona 500?", answers: ["Car race", "Horse race", "Motorcycle race", "Truck race"], correct: 0 },
  { text: "How many players in an NFL team?", answers: ["11", "13", "10", "12"], correct: 0 },
  { text: "What is the Kentucky Derby?", answers: ["Horse racing", "Car racing", "Running race", "Cycling race"], correct: 0 },
  { text: "Who won the most World Cups?", answers: ["Brazil", "Germany", "Italy", "France"], correct: 0 },
];

// ENTERTAINMENT (35 questions)
const entertainmentQuestions = [
  { text: "Which film won Best Picture 2024?", answers: ["Oppenheimer", "Barbie", "Killers of Flower Moon", "American Fiction"], correct: 0 },
  { text: "Who hosted Oscars 2024?", answers: ["Jimmy Kimmel", "Conan O'Brien", "Seth Meyers", "Stephen Colbert"], correct: 0 },
  { text: "Which superhero movie biggest 2024?", answers: ["Deadpool & Wolverine", "Captain America", "Joker 2", "Inside Out 2"], correct: 0 },
  { text: "Most watched Netflix series?", answers: ["Squid Game", "Bridgerton", "Stranger Things", "The Crown"], correct: 0 },
  { text: "Who directed Oppenheimer?", answers: ["Christopher Nolan", "Quentin Tarantino", "David Fincher", "Steven Spielberg"], correct: 0 },
  { text: "Highest grossing 2023 film?", answers: ["Barbie", "Oppenheimer", "Killers Flower Moon", "Dune 2"], correct: 0 },
  { text: "Who starred in Barbie?", answers: ["Margot Robbie", "Taylor Swift", "Timothée Chalamet", "Florence Pugh"], correct: 0 },
  { text: "Movie franchise with most films?", answers: ["James Bond", "Marvel", "Fast Furious", "Star Wars"], correct: 0 },
  { text: "Best Actor Oscar 2024?", answers: ["Cillian Murphy", "Adam Driver", "Bradley Cooper", "Timothée Chalamet"], correct: 0 },
  { text: "Most streaming subscribers?", answers: ["Netflix", "Prime Video", "Disney+", "Max"], correct: 0 },
  { text: "Highest paid actress 2024?", answers: ["Taylor Swift", "Margot Robbie", "Zendaya", "Emma Stone"], correct: 0 },
  { text: "Highest rated IMDB movie?", answers: ["Shawshank Redemption", "The Godfather", "Dark Knight", "Pulp Fiction"], correct: 0 },
  { text: "Who directed Dark Knight?", answers: ["Christopher Nolan", "Tim Burton", "Michael Bay", "Zack Snyder"], correct: 0 },
  { text: "Who played Iron Man?", answers: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Tom Hiddleston"], correct: 0 },
  { text: "Longest movie ever made?", answers: ["Over 24 hours", "12 hours", "6 hours", "3 hours"], correct: 0 },
  { text: "Who created The Office US?", answers: ["Greg Daniels", "Steve Carell", "Michael Scott", "NBC"], correct: 0 },
  { text: "Best Breaking Bad character?", answers: ["Walter White / Jesse", "Hank Schrader", "Saul Goodman", "Mike Ehrmantraut"], correct: 0 },
  { text: "Who created Game of Thrones?", answers: ["D.B. Weiss & David Benioff", "George R.R. Martin", "HBO", "Showtime"], correct: 0 },
  { text: "Best Disney Pixar film?", answers: ["Toy Story / Up", "Finding Nemo", "Incredibles", "Cars"], correct: 0 },
  { text: "Who voiced Woody in Toy Story?", answers: ["Tom Hanks", "Tim Allen", "John Ratzenberger", "Don Rickles"], correct: 0 },
  { text: "Best Marvel movie ever?", answers: ["Infinity War / Endgame", "Civil War", "Ragnarok", "Winter Soldier"], correct: 0 },
  { text: "Who is the MCU's Iron Man?", answers: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], correct: 0 },
  { text: "Best Star Wars film?", answers: ["Empire Strikes Back", "New Hope", "Return Jedi", "Force Awakens"], correct: 0 },
  { text: "Who directed Avatar?", answers: ["James Cameron", "Peter Jackson", "Steven Spielberg", "Christopher Nolan"], correct: 0 },
  { text: "Highest grossing film ever?", answers: ["Avatar 2", "Avengers Endgame", "Avatar", "Titanic"], correct: 0 },
  { text: "Who won best actress 2024?", answers: ["Emma Stone", "Carey Mulligan", "Lily Gladstone", "Margot Robbie"], correct: 0 },
  { text: "Best comedy series?", answers: ["The Office", "Friends", "Parks Rec", "Community"], correct: 0 },
  { text: "Who created Friends?", answers: ["David Crane & Marta Kauffman", "Ross Geller", "NBC", "Warner Bros"], correct: 0 },
  { text: "Best animated series?", answers: ["Avatar Last Airbender", "Fullmetal Alchemist", "Code Geass", "Attack Titan"], correct: 0 },
  { text: "Who created Stranger Things?", answers: ["Duffer Brothers", "Netflix", "Steven Spielberg", "Stephen King"], correct: 0 },
  { text: "Best British TV series?", answers: ["Peep Show / The Office UK", "Sherlock", "Doctor Who", "Downton Abbey"], correct: 0 },
  { text: "Who hosts SNL most?", answers: ["Alec Baldwin", "Tina Fey", "Will Ferrell", "Andy Samberg"], correct: 0 },
  { text: "Best animated movie?", answers: ["Spirited Away", "Your Name", "Lion King", "Frozen"], correct: 0 },
  { text: "Who directed Inception?", answers: ["Christopher Nolan", "Denis Villeneuve", "Ridley Scott", "James Cameron"], correct: 0 },
  { text: "Best thriller film ever?", answers: ["Psycho / Se7en", "Jaws", "Silence Lambs", "Shining"], correct: 0 },
];

// SCIENCE (30 questions)
const scienceQuestions = [
  { text: "What does DNA stand for?", answers: ["Deoxyribonucleic Acid", "Diribonucleic", "Deoxynucleic Protein", "Digital Nucleic"], correct: 0 },
  { text: "Chemical symbol for gold?", answers: ["Au", "Gd", "Ag", "Go"], correct: 0 },
  { text: "Planet known as Red?", answers: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0 },
  { text: "Smallest unit of life?", answers: ["Cell", "Atom", "Molecule", "Organism"], correct: 0 },
  { text: "Bones in human body?", answers: ["206", "186", "256", "176"], correct: 0 },
  { text: "Speed of light?", answers: ["299,792,458 m/s", "200,000,000", "400,000,000", "100,000,000"], correct: 0 },
  { text: "Who developed relativity?", answers: ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Galileo"], correct: 0 },
  { text: "Largest human organ?", answers: ["Skin", "Brain", "Heart", "Liver"], correct: 0 },
  { text: "NASA stands for?", answers: ["National Aeronautics Space Admin", "National Aerospace Space Agency", "Aviation Space Admin", "Aeronautics Society"], correct: 0 },
  { text: "Moon landing year?", answers: ["1969", "1965", "1972", "1971"], correct: 0 },
  { text: "How many elements periodic table?", answers: ["118", "100", "92", "150"], correct: 0 },
  { text: "What is photosynthesis?", answers: ["Plants make food from sunlight", "Plants eat food", "Photographic synthesis", "Light combination"], correct: 0 },
  { text: "How many planets?", answers: ["8", "9", "7", "10"], correct: 0 },
  { text: "Closest planet to sun?", answers: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 },
  { text: "Hottest planet?", answers: ["Venus", "Mercury", "Mars", "Jupiter"], correct: 0 },
  { text: "What is gravity?", answers: ["Force attracting objects", "Weight measurement", "Earth's force", "Magnetic field"], correct: 0 },
  { text: "Who is Stephen Hawking?", answers: ["Theoretical physicist", "Astronomer", "Biologist", "Chemist"], correct: 0 },
  { text: "What is evolution?", answers: ["Change in organisms over time", "Animal development", "Species creation", "Natural selection"], correct: 0 },
  { text: "Who proposed evolution?", answers: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Marie Curie"], correct: 0 },
  { text: "What is quantum physics?", answers: ["Physics of tiny particles", "Wave physics", "Relativity", "Classical physics"], correct: 0 },
  { text: "Fastest animal?", answers: ["Peregrine Falcon", "Cheetah", "Pronghorn", "Sailfish"], correct: 0 },
  { text: "Largest animal?", answers: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"], correct: 0 },
  { text: "How many species on Earth?", answers: ["8.7 million", "5 million", "3 million", "10 million"], correct: 0 },
  { text: "What is extinction?", answers: ["Species ceases to exist", "Animal migration", "Natural selection", "Evolution"], correct: 0 },
  { text: "How old is Earth?", answers: ["4.5 billion years", "2 billion", "6 billion", "1 billion"], correct: 0 },
  { text: "What is Big Bang?", answers: ["Universe's origin explosion", "Space event", "Star creation", "Galaxy formation"], correct: 0 },
  { text: "What is climate change?", answers: ["Long-term climate shift", "Weather change", "Temperature rise", "Greenhouse effect"], correct: 0 },
  { text: "What is genetics?", answers: ["Study of heredity", "Gene modification", "DNA study", "Trait inheritance"], correct: 0 },
  { text: "Who is Marie Curie?", answers: ["Physicist/Chemist", "Biologist", "Astronomer", "Geologist"], correct: 0 },
  { text: "What is a Black Hole?", answers: ["Extreme gravity region", "Space void", "Dead star", "Cosmic phenomenon"], correct: 0 },
];

async function main() {
  console.log("🌱 Creating massive 180+ question pool...\n");

  // Clear previous data
  await prisma.quiz.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      username: "testuser",
      password: hashedPassword,
    },
  });
  console.log(`✅ Created user: ${user.username}`);

  // Create all questions
  const allQuestionsWithOrder = [
    ...allQuestions,
    ...trendingQuestions,
    ...sportsQuestions,
    ...entertainmentQuestions,
    ...scienceQuestions,
  ].map((q, index) => ({
    text: q.text,
    order: index + 1,
    answers: {
      create: q.answers.map((answer, idx) => ({
        text: answer,
        isCorrect: idx === q.correct,
      })),
    },
  }));

  const mainQuiz = await prisma.quiz.create({
    data: {
      title: "Ultimate Knowledge Quiz 2024 - Massive Edition",
      description: "180+ questions! Every login = NEW random 28 questions. Zero repeats! 🎲🌍📺🎵⚽🚀",
      creatorId: user.id,
      questions: {
        create: allQuestionsWithOrder,
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

  console.log(`✅ Created massive quiz: "${mainQuiz.title}"`);
  console.log(`   📊 Total Questions: ${mainQuiz.questions.length}`);
  console.log(`   🎮 Questions per game: 28`);
  console.log(`   📈 Possible game variations: ${Math.floor(mainQuiz.questions.length / 28)}+`);

  console.log("\n✨ Database seed completed!");
  console.log(`\n🎯 How it works:`);
  console.log(`   - ${mainQuiz.questions.length} unique questions in database`);
  console.log(`   - Each game selects random 28 from pool`);
  console.log(`   - Different shuffle every login`);
  console.log(`   - ZERO repeat questions across games!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
