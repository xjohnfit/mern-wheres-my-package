import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextProps {
    backgroundFill: string;
    setBackgroundFill: (value: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
    backgroundFill: 'white',
    setBackgroundFill: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [backgroundFill, setBackgroundFill] = useState('white');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AppContext.Provider
            value={{
                backgroundFill,
                setBackgroundFill,
                isAuthenticated,
                setIsAuthenticated,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

