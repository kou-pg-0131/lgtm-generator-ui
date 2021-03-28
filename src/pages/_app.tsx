import React from 'react';
import { AppProps } from 'next/app';
import { IconButton, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { LgtmsProvider, FavoritesProvider } from '../contexts';
import { SnackbarProvider } from 'notistack';
import '../styles/global.scss';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: 'white',
    },
  }),
);

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E90FF',
      dark: '#0070DF',
      light: '#E8EEF2',
    },
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();
  const notistackRef = React.createRef<SnackbarProvider>();

  const handleClickDissmiss = (key: React.ReactText) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => (
          <IconButton size='small' onClick={() => handleClickDissmiss(key)}>
            <Close fontSize='small' className={classes.icon}/>
          </IconButton>
        )}
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        variant='success'
        autoHideDuration={3000}
      >
        <LgtmsProvider>
          <FavoritesProvider>
            <Component {...pageProps}/>
          </FavoritesProvider>
        </LgtmsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
