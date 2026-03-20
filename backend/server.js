const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Conversation = require("./models/Conversation");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST /api/ask-ai - Send prompt to OpenRouter and get AI response
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OpenRouter API key not configured" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "AI API error" });
    }

    const aiResponse = data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error calling AI:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// POST /api/save - Save prompt and response to MongoDB
app.post("/api/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: "Prompt and response are required" });
    }

    const conversation = new Conversation({ prompt, response });
    await conversation.save();

    res.json({ message: "Saved successfully", data: conversation });
  } catch (error) {
    console.error("Error saving:", error);
    res.status(500).json({ error: "Failed to save conversation" });
  }
});

// GET /api/history - Fetch all saved conversations
app.get("/api/history", async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
