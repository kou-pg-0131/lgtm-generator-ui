import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      color: '#fff',
      fontSize: 36,
    },
  }),
);

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' >
      <Toolbar>
        <Link to='/'>
          <Typography variant='h1' className={classes.logo}>LGTM Generator</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
