import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Store, Inventory2, Person } from '@mui/icons-material';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        showLabels
        sx={{
          bgcolor: 'background.paper',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
          },
          '& .Mui-selected': {
            color: 'primary.main',
          }
        }}
      >
        <BottomNavigationAction 
          label="Farming" 
          value="/farming" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          label="Store" 
          value="/store" 
          icon={<Store />} 
        />
        <BottomNavigationAction 
          label="Inventory" 
          value="/inventory" 
          icon={<Inventory2 />} 
        />
        <BottomNavigationAction 
          label="Profile" 
          value="/profile" 
          icon={<Person />} 
        />
      </BottomNavigation>
    </Paper>
  );
}; 