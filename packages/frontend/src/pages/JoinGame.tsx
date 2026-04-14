import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface JoinGameProps {
  onGameJoined: (gameId: string) => void;
  onCancel: () => void;
}

function JoinGame({ onGameJoined, onCancel }: JoinGameProps) {
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!gameCode.trim()) {
        setError('Please enter a game code');
        return;
      }

      // Try to join the game
      const response = await axios.post(
        `/api/game/session/${gameCode.trim()}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onGameJoined(response.data.id);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Game code not found. Make sure you have the correct code.');
      } else if (err.response?.status === 400) {
        setError('You have already joined this game');
      } else {
        setError('Failed to join game. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Join Game</h1>
          <p className="text-center text-gray-600 mb-8">
            Enter the game code your friend shared with you
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleJoinGame} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Code
              </label>
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Enter the 5-character code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-widest uppercase"
                maxLength={20}
              />
              <p className="text-sm text-gray-500 mt-2">
                Example: ABC123
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !gameCode.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition text-lg"
            >
              {loading ? 'Joining Game...' : 'Join Game'}
            </button>
          </form>

          <button
            onClick={onCancel}
            className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            Back
          </button>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How to join:</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Ask your friend to share their game code</li>
              <li>2. Paste the code here</li>
              <li>3. Click "Join Game"</li>
              <li>4. Wait for the host to start the game</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
