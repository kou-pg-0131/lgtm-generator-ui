import React from 'react';
import { Card, CardActions, CardMedia, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoadableButton } from '..';
import { Image } from '../../../domain';

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
    media: {
      backgroundSize: 'contain',
      height: 300,
    },
  }),
);

type Props = {
  image: Image;
  open: boolean;
  onGenerate: () => any;
  processing: boolean;
  onClose: () => any;
};

export const GenerateConfirm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.image.url}/>
        <CardActions>
          <LoadableButton
            fullWidth
            loading={props.processing}
            disabled={props.processing}
            color='primary'
            variant='contained'
            onClick={props.onGenerate}
          >
            LGTM 画像を生成する
          </LoadableButton>
        </CardActions>
      </Card>
    </Modal>
  );
};
