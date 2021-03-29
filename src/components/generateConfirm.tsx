import React from 'react';
import { Button, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ModalCard, ExternalLink } from '.';

const useStyles = makeStyles(() =>
  createStyles({
    cardContent: {
      paddingBottom: 0,
      textAlign: 'center',
    },
    confirmText: {
      marginBottom: 12,
    },
    precautionLink: {
      fontSize: 12,
    },
    img: {
      border: '1px solid #ddd',
      maxHeight: 300,
      maxWidth: '100%',
    },
  }),
);

type Props = {
  open: boolean;
  onClose: () => void;
  imgSrc?: string;
};

export const GenerateConfirm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <ModalCard open={props.open} onClose={props.onClose}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.confirmText}>この画像で LGTM 画像を生成しますか？</Typography>
        <img className={classes.img} src={props.imgSrc}/>
        <Typography>※ LGTM 画像を生成する前に <ExternalLink href='/precaution'>ご利用上の注意</ExternalLink> をお読みください</Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='contained'
          onClick={props.onClose}
        >
          キャンセル
        </Button>
        <Button
          fullWidth
          color='primary'
          variant='contained'
        >
          生成
        </Button>
      </CardActions>
    </ModalCard>
  );
};
