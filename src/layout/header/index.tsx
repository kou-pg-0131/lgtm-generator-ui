import React from 'react';
import Link from 'next/link';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
        <Link href='/'>
          <a>
            <Typography variant='h1' className={classes.logo}>LGTM Generator</Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
