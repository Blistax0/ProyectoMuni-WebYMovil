import React, { createContext, useContext, useState, useCallback } from 'react';

//Tipos

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;                     // Guarda el rol ('ADMIN' o 'PATRULLERO')
  userName: string | null;                 // Guarda el nombre del usuario
  login: (token: string, role: string, userName: string) => void; // Ahora recibe el nombre
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'sigep_auth';
const TOKEN_STORAGE_KEY = 'sigep_token';
const ROLE_STORAGE_KEY = 'sigep_role';     // Llave para el rol
const USERNAME_STORAGE_KEY = 'sigep_username'; // Llave para el nombre

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem(ROLE_STORAGE_KEY));
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem(USERNAME_STORAGE_KEY));

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true' && !!localStorage.getItem(TOKEN_STORAGE_KEY);
  });

  const login = useCallback((newToken: string, newRole: string, newUserName: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    localStorage.setItem(USERNAME_STORAGE_KEY, newUserName);
    setToken(newToken);
    setRole(newRole);
    setUserName(newUserName);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(USERNAME_STORAGE_KEY);
    setToken(null);
    setRole(null);
    setUserName(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  return context;
};

export default AuthContext;
