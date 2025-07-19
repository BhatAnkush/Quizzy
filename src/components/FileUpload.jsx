import { useState } from "react";
import "./FileUpload.css";

const FileUpload = ({ onQuestionsUploaded, onBackToDefault }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  const validateQuestionFormat = (questions) => {
    if (!Array.isArray(questions)) {
      throw new Error("Questions must be an array");
    }

    if (questions.length === 0) {
      throw new Error("Questions array cannot be empty");
    }

    questions.forEach((question, index) => {
      const requiredFields = ["id", "question", "options", "correctAnswer"];

      requiredFields.forEach((field) => {
        if (!(field in question)) {
          throw new Error(
            `Question ${index + 1} is missing required field: ${field}`,
          );
        }
      });

      if (!Array.isArray(question.options)) {
        throw new Error(`Question ${index + 1}: options must be an array`);
      }

      if (question.options.length < 2) {
        throw new Error(`Question ${index + 1}: must have at least 2 options`);
      }

      if (typeof question.correctAnswer !== "number") {
        throw new Error(
          `Question ${index + 1}: correctAnswer must be a number`,
        );
      }

      if (
        question.correctAnswer < 0 ||
        question.correctAnswer >= question.options.length
      ) {
        throw new Error(
          `Question ${index + 1}: correctAnswer index is out of range`,
        );
      }

      if (
        typeof question.question !== "string" ||
        question.question.trim() === ""
      ) {
        throw new Error(`Question ${index + 1}: question text cannot be empty`);
      }
    });

    return true;
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (file.type !== "application/json") {
      setUploadStatus("error");
      setErrorMessage("Please upload a valid JSON file");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      const text = await file.text();
      const questions = JSON.parse(text);

      validateQuestionFormat(questions);

      setUploadedFile(file);
      setQuestionCount(questions.length);
      setUploadStatus("success");
      onQuestionsUploaded(questions);
    } catch (error) {
      setUploadStatus("error");
      if (error instanceof SyntaxError) {
        setErrorMessage("Invalid JSON format. Please check your file syntax.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadStatus("idle");
    setErrorMessage("");
    setUploadedFile(null);
    setQuestionCount(0);
  };

  const downloadSample = () => {
    const sampleQuestions = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
      },
    ];

    const dataStr = JSON.stringify(sampleQuestions, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "sample-quiz-questions.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="file-upload-container">
      <div className="upload-header">
        <h1 className="upload-title">Upload Custom Quiz Questions</h1>
        <p className="upload-description">
          Upload your own quiz questions in JSON format to create a custom quiz
          experience.
        </p>
      </div>

      <div className="upload-content">
        <div className="format-info">
          <h3 className="format-title">JSON Format Requirements</h3>
          <div className="format-example">
            <pre>{`[
  {
    "id": 1,
    "question": "Your question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 2
  }
]`}</pre>
          </div>
          <div className="format-notes">
            <p>
              • <strong>id</strong>: Unique number for each question
            </p>
            <p>
              • <strong>question</strong>: The question text
            </p>
            <p>
              • <strong>options</strong>: Array of answer choices (minimum 2)
            </p>
            <p>
              • <strong>correctAnswer</strong>: Index of correct option
              (0-based)
            </p>
          </div>
          <button className="sample-download-btn" onClick={downloadSample}>
            Download Sample JSON
          </button>
        </div>

        <div className="upload-section">
          {uploadStatus === "idle" && (
            <div
              className={`file-drop-zone ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="drop-zone-content">
                <div className="upload-icon">📁</div>
                <p className="drop-text">
                  Drag and drop your JSON file here, or
                </p>
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleChange}
                    className="file-input-hidden"
                  />
                  <span className="browse-button">Browse Files</span>
                </label>
              </div>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="upload-status uploading">
              <div className="spinner"></div>
              <p>Processing your file...</p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="upload-status success">
              <div className="success-icon">✓</div>
              <h3>File Uploaded Successfully!</h3>
              <p className="success-details">
                <strong>{uploadedFile?.name}</strong>
                <br />
                {questionCount} questions loaded
              </p>
              <div className="success-actions">
                <button
                  className="start-quiz-btn"
                  onClick={() => (window.location.hash = "quiz")}
                >
                  Start Custom Quiz
                </button>
                <button className="upload-another-btn" onClick={resetUpload}>
                  Upload Another File
                </button>
              </div>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="upload-status error">
              <div className="error-icon">✗</div>
              <h3>Upload Failed</h3>
              <p className="error-message">{errorMessage}</p>
              <button className="try-again-btn" onClick={resetUpload}>
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className="upload-actions">
          <button className="back-button" onClick={onBackToDefault}>
            ← Back to Default Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
