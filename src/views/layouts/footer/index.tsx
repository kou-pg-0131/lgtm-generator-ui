import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 40,
      textAlign: 'center',
    },
  }),
);

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography>&copy; 2020 koki sato</Typography>
    </Container>
  );
};
