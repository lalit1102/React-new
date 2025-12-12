# Hotel Feedback App (Pure React JSX CRUD)

This is a small **Hotel Feedback** example built with **React + Vite** using plain JSX and local component state only (no external state libraries).

It demonstrates a classic **CRUD** workflow:

- Create new feedback
- Read and list all feedback
- Update existing feedback
- Delete feedback items

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the URL printed in the terminal (usually `http://localhost:5173`).

## How It Works

- `src/App.jsx` contains all the UI and CRUD logic using `useState`.
- Feedback is stored in an in-memory array, seeded with a couple of example reviews.
- `FeedbackForm` handles both **create** and **edit** modes depending on whether an `initialValue` prop is passed.
- `FeedbackList` renders all reviews and exposes **Edit** and **Delete** actions.

You can use this project as a simple reference or as a starting point for your own hotel/guest feedback features.


