import { aceQuestions } from "./aceQuestions.js";
import { mlQuestions } from "./mlQuestions.js";

const fisherYatesShuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomAceQuestions = (count = 50) => {
  const shuffled = fisherYatesShuffle(aceQuestions);
  return shuffled.slice(0, count);
};

export const getRandomMLQuestions = (count = 50) => {
  const shuffled = fisherYatesShuffle(mlQuestions);
  return shuffled.slice(0, count);
};

export const getRandomQuestions = (typeOrCount = "ace", count = 50) => {
  if (typeof typeOrCount === "number") {
    return getRandomAceQuestions(typeOrCount);
  }
  if (typeOrCount === "ml" || typeOrCount === "pmle" || typeOrCount === "pml") {
    return getRandomMLQuestions(count);
  }
  return getRandomAceQuestions(count);
};

export const QUIZ_CONFIGS = {
  ace: {
    id: "ace",
    title: "Google Cloud Associate Cloud Engineer Quiz",
    shortTitle: "Associate Cloud Engineer (ACE)",
    badge: "Associate Level",
    badgeClass: "badge-ace",
    icon: "☁️",
    description:
      "Test your knowledge on deploying applications, monitoring operations, and managing enterprise solutions on Google Cloud Platform.",
    totalQuestions: aceQuestions.length,
    defaultCount: 50,
    timeMinutes: 60,
    passingScore: 70,
  },
  pmle: {
    id: "pmle",
    title: "Google Cloud Professional Machine Learning Engineer Quiz",
    shortTitle: "Professional Machine Learning (PMLE)",
    badge: "Professional Level",
    badgeClass: "badge-pmle",
    icon: "🤖",
    description:
      "Test your expertise in designing, building, and deploying ML models, data pipelines, Vertex AI, BigQuery ML, and MLOps solutions on GCP.",
    totalQuestions: mlQuestions.length,
    defaultCount: 50,
    timeMinutes: 60,
    passingScore: 70,
  },
  custom: {
    id: "custom",
    title: "Custom Quiz",
    shortTitle: "Custom Quiz",
    badge: "Custom Exam",
    badgeClass: "badge-custom",
    icon: "📁",
    description:
      "Upload your own questions in JSON format to create a personalized quiz experience tailored to any certification or topic.",
    totalQuestions: null,
    defaultCount: 50,
    timeMinutes: 60,
    passingScore: 70,
  },
};

export { aceQuestions, mlQuestions };
export const quizQuestions = aceQuestions; // For backward compatibility
export const pmlQuestions = mlQuestions; // Alias
