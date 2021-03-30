import React from 'react';
import { Box, Button, CardActions, CardContent, RadioGroup, TextField, Radio, Typography, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Lgtm } from '../domain/lgtm';
import { ReportProps, ReportType } from '../domain/report';
import { ModalCard } from './modalCard';
import { LoadableButton } from './loadableButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgContainer: {
      textAlign: 'center',
    },
    img: {
      border: '1px solid #ddd',
      maxHeight: 300,
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        maxHeight: 220,
      },
      [theme.breakpoints.down('xs')]: {
        maxHeight: 150,
      },
    },
    textArea: {
      marginTop: 12,
    },
    textAreaInput: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  }),
);

type Props = {
  open: boolean;
  onSend: (props: ReportProps) => void;
  onClose: () => void;
  onChangeText: (text: string) => void;
  onChangeType: (type: ReportType) => void;
  lgtm: Lgtm;
  text: string;
  type?: ReportType;
  disabled: boolean;
};

export const ReportForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const isInputValid = (): boolean => {
    if (!props.type) return false;
    return true;
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeText(e.currentTarget.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeType(e.currentTarget.value as ReportType);
  };

  const handleClickSend = () => {
    props.onSend({ lgtm_id: props.lgtm.id, type: props.type as ReportType, text: props.text });
  };

  return (
    <ModalCard open={props.open} onClose={props.onClose}>
      <CardContent>
        <Box className={classes.imgContainer}>
          <img className={classes.img} src={`${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}`} alt='LGTM'/>
        </Box>
        <RadioGroup value={props.type || ''} onChange={handleChangeType}>
          <FormControlLabel
            value={'illegal'}
            control={<Radio value='illegal'/>}
            label={<Typography>法律違反 ( 著作権侵害、プライバシー侵害、名誉毀損等 )</Typography>}
            disabled={props.disabled}
          />
          <FormControlLabel
            value={'inappropriate'}
            control={<Radio value='inappropriate'/>}
            label={<Typography>不適切なコンテンツ</Typography>}
            disabled={props.disabled}
          />
          <FormControlLabel
            value={'other'}
            control={<Radio value='other'/>}
            label={<Typography>その他</Typography>}
            disabled={props.disabled}
          />
        </RadioGroup>
        <TextField
          className={classes.textAreaInput}
          fullWidth
          multiline
          inputProps={{ maxLength: 1000 }}
          InputProps={{ className: classes.textAreaInput }}
          disabled={props.disabled}
          value={props.text}
          placeholder='補足 ( 任意 )'
          variant='outlined'
          rows={5}
          onChange={handleChangeText}
        >
        </TextField>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          disabled={props.disabled}
          variant='contained'
          onClick={props.onClose}
        >
          キャンセル
        </Button>
        <LoadableButton
          fullWidth
          disabled={!isInputValid()}
          loading={props.disabled}
          color='primary'
          variant='contained'
          onClick={handleClickSend}
        >
          送信
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
