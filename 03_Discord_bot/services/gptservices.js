const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.openApiKey,
});

async function askGPT(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful Discord bot." },
      { role: "user", content: message },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { askGPT };
