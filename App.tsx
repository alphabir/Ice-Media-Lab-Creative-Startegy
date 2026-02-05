
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ReportDashboard from './components/ReportDashboard';
import Auth from './components/Auth';
import Profile from './components/Profile';
import EmployeeDirectory from './components/EmployeeDirectory';
import { generateAdIntelligence } from './services/geminiService';
import { storageService } from './services/storageService';
import { AdAnalysisInput, AdIntelligenceReport, User } from './types';

type ViewState = 'HOME' | 'PROFILE' | 'DIRECTORY';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(storageService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AdIntelligenceReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('HOME');

  useEffect(() => {
    // Sync local storage user state
    if (user) {
      storageService.saveUser(user);
    }
  }, [user]);

  const handleAuth = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setReport(null);
    setView('HOME');
  };

  const handleAnalyze = async (input: AdAnalysisInput) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateAdIntelligence(input);
      const fullReport: AdIntelligenceReport = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        input
      };
      setReport(fullReport);
      
      // Save report to user history
      storageService.addReportToUser(user.email, fullReport);
      // Update local state to reflect history change immediately
      const updatedUser = storageService.getCurrentUser();
      if (updatedUser) setUser(updatedUser);
      
    } catch (err) {
      console.error(err);
      setError("Failed to generate intelligence report. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const viewReport = (oldReport: AdIntelligenceReport) => {
    setReport(oldReport);
    setView('HOME');
  };

  if (!user) {
    return <Auth onAuthComplete={handleAuth} />;
  }

  return (
    <div className="min-h-screen selection:bg-[#1bb0bd] selection:text-white bg-[#0f172a]">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onViewProfile={() => setView('PROFILE')}
        onViewDirectory={() => setView('DIRECTORY')}
        onHome={() => setView('HOME')}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {view === 'PROFILE' ? (
          <Profile user={user} onViewReport={viewReport} onBack={() => setView('HOME')} />
        ) : view === 'DIRECTORY' ? (
          <EmployeeDirectory />
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            {!report && !isLoading && (
              <div className="text-center mb-16 space-y-6 max-w-3xl mx-auto pt-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                  Welcome back, <span className="text-[#1bb0bd]">{user.fullName.split(' ')[0]}</span>.
                </h1>
                <p className="text-xl text-slate-400">
                  Ready to map the next cultural shift for {user.department}?
                </p>
              </div>
            )}

            <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />

            {error && (
              <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-center animate-bounce">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-24 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-[#1bb0bd]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#1bb0bd] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-lg text-[#1bb0bd] font-medium animate-pulse">
                  Aggregating Lab data and cultural signals...
                </p>
              </div>
            )}

            {report && !isLoading && (
              <div className="mt-16 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                  <h2 className="text-3xl font-bold text-white">Intelligence Output</h2>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setReport(null)}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      New Strategy
                    </button>
                  </div>
                </div>
                <ReportDashboard report={report} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm">
        <p>© 2024 Ice Media Lab. Powered by Ice Intelligence Suite.</p>
      </footer>
    </div>
  );
};

export default App;
