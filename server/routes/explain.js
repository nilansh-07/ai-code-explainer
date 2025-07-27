const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to clean up markdown formatting
function cleanExplanation(text) {
  return text
    // Remove triple asterisks (***text*** -> text)
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
    // Remove double asterisks (**text** -> text)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove single asterisks (*text* -> text)
    .replace(/\*(.*?)\*/g, '$1')
    // Remove any remaining stray asterisks
    .replace(/\*/g, '')
    // Clean up any double spaces that might result
    .replace(/\s+/g, ' ')
    // Trim whitespace
    .trim();
}

router.post('/', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || code.trim().length === 0) {
      return res.status(400).json({ error: 'Code snippet is required' });
    }

    const prompt = `Explain this ${language || 'code'} clearly and concisely along with bullet points and without using any markdown formatting like asterisks, bold text, or special characters. Use plain text only:\n\n${code}`;

//     const prompt = `Explain the following ${language || 'code'} clearly and concisely in plain text only. 
// Use simple bullet points to break down each part of the code for easy understanding. 
// Avoid any markdown formatting like asterisks, bold text, or special characters. 
// Make sure the explanation is beginner-friendly and step-by-step.

// Code:
// ${code}`;

    // console.log("Processing request with Gemini");

    // Use the most basic model call
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let explanation = result.response.text();

    // Clean up the explanation to remove asterisks and markdown
    explanation = cleanExplanation(explanation);



    res.json({
      success: true,
      explanation: explanation,
      model: 'gemini-1.5-flash'
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate explanation',
      details: error.message
    });
  }
});

module.exports = router;