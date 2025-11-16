# WebTech Website

A modern, responsive website built with React and Vite featuring navigation between Home, About Us, Course, and Project pages.

## Features

- 🏠 **Home** - Welcome page with hero section and features
- 👥 **About Us** - Information about the company and statistics
- 📚 **Course** - Display of available courses
- 💼 **Project** - Portfolio of projects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
webtech/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Navigation.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── AboutUs.jsx
│   │   ├── AboutUs.css
│   │   ├── Course.jsx
│   │   ├── Course.css
│   │   ├── Project.jsx
│   │   └── Project.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- React 18
- React Router DOM
- Vite
- CSS3 (Modern styling with CSS variables)

## License

MIT

