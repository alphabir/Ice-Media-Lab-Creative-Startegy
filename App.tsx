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

type ViewState = 'HOME' | 'PROFILE' | 'DIRECTORY' | 'EMPLOYEE_PROFILE';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(storageService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AdIntelligenceReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('HOME');
  const [viewedEmployee, setViewedEmployee] = useState<User | null>(null);

  useEffect(() => {
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
    setViewedEmployee(null);
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
      
      storageService.addReportToUser(user.email, fullReport);
      const updatedUser = storageService.getCurrentUser();
      if (updatedUser) setUser(updatedUser);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const viewReport = (oldReport: AdIntelligenceReport) => {
    setReport(oldReport);
    setView('HOME');
    setViewedEmployee(null);
  };

  const handleViewEmployee = (employee: User) => {
    setViewedEmployee(employee);
    setView('EMPLOYEE_PROFILE');
  };

  if (!user) {
    return <Auth onAuthComplete={handleAuth} />;
  }

  return (
    <div className="min-h-screen selection:bg-[#1bb0bd] selection:text-white bg-[#0f172a]">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onViewProfile={() => { setView('PROFILE'); setViewedEmployee(null); }}
        onViewDirectory={() => { setView('DIRECTORY'); setViewedEmployee(null); }}
        onHome={() => { setView('HOME'); setViewedEmployee(null); }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {view === 'PROFILE' ? (
          <Profile 
            user={user} 
            isOwnProfile={true}
            onViewReport={viewReport} 
            onBack={() => setView('HOME')} 
          />
        ) : view === 'EMPLOYEE_PROFILE' && viewedEmployee ? (
          <Profile 
            user={viewedEmployee} 
            isOwnProfile={viewedEmployee.email === user.email}
            onViewReport={viewReport} 
            onBack={() => setView('DIRECTORY')} 
          />
        ) : view === 'DIRECTORY' ? (
          <EmployeeDirectory onSelectEmployee={handleViewEmployee} />
        ) : (
          <div className="max-w-5xl mx-auto">
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
              <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-center animate-pulse">
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
                  <button 
                    onClick={() => setReport(null)}
                    className="text-sm text-[#1bb0bd] hover:text-white transition-colors flex items-center gap-1 font-bold uppercase tracking-widest"
                  >
                    Generate New Strategy
                  </button>
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