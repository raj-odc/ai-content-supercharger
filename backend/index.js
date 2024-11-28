const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// import OpenAI from "openai";
const openai = new OpenAI();

// Route for enhancing content
app.post('/enhance', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: text,
            },
        ],
    });

    const enhancedText = response.choices[0].message.trim();
    res.json({ enhancedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while enhancing the content' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
