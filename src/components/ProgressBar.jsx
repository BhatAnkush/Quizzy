import "./ProgressBar.css";

const ProgressBar = ({ progress, current, total }) => {
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          Progress: {current} of {total} questions answered
        </span>
        <span className="progress-percentage">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
