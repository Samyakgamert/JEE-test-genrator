import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 bg-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">JEE Adaptive</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full border border-slate-600" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-slate-400" />
              </div>
            )}
            <span className="hidden md:block font-medium">{user?.name}</span>
          </div>
          <button onClick={logout} className="p-2 hover:bg-slate-700 rounded-full transition-colors" title="Logout">
            <LogOut className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>
      </nav>
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};
