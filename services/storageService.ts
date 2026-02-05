import { User, AdIntelligenceReport } from '../types';

const USERS_KEY = 'icemedia_org_users';
const CURRENT_USER_KEY = 'icemedia_active_session';

export const storageService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = storageService.getUsers();
    const existingIndex = users.findIndex(u => u.email === user.email);
    if (existingIndex > -1) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Also update active session if it's the same user
    const current = storageService.getCurrentUser();
    if (current && current.email === user.email) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  login: (email: string): User | null => {
    const users = storageService.getUsers();
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  addReportToUser: (userEmail: string, report: AdIntelligenceReport) => {
    const users = storageService.getUsers();
    const user = users.find(u => u.email === userEmail);
    if (user) {
      user.analysisHistory = [report, ...(user.analysisHistory || [])];
      storageService.saveUser(user);
    }
  }
};