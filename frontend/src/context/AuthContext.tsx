import React, { createContext, useContext, useState, useCallback } from 'react';

//Tipos

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;                     // Guarda el rol ('ADMIN' o 'PATRULLERO')
  login: (token: string, role: string) => void; // Ahora recibe el rol del backend
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'sigep_auth';
const TOKEN_STORAGE_KEY = 'sigep_token';
const ROLE_STORAGE_KEY = 'sigep_role';     // Llave para el rol

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem(ROLE_STORAGE_KEY)); // 

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true' && !!localStorage.getItem(TOKEN_STORAGE_KEY);
  });

  const login = useCallback((newToken: string, newRole: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole); //Guardamos el rol
    setToken(newToken);
    setRole(newRole);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY); //Limpiamos el rol
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, login, logout }}>
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
