import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/users/login', { email, password });
    if (data.success) {
      setUser(data.data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    }
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await API.post('/users/register', { name, email, password, phone });
    if (data.success) {
      setUser(data.data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
