import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import JoinGame from './pages/JoinGame';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'home' | 'game' | 'join'>('login');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  if (!user) {
    return currentPage === 'register' ? (
      <Register onSwitchToLogin={() => setCurrentPage('login')} />
    ) : (
      <Login onSwitchToRegister={() => setCurrentPage('register')} />
    );
  }

  if (currentPage === 'game' && selectedGameId) {
    return <GamePage gameId={selectedGameId} onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'join') {
    return (
      <JoinGame
        onGameJoined={(gameId) => {
          setSelectedGameId(gameId);
          setCurrentPage('game');
        }}
        onCancel={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <Home
      onSelectGame={(gameId) => {
        setSelectedGameId(gameId);
        setCurrentPage('game');
      }}
      onJoinGame={() => setCurrentPage('join')}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
