import React from 'react';
import { AppProvider } from './AgentContext';
import { AuthProvider } from './AuthProviderContext';

const CombinedContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </AuthProvider>
    );
};

export default CombinedContextProvider;
