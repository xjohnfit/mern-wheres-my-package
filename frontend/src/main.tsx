import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { AppProvider } from './context/AppContext.tsx';
import { BackgroundLines } from './components/ui/background-lines';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider
                defaultTheme='dark'
                storageKey='vite-ui-theme'>
                <AppProvider>
                    <BackgroundLines children={<App />} />
                    
                </AppProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
