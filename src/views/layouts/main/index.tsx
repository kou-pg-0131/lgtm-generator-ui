import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LgtmsPage } from '../../pages';

export const Main: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={LgtmsPage}/>
      </Switch>
    </React.Fragment>
  );
};
