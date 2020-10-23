import React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 32,
      height: 40,
      textAlign: 'center',
    },
  }),
);

type Props = {
  visible: boolean;
  processing: boolean;
  onClick: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const MoreButton: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  if (!props.visible) return null;
  return (
    <Box className={classes.root}>
      {props.processing ? (
        <CircularProgress/>
      ) : (
        <Button color='primary' variant='contained' onClick={props.onClick}>More</Button>
      )}
    </Box>
  );
};
