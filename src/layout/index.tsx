import React from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Header } from './header';
import { Footer } from './footer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#E8EEF2',
      minHeight: '100vh',
      paddingBottom: 120,
      position: 'relative',
    },
    main: {
      paddingTop: 38,
    },
  }),
);

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header/>
      <Container className={classes.main} component='main' maxWidth='lg'>
        {props.children}
      </Container>
      <Footer/>
    </Box>
  );
};
