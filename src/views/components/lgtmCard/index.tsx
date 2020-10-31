import React, { useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { CopyPopper } from './copyPopper';
import { ButtonWithPopper, ReportForm } from '..';
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
          <ButtonGroup variant='contained' color='primary' className={classes.buttonGroup}>
            <ButtonWithPopper popperContent={<CopyPopper lgtm={props.lgtm}/>}>
              <FileCopyOutlined fontSize='small'/>
            </ButtonWithPopper>
            {props.favorited ? (
              <Button onClick={props.onUnfavorite} style={{ backgroundColor: 'pink', borderColor: 'pink' }}><Favorite style={{ color: 'red' }} fontSize='small'/></Button>
            ) : (
              <Button onClick={props.onFavorite} style={{ backgroundColor: 'white', borderColor: 'white' }}><FavoriteBorder style={{ color: 'pink' }} fontSize='small'/></Button>
            )}
            <Button onClick={() => setOpenReportForm(true)} style={{ backgroundColor: 'orange' }}><FlagOutlined fontSize='small'/></Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
