import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Target, BarChart2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const modes = [
    {
      title: 'Adaptive Practice',
      description: 'Topic-wise unlimited practice with adaptive difficulty.',
      icon: <Target className="w-8 h-8 text-blue-400" />,
      action: () => navigate('/practice'),
      color: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50'
    },
    {
      title: 'Mock Tests',
      description: 'Full-length JEE Mains & Advanced mock tests.',
      icon: <Clock className="w-8 h-8 text-purple-400" />,
      action: () => navigate('/mock'),
      color: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50'
    },
    {
      title: 'PYQ Archive',
      description: 'Previous Year Questions from 2000-2025.',
      icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
      action: () => navigate('/pyq'),
      color: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50'
    },
    {
      title: 'Analytics',
      description: 'Track your progress, strong & weak areas.',
      icon: <BarChart2 className="w-8 h-8 text-amber-400" />,
      action: () => navigate('/analytics'),
      color: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back, Aspirant!</h2>
        <p className="text-slate-400">Ready to crack JEE? Choose a mode to start.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <div
            key={mode.title}
            onClick={mode.action}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${mode.color} flex items-start gap-4 hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="p-3 bg-slate-800 rounded-lg">
              {mode.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
              <p className="text-slate-400">{mode.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
