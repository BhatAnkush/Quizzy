import QuizApp from "./components/QuizApp";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <QuizApp />
    </div>
  );
}

export default App;
