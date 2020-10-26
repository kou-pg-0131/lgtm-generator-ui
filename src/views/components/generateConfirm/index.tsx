import React from 'react';
import { CardActions, CardMedia } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LoadableButton, ModalCard } from '..';
import { Image } from '../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      backgroundSize: 'contain',
      height: 300,
    },
  }),
);

type Props = {
  image: Image;
  open: boolean;
  onGenerate: () => void;
  processing: boolean;
  onClose: () => void;
};

export const GenerateConfirm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <ModalCard open={props.open} onClose={props.onClose}>
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
    </ModalCard>
  );
};
