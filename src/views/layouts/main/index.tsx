import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { LgtmsPage, NotFoundPage } from '../../pages';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 38,
    },
  }),
);

export const Main: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const [path, setPath] = useState<string>(location.pathname);

  const handleChange = (e: React.ChangeEvent<unknown>, value: string) => {
    history.replace({ pathname: value });
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Paper>
        <Tabs
          variant='fullWidth'
          value={path}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label='LGTM 画像' value='/'/>
          <Tab label='画像検索' value='/search_images'/>
          <Tab label='お気に入り' value='/favorites'/>
        </Tabs>
      </Paper>

      <Switch>
        <Route exact path='/' component={LgtmsPage}/>
        <Route       path='*' component={NotFoundPage}/>
      </Switch>
    </Container>
  );
};
