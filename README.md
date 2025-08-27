# Pro-Jobhuntify

**Pro-Jobhuntify** is a React + Vite web application for discovering remote jobs. It fetches real-time job listings from the **Remotive API** and allows users to filter, search, and sort jobs with a responsive, modern UI built with **TailwindCSS v4** and **DaisyUI**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)

---

## Features
- Search jobs by keyword using **Remotive API**
- Filter jobs by category, job type, and location
- Sort jobs by title, company, or date
- Responsive design for mobile, tablet, and desktop
- Component-based architecture with **React Context API**
- Loading and error handling UI for smooth user experience

---

## Tech Stack
- **Frontend:** React 19, React DOM, React Router DOM
- **Styling:** TailwindCSS v4, DaisyUI, Styled Components
- **Animations & Icons:** GSAP, Lucide React
- **Data Fetching:** Remotive API, Fetch API
- **State Management:** React Context API
- **Development:** Vite, @vitejs/plugin-react-swc
- **Linting:** ESLint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh

---

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/pro-jobhuntify.git
cd pro-jobhuntify


Install dependencies and devDependencies:
npm install react@^19.1.0 react-dom@^19.1.0 react-router-dom@^7.7.1 styled-components@^6.1.19 tailwindcss@^4.1.11 @tailwindcss/vite@^4.1.11 lucide-react@^0.536.0 gsap@^3.13.0 react-responsive@^10.0.1 -D vite@^7.0.4 @vitejs/plugin-react-swc@^3.10.2 daisyui@^5.0.50 eslint@^9.30.1 @eslint/js@^9.30.1 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20 globals@^16.3.0 @types/react@^19.1.8 @types/react-dom@^19.1.6


Run the development server:
npm run dev
The app will be available at http://localhost:5173.


Available Scripts
npm run dev – Start development server with hot reload

npm run build – Build production-ready app

npm run preview – Preview production build locally

npm run lint – Run ESLint across project files


API Reference
Remotive API Endpoint: https://remotive.io/api/remote-jobs

Search Example: https://remotive.io/api/remote-jobs?search=developer


