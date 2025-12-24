import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = storage.getAuth();
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simple mock login
        if (email === 'admin' && password === '123456') {
            const userData = { email, role: 'admin' };
            setUser(userData);
            storage.setAuth(userData);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        storage.clearAuth();
    };

    const updateProfile = (data) => {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        storage.setAuth(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
