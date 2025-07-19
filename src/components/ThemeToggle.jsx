import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">{isDark ? "🌙" : "☀️"}</div>
      </div>
    </button>
  );
};

export default ThemeToggle;
