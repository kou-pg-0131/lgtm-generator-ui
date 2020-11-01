import React from 'react';
import { CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LoadableButton, ModalCard } from '..';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      paddingBottom: 0,
      textAlign: 'center',
    },
    text: {
      marginBottom: 12,
    },
    img: {
      border: '1px solid #ddd',
      maxHeight: 300,
      maxWidth: '100%',
    },
  }),
);

type Props = {
  imageName: string;
  imageSrc: string;
  open: boolean;
  onGenerate: () => void;
  generating: boolean;
  onClose: () => void;
};

export const GenerateConfirm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <ModalCard open={props.open} onClose={props.onClose}>
      <CardContent className={classes.content}>
        <Typography className={classes.text}>この画像で LGTM 画像を生成しますか？</Typography>
        <img className={classes.img} src={props.imageSrc} alt={props.imageName}/>
      </CardContent>
      <CardActions>
        <LoadableButton
          fullWidth
          loading={props.generating}
          color='primary'
          variant='contained'
          onClick={props.onGenerate}
        >
          LGTM 画像を生成
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
