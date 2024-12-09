import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const telegramTheme = {
  bg_color: window.Telegram?.WebApp?.themeParams?.bg_color || '#000000',
  text_color: window.Telegram?.WebApp?.themeParams?.text_color || '#ffffff',
  hint_color: window.Telegram?.WebApp?.themeParams?.hint_color || '#999999',
  button_color: window.Telegram?.WebApp?.themeParams?.button_color || green[500],
  button_text_color: window.Telegram?.WebApp?.themeParams?.button_text_color || '#ffffff',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: telegramTheme.button_color,
    },
    background: {
      default: telegramTheme.bg_color,
      paper: telegramTheme.bg_color,
    },
    text: {
      primary: telegramTheme.text_color,
      secondary: telegramTheme.hint_color,
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
}); 