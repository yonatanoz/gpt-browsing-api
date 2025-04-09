
// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/api/fetch-details", async (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ error: "Missing name or role." });

  const prompt = `השתמש בידע ובגישה לאינטרנט כדי למצוא את הכתובת ומספר הטלפון של ${role} בשם "${name}". אם אינך מוצא – כתוב "לא ידוע".`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "לא ידוע";
    res.json({ result: content });
  } catch (err) {
    console.error("GPT fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
