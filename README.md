# AI Flow - MERN App

A simple MERN stack application where a user can type a prompt, click "Run Flow", and see the AI's response visualized using React Flow nodes connected by an edge.

## Tech Stack

- **Frontend:** React + Vite + React Flow
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **AI:** OpenRouter API (google/gemini-2.0-flash-lite-preview-02-05:free)

## Prerequisites

- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas connection string
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))

## Setup & Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd assignment-u
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit the `.env` file and fill in your values:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-flow
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

- Replace `MONGODB_URI` with your MongoDB Atlas connection string (or keep as-is for local MongoDB).
- Replace `OPENROUTER_API_KEY` with your actual API key from [openrouter.ai](https://openrouter.ai).

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit the `.env` file:

```
VITE_API_BASE=http://localhost:5000
```

For production, set `VITE_API_BASE` to your deployed backend URL (e.g. `https://your-app.onrender.com`).

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## How to Use

1. Type a question/prompt in the **Prompt Input** node.
2. Click **Run Flow** to send it to the AI.
3. The AI response appears in the **AI Response** node.
4. Click **Save** to store the prompt and response in MongoDB.
5. Click **History** to view all previously saved conversations.

## Project Structure

```
assignment-u/
├── backend/
│   ├── models/
│   │   └── Conversation.js    # Mongoose schema
│   ├── server.js              # Express server + API routes
│   ├── .env.example           # Backend env template
│   └── package.json
├── frontend/
│   ├── .env.example           # Frontend env template
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputNode.jsx  # Custom React Flow input node
│   │   │   └── ResultNode.jsx # Custom React Flow result node
│   │   ├── App.jsx            # Main app with React Flow
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```
