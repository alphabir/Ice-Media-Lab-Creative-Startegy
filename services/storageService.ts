import { User, AdIntelligenceReport } from '../types';

const USERS_KEY = 'icemedia_org_users';
const CURRENT_USER_KEY = 'icemedia_active_session';

export const storageService = {
  /**
   * Retrieves all user entries from the organization database.
   */
  getAllUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Adds a new user record to the organization database.
   */
  addUser: (user: User) => {
    const users = storageService.getAllUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  /**
   * Updates an existing user record in the organization database.
   */
  updateUser: (user: User) => {
    const users = storageService.getAllUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index > -1) {
      users[index] = user;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Sync active session if this is the logged-in user
      const current = storageService.getCurrentUser();
      if (current && current.email === user.email) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      }
    }
  },

  /**
   * Saves a user record, deciding whether to add or update based on email presence.
   */
  saveUser: (user: User) => {
    const users = storageService.getAllUsers();
    const exists = users.some(u => u.email === user.email);
    if (exists) {
      storageService.updateUser(user);
    } else {
      storageService.addUser(user);
    }
  },

  /**
   * Retrieves the currently authenticated user session.
   */
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Authenticates a user by email and creates a local session.
   */
  login: (email: string): User | null => {
    const users = storageService.getAllUsers();
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  /**
   * Clears the current session.
   */
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  /**
   * Appends an intelligence report to a specific user's history.
   */
  addReportToUser: (userEmail: string, report: AdIntelligenceReport) => {
    const users = storageService.getAllUsers();
    const user = users.find(u => u.email === userEmail);
    if (user) {
      user.analysisHistory = [report, ...(user.analysisHistory || [])];
      storageService.updateUser(user);
    }
  }
};