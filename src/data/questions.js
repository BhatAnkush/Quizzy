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
  if (typeOrCount === "pml" || typeOrCount === "ml") {
    return getRandomMLQuestions(count);
  }
  return getRandomAceQuestions(count);
};

export { aceQuestions, mlQuestions };
export const quizQuestions = aceQuestions; // For backward compatibility
export const pmlQuestions = mlQuestions; // Alias
