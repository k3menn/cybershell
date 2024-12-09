import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  referralCode: string | null;
  telegramId: string | null;
  wallet: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  referralCode: null,
  telegramId: null,
  wallet: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state: AuthState, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
    logout: (state: AuthState) => {
      return initialState;
    },
  },
});

export const { setAuthenticated, setUserData, logout } = authSlice.actions;
export default authSlice.reducer; 