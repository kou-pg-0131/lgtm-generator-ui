import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

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
  }),
);

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography>&copy; 2020 koki sato</Typography>
    </Box>
  );
};
