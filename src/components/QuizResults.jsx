import { useState } from "react";
import { Images } from "../assets";
import "./QuizResults.css";

const QuizResults = ({
  results,
  onRestart,
  onBack,
  isCustomQuiz = false,
  quizTitle,
  quizShortTitle,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    correctCount,
    totalQuestions,
    percentage,
    passed,
    answeredQuestions,
  } = results;

  return (
    <div className="quiz-results">
      <div className="results-header">
        <div className="results-branding">
          <img className="results-logo" src={Images.logo} alt="Quizzy Spark Logo" />
          <span className="results-brand-title">Quizzy Spark</span>
        </div>
        <h1 className="results-title">Quiz Results</h1>
        {quizTitle && <p className="results-quiz-subtitle">{quizTitle}</p>}
        <div className={`result-status ${passed ? "passed" : "failed"}`}>
          {passed ? "PASSED" : "FAILED"}
        </div>
      </div>

      <div className="results-summary">
        <div className="score-display">
          <div className="score-circle">
            <span className="score-percentage">{percentage}%</span>
          </div>
          <div className="score-details">
            <p className="score-text">
              You answered <strong>{correctCount}</strong> out of{" "}
              <strong>{totalQuestions}</strong> questions correctly.
            </p>
            <p className="pass-requirement">
              {passed
                ? "Congratulations! You passed the quiz."
                : "You need 70% or above to pass. Better luck next time!"}
            </p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button
          className="toggle-details-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide" : "Show"} Detailed Results
        </button>
        <button className="restart-button" onClick={onRestart}>
          {isCustomQuiz ? "Retake Quiz" : `Retake ${quizShortTitle || "Quiz"}`}
        </button>
        {onBack && (
          <button className="back-button-results" onClick={onBack}>
            ← Back to {isCustomQuiz ? "Upload" : "Menu"}
          </button>
        )}
      </div>

      {showDetails && (
        <div className="detailed-results">
          <h3 className="details-title">Question by Question Review</h3>
          <div className="questions-review">
            {answeredQuestions.map((item, index) => (
              <div
                key={index}
                className={`question-review ${item.isCorrect ? "correct" : "incorrect"}`}
              >
                <div className="question-number">Question {index + 1}</div>
                <div className="question-content">
                  <p className="review-question">{item.question}</p>
                  <div className="answer-options">
                    {item.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`review-option ${
                          optionIndex === item.correctAnswer
                            ? "correct-answer"
                            : ""
                        } ${
                          optionIndex === item.userAnswer &&
                          item.userAnswer !== item.correctAnswer
                            ? "wrong-answer"
                            : ""
                        } ${
                          optionIndex === item.userAnswer &&
                          item.userAnswer === item.correctAnswer
                            ? "user-correct"
                            : ""
                        }`}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <span className="option-text">{option}</span>
                        {optionIndex === item.correctAnswer && (
                          <span className="answer-badge correct">
                            Correct Answer
                          </span>
                        )}
                        {optionIndex === item.userAnswer &&
                          item.userAnswer !== item.correctAnswer && (
                            <span className="answer-badge wrong">
                              Your Answer
                            </span>
                          )}
                        {optionIndex === item.userAnswer &&
                          item.userAnswer === item.correctAnswer && (
                            <span className="answer-badge user-correct">
                              Your Answer (Correct)
                            </span>
                          )}
                      </div>
                    ))}
                  </div>
                  {!item.isAnswered && (
                    <div className="unanswered-notice">
                      ⚠️ You did not answer this question
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
