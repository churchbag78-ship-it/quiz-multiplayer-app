import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Quiz {
  id: string;
  title: string;
  description: string;
  creator: { username: string };
  questions: { id: string }[];
}

interface HomeProps {
  onSelectGame: (gameId: string) => void;
  onJoinGame: () => void;
}

function Home({ onSelectGame, onJoinGame }: HomeProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout, token } = useAuth();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('/api/quiz');
      setQuizzes(response.data);
    } catch (err) {
      setError('Failed to load quizzes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (quizId: string) => {
    try {
      const response = await axios.post(
        '/api/game/session',
        { quizId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSelectGame(response.data.id);
    } catch (err) {
      setError('Failed to create game session');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Quiz Multiplayer</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <strong>{user?.username}</strong></span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={onJoinGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
          >
            🔗 Join Game with Code
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Quizzes</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No quizzes available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>By: <strong>{quiz.creator.username}</strong></p>
                  <p>Questions: <strong>{quiz.questions.length}</strong></p>
                </div>
                <button
                  onClick={() => handleCreateGame(quiz.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Play Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
