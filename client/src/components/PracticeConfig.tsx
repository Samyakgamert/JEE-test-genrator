import React, { useState } from 'react';
import { SYLLABUS } from 'JEE-test-genrator/client/src/Data/syllabus';

interface PracticeConfigProps {
  onStart: (config: any) => void;
}

export const PracticeConfig: React.FC<PracticeConfigProps> = ({ onStart }) => {
  const [subject, setSubject] = useState<string>('Physics');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('MEDIUM');
  
  const topics = SYLLABUS[subject as keyof typeof SYLLABUS];
  // Flatten topics for Class 11 & 12
  const allTopics = [...topics['Class 11'], ...topics['Class 12']];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const selectAll = () => {
    if (selectedTopics.length === allTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(allTopics);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-2xl font-bold">Configure Practice Session</h2>
      
      {/* Subject Selection */}
      <div className="space-y-4">
        <label className="text-slate-400 uppercase text-sm font-bold tracking-wider">Subject</label>
        <div className="flex gap-4">
          {Object.keys(SYLLABUS).map((sub) => (
            <button
              key={sub}
              onClick={() => { setSubject(sub); setSelectedTopics([]); }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                subject === sub 
                  ? 'bg-brand-primary text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-4">
        <label className="text-slate-400 uppercase text-sm font-bold tracking-wider">Initial Difficulty</label>
        <div className="flex gap-4">
          {['EASY', 'MEDIUM', 'HARD', 'ADVANCED'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                difficulty === level
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-slate-400 uppercase text-sm font-bold tracking-wider">Topics</label>
          <button 
            onClick={selectAll}
            className="text-brand-primary text-sm hover:underline"
          >
            {selectedTopics.length === allTopics.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {allTopics.map((topic) => (
            <div
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`p-3 rounded border cursor-pointer transition-all ${
                selectedTopics.includes(topic)
                  ? 'bg-blue-500/20 border-blue-500 text-blue-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={selectedTopics.length === 0}
        onClick={() => onStart({ subject, topics: selectedTopics, difficulty })}
        className="w-full py-4 bg-brand-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 transition-all"
      >
        Start Practice
      </button>
    </div>
  );
};
