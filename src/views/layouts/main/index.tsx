import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { LgtmsPage, NotFoundPage } from '../../pages';

export const Main: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Switch>
        <Route exact path='/' component={LgtmsPage}/>
        <Route       path='*' component={NotFoundPage}/>
      </Switch>
    </Container>
  );
};
