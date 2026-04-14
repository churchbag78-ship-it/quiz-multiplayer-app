import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../utils/auth";

const router = Router();
const prisma = new PrismaClient();

// Create game session
router.post("/session", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { quizId } = req.body;
    const userId = req.userId!;

    if (!quizId) {
      return res.status(400).json({ error: "Quiz ID is required" });
    }

    // Check quiz exists
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Create game session
    const session = await prisma.gameSession.create({
      data: {
        quizId,
        participants: { connect: { id: userId } },
      },
      include: {
        quiz: { include: { questions: { include: { answers: true } } } },
        participants: { select: { id: true, username: true } },
        scores: true,
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating game session:", error);
    res.status(500).json({ error: "Failed to create game session" });
  }
});

// Get game session
router.get("/session/:id", async (req: Request, res: Response) => {
  try {
    const session = await prisma.gameSession.findUnique({
      where: { id: req.params.id },
      include: {
        quiz: { include: { questions: { include: { answers: true } } } },
        participants: { select: { id: true, username: true } },
        scores: true,
      },
    });

    if (!session) {
      return res.status(404).json({ error: "Game session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error fetching game session:", error);
    res.status(500).json({ error: "Failed to fetch game session" });
  }
});

// Join game session
router.post("/session/:id/join", authMiddleware, async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const userId = req.userId!;

    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { participants: true },
    });

    if (!session) {
      return res.status(404).json({ error: "Game session not found" });
    }

    // Check if already joined
    const alreadyJoined = session.participants.some((p) => p.id === userId);
    if (alreadyJoined) {
      return res.status(400).json({ error: "Already joined" });
    }

    // Add participant
    const updated = await prisma.gameSession.update({
      where: { id: sessionId },
      data: { participants: { connect: { id: userId } } },
      include: {
        quiz: { include: { questions: { include: { answers: true } } } },
        participants: { select: { id: true, username: true } },
        scores: true,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error joining game session:", error);
    res.status(500).json({ error: "Failed to join game session" });
  }
});

// Submit answer
router.post("/session/:id/answer", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { questionId, answerId } = req.body;
    const userId = req.userId!;

    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
      include: { question: true },
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.json({
      isCorrect: answer.isCorrect,
      correctAnswerId: answer.question.answers
        ? answer.question.answers.find((a) => a.isCorrect)?.id
        : null,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ error: "Failed to submit answer" });
  }
});

// Get leaderboard
router.get("/leaderboard/:sessionId", async (req: Request, res: Response) => {
  try {
    const scores = await prisma.score.findMany({
      where: { gameSessionId: req.params.sessionId },
      include: { user: { select: { username: true } } },
      orderBy: { score: "desc" },
    });

    res.json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

export default router;
