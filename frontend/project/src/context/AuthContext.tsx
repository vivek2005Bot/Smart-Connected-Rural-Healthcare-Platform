import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Initialize default user if not exists
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      // Create default user
      const defaultUser = {
        id: '1',
        name: 'Vivek Kumar',
        email: 'kvivek19738@gmail.com',
        password: 'vivek2005', // In production, this should be hashed
        role: 'patient'
      };
      localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('User not found. Please register first.');
      }

      if (user.password !== password) {
        throw new Error('Invalid password.');
      }

      // Create a token (in production this would be from the server)
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
      localStorage.setItem('token', token);
      
      setIsAuthenticated(true);
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password, // In production, this should be hashed
        role
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after registration
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.id === decoded.userId);
        
        if (user) {
          setIsAuthenticated(true);
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          });
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 