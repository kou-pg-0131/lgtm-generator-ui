import React, { useState } from 'react';
import { Divider, Paper, Card, CardActions, CardContent, Button, ButtonGroup, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { orange, pink, red } from '@material-ui/core/colors';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { useFavorites, useApi } from '../contexts';
import { Lgtm, ReportType, ReportProps } from '../domain';
import { ButtonWithPopper, ReportForm } from '.';

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
    buttonGroup: {
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
    copyButton: {
      borderRight: 'none !important',
    },
    favoriteButton: {
      backgroundColor: 'white',
      borderRight: 'none !important',
      '&:hover': {
        backgroundColor: pink[50],
      },
    },
    favoriteIcon: {
      color: red[500],
    },
    unfavoriteButton: {
      backgroundColor: pink[100],
      borderRight: 'none !important',
      '&:hover': {
        backgroundColor: pink[200],
      },
    },
    unfavoriteIcon: {
      color: red[500],
    },
    reportButton: {
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
  }),
);

type Props = {
  lgtm: Lgtm;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [openReportForm, setOpenReportForm] = useState<boolean>(false);
  const [sendingReport, setSendingReport] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');
  const [reportType, setReportType] = useState<ReportType>();
  const { favorites, add, remove } = useFavorites();
  const { enqueueSnackbar } = useSnackbar();
  const { apiClient } = useApi();

  const handleClickFavorite = () => {
    add(props.lgtm);
  };

  const handleClickUnfavorite = () => {
    remove(props.lgtm.id);
  };

  const handleClickCopy = () => {
    enqueueSnackbar('クリップボードにコピーしました');
  };

  const handleCloseReportForm = () => {
    setOpenReportForm(false);
  };

  const handleClickReport = () => {
    setOpenReportForm(true);
  };

  const handleChangeReportText = (text: string) => {
    setReportText(text);
  };

  const handleChangeReportType = (type: ReportType) => {
    setReportType(type);
  };

  const handleSendReport = (props: ReportProps) => {
    setSendingReport(true);
    apiClient.createReport(props).then(() => {
      enqueueSnackbar('送信しました');
      setOpenReportForm(false);
      setReportText('');
      setReportType(undefined);
    }).catch(() => {
      enqueueSnackbar('送信失敗しました', { variant: 'error' });
    }).finally(() => {
      setSendingReport(false);
    });
  };

  return (
    <>
      <ReportForm
        lgtm={props.lgtm}
        open={openReportForm}
        onClose={handleCloseReportForm}
        onSend={handleSendReport}
        disabled={sendingReport}
        text={reportText}
        onChangeText={handleChangeReportText}
        type={reportType}
        onChangeType={handleChangeReportType}
      />
      <Card>
        <CardContent className={classes.content}>
          <img
            className={classes.img}
            src={`${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}`}
            alt="LGTM"
          />
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
          <ButtonGroup className={classes.buttonGroup} variant='contained' color='primary'>
            <ButtonWithPopper
              className={classes.copyButton}
              popperContent={(
                <Paper>
                  <List className={classes.list}>
                    <ListItem className={classes.listItem} button onClick={handleClickCopy}>
                      <CopyToClipBoard text={`[![LGTM](${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id})](https://lgtm-generator.kou-pg.com)`}>
                        <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
                      </CopyToClipBoard>
                    </ListItem>
                    <Divider/>
                    <ListItem className={classes.listItem} button onClick={handleClickCopy}>
                      <CopyToClipBoard text={`<a href="https://lgtm-generator.kou-pg.com"><img src="${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}" alt="LGTM"/></a>`}>
                        <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
                      </CopyToClipBoard>
                    </ListItem>
                  </List>
                </Paper>
              )}
            >
              <FileCopyOutlined fontSize='small'/>
            </ButtonWithPopper>
            {favorites.some(favorite => favorite.id === props.lgtm.id) ? (
              <Button
                className={classes.unfavoriteButton}
                onClick={handleClickUnfavorite}
              >
                <Favorite className={classes.unfavoriteIcon} fontSize='small'/>
              </Button>
            ) : (
              <Button
                className={classes.favoriteButton}
                onClick={handleClickFavorite}
              >
                <FavoriteBorder className={classes.favoriteIcon} fontSize='small'/>
              </Button>
            )}
            <Button
              className={classes.reportButton}
              onClick={handleClickReport}
            >
              <FlagOutlined fontSize='small'/>
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};
