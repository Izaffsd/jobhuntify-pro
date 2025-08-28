# Pro-Jobhuntify

**Pro-Jobhuntify** is a React + Vite web app for finding remote jobs. It fetches real-time job listings from the **Remotive API** and lets you search, filter, and sort jobs with a modern, responsive UI built with **TailwindCSS v4** and **DaisyUI**.

---

## Features

* Search jobs by keyword with **Remotive API**
* Filter jobs by category, type, and location
* Sort jobs by title, company, or date
* Responsive design for mobile, tablet, and desktop
* Component-based structure using **React Context API**
* Smooth loading and error handling

---

## Tech Stack

* Frontend: React 19, React DOM, React Router DOM
* Styling: TailwindCSS v4, DaisyUI, Styled Components
* Animations & Icons: GSAP, Lucide React
* Data Fetching: Remotive API, Fetch API
* State Management: React Context API
* Development: Vite, @vitejs/plugin-react-swc
* Linting: ESLint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/pro-jobhuntify.git
cd pro-jobhuntify
npm install
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

* `npm run dev` – Start development server with hot reload
* `npm run build` – Build production-ready app
* `npm run preview` – Preview production build locally
* `npm run lint` – Run ESLint across project files

---

## API

**Endpoint:** `https://remotive.com/api/remote-jobs`
**Example Search:** `https://remotive.com/api/remote-jobs?search=developer`

