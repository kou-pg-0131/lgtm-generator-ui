import React from 'react';
import { Box, CircularProgress, Modal, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      left: '50%',
      outline: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      textAlign: 'center',
    },
    text: {
      color: 'white',
    },
  }),
);

type Props = {
  open: boolean;
  text?: string;
};

export const ModalLoading: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal open={props.open}>
      <Box className={classes.box}>
        <CircularProgress/>
        {props.text && (
          <Typography className={classes.text}>{props.text}</Typography>
        )}
      </Box>
    </Modal>
  );
};
