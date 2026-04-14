/**
 * Quiz Validation Service
 * Ensures quizzes meet requirements (4 answers per question, etc.)
 */

export interface QuestionData {
  text: string;
  order: number;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface CreateQuizData {
  title: string;
  description?: string;
  isPublic?: boolean;
  questions?: QuestionData[];
}

export class QuizValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizValidationError';
  }
}

/**
 * Validate quiz data before creation/update
 */
export const validateQuiz = (data: CreateQuizData): void => {
  // Validate title
  if (!data.title || data.title.trim().length === 0) {
    throw new QuizValidationError('Quiz title is required and cannot be empty');
  }

  if (data.title.length > 255) {
    throw new QuizValidationError('Quiz title must be less than 255 characters');
  }

  // Validate description
  if (data.description && data.description.length > 1000) {
    throw new QuizValidationError('Quiz description must be less than 1000 characters');
  }

  // Validate questions if provided
  if (data.questions && data.questions.length > 0) {
    validateQuestions(data.questions);
  }
};

/**
 * Validate that each question has exactly 4 answers with one correct
 */
export const validateQuestions = (questions: QuestionData[]): void => {
  if (questions.length === 0) {
    throw new QuizValidationError('Quiz must have at least one question');
  }

  if (questions.length > 100) {
    throw new QuizValidationError('Quiz cannot have more than 100 questions');
  }

  questions.forEach((question, index) => {
    validateQuestion(question, index);
  });
};

/**
 * Validate a single question
 */
export const validateQuestion = (question: QuestionData, questionIndex: number): void => {
  const qNum = questionIndex + 1;

  // Validate question text
  if (!question.text || question.text.trim().length === 0) {
    throw new QuizValidationError(`Question ${qNum}: Text is required and cannot be empty`);
  }

  if (question.text.length > 500) {
    throw new QuizValidationError(`Question ${qNum}: Text must be less than 500 characters`);
  }

  // Validate order
  if (typeof question.order !== 'number' || question.order < 1) {
    throw new QuizValidationError(`Question ${qNum}: Order must be a positive number`);
  }

  // Validate answers (MUST be exactly 4)
  if (!question.answers || question.answers.length !== 4) {
    throw new QuizValidationError(
      `Question ${qNum}: Must have exactly 4 answer choices (found ${question.answers?.length || 0})`
    );
  }

  // Validate each answer
  let correctCount = 0;
  question.answers.forEach((answer, answerIndex) => {
    validateAnswer(answer, qNum, answerIndex + 1);
    if (answer.isCorrect) {
      correctCount++;
    }
  });

  // Ensure exactly one correct answer
  if (correctCount === 0) {
    throw new QuizValidationError(`Question ${qNum}: Must have exactly one correct answer`);
  }

  if (correctCount > 1) {
    throw new QuizValidationError(
      `Question ${qNum}: Cannot have multiple correct answers (found ${correctCount})`
    );
  }
};

/**
 * Validate a single answer
 */
export const validateAnswer = (
  answer: { text: string; isCorrect: boolean },
  questionNum: number,
  answerNum: number
): void => {
  // Validate answer text
  if (!answer.text || answer.text.trim().length === 0) {
    throw new QuizValidationError(
      `Question ${questionNum}, Answer ${answerNum}: Text is required and cannot be empty`
    );
  }

  if (answer.text.length > 255) {
    throw new QuizValidationError(
      `Question ${questionNum}, Answer ${answerNum}: Text must be less than 255 characters`
    );
  }

  // Validate isCorrect is boolean
  if (typeof answer.isCorrect !== 'boolean') {
    throw new QuizValidationError(
      `Question ${questionNum}, Answer ${answerNum}: isCorrect must be true or false`
    );
  }
};
