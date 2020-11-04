import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      bottom: 0,
      left: 0,
      padding: 40,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
    copyright: {
      fontSize: 16,
    },
    link: {
      fontSize: 12,
    },
  }),
);

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.copyright}>&copy; 2020 koki sato</Typography>
      <Typography className={classes.link}><Link to='/precaution'>ご利用上の注意</Link></Typography>
    </Box>
  );
};
