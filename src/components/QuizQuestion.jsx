import "./QuizQuestion.css";

const QuizQuestion = ({ question, selectedAnswer, onAnswer }) => {
  if (!question) return null;

  const handleOptionClick = (optionIndex) => {
    onAnswer(question.id, optionIndex);
  };

  return (
    <div className="quiz-question">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === index ? "selected" : ""}`}
            onClick={() => handleOptionClick(index)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
