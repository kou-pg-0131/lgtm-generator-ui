import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MainPage, NotFoundPage } from '../../pages';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 38,
    },
  }),
);

export const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </Container>
  );
};
