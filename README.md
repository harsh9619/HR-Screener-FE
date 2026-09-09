# Candidate Screener Frontend

A modern, responsive React single-page application (SPA) for the **HR Candidate Screener** system. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Redux Toolkit**, and **Redux-Saga**, this interface enables recruiters to manage job roles, upload and inspect candidate resumes, review AI integrity check flags, and evaluate automated fit scores.

---

## 🚀 Key Features

- **🔐 Authentication**: Secure login flow with JWT storage and session persistence.
- **💼 Roles Dashboard**: Interactive dashboard for creating, editing, and deleting job postings alongside customizable requirement criteria.
- **📄 Client-Side Resume Parsing & File Upload**: Drag-and-drop or file picker upload for `.pdf`, `.docx`, `.doc`, and `.txt` files with client-side text extraction powered by `pdfjs-dist` and `mammoth`. Automatically populates resume text and candidate name.
- **🛡️ AI Integrity Breakdown**: Visual display of automated integrity check results, highlighting potential resume manipulations such as hidden white text, microscopic fonts, or prompt injections.
- **📊 Candidate Scoring & Analytics**: Breakdown of candidate qualification fit scores, mandatory/optional requirement matches, and key summary highlights.
- **⚖️ Side-by-Side Candidate Comparison**: Matrix view comparing candidate fit scores, skill matches, and integrity flags to streamline hiring decisions.
- **🎨 Dark Mode UI**: Dark theme aesthetic built with Tailwind CSS, Lucide React icons, and React Toastify notifications.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript
- **State Management**: Redux Toolkit & Redux-Saga
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3, PostCSS, `clsx`, `tailwind-merge`
- **File Parsing**: `pdfjs-dist` (PDF extraction) & `mammoth` (DOCX parsing)
- **HTTP Client**: Axios
- **Icons**: `lucide-react`
- **Notifications**: `react-toastify`

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/             # Presentational components organized by feature
│   │   ├── auth/               # Login forms & auth card components
│   │   ├── candidates/         # Resume upload forms, candidate score cards, integrity badges
│   │   ├── common/             # Reusable UI controls (Buttons, Modals, Inputs, Loading Spinners)
│   │   └── roles/              # Role cards, requirement input fields, AddCandidateModal
│   ├── containers/             # Smart container pages with Redux state bindings
│   │   ├── auth/               # Login page container
│   │   ├── candidates/         # Candidate detail page & comparison view containers
│   │   ├── roles/              # Roles dashboard & role detail containers
│   │   └── LayoutContainer.tsx # Navigation header, sidebar, and layout wrapper
│   ├── services/               # Axios API client setup and endpoint integrations
│   ├── store/                  # Redux Toolkit slices, actions, sagas, and store setup
│   │   ├── auth/               # Auth state slice & login sagas
│   │   ├── candidates/         # Candidate list, upload, and score sagas
│   │   ├── roles/              # Role CRUD state slice & sagas
│   │   ├── rootReducer.ts      # Redux root reducer
│   │   └── rootSaga.ts         # Combined Redux-Saga root listener
│   ├── utils/                  # Client-side helpers
│   │   └── fileExtractor.ts    # PDF, DOCX, DOC, and TXT client-side text extractor
│   ├── App.tsx                 # Route definitions and protected route guard logic
│   ├── main.tsx                # Application entry point rendering Redux Provider
│   └── index.css               # Global Tailwind CSS imports and theme configuration
├── .env.example                # Template for environment variables
├── index.html                  # HTML entry template
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.js          # Tailwind styling rules and extensions
├── vite.config.ts              # Vite bundling & dev server settings
└── vercel.json                 # SPA routing rewrites for Vercel deployment
```

---

## ⚙️ Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (Version 18.x or 20.x or 22.x)
- Running **Candidate Screener Backend** service (on `http://localhost:5000` or hosted endpoint)

---

## 💻 Getting Started

### 1. Installation

Navigate to the `frontend` directory and install project dependencies:

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the backend API base URL in `.env`:

```env
VITE_API_URL=http://localhost:5000
```

> **Note**: In production (e.g. Vercel deployment), point `VITE_API_URL` to your production backend URL.

### 3. Running Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📜 NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with HMR. |
| `npm run build` | Runs TypeScript type checking (`tsc`) and builds optimized production bundle into `dist/`. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint across TypeScript and TSX files. |

---

## 🧭 Page Routes

| Path | Description | Access Level |
| :--- | :--- | :--- |
| `/login` | Recruiter login screen | Public |
| `/dashboard` | Job roles dashboard and role creation | Protected |
| `/roles/:id` | Job role details, requirement manager & resume upload | Protected |
| `/candidates/:id` | Full candidate analysis, fit score breakdown & integrity report | Protected |
| `/compare` | Side-by-side multi-candidate comparison view | Protected |

---

## 🛡️ License

This project is licensed under the MIT License.
