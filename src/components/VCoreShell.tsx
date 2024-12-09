import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography, Theme } from '@mui/material';

const ShellContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  background: '#000',
  border: '1px solid #00ff00',
  position: 'relative',
}));

const BoosterSlot = styled('div')(({ theme }: { theme: Theme }) => ({
  width: 60,
  height: 60,
  border: '1px solid #00ff00',
  margin: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: '0 0 10px #00ff00',
  },
}));

interface VCoreShellProps {
  boosters: Array<{
    id: string;
    type: string;
    strength: number;
  }>;
  onBoosterClick: (boosterId: string) => void;
}

export const VCoreShell = ({ boosters, onBoosterClick }: VCoreShellProps) => {
  return (
    <ShellContainer>
      <Typography variant="h6" sx={{ color: '#00ff00', mb: 2 }}>
        V-CORE SHELL
      </Typography>
      <Grid container spacing={2}>
        {/* Booster slots */}
        {Array(8).fill(null).map((_, index) => (
          <Grid item key={index}>
            <BoosterSlot
              onClick={() => {
                const booster = boosters[index];
                if (booster) {
                  onBoosterClick(booster.id);
                }
              }}
            >
              {boosters[index] && (
                <Typography variant="caption" sx={{ color: '#00ff00' }}>
                  {boosters[index].type}
                </Typography>
              )}
            </BoosterSlot>
          </Grid>
        ))}
      </Grid>
    </ShellContainer>
  );
}; 