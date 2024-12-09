import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TelegramProvider, useTelegram } from './contexts/TelegramContext';
import CodeEntry from './pages/CodeEntry';
import Farming from './pages/Farming';
import Store from './pages/Store';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';
import { Box } from '@mui/material';

const DEV_MODE = false; // Toggle this for development

function App() {
  return (
    <TelegramProvider>
      <Router>
        <AppContent />
      </Router>
    </TelegramProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { webApp } = useTelegram();

  useEffect(() => {
    if (webApp && location.pathname !== '/code-entry') {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => window.history.back());
    } else if (webApp) {
      webApp.BackButton.hide();
    }
  }, [location, webApp]);

  return (
    <Box sx={{ pb: 7 }}>
      <Routes>
        {DEV_MODE ? (
          // Development routes without authentication
          <>
            <Route path="/farming" element={<Farming />} />
            <Route path="/store" element={<Store />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/farming" replace />} />
          </>
        ) : (
          // Production routes with authentication
          <>
            <Route path="/code-entry" element={<CodeEntry />} />
            <Route element={<PrivateRoute />}>
              <Route path="/farming" element={<Farming />} />
              <Route path="/store" element={<Store />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/code-entry" replace />} />
          </>
        )}
      </Routes>
      <Footer />
    </Box>
  );
}

export default App; 