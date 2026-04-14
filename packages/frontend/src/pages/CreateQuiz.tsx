import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  order: number;
  answers: Answer[];
}

interface CreateQuizProps {
  onQuizCreated: () => void;
  onCancel: () => void;
}

function CreateQuiz({ onQuizCreated, onCancel }: CreateQuizProps) {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState<Array<{ text: string; isCorrect: boolean }>>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'basic' | 'questions' | 'review'>('basic');

  const handleAddQuestion = () => {
    setError('');

    // Validate question text
    if (!currentQuestion.trim()) {
      setError('Question text is required');
      return;
    }

    // Validate all 4 answers have text
    for (let i = 0; i < 4; i++) {
      if (!currentAnswers[i].text.trim()) {
        setError(`Answer ${i + 1} is required`);
        return;
      }
    }

    // Check exactly one answer is correct
    const correctCount = currentAnswers.filter(a => a.isCorrect).length;
    if (correctCount === 0) {
      setError('Select one correct answer');
      return;
    }
    if (correctCount > 1) {
      setError('Only one answer can be correct');
      return;
    }

    // Add question
    const newQuestion: Question = {
      id: Math.random().toString(),
      text: currentQuestion,
      order: questions.length + 1,
      answers: currentAnswers.map((a, idx) => ({
        id: Math.random().toString(),
        text: a.text,
        isCorrect: a.isCorrect,
      })),
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
  };

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...currentAnswers];
    newAnswers[index].text = text;
    setCurrentAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newAnswers = currentAnswers.map((a, i) => ({
      ...a,
      isCorrect: i === index,
    }));
    setCurrentAnswers(newAnswers);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions.map((q, i) => ({ ...q, order: i + 1 })));
  };

  const handleCreateQuiz = async () => {
    setError('');
    setLoading(true);

    try {
      if (!title.trim()) {
        setError('Quiz title is required');
        return;
      }

      if (questions.length === 0) {
        setError('Add at least one question');
        return;
      }

      // Create quiz first
      const quizRes = await axios.post(
        '/api/quiz',
        {
          title: title.trim(),
          description: description.trim(),
          isPublic,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const quizId = quizRes.data.id;

      // Add all questions
      for (const question of questions) {
        await axios.post(
          `/api/quiz/${quizId}/questions`,
          {
            text: question.text,
            order: question.order,
            answers: question.answers,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onQuizCreated();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quiz title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quiz description (optional)"
                  rows={4}
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Make quiz public</span>
                </label>
              </div>

              <button
                onClick={() => setStep('questions')}
                disabled={!title.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
              >
                Next: Add Questions
              </button>
              <button
                onClick={onCancel}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Step 2: Add Questions */}
          {step === 'questions' && (
            <div className="space-y-4">
              {/* Question Editor */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Question {questions.length + 1}
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text *
                  </label>
                  <textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your question"
                    rows={2}
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Answer Choices (exactly 4) *
                </label>

                <div className="space-y-3 mb-4">
                  {currentAnswers.map((answer, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="correct"
                        checked={answer.isCorrect}
                        onChange={() => handleCorrectAnswerChange(idx)}
                        className="w-4 h-4 text-green-600"
                      />
                      <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Answer ${idx + 1}`}
                      />
                      {answer.isCorrect && (
                        <span className="text-green-600 font-semibold text-sm">
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddQuestion}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Add Question
                </button>
              </div>

              {/* Questions List */}
              {questions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">
                    Questions Added ({questions.length})
                  </h3>
                  <div className="space-y-2">
                    {questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="flex justify-between items-start bg-gray-50 p-3 rounded"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            Q{idx + 1}: {q.text}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            4 answers • 1 correct
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveQuestion(idx)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('basic')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  disabled={questions.length === 0}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                >
                  Review ({questions.length})
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 'review' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Review Your Quiz</h2>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-lg">{title}</p>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
                <p className="text-gray-600 text-sm mt-2">
                  {questions.length} questions • {questions.length * 4} total answers
                </p>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-3">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">
                      Q{idx + 1}: {q.text}
                    </p>
                    <ul className="text-sm mt-2 space-y-1 ml-4">
                      {q.answers.map((a) => (
                        <li key={a.id}>
                          {a.isCorrect ? '✓' : '○'} {a.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('questions')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateQuiz}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                >
                  {loading ? 'Creating...' : 'Create Quiz'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;