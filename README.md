# ⚡ Quizzy Spark

> Interactive Google Cloud Certification Exam Preparation & Custom Quiz Web App.

🌐 **Live Application:** [https://quizzy-jxta.onrender.com/](https://quizzy-jxta.onrender.com/)

---

## 📖 About

**Quizzy Spark** is a modern, responsive web application built to help cloud professionals and learners prepare for Google Cloud certification exams. Users can test their skills with verified question banks or upload custom JSON quizzes for personalized practice.

---

## 🎯 Available Quizzes

### 1. ☁️ Associate Cloud Engineer (ACE) Quiz
- **Question Pool:** 269 verified practice questions
- **Format:** 50 randomized questions per session
- **Duration:** 60-minute timed exam simulation
- **Passing Score:** 70%
- **Topics Covered:** Google Cloud infrastructure, Compute Engine, GKE, IAM & Security, VPC Networking, Cloud Storage, Cloud SQL, App Engine, and Cloud Monitoring.

### 2. 🤖 Professional Machine Learning Engineer (PMLE) Quiz
- **Question Pool:** 375 verified practice questions
- **Format:** 50 randomized questions per session
- **Duration:** 60-minute timed exam simulation
- **Passing Score:** 70%
- **Topics Covered:** Machine Learning architecture, Vertex AI (Pipelines, Training, Endpoints, Model Registry, Feature Store, Model Monitoring), BigQuery ML, TensorFlow / PyTorch / Scikit-learn, Dataflow, TPU/GPU hardware selection, Explainable AI, and MLOps best practices.

### 3. 📁 Custom Quiz
- Upload your own multiple-choice quiz questions in JSON format.
- Instant client-side validation ensuring question and answer integrity.
- Works with custom question counts while keeping the same timer, scoring, and review experience.

---

## ✨ Features

- ⏱️ **Timed Exam Simulation:** 60-minute countdown timer with automatic submission upon time expiry.
- 🎲 **Randomized Question Selection:** Questions are randomly selected using the Fisher-Yates algorithm from the question bank.
- 💾 **Auto-Save Progress:** Answers are persisted in `localStorage` per quiz type, protecting against accidental refreshes.
- 📊 **Comprehensive Results & Review:** View score percentage, pass/fail status, and inspect each question with explanations, correct answers, and your choices.
- 🌓 **Dark & Light Mode:** Seamless theme switching with system preference detection and saved settings.
- 📱 **Fully Responsive:** Optimized for desktop, tablet, and mobile viewing.

---

## 📋 Custom Quiz JSON Format

To create and upload your own quiz, format your JSON file as an array of objects matching this schema:

```json
[
  {
    "id": 1,
    "question": "What service on Google Cloud provides serverless Apache Spark?",
    "options": [
      "Compute Engine",
      "Dataproc Serverless",
      "Cloud Functions",
      "Google Kubernetes Engine"
    ],
    "correctAnswer": 1
  }
]
```

- `id` *(number)*: Unique question identifier.
- `question` *(string)*: The question text.
- `options` *(array of strings)*: At least 2 answer choices.
- `correctAnswer` *(number)*: 0-based index of the correct answer in the `options` array.

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Bundler & Tooling:** [Vite 8](https://vite.dev/)
- **Styling:** Vanilla CSS with CSS Custom Properties, modern gradients, and responsive grid
- **Hosting:** [Render](https://render.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quizzy.git
   cd quizzy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

6. Run linter:
   ```bash
   npm run lint
   ```

---

## 📬 Contact & Feedback

Have questions, suggestions, or feedback? Feel free to reach out:
- **Email:** [ankushbhataab@gmail.com](mailto:ankushbhataab@gmail.com)
- **Live Demo:** [https://quizzy-jxta.onrender.com/](https://quizzy-jxta.onrender.com/)
