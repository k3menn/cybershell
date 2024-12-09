import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { TelegramProvider, useTelegram } from './contexts/TelegramContext';
import CodeEntry from './pages/CodeEntry';
import Farming from './pages/Farming';
import Store from './pages/Store';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';

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
    <Routes>
      <Route path="/code-entry" element={<CodeEntry />} />
      <Route element={<PrivateRoute />}>
        <Route path="/farming" element={<Farming />} />
        <Route path="/store" element={<Store />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/code-entry" replace />} />
    </Routes>
  );
}

export default App; 