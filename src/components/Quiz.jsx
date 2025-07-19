import { useState, useEffect } from "react";
import { getRandomQuestions } from "../data/questions";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import ProgressBar from "./ProgressBar";
import QuizResults from "./QuizResults";
import "./Quiz.css";

const Quiz = ({
  questionsSource = "default",
  customQuestions = [],
  onBack,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      // Load answers from localStorage
      const savedAnswers = localStorage.getItem("quizAnswers");
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    }
  }, [quizStarted, quizCompleted]);

  useEffect(() => {
    // Save answers to localStorage whenever answers change
    if (quizStarted && !quizCompleted) {
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
    }
  }, [answers, quizStarted, quizCompleted]);

  const startQuiz = () => {
    let quizQuestions;

    if (questionsSource === "custom" && customQuestions.length > 0) {
      // Use all custom questions or random subset if more than 50
      if (customQuestions.length <= 50) {
        quizQuestions = customQuestions;
      } else {
        const shuffled = [...customQuestions].sort(() => 0.5 - Math.random());
        quizQuestions = shuffled.slice(0, 50);
      }
    } else {
      // Use default questions
      quizQuestions = getRandomQuestions(50);
    }

    setQuestions(quizQuestions);
    setQuizStarted(true);
    setAnswers({});
    localStorage.removeItem("quizAnswers");
  };

  const handleAnswer = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const navigateToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const submitQuiz = () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setQuizCompleted(true);
    localStorage.removeItem("quizAnswers");
  };

  const calculateResults = () => {
    let correctCount = 0;
    const answeredQuestions = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      answeredQuestions.push({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer,
        isCorrect: isCorrect,
        isAnswered: userAnswer !== undefined,
      });
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 70;

    return {
      correctCount,
      totalQuestions: questions.length,
      percentage,
      passed,
      answeredQuestions,
    };
  };

  const handleTimeUp = () => {
    if (!quizCompleted) {
      submitQuiz();
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(3600);
    setQuizStarted(false);
    setQuizCompleted(false);
    setResults(null);
    localStorage.removeItem("quizAnswers");
  };

  if (!quizStarted) {
    const questionCount =
      questionsSource === "custom" && customQuestions.length > 0
        ? Math.min(customQuestions.length, 50)
        : 50;

    return (
      <div className="quiz-container">
        <div className="quiz-welcome">
          <h1 className="quiz-title">
            {questionsSource === "custom" ? "Custom Quiz" : "Google Cloud Associate Quiz"}
          </h1>
          <div className="quiz-info">
            <p>This quiz contains {questionCount} multiple-choice questions.</p>
            <p>You have 60 minutes to complete the quiz.</p>
            <p>You need to score 70% or above to pass.</p>
            <p>Your answers will be saved automatically as you progress.</p>
            {questionsSource === "custom" && (
              <p className="custom-quiz-note">
                📁 Using your uploaded custom questions
              </p>
            )}
          </div>
          <div className="quiz-start-actions">
            <button className="start-button" onClick={startQuiz}>
              Start Quiz
            </button>
            {onBack && (
              <button className="back-to-menu-button" onClick={onBack}>
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted && results) {
    return (
      <QuizResults
        results={results}
        onRestart={resetQuiz}
        onBack={onBack}
        isCustomQuiz={questionsSource === "custom"}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <QuizTimer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onTimeUp={handleTimeUp}
        />
        <ProgressBar
          progress={progress}
          current={answeredCount}
          total={questions.length}
        />
      </div>

      <div className="quiz-content">
        <div className="question-counter">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />

        <div className="quiz-navigation">
          <button
            className="nav-button"
            onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <button
            className="nav-button"
            onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>

        <div className="question-grid">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`question-number ${
                index === currentQuestionIndex ? "current" : ""
              } ${
                answers[questions[index].id] !== undefined ? "answered" : ""
              }`}
              onClick={() => navigateToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button className="submit-button" onClick={submitQuiz}>
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
