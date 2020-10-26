import React from 'react';
import { Card, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      left: '50%',
      outline: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '75%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
  }),
);

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export const ModalCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card className={classes.card}>
        {props.children}
      </Card>
    </Modal>
  );
};
