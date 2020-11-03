import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { States } from '../../modules';
import { ButtonGroup } from './buttonGroup';
import { ReportForm } from '..';
import { Lgtm, ReportType } from '../../../domain';
import { ApiClient } from '../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      border: '1px solid #eee',
    },
    actions: {
      justifyContent: 'center',
    },
    content: {
      height: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 8px 0',
    },
    img: {
      border: '1px solid #eee',
      maxHeight: 140,
      maxWidth: '100%',
    },
    list: {
      padding: 0,
    },
    listItem: {
      height: 34,
      padding: '0 12px',
    },
    listItemText: {
      fontSize: 12,
      textAlign: 'center',
    },
    buttonGroup: {
      maxWidth: '100%',
    },
  }),
);

type Props = {
  lgtm: Lgtm;
  onFavorite: () => void;
  onUnfavorite: () => void;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [openReportForm, setOpenReportForm] = useState<boolean>(false);
  const [reporting, setReporting] = useState<boolean>(false);
  const [reportType, setReportType] = useState<ReportType>();
  const [reportText, setReportText] = useState<string>('');
  const lgtmsStates = useSelector((states: States) => states.lgtms);

  const apiClient = new ApiClient();

  const { enqueueSnackbar } = useSnackbar();

  const closeReportForm = () => {
    setReportType(undefined);
    setReportText('');
    setOpenReportForm(false);
  };

  const reportLgtm = () => {
    setReporting(true);
    apiClient.createReport({ type: 'other', text: 'hello', lgtm: props.lgtm }).then(() => {
      enqueueSnackbar('送信しました');
      closeReportForm();
    }).catch(() => {
      enqueueSnackbar('送信失敗しました', { variant: 'error' });
    }).finally(() => {
      setReporting(false);
    });
  };

  return (
    <React.Fragment>
      <ReportForm
        lgtm={props.lgtm}
        text={reportText}
        type={reportType}
        onChangeType={setReportType}
        onChangeText={setReportText}
        open={openReportForm}
        onClose={closeReportForm}
        processing={reporting}
        onReport={reportLgtm}
      />
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <img src={`${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}`} className={classes.img} alt="LGTM" />
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup
            lgtm={props.lgtm}
            favorited={!!lgtmsStates.favorites.find(e => e.id === props.lgtm.id)}
            onFavorite={props.onFavorite}
            onUnfavorite={props.onUnfavorite}
            onReport={() => setOpenReportForm(true)}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
