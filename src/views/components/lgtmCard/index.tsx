import React, { useState } from 'react';
import { Card, CardActions, CardMedia } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { ButtonGroup } from './buttonGroup';
import { ReportForm } from '..';
import { Lgtm, ReportType } from '../../../domain';
import { ApiClient } from '../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      border: '1px solid #eeeeee',
    },
    actions: {
      justifyContent: 'center',
    },
    media: {
      backgroundSize: 'contain',
      height: 140,
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
  favorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [openReportForm, setOpenReportForm] = useState<boolean>(false);
  const [reporting, setReporting] = useState<boolean>(false);
  const [reportType, setReportType] = useState<ReportType>();
  const [reportText, setReportText] = useState<string>('');

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
        <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup
            lgtm={props.lgtm}
            favorited={props.favorited}
            onFavorite={props.onFavorite}
            onUnfavorite={props.onUnfavorite}
            onReport={() => setOpenReportForm(true)}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
