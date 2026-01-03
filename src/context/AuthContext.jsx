import { createContext, useContext, useEffect, useState } from 'react';
import { getEvalData, setEvalData } from '../utils/storage';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const VALID_USERS = {
  'admin@gmail.com': { role: 'admin', password: 'admin1234' },
  'customer@gmail.com': { role: 'customer', password: 'customer1234' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = getEvalData();
    if (data.user) setUser(data.user);
  }, []);

  const login = (email, password) => {
    const found = VALID_USERS[email];
    if (!found || found.password !== password) {
      alert('Invalid credentials. Please check email or password.');
      return false;
    }
    const authUser = { email, role: found.role };
    const data = getEvalData();
    data.user = authUser;
    setEvalData(data);
    setUser(authUser);
    return true;
  };

  const logout = () => {
    const data = getEvalData();
    data.user = null;
    setEvalData(data);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
