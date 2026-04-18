import { getAIResponse } from "../services/aiService.js";

export const handleAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const reply = await getAIResponse(prompt);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error" });
  }
};