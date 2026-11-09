import { useState, useEffect } from "react";
import {
  getRandomAceQuestions,
  getRandomMLQuestions,
  QUIZ_CONFIGS,
} from "../data/questions";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import ProgressBar from "./ProgressBar";
import QuizResults from "./QuizResults";
import { Images } from "../assets";
import "./Quiz.css";

const Quiz = ({
  questionsSource = "ace",
  customQuestions = [],
  onBack,
}) => {
  const normalizedSource =
    questionsSource === "pmle" || questionsSource === "ml"
      ? "pmle"
      : questionsSource === "custom"
      ? "custom"
      : "ace";

  const storageKey = `quizAnswers_${normalizedSource}`;
  const quizConfig = QUIZ_CONFIGS[normalizedSource] || QUIZ_CONFIGS.ace;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`quizAnswers_${normalizedSource}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Save answers to localStorage whenever answers change
    if (quizStarted && !quizCompleted) {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    }
  }, [answers, quizStarted, quizCompleted, storageKey]);

  const startQuiz = () => {
    let quizQuestions;

    if (normalizedSource === "custom" && customQuestions.length > 0) {
      // Use all custom questions or random subset if more than 50
      if (customQuestions.length <= 50) {
        quizQuestions = customQuestions;
      } else {
        const shuffled = [...customQuestions].sort(() => 0.5 - Math.random());
        quizQuestions = shuffled.slice(0, 50);
      }
    } else if (normalizedSource === "pmle") {
      quizQuestions = getRandomMLQuestions(50);
    } else {
      // ACE
      quizQuestions = getRandomAceQuestions(50);
    }

    setQuestions(quizQuestions);
    setQuizStarted(true);
    setAnswers({});
    localStorage.removeItem(storageKey);
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
    localStorage.removeItem(storageKey);
  };

  const calculateResults = () => {
    let correctCount = 0;
    const answeredQuestions = [];

    questions.forEach((question) => {
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
    const passed = percentage >= quizConfig.passingScore;

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
    localStorage.removeItem(storageKey);
  };

  if (!quizStarted) {
    const questionCount =
      normalizedSource === "custom" && customQuestions.length > 0
        ? Math.min(customQuestions.length, 50)
        : 50;

    return (
      <div className="quiz-container">
        <div className={`quiz-welcome ${quizConfig.badgeClass}-theme`}>
          <div className="quiz-branding">
            <img className="quiz-logo" src={Images.logo} alt="Quizzy Spark Logo" />
            <h1 className="quiz-brand-title">Quizzy Spark</h1>
          </div>
          <span className={`quiz-welcome-badge ${quizConfig.badgeClass}`}>
            {quizConfig.badge}
          </span>
          <h2 className="quiz-title">{quizConfig.title}</h2>
          <div className="quiz-info">
            <p>This quiz contains {questionCount} multiple-choice questions.</p>
            <p>You have {quizConfig.timeMinutes} minutes to complete the quiz.</p>
            <p>You need to score {quizConfig.passingScore}% or above to pass.</p>
            <p>Your answers will be saved automatically as you progress.</p>
            {normalizedSource === "custom" ? (
              <p className="custom-quiz-note">
                📁 Using your uploaded custom questions ({customQuestions.length} total)
              </p>
            ) : (
              <p className="pool-info-note">
                🎲 50 questions randomly selected from our verified bank of {quizConfig.totalQuestions} questions.
              </p>
            )}
          </div>
          <div className="quiz-start-actions">
            <button className={`start-button ${quizConfig.badgeClass}-btn`} onClick={startQuiz}>
              Start Quiz
            </button>
            {onBack && (
              <button className="back-to-menu-button" onClick={onBack}>
                ← Back to Menu
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
        isCustomQuiz={normalizedSource === "custom"}
        quizTitle={quizConfig.title}
        quizShortTitle={quizConfig.shortTitle}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-header-branding">
          <img className="quiz-header-logo" src={Images.logo} alt="Quizzy Spark Logo" />
          <div className="quiz-header-text">
            <span className="quiz-header-brand">Quizzy Spark</span>
            <span className="quiz-header-subtitle">{quizConfig.shortTitle}</span>
          </div>
        </div>
        <div className="quiz-timer">
          <QuizTimer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            onTimeUp={handleTimeUp}
          />
        </div>
        <div className="progress-submit-container">
          <ProgressBar
            progress={progress}
            current={answeredCount}
            total={questions.length}
          />
          <button className="submit-button-header" onClick={submitQuiz}>
            Submit Quiz
          </button>
        </div>
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

          {isLastQuestion ? (
            <button
              className="nav-button submit-nav-button"
              onClick={submitQuiz}
            >
              Submit
            </button>
          ) : (
            <button
              className="nav-button"
              onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          )}
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
      </div>
    </div>
  );
};

export default Quiz;
