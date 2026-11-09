import { useState } from "react";
import Quiz from "./Quiz";
import FileUpload from "./FileUpload";
import { aceQuestions, mlQuestions } from "../data/questions";
import "./QuizApp.css";
import { Images } from "../assets";

const QuizApp = () => {
  const [currentMode, setCurrentMode] = useState("menu"); // menu, ace-quiz, pmle-quiz, custom-quiz, upload
  const [customQuestions, setCustomQuestions] = useState([]);

  const handleStartAceQuiz = () => {
    setCurrentMode("ace-quiz");
  };

  const handleStartPMLEQuiz = () => {
    setCurrentMode("pmle-quiz");
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

  if (currentMode === "ace-quiz" || currentMode === "default-quiz") {
    return <Quiz questionsSource="ace" onBack={handleBackToMenu} />;
  }

  if (currentMode === "pmle-quiz" || currentMode === "ml-quiz") {
    return <Quiz questionsSource="pmle" onBack={handleBackToMenu} />;
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
          <img className="logo gradient-border" src={Images.logo} alt="Quiz App Logo" />
          <h1 className="app-title">Quizzy Spark</h1>
          <p className="app-subtitle">
            Prepare for Google Cloud certifications with our comprehensive question banks
            or upload your own custom quiz.
          </p>
        </div>

        <div className="menu-options">
          {/* Card 1: Associate Cloud Engineer (ACE) */}
          <div className="quiz-option">
            <div className="option-card ace-option">
              <span className="option-badge ace">Associate Level</span>
              <div className="option-icon">☁️</div>
              <h2 className="option-title">ACE Quiz</h2>
              <p className="option-description">
                Prepare for the Google Cloud Associate Cloud Engineer exam. Test your
                skills on deploying applications, monitoring operations, and managing enterprise cloud infrastructure.
              </p>
              <ul className="option-features">
                <li>{aceQuestions.length} verified practice questions</li>
                <li>50 random questions per quiz</li>
                <li>60-minute timed exam</li>
                <li>70% passing score</li>
              </ul>
              <button
                className="option-button ace-btn"
                onClick={handleStartAceQuiz}
              >
                Start ACE Quiz
              </button>
            </div>
          </div>

          {/* Card 2: Professional Machine Learning Engineer (PMLE) */}
          <div className="quiz-option">
            <div className="option-card pmle-option">
              <span className="option-badge pmle">Professional Level</span>
              <div className="option-icon">🤖</div>
              <h2 className="option-title">PMLE Quiz</h2>
              <p className="option-description">
                Prepare for the Google Cloud Professional Machine Learning Engineer exam.
                Test your expertise on ML architecture, Vertex AI, BigQuery ML, pipelines, and MLOps.
              </p>
              <ul className="option-features">
                <li>{mlQuestions.length} verified practice questions</li>
                <li>50 random questions per quiz</li>
                <li>60-minute timed exam</li>
                <li>70% passing score</li>
              </ul>
              <button
                className="option-button pmle-btn"
                onClick={handleStartPMLEQuiz}
              >
                Start PMLE Quiz
              </button>
            </div>
          </div>

          {/* Card 3: Custom Quiz */}
          <div className="quiz-option">
            <div className="option-card custom-option">
              <span className="option-badge custom">Custom Exam</span>
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
          
          <div className="contact-footer">
            <p className="contact-text">
              Have questions or feedback? 
              <a href="mailto:ankushbhataab@gmail.com" className="contact-email">
                ankushbhataab@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
