import React from 'react';
import { Box, CardActions, CardContent, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoadableButton, ModalCard } from '..';
import { Lgtm, ReportType } from '../../../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    radioText: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
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
  }),
);

type Props = {
  open: boolean;
  processing: boolean;
  type?: ReportType;
  text: string;
  lgtm: Lgtm;
  onClose: () => void;
  onReport: () => void;
  onChangeType: (type: ReportType) => void;
  onChangeText: (text: string) => void;
};

export const ReportForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(e.currentTarget.value);
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => props.onChangeType(e.currentTarget.value as ReportType);

  const isValid = () => {
    if (props.type == undefined) return false;
    return true;
  };

  return (
    <ModalCard open={props.open} onClose={() => !props.processing && props.onClose()}>
      <CardContent>
        <Box textAlign='center'>
          <img className={classes.img} src={`${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}`}/>
        </Box>
        <RadioGroup value={props.type} onChange={handleChangeType}>
          <FormControlLabel className={classes.radioText} label={<Typography className={classes.radioText}>法律違反（著作権侵害、プライバシー侵害、名誉棄損等）</Typography>} disabled={props.processing} value='illegal' control={<Radio value='illegal'/>}/>
          <FormControlLabel className={classes.radioText} label={<Typography className={classes.radioText}>不適切なコンテンツ</Typography>} disabled={props.processing} value='illegal' control={<Radio value='inappropriate'/>}/>
          <FormControlLabel className={classes.radioText} label={<Typography className={classes.radioText}>その他</Typography>} disabled={props.processing} value='illegal' control={<Radio value='other'/>}/>
        </RadioGroup>
        <TextField
          className={classes.textArea}
          InputProps={{
            className: classes.textAreaInput,
          }}
          disabled={props.processing}
          fullWidth
          multiline
          value={props.text}
          placeholder='補足（任意）'
          variant='outlined'
          rows={5}
          onChange={handleChangeText}
        />
      </CardContent>
      <CardActions>
        <LoadableButton
          fullWidth
          loading={props.processing}
          color='primary'
          variant='contained'
          onClick={props.onReport}
          disabled={!isValid()}
        >
          送信
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
