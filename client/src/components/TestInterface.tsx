import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, AlertCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TestInterfaceProps {
  config: any;
  onExit: () => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ config, onExit }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0, streak: 0 });
  const [timer, setTimer] = useState(0);

  // Timer
  useEffect(() => {
    let interval: any;
    if (!loading && !isSubmitted) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading, isSubmitted]);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    setTimer(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    
    try {
      // Pick a random topic from selected topics
      const randomTopic = config.topics[Math.floor(Math.random() * config.topics.length)];
      
      // Determine difficulty based on stats/streak (Simple Adaptive Logic)
      let currentDifficulty = config.difficulty;
      if (stats.streak >= 3) currentDifficulty = 'HARD'; // Increase if doing well
      else if (stats.streak <= -2) currentDifficulty = 'EASY'; // Decrease if struggling

      const response = await axios.post('/api/generate-question', {
        subject: config.subject,
        topic: randomTopic,
        difficulty: currentDifficulty
      });
      setQuestion(response.data);
    } catch (err) {
      setError('Failed to load question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted && !loading) {
        handleSubmit();
        alert("Test auto-submitted due to tab switching.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }); // Remove dependencies to ensure we always use latest closure (inefficient but safe for MVP with timer)



  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    
    const isCorrect = selectedOption === question?.correctAnswer;
    setStats(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : (prev.streak > 0 ? -1 : prev.streak - 1)
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 animate-pulse">Generating adaptive question...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-400">{error}</p>
        <button onClick={fetchQuestion} className="px-6 py-2 bg-brand-primary rounded-lg">Retry</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Score: <span className="text-white font-bold">{stats.correct}/{stats.total}</span></span>
          <span className="text-slate-400">Streak: <span className={`${stats.streak > 0 ? 'text-green-400' : 'text-red-400'} font-bold`}>{stats.streak}</span></span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        <button onClick={onExit} className="text-sm text-red-400 hover:text-red-300">End Session</button>
      </div>

      {/* Question */}
      <div className="bg-slate-800 p-8 rounded-xl space-y-6 shadow-xl">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg font-medium leading-relaxed">{question?.text}</p>
        </div>

        <div className="space-y-3">
          {question?.options.map((option, index) => (
            <div
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                isSubmitted
                  ? index === question.correctAnswer
                    ? 'bg-green-500/20 border-green-500'
                    : index === selectedOption
                      ? 'bg-red-500/20 border-red-500'
                      : 'border-slate-700 opacity-50'
                  : selectedOption === index
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
              {isSubmitted && index === question.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500" />}
              {isSubmitted && index === selectedOption && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Explanation */}
      {isSubmitted ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="font-bold text-slate-300 mb-2">Explanation:</h3>
            <p className="text-slate-400">{question?.explanation}</p>
          </div>
          <button
            onClick={fetchQuestion}
            className="w-full py-4 bg-brand-primary hover:bg-blue-600 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            Next Question <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full py-4 bg-brand-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 transition-all"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};
