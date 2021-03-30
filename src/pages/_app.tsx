import React from 'react';
import { AppProps } from 'next/app';
import { IconButton, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { ImagesProvider } from '../contexts/imagesProvider';
import { ApiProvider } from '../contexts/apiProvider';
import { LgtmsProvider } from '../contexts/lgtmsProvider';
import { FavoritesProvider } from '../contexts/favoritesProvider';
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
        <ApiProvider>
          <LgtmsProvider>
            <ImagesProvider>
              <FavoritesProvider>
                <Component {...pageProps}/>
              </FavoritesProvider>
            </ImagesProvider>
          </LgtmsProvider>
        </ApiProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
