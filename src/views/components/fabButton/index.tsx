import React from 'react';
import { Fab, FabProps } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      bottom: 24,
      position: 'fixed',
      right: 24,
      zIndex: 999,
    },
  }),
);

type Props = FabProps;

export const FabButton: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Fab className={classes.fab} {...props}>
      {props.children}
    </Fab>
  );
};
