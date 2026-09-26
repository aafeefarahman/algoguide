# AlgoGuide — Algorithm Recommendation System

AlgoGuide is an Algorithm Recommendation System website built for students, teachers, and technical portfolio showcases. It analyzes problem descriptions in plain English, recommends optimal algorithmic strategies (DP, Greedy, Graph, Sorting, Searching, Backtracking, Divide & Conquer, Data Structures), displays confidence scores and complexity breakdowns, and deep-links directly to real open-source implementations on **TheAlgorithms** GitHub organization.

---

## 🌟 Key Features

1. **Hero Section Redesign**:
   - Dark navy background (`#0a1628`).
   - Tilted, layered 4-panel visual mockup simulating Problem Prompt, Input Analysis, Category Tags, and Output Results using CSS transforms and abstract colored blocks.

2. **Algorithm Recommender Form**:
   - Free-text prompt input with character counter (`0/500`) and real validation.
   - Taxonomy classification dropdown: *Sorting, Searching, Graph, Dynamic Programming, Greedy, Divide & Conquer, Backtracking, Data Structures*.
   - Target implementation language dropdown: *Python, Java, JavaScript, C++*.
   - Interactive example chips to auto-fill sample prompts.

3. **Recommendation Result Screen**:
   - Algorithm heading, match confidence score badge (e.g. `96%`), Time & Space complexities ($O((V+E) \log V)$, $O(V)$).
   - Plain-English explanation of why the algorithm fits the problem constraints.
   - Primary CTA: **"View Implementation on GitHub"** with small GitHub icon deep-linking directly to `TheAlgorithms` organization repositories.
   - Secondary link to explore category guides.

4. **GitHub Deep-Linking Logic**:
   - Explicit lookup table (`githubLookup.js` & `github_lookup.py`) mapping `{algorithm, category, language}` to exact repository files (Python, Java, JavaScript, C++).
   - Automatic fallback to category explanation folders on `TheAlgorithms` organization.
   - All links open in a new tab (`target="_blank" rel="noopener noreferrer"`).
   - Footer & About page attribution: *"Algorithm implementations linked from the open-source TheAlgorithms project."*

5. **Learning Resources & Category Guides**:
   - 4 homepage cards (*Sorting, Searching, Graph, Data Structures*) with individual clickable algorithm links.
   - "Learn More →" routing to internal category pages (`/resources/:categoryId`).

6. **Interactive Practice / Quiz Mode**:
   - Scenario-based multiple-choice questions to test algorithm intuition with immediate feedback, detailed solution breakdowns, and score tracking.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React Icons, React Router DOM.
- **Backend**: FastAPI (Python), Uvicorn, Scikit-Learn (TF-IDF & NLP Keyword Matching), Pydantic.

---

## 🚀 How to Run Locally

### 1. Start FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Backend API will run at `http-[#]127.0.0.1:8000` with interactive docs at `http-[#]127.0.0.1:8000/docs`.

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend app will run at `http-[#]localhost:3000`.

---

## 📜 Open Source Attribution
Algorithm implementations linked from the open-source [TheAlgorithms](https://github.com/TheAlgorithms) project.
