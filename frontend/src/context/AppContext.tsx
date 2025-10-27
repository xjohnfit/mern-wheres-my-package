import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextProps {
    userData: Record<string, any> | null;
    setUserData: (value: Record<string, any> | null) => void;
    trackingNumbers: string[];
    setTrackingNumbers: (value: string[]) => void;
}

const AppContext = createContext<AppContextProps>({
    userData: null,
    setUserData: () => {},
    trackingNumbers: [],
    setTrackingNumbers: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<Record<string, any> | null>(null);
    const [trackingNumbers, setTrackingNumbers] = useState<string[]>([]);

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                trackingNumbers,
                setTrackingNumbers,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
