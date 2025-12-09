import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  token?: string;
  tokenType?: string;
  expireAt?: string;
  username?: string;
  userTypes?: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, data?: { refreshToken?: string; user?: User }) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize from localStorage
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    return {
      isAuthenticated: !!token && localStorage.getItem('isAuthenticated') === 'true',
      token,
      user: userStr ? JSON.parse(userStr) : null,
    };
  });

  // Set up axios default headers when token changes
  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  const login = (token: string, data?: { refreshToken?: string; user?: User }) => {
    const newAuthState: AuthState = {
      isAuthenticated: true,
      token,
      user: data?.user || null,
    };

    setAuthState(newAuthState);

    // Persist to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
    if (data?.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (authState.user) {
      const newUser = { ...authState.user, ...updatedUser };
      setAuthState(prev => ({ ...prev, user: newUser }));
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};