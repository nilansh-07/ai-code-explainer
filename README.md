<!-- Banner -->
<p align="center">
  <img src="https://img.shields.io/badge/AI%20Code%20Explainer-%F0%9F%94%A5-5000ff?style=for-the-badge" alt="AI Code Explainer">
</p>

<h1 align="center">🤖 AI Code Explainer</h1>

<p align="center">
  Paste your code, get instant AI-generated explanations.  
  <br />
  Powered by <strong>Gemini AI</strong> and <strong>DeepSeek LLM</strong>.
</p>

<p align="center">
  <a href="https://ai-code-explainer-pi.vercel.app" target="_blank">
    🔗 Live Demo
  </a>
  •
  <a href="#-features">Features</a>
  •
  <a href="#-tech-stack">Tech Stack</a>
  •
  <a href="#-getting-started">Setup</a>
</p>

---

## 🎯 Overview

**AI Code Explainer** is a full-stack GenAI tool that simplifies complex code into human-readable explanations using state-of-the-art LLMs. Ideal for students, developers, and interview prep.

---

## ✨ Features

- 📤 Paste your source code
- 🔍 AI explains it in plain language
- 💡 Supports multiple languages (via LLMs)
- 🔗 Hosted on Vercel (frontend) and Render (backend)
- 🔐 API keys secured via environment variables

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-%23339933?logo=node.js&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Express-%23000000?logo=express&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vercel-%23000000?logo=vercel&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Render-%23000000?logo=render&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Gemini%20AI-%23154AFF?logo=google&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/DeepSeek-%230099FF?style=for-the-badge" />
</p>

---

## 🚀 Live Demo

🌐 Frontend: [https://ai-code-explainer-pi.vercel.app](https://ai-code-explainer-pi.vercel.app)  
⚙️ Backend: [https://ai-code-explainer-cwd2.onrender.com](https://ai-code-explainer-cwd2.onrender.com)

---

## 📦 Getting Started

### 🔧 Prerequisites
- Node.js ≥ v16
- Yarn or npm

### 🖥️ Local Setup

```bash
# Clone repo
git clone https://github.com/yourusername/ai-code-explainer.git
cd ai-code-explainer

# Install frontend
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Install backend
cd ../backend
npm install
echo "PORT=5000
GEMINI_API_KEY=your_gemini_key" > .env

# Start backend
node server.js

# Start frontend (in separate terminal)
cd ../frontend
npm start
