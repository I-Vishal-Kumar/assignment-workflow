const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
