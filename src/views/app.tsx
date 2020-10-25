import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { SnackbarProvider } from 'notistack';
import { Wrapper, Header, Main, Footer } from './layouts';

const history = createBrowserHistory();

export const App: React.FC = () => {
  const notistackRef = React.createRef<SnackbarProvider>();

  const handleClickDissmiss = (key: React.ReactText) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <React.Fragment>
      <CssBaseline/>
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => (
          <IconButton size='small' onClick={() => handleClickDissmiss(key)}>
            <Close fontSize='small'/>
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
    </React.Fragment>
  );
};
