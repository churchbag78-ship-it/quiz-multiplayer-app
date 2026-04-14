import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface GamePageProps {
  gameId: string;
  onBack: () => void;
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Player {
  id: string;
  username: string;
}

function GamePage({ gameId, onBack }: GamePageProps) {
  const { user, token } = useAuth();
  const [gameSession, setGameSession] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    fetchGameSession();
    initializeSocket();
  }, [gameId]);

  // Shuffle array function
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const fetchGameSession = async () => {
    try {
      const response = await axios.get(`/api/game/session/${gameId}`);
      // Randomize questions order and answers within each question
      let shuffledQuestions = shuffleArray(response.data.quiz.questions);
      shuffledQuestions = shuffledQuestions.map((question: Question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }));
      const gameSessionWithShuffledQuestions = {
        ...response.data,
        quiz: {
          ...response.data.quiz,
          questions: shuffledQuestions,
        },
      };
      setGameSession(gameSessionWithShuffledQuestions);
      setPlayers(response.data.participants);
    } catch (err) {
      console.error('Failed to fetch game session:', err);
    }
  };

  const initializeSocket = () => {
    const socket = io('http://localhost:5000', {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('join-session', gameId, user?.id);
    });

    socket.on('player-joined', (data) => {
      console.log('Player joined:', data);
      fetchGameSession();
    });

    socket.on('game-started', () => {
      setGameStarted(true);
      setCurrentQuestionIndex(0);
    });

    socket.on('answer-result', (data) => {
      console.log('Answer result:', data);
      if (data.userId === user?.id) {
        setScores((prev) => ({
          ...prev,
          [user.id]: (prev[user.id] || 0) + (data.isCorrect ? 10 : 0),
        }));
      }
    });

    socket.on('question-changed', (data) => {
      setCurrentQuestionIndex(data.questionIndex);
      setSelectedAnswer(null);
      setAnswered(false);
    });

    socket.on('game-ended', (data) => {
      setGameEnded(true);
      setLeaderboard(data.leaderboard);
    });

    socket.on('error', (message) => {
      console.error('Socket error:', message);
    });

    socketRef.current = socket;

    return () => {
      socket.off('connect');
      socket.off('player-joined');
      socket.off('game-started');
      socket.off('answer-result');
      socket.off('question-changed');
      socket.off('game-ended');
      socket.disconnect();
    };
  };

  const handleStartGame = () => {
    if (socketRef.current) {
      socketRef.current.emit('start-game', gameId);
    }
  };

  const handleAnswerSubmit = (answerId: string) => {
    setSelectedAnswer(answerId);
    setAnswered(true);

    if (socketRef.current) {
      socketRef.current.emit('answer-submitted', {
        sessionId: gameId,
        userId: user?.id,
        questionId: gameSession?.quiz.questions[currentQuestionIndex].id,
        answerId,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < gameSession?.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);

      if (socketRef.current) {
        socketRef.current.emit('next-question', {
          sessionId: gameId,
          questionIndex: currentQuestionIndex + 1,
        });
      }
    } else {
      // End game
      if (socketRef.current) {
        socketRef.current.emit('end-game', gameId);
      }
    }
  };

  if (!gameSession) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-600">Game Finished!</h2>
            <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
                  <span className="font-semibold">
                    #{index + 1} {entry.user.username}
                  </span>
                  <span className="text-lg font-bold text-blue-600">{entry.score} points</span>
                </div>
              ))}
            </div>
            <button
              onClick={onBack}
              className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyInvite = () => {
    const inviteCode = gameId.substring(0, 8).toUpperCase();
    const inviteText = `Join my quiz game! Game Code: ${inviteCode}\n\nJoin at: ${window.location.origin}`;
    navigator.clipboard.writeText(inviteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inviteCode = gameId.substring(0, 8).toUpperCase();

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2">{gameSession.quiz.title}</h2>
            <p className="text-gray-600 mb-6">{gameSession.quiz.description}</p>

            {/* Invite Section */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">🎮 Invite Friends</h3>

              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your Game Code:</p>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-blue-600 tracking-widest">
                    {inviteCode}
                  </div>
                  <button
                    onClick={handleCopyInvite}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-blue-800">
                📱 Share this code with friends. They can paste it in "Join Game" to play with you!
              </p>
            </div>

            {/* Players Section */}
            <h3 className="text-lg font-semibold mb-4">Players ({players.length})</h3>
            <div className="space-y-2 mb-8">
              {players.map((player) => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{player.username}</span>
                  {player.id === user?.id && (
                    <span className="ml-auto text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      You
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Start Game Button */}
            {user?.id === gameSession.participants[0]?.id && (
              <button
                onClick={handleStartGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition text-lg mb-3"
              >
                ▶️ Start Game
              </button>
            )}

            {user?.id !== gameSession.participants[0]?.id && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⏳ Waiting for the host to start the game...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = gameSession.quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Question {currentQuestionIndex + 1} of {gameSession.quiz.questions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Your Score: {scores[user?.id || ''] || 0}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestionIndex + 1) / gameSession.quiz.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">{currentQuestion.text}</h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.answers.map((answer: Answer) => (
              <button
                key={answer.id}
                onClick={() => !answered && handleAnswerSubmit(answer.id)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg font-semibold transition ${
                  selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : answered && answer.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {answer.text}
              </button>
            ))}
          </div>

          {answered && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {currentQuestionIndex < gameSession.quiz.questions.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePage;