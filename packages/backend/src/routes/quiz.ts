import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../utils/auth";
import { validateQuiz, validateQuestions, QuizValidationError } from "../services/quizValidation";

const router = Router();
const prisma = new PrismaClient();

// Get all public quizzes
router.get("/", async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { isPublic: true },
      include: {
        creator: { select: { username: true } },
        questions: { select: { id: true } },
      },
    });

    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Get quiz by ID with questions and answers
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: {
        creator: { select: { username: true } },
        questions: {
          include: {
            answers: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
});

// Create quiz (requires auth)
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, isPublic } = req.body;
    const userId = req.userId!;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description: description || "",
        isPublic: isPublic ?? true,
        creatorId: userId,
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// Update quiz
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isPublic } = req.body;
    const userId = req.userId!;

    const quiz = await prisma.quiz.findUnique({ where: { id } });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await prisma.quiz.update({
      where: { id },
      data: { title, description, isPublic },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

// Delete quiz
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const quiz = await prisma.quiz.findUnique({ where: { id } });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.quiz.delete({ where: { id } });

    res.json({ message: "Quiz deleted" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

// ========== QUESTION ROUTES ==========

// Add question with 4 answers to quiz
router.post("/:id/questions", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, order, answers } = req.body;
    const userId = req.userId!;

    // Check quiz exists and user is creator
    const quiz = await prisma.quiz.findUnique({ where: { id } });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Validate inputs
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Question text is required" });
    }

    if (typeof order !== "number" || order < 1) {
      return res.status(400).json({ error: "Order must be a positive number" });
    }

    // Validate exactly 4 answers
    if (!Array.isArray(answers) || answers.length !== 4) {
      return res
        .status(400)
        .json({ error: "Question must have exactly 4 answer choices" });
    }

    // Validate each answer and count correct ones
    let correctCount = 0;
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];

      if (!answer.text || answer.text.trim().length === 0) {
        return res
          .status(400)
          .json({ error: `Answer ${i + 1}: Text is required` });
      }

      if (typeof answer.isCorrect !== "boolean") {
        return res
          .status(400)
          .json({ error: `Answer ${i + 1}: isCorrect must be true or false` });
      }

      if (answer.isCorrect) {
        correctCount++;
      }
    }

    // Ensure exactly one correct answer
    if (correctCount === 0) {
      return res
        .status(400)
        .json({ error: "Question must have exactly one correct answer" });
    }

    if (correctCount > 1) {
      return res
        .status(400)
        .json({
          error: `Question cannot have multiple correct answers (found ${correctCount})`,
        });
    }

    // Create question with answers
    const question = await prisma.question.create({
      data: {
        text: text.trim(),
        order,
        quizId: id,
        answers: {
          create: answers.map((answer: any) => ({
            text: answer.text.trim(),
            isCorrect: answer.isCorrect,
          })),
        },
      },
      include: {
        answers: true,
      },
    });

    res.status(201).json(question);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
});

// Update question
router.put("/:quizId/questions/:questionId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { quizId, questionId } = req.params;
    const { text, order, answers } = req.body;
    const userId = req.userId!;

    // Check quiz exists and user is creator
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Check question exists
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question || question.quizId !== quizId) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Validate exactly 4 answers if provided
    if (answers) {
      if (!Array.isArray(answers) || answers.length !== 4) {
        return res
          .status(400)
          .json({ error: "Question must have exactly 4 answer choices" });
      }

      // Count correct answers
      let correctCount = 0;
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];

        if (!answer.text || answer.text.trim().length === 0) {
          return res
            .status(400)
            .json({ error: `Answer ${i + 1}: Text is required` });
        }

        if (typeof answer.isCorrect !== "boolean") {
          return res
            .status(400)
            .json({ error: `Answer ${i + 1}: isCorrect must be true or false` });
        }

        if (answer.isCorrect) {
          correctCount++;
        }
      }

      if (correctCount === 0) {
        return res
          .status(400)
          .json({ error: "Question must have exactly one correct answer" });
      }

      if (correctCount > 1) {
        return res
          .status(400)
          .json({
            error: `Question cannot have multiple correct answers (found ${correctCount})`,
          });
      }

      // Delete old answers and create new ones
      await prisma.answer.deleteMany({ where: { questionId } });

      await prisma.answer.createMany({
        data: answers.map((answer: any) => ({
          questionId,
          text: answer.text.trim(),
          isCorrect: answer.isCorrect,
        })),
      });
    }

    // Update question
    const updated = await prisma.question.update({
      where: { id: questionId },
      data: {
        text: text || undefined,
        order: order || undefined,
      },
      include: {
        answers: true,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Failed to update question" });
  }
});

// Delete question
router.delete("/:quizId/questions/:questionId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { quizId, questionId } = req.params;
    const userId = req.userId!;

    // Check quiz exists and user is creator
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Check question exists
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question || question.quizId !== quizId) {
      return res.status(404).json({ error: "Question not found" });
    }

    await prisma.question.delete({ where: { id: questionId } });

    res.json({ message: "Question deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

export default router;
