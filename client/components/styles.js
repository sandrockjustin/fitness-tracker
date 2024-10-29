import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material";
//Hook to call styling for useStyles instance
//Below we can define specific stylings to call later in other components
const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    overflowX: 'auto',
    flexDirection: 'row',
    gap: '10px',
    padding: '20px',
    margin: '10px'
  },
  workouts: {
    flex: '250px',
    display: '250px',
    minHeight: '250px',
    maxHeight: '100%',
    overflowY: 'auto',
    minWidth: '300px',
    maxWidth: '300px',
    padding: '20px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxSizing: 'border-box',
    position: 'relative',
    flexDirection: 'column',
    borderRadius: '10px'
  },
  iconButton: {
    height: '30px',
    position: 'absolute',
    right: '30px',
    top: '30px',
    width: '40px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'rgba(211, 211, 211, 0.3)' }
  },
  text: {
    fontFamily: 'Roboto, sans serif',
    fontSize: '1.2rem',
  }
}));

//theme style
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#353839',
      paper: '#353839',
    },
    primary: {
      main: '#353839',
    },
    secondary: {
      main: '#353839',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAF0E6',
      paper: '#FAF0E6',
    },
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    }
  }
});

export default useStyles;