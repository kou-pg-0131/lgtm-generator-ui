import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  }),
);

export const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress/>
    </Box>
  );
};
