import { useEffect } from "react";
import "./QuizTimer.css";

const QuizTimer = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 300) return "timer critical"; // Last 5 minutes
    if (timeLeft <= 600) return "timer warning"; // Last 10 minutes
    return "timer";
  };

  return (
    <div className={getTimerClass()}>
      <div className="timer-label">Time Remaining</div>
      <div className="timer-display">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default QuizTimer;
