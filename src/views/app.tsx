import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline, ThemeProvider, IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { SnackbarProvider } from 'notistack';
import { Theme } from './theme';
import { Wrapper, Header, Main, Footer } from './layouts';

const history = createBrowserHistory();

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: 'white',
    },
  }),
);

export const App: React.FC = () => {
  const classes = useStyles();

  const notistackRef = React.createRef<SnackbarProvider>();

  const handleClickDissmiss = (key: React.ReactText) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={Theme}>
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
        <Router history={history}>
          <Wrapper>
            <Header/>
            <Main/>
            <Footer/>
          </Wrapper>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
