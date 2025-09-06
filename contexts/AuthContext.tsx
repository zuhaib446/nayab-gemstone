'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // Add storage event listener for cross-tab auth sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-logout') {
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('auth-token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        Cookies.remove('auth-token');
        localStorage.setItem('auth-logout', Date.now().toString());
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      Cookies.remove('auth-token');
      localStorage.setItem('auth-logout', Date.now().toString());
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('auth-token', data.token, { expires: 7 });
        setUser(data.user);
        return { success: true, message: 'Login successful', user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('auth-token', data.token, { expires: 7 });
        setUser(data.user);
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = () => {
    fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        Cookies.remove('auth-token');
        localStorage.setItem('auth-logout', Date.now().toString());
        setUser(null);
      })
      .catch(() => {
        // Fallback: remove cookie client-side
        Cookies.remove('auth-token');
        localStorage.setItem('auth-logout', Date.now().toString());
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
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