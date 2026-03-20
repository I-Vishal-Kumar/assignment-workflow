The Goal
We want to see if you can read documentation and connect different technologies together. Your task is to build a simple webpage where a user can type a prompt into a box, click "Run", and see the AI's response in another box, connected by a line.
The Tech Stack
MongoDB: To save the data.
Express.js & Node.js: To handle the API logic.
React: To build the frontend.
React Flow: To visualize the nodes.
OpenRouter API: To generate the text (AI).

Detailed Instructions
Step 1: The Frontend (React + React Flow)
You need to create a React application that displays a flow chart.
Library: Use React Flow.
The Setup: When the page loads, show two nodes on the screen connected by an edge (line):
Text Input Node: A box where the user can type text (e.g., "What is the capital of France?").
Result Node: A box that will show the answer.
The Button: Add a "Run Flow" button to the UI.
The Logic:
User types text into the Input Node.
User clicks "Run Flow".
The app sends the text to your Backend.
The Backend returns the AI response.
The app updates the Result Node to show the answer.
Step 2: The Backend (Node/Express)
You must create a server. Do not call the AI API directly from the frontend (this exposes your API key and is a security risk).
Route: Create a POST endpoint (e.g., /api/ask-ai).
Logic:
Receive the user's prompt from the frontend.
Send that prompt to the OpenRouter API.
Return the AI's answer to the frontend.
Free AI Model: Use a free model on OpenRouter so you don't spend money.
Model ID: google/gemini-2.0-flash-lite-preview-02-05:free OR mistralai/mistral-7b-instruct:free
Step 3: Database (MongoDB)
Create a "Save" button.
When clicked, save the current prompt and the response to a MongoDB database.

Resources & Documentation (Read These!)
How to create nodes in React Flow: React Flow Quickstart
How to use OpenRouter (AI): OpenRouter Quick Start (Look at the "Node.js" tab).
MERN Tutorial: MongoDB MERN Guide






Submission Guidelines
Email us the following on careers@futureblinkmail.xyz with subject line “MERN App - Developer Task”.
Public GitHub Repository Link: With a README.md on how to run it.
Deployed Application: Use Render.com, Heroku, Linode, Vercel, Fly.io
A Short Video Demo (Loom/YouTube): A 2-3 minute video showing:
You typing a message in your App Dashboard (e.g., "Sale 50% Off") and clicking Save.
The Proof: Showing the message appearing live on the "Online Store" preview.
The Database: Showing the record saved in your MongoDB.
Your Updated Resume
