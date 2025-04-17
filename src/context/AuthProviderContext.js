// AuthContext.tsx
import React, { createContext, useState } from 'react';

const AuthProviderContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    const setUserRole = (role) => setRole(role);

    return (
        <AuthProviderContext.Provider value={{ isAuthenticated, login, logout, role, setUserRole }}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthProviderContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
