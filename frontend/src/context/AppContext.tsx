import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextProps {
    userData: Record<string, any> | null;
    setUserData: (value: Record<string, any> | null) => void;
}

const AppContext = createContext<AppContextProps>({
    userData: null,
    setUserData: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<Record<string, any> | null>(null);

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
