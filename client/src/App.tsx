import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Practice } from './pages/Practice';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const Login: React.FC = () => {
  const { login, user } = useAuth();
  if (user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">JEE Adaptive</h1>
          <p className="text-slate-400 font-medium">Master JEE with AI-Powered Practice</p>
        </div>
        
        <div className="py-8 space-y-4 text-left text-sm text-slate-400">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">✓</span>
            Adaptive Difficulty Engine
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">✓</span>
            Real Mock Test Environment
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">✓</span>
            Detailed Analytics & Feedback
          </div>
        </div>

        <button
          onClick={login}
          className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
          <Route path="/mock" element={<ProtectedRoute><div className="text-center p-10 text-slate-400">Mock Test Mode Coming Soon</div></ProtectedRoute>} />
          <Route path="/pyq" element={<ProtectedRoute><div className="text-center p-10 text-slate-400">PYQ Archive Coming Soon</div></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><div className="text-center p-10 text-slate-400">Analytics Coming Soon</div></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
