import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Wrapper, Header, Main, Footer } from './layouts';

const history = createBrowserHistory();

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline/>
      <SnackbarProvider
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
