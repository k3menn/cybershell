import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const InfoCard = styled(Paper)(({ theme }) => ({
  background: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  color: '#ffffff',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
}));

const StyledTypography = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.9rem',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const ValueTypography = styled(Typography)({
  color: '#ffffff',
  fontSize: '1.5rem',
  marginBottom: '16px',
  fontWeight: 500,
  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
});

const BoosterSlot = styled(Box)(({ active }: { active?: boolean }) => ({
  border: '2px dashed rgba(255, 255, 255, 0.6)',
  padding: '16px',
  position: 'relative',
  height: '100px',
  width: '100%',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  boxShadow: active ? '0 0 15px rgba(255, 255, 255, 0.15)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px dashed rgba(255, 255, 255, 0.8)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
  },
  '& .MuiTypography-root': {
    lineHeight: 1.2,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    backdropFilter: active ? 'blur(2px)' : 'none',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  }
}));

const BoosterTitle = styled(Typography)({
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '8px',
  textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
});

const BoosterInfo = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.9rem',
  lineHeight: '1.2 !important',
});

const AddButton = styled(Button)({
  position: 'absolute',
  right: '12px',
  top: '50px',
  minWidth: 'unset',
  padding: '4px',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '1.5rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  }
});

const Farming = () => {
  const [sessionTime, setSessionTime] = useState('00:00:00');
  const [isActive, setIsActive] = useState(false);
  const [batteryCharge, setBatteryCharge] = useState(75);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const [hours, minutes, seconds] = prev.split(':').map(Number);
          let newSeconds = seconds + 1;
          let newMinutes = minutes;
          let newHours = hours;
          
          if (newSeconds === 60) {
            newSeconds = 0;
            newMinutes++;
          }
          if (newMinutes === 60) {
            newMinutes = 0;
            newHours++;
          }
          
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <Box sx={{ p: 2 }}>
      {/* System Information */}
      <InfoCard>
        <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
          System Information
        </Typography>
        
        <StyledTypography>Hash Rate</StyledTypography>
        <ValueTypography>125,000 H/s</ValueTypography>
        
        <StyledTypography>Parts per Hour</StyledTypography>
        <ValueTypography>45</ValueTypography>
        
        <StyledTypography>Booster Strength</StyledTypography>
        <ValueTypography>75%</ValueTypography>
        
        <StyledTypography>Active Session</StyledTypography>
        <ValueTypography>{sessionTime}</ValueTypography>
        
        <Button
          variant="contained"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#000000',
            fontWeight: 500,
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
            '&:hover': { 
              bgcolor: '#ffffff',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            }
          }}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </InfoCard>

      {/* V-CORE SHELL */}
      <InfoCard>
        <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
          V-CORE SHELL
        </Typography>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <BoosterSlot active>
              <BoosterTitle>Booster #1</BoosterTitle>
              <BoosterInfo>Quantum Core</BoosterInfo>
              <BoosterInfo>Power: 25</BoosterInfo>
            </BoosterSlot>
          </Grid>
          <Grid item xs={6}>
            <BoosterSlot>
              <BoosterTitle>Booster #2</BoosterTitle>
              <AddButton>
                <AddIcon />
              </AddButton>
            </BoosterSlot>
          </Grid>
          <Grid item xs={6}>
            <BoosterSlot active>
              <BoosterTitle>Booster #3</BoosterTitle>
              <BoosterInfo>Flux Matrix</BoosterInfo>
              <BoosterInfo>Power: 50</BoosterInfo>
            </BoosterSlot>
          </Grid>
          <Grid item xs={6}>
            <BoosterSlot>
              <BoosterTitle>Booster #4</BoosterTitle>
              <AddButton>
                <AddIcon />
              </AddButton>
            </BoosterSlot>
          </Grid>
        </Grid>

        {/* Battery Section */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: '#ffffff', mb: 1 }}>Battery Section</Typography>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>Charge</Typography>
            <LinearProgress 
              variant="determinate" 
              value={batteryCharge}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#ffffff',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>Efficiency</Typography>
            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>85%</Typography>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};

export default Farming; 