import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#E8EEF2',
      minHeight: '100vh',
      paddingBottom: 120,
      position: 'relative',
    },
  }),
);

type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {props.children}
    </Box>
  );
};
