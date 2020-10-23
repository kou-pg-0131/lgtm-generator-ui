import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';
import { Header, Main, Footer } from './layouts';

const history = createBrowserHistory();

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Router history={history}>
        <Header/>
        <Main/>
        <Footer/>
      </Router>
    </React.Fragment>
  );
};
