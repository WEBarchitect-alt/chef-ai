import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODELS = [
  "llama-3.1-8b-instant",
  "llama3-8b-8192",
  "llama-3.1-70b-versatile",
];

export const getAIResponse = async (prompt) => {
  for (let model of MODELS) {
    try {
      const response = await groq.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `
You are a professional cooking assistant.

Generate realistic recipes.

RULES:
- Return 2–5 recipes
- Time should be realistic (5 mins to 2 hours)
- Ingredients must be real
- Steps must be clear and practical
- Do NOT leave any field empty

Also include:
- servings (e.g. "2 people")
- difficulty (Easy / Medium / Hard)
- calories (approx)

Return ONLY JSON:

{
  "recipes": [
    {
      "title": "",
      "time": "",
      "servings": "",
      "difficulty": "",
      "calories": "",
      "ingredients": [],
      "steps": []
    }
  ]
}
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      let text = response.choices[0].message.content;

      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        console.log("✅ Using model:", model);
        return jsonMatch[0];
      }

      throw new Error("Invalid JSON");
    } catch (err) {
      console.warn("❌ Model failed:", model);
      continue;
    }
  }

  // fallback
  return JSON.stringify({
    recipes: [
      {
        title: "Basic Sandwich",
        time: "10 mins",
        servings: "1 person",
        difficulty: "Easy",
        calories: "200 kcal",
        ingredients: ["Bread", "Butter"],
        steps: ["Apply butter", "Serve"],
      },
    ],
  });
};