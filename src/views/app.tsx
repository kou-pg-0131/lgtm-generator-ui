import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Header, Main } from './layouts';

const history = createBrowserHistory();

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Header/>
        <Main/>
      </Router>
    </React.Fragment>
  );
};
