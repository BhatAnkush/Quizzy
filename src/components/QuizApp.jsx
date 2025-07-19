import { useState } from "react";
import Quiz from "./Quiz";
import FileUpload from "./FileUpload";
import { getRandomQuestions } from "../data/questions";
import "./QuizApp.css";

const QuizApp = () => {
  const [currentMode, setCurrentMode] = useState("menu"); // menu, default-quiz, custom-quiz, upload
  const [customQuestions, setCustomQuestions] = useState([]);

  const handleStartDefaultQuiz = () => {
    setCurrentMode("default-quiz");
  };

  const handleStartCustomQuiz = () => {
    setCurrentMode("upload");
  };

  const handleQuestionsUploaded = (questions) => {
    setCustomQuestions(questions);
    setCurrentMode("custom-quiz");
  };

  const handleBackToMenu = () => {
    setCurrentMode("menu");
    setCustomQuestions([]);
  };

  const handleBackToUpload = () => {
    setCurrentMode("upload");
  };

  if (currentMode === "upload") {
    return (
      <FileUpload
        onQuestionsUploaded={handleQuestionsUploaded}
        onBackToDefault={handleBackToMenu}
      />
    );
  }

  if (currentMode === "default-quiz") {
    return <Quiz questionsSource="default" onBack={handleBackToMenu} />;
  }

  if (currentMode === "custom-quiz") {
    return (
      <Quiz
        questionsSource="custom"
        customQuestions={customQuestions}
        onBack={handleBackToUpload}
      />
    );
  }

  // Main menu
  return (
    <div className="quiz-app-container">
      <div className="main-menu">
        <div className="menu-header">
          <h1 className="app-title">Quiz Application</h1>
          <p className="app-subtitle">
            Test your knowledge with our built-in questions or upload your own
            custom quiz
          </p>
        </div>

        <div className="menu-options">
          <div className="quiz-option">
            <div className="option-card default-option">
              <div className="option-icon">🧠</div>
              <h2 className="option-title">Default Quiz</h2>
              <p className="option-description">
                Take our comprehensive quiz with 50 questions covering various
                topics including science, history, geography, and general
                knowledge.
              </p>
              <ul className="option-features">
                <li>60 pre-made questions</li>
                <li>50 random questions per quiz</li>
                <li>60-minute timer</li>
                <li>70% passing score</li>
              </ul>
              <button
                className="option-button primary"
                onClick={handleStartDefaultQuiz}
              >
                Start Default Quiz
              </button>
            </div>
          </div>

          <div className="quiz-option">
            <div className="option-card custom-option">
              <div className="option-icon">📁</div>
              <h2 className="option-title">Custom Quiz</h2>
              <p className="option-description">
                Upload your own questions in JSON format to create a
                personalized quiz experience tailored to your specific needs.
              </p>
              <ul className="option-features">
                <li>Upload JSON file</li>
                <li>Custom question count</li>
                <li>Same timer & scoring</li>
                <li>Detailed validation</li>
              </ul>
              <button
                className="option-button secondary"
                onClick={handleStartCustomQuiz}
              >
                Upload Questions
              </button>
            </div>
          </div>
        </div>

        <div className="menu-footer">
          <div className="feature-highlights">
            <div className="feature">
              <span className="feature-icon">⏱️</span>
              <span>60-Minute Timer</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <span>Detailed Results</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💾</span>
              <span>Auto-Save Progress</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🌙</span>
              <span>Dark/Light Theme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
