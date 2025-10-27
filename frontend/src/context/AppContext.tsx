import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextProps {
    userData: Record<string, any> | null;
    setUserData: (value: Record<string, any> | null) => void;
    trackingNumbers: string[];
    setTrackingNumbers: (value: string[]) => void;
    authChecking: boolean;
}

const AppContext = createContext<AppContextProps>({
    userData: null,
    setUserData: () => {},
    trackingNumbers: [],
    setTrackingNumbers: () => {},
    authChecking: true,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<Record<string, any> | null>(() => {
        try {
            const persisted = localStorage.getItem('wimpUser');
            return persisted ? JSON.parse(persisted) : null;
        } catch {
            return null;
        }
    });
    const [trackingNumbers, setTrackingNumbers] = useState<string[]>([]);
    const [authChecking, setAuthChecking] = useState<boolean>(true);

    useEffect(() => {
        // On mount, restore persisted user if present and validate token
        const restoreAndValidate = async () => {
            try {
                const current = userData;
                if (current?.token) {
                    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                    const response = await fetch(`${apiBaseUrl}/verify-token`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${current.token}`,
                        },
                    });

                    if (!response.ok) {
                        // Token invalid or expired
                        localStorage.removeItem('wimpUser');
                        setUserData(null);
                    }
                } else {
                    // No persisted session
                    setUserData(null);
                }
            } catch (e) {
                // If parsing fails, clear any bad data
                localStorage.removeItem('wimpUser');
                setUserData(null);
            } finally {
                setAuthChecking(false);
            }
        };

        restoreAndValidate();
    }, []);

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                trackingNumbers,
                setTrackingNumbers,
                authChecking,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
