## 🏗️ Project Initialization

### Step 1: Create React App
```bash
npm create vite@latest - js + SWC
cd pro-jobhuntify/
npm install

# Vite versi 7.0.6 memerlukan Node.js v20.19.0 ke atas.
# Kau guna Node v20.15.1, jadi dia bagi warning.


### Step 2: Install Required Dependencies
```bash
npm install tailwindcss @tailwindcss/vite

in vite.config.js = import tailwindcss from '@tailwindcss/vite'
and tailwindcss(),

remove all index.css
@import "tailwindcss";

npm i -D daisyui@latest
@plugin "daisyui";

---

## 🎯 Step-by-Step Development

### Phase 1: Basic Setup & Routing (Day 1-2)

#### Step 1: Clean Up Default Files
```bash
# Remove unnecessary files
rm src/App.css src/assets/logo.svg

#### Step 2: Create Basic App Structure
**src/App.jsx**