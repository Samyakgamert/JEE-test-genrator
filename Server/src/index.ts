import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateQuestion } from './services/geminiService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/generate-question', async (req, res) => {
  try {
    const { subject, topic, difficulty } = req.body;
    if (!subject || !topic) {
      return res.status(400).json({ error: 'Subject and Topic are required' });
    }
    const question = await generateQuestion(subject, topic, difficulty || 'MEDIUM');
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
