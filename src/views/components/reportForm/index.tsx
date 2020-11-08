import React, { useState } from 'react';
import { Box, CardActions, CardContent, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { ReportTypeRadio } from './reportTypeRadio';
import { LoadableButton, ModalCard } from '..';
import { Lgtm, ReportType } from '../../../domain';
import { ApiClientFactory } from '../../../infrastructures';

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
  onClose: () => void;
  lgtm: Lgtm;
};

export const ReportForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [reporting, setReporting] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');
  const [reportType, setReportType] = useState<ReportType>();

  const apiClient = new ApiClientFactory().create();

  const items: { text: string; value: ReportType; }[] = [
    { text: '法律違反（著作権侵害、プライバシー侵害、名誉棄損等）', value: 'illegal' },
    { text: '不適切なコンテンツ', value: 'inappropriate' },
    { text: 'その他', value: 'other' },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const close = () => {
    if (reporting) return;
    setReportType(undefined);
    setReportText('');
    props.onClose();
  };

  const reportLgtm = () => {
    setReporting(true);
    apiClient.createReport({ type: 'other', text: 'hello', lgtm: props.lgtm }).then(() => {
      enqueueSnackbar('送信しました');
      close();
    }).catch(() => {
      enqueueSnackbar('送信失敗しました', { variant: 'error' });
    }).finally(() => {
      setReporting(false);
    });
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setReportText(e.currentTarget.value);
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => setReportType(e.currentTarget.value as ReportType);

  const isValid = () => {
    if (!reportType) return false;
    return true;
  };

  return (
    <ModalCard open={props.open} onClose={close}>
      <CardContent>
        <Box textAlign='center'>
          <img className={classes.img} src={`${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}`} alt='LGTM'/>
        </Box>
        <RadioGroup value={reportType} onChange={handleChangeType}>
          {items.map(item => (
            <ReportTypeRadio key={item.text} text={item.text} value={item.value} disabled={reporting}/>
          ))}
        </RadioGroup>
        <TextField
          className={classes.textArea}
          inputProps={{ maxLength: 1000 }}
          InputProps={{ className: classes.textAreaInput }}
          disabled={reporting}
          fullWidth
          multiline
          value={reportText}
          placeholder='補足（任意）'
          variant='outlined'
          rows={5}
          onChange={handleChangeText}
        />
      </CardContent>
      <CardActions>
        <LoadableButton
          fullWidth
          loading={reporting}
          color='primary'
          variant='contained'
          onClick={reportLgtm}
          disabled={!isValid()}
        >
          送信
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
