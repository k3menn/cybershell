import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/authSlice';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        close(): void;
        expand(): void;
        BackButton: {
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
          isVisible: boolean;
        };
        MainButton: {
          text: string;
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            username?: string;
          };
        };
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          button_color: string;
          button_text_color: string;
        };
      };
    };
  }
}

interface TelegramContextType {
  webApp: typeof window.Telegram.WebApp | null;
  user: {
    id: number;
    username?: string;
  } | null;
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
});

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const tg = window.Telegram.WebApp;
      if (!tg) {
        console.error('Telegram WebApp is not available');
        return;
      }
      setWebApp(tg);
      tg.ready();
      
      // Expand to full height
      tg.expand();

      if (tg.initDataUnsafe.user) {
        dispatch(setUserData({
          telegramId: tg.initDataUnsafe.user.id.toString(),
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      console.error('Failed to initialize Telegram WebApp:', error);
    }
  }, [dispatch]);

  return (
    <TelegramContext.Provider value={{ webApp, user: webApp?.initDataUnsafe.user || null }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext); 