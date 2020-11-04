import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LoadableButton, ModalCard } from '..';
import { ApiClientFactory, DataUrl } from '../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    cardContent: {
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
  imageName?: string;
  imageSrc?: { dataUrl?: DataUrl; url?: string; };
  open: boolean;
  onGenerate: () => void;
  onClose: () => void;

  generating?: boolean;
};

export const GenerateConfirm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [generating, setGenerating] = useState<boolean>(false);

  const apiClient = new ApiClientFactory().create();

  const { enqueueSnackbar } = useSnackbar();

  const close = () => {
    if (generating) return;
    props.onClose();
  };

  const handleClickGenerate = () => {
    if (!props.imageSrc) return;
    setGenerating(true);
    apiClient.createLgtm({ base64: props.imageSrc.dataUrl?.toString('base64'), url: props.imageSrc.url }).then(() => {
      enqueueSnackbar('LGTM 画像を生成しました');
      close();
      props.onGenerate();
    }).catch(() => {
      enqueueSnackbar('LGTM 画像の生成に失敗しました', { variant: 'error' });
    }).finally(() => {
      setGenerating(false);
    });
  };

  if (!props.imageSrc || !props.imageSrc.dataUrl && !props.imageSrc.url) return null;
  const imageSrc = props.imageSrc.dataUrl?.toString() || props.imageSrc.url;

  return (
    <ModalCard open={props.open} onClose={close}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.text}>この画像で LGTM 画像を生成しますか？</Typography>
        <img className={classes.img} src={imageSrc} alt={props.imageName}/>
      </CardContent>
      <CardActions>
        <LoadableButton
          fullWidth
          loading={generating}
          color='primary'
          variant='contained'
          onClick={handleClickGenerate}
        >
          LGTM 画像を生成
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
