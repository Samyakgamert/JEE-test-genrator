import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// Initialize with a placeholder if missing, but check before use
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock-key");

export const generateQuestion = async (subject: string, topic: string, difficulty: string) => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is missing. Returning mock question.");
    return {
      id: Math.random().toString(36).substr(2, 9),
      text: `[MOCK] A particle moves along a straight line with velocity v = t^2 - 4t + 3. Find the distance traveled in the first 4 seconds. (Subject: ${subject}, Topic: ${topic}, Level: ${difficulty})`,
      options: ["4 m", "8 m", "6 m", "10 m"],
      correctAnswer: 0,
      explanation: "This is a mock explanation. Please set GEMINI_API_KEY in server/.env to get real AI-generated questions."
    };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a single unique JEE ${difficulty} level multiple choice question for the subject "${subject}" and topic "${topic}".
  Ensure the question is conceptual and requires calculation if applicable.
  Format the output as a valid JSON object with the following structure:
  {
    "text": "Question text here (use LaTeX for math, e.g., $x^2$)",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0, // Index of correct option (0-3)
    "explanation": "Detailed step-by-step solution"
  }
  Do not include any markdown formatting (like \`\`\`json) in the response, just the raw JSON string.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean up if markdown is present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback to mock on error to prevent app crash
    return {
      id: Math.random().toString(36).substr(2, 9),
      text: `Error generating question for ${subject} - ${topic}. Please try again.`,
      options: ["Error", "Error", "Error", "Error"],
      correctAnswer: 0,
      explanation: "Failed to connect to AI service."
    };
  }
};
