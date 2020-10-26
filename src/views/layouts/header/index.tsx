import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      color: '#fff',
      fontFamily: 'ArchivoBlack',
      fontSize: 30,
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
  }),
);

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/'>
          <Typography variant='h1' className={classes.logo}>LGTM Generator</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
