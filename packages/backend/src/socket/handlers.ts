import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Map to store active game sessions
const activeSessions = new Map<string, Set<string>>();

export const socketHandlers = (socket: Socket, io: Server, prisma: PrismaClient) => {
  // Join game session via WebSocket
  socket.on("join-session", async (sessionId: string, userId: string) => {
    socket.join(`session-${sessionId}`);
    
    if (!activeSessions.has(sessionId)) {
      activeSessions.set(sessionId, new Set());
    }
    activeSessions.get(sessionId)?.add(userId);

    // Notify others that user joined
    io.to(`session-${sessionId}`).emit("player-joined", {
      userId,
      activePlayersCount: activeSessions.get(sessionId)?.size || 0,
    });
  });

  // Start game
  socket.on("start-game", async (sessionId: string) => {
    try {
      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: "in_progress", startedAt: new Date() },
      });

      io.to(`session-${sessionId}`).emit("game-started", { startedAt: new Date() });
    } catch (error) {
      console.error("Error starting game:", error);
      socket.emit("error", "Failed to start game");
    }
  });

  // Answer submitted
  socket.on("answer-submitted", async (data: {
    sessionId: string;
    userId: string;
    questionId: string;
    answerId: string;
  }) => {
    try {
      const answer = await prisma.answer.findUnique({
        where: { id: data.answerId },
      });

      if (!answer) {
        socket.emit("error", "Answer not found");
        return;
      }

      // Get or create score record
      let score = await prisma.score.findUnique({
        where: { userId_gameSessionId: { userId: data.userId, gameSessionId: data.sessionId } },
      });

      if (!score) {
        score = await prisma.score.create({
          data: {
            userId: data.userId,
            gameSessionId: data.sessionId,
            totalQuestions: 1,
          },
        });
      }

      // Update score if answer is correct
      if (answer.isCorrect) {
        await prisma.score.update({
          where: { id: score.id },
          data: {
            score: { increment: 10 },
            correctAnswers: { increment: 1 },
          },
        });
      } else {
        await prisma.score.update({
          where: { id: score.id },
          data: { totalQuestions: { increment: 1 } },
        });
      }

      // Broadcast answer result to all players
      io.to(`session-${data.sessionId}`).emit("answer-result", {
        userId: data.userId,
        isCorrect: answer.isCorrect,
        questionId: data.questionId,
      });
    } catch (error) {
      console.error("Error processing answer:", error);
      socket.emit("error", "Failed to process answer");
    }
  });

  // Next question
  socket.on("next-question", (data: { sessionId: string; questionIndex: number }) => {
    io.to(`session-${data.sessionId}`).emit("question-changed", {
      questionIndex: data.questionIndex,
    });
  });

  // End game
  socket.on("end-game", async (sessionId: string) => {
    try {
      const scores = await prisma.score.findMany({
        where: { gameSessionId: sessionId },
        include: { user: { select: { username: true, id: true } } },
        orderBy: { score: "desc" },
      });

      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: "completed", endedAt: new Date() },
      });

      io.to(`session-${sessionId}`).emit("game-ended", {
        leaderboard: scores,
        endedAt: new Date(),
      });

      activeSessions.delete(sessionId);
    } catch (error) {
      console.error("Error ending game:", error);
      socket.emit("error", "Failed to end game");
    }
  });

  // Leave session
  socket.on("leave-session", (sessionId: string, userId: string) => {
    socket.leave(`session-${sessionId}`);
    const players = activeSessions.get(sessionId);
    if (players) {
      players.delete(userId);
    }

    io.to(`session-${sessionId}`).emit("player-left", {
      userId,
      activePlayersCount: players?.size || 0,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Clean up active sessions if all players left
    activeSessions.forEach((players, sessionId) => {
      if (players.size === 0) {
        activeSessions.delete(sessionId);
      }
    });
  });
};
