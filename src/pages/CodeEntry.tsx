import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useTelegram } from '../contexts/TelegramContext';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/authSlice';

const CodeEntry = () => {
  const [referralCode, setReferralCode] = useState('');
  const { user } = useTelegram();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (referralCode.length === 6) {
      dispatch(setUserData({
        referralCode,
        isAuthenticated: true,
        telegramId: user?.id.toString(),
      }));
      navigate('/farming');
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Welcome to Cybershell</Typography>
      {user ? (
        <Typography variant="body1">
          Connected as: {user.username || user.id}
        </Typography>
      ) : (
        <Typography color="error">
          Please open this app through Telegram
        </Typography>
      )}
      <TextField
        label="Referral Code"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        inputProps={{ maxLength: 6 }}
        placeholder="Enter 6-character code"
      />
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={referralCode.length !== 6 || !user}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CodeEntry; 