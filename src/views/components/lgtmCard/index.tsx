import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ButtonGroup } from './buttonGroup';
import { ReportForm } from '..';
import { Lgtm } from '../../../domain';

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
  favorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [openReportForm, setOpenReportForm] = useState<boolean>(false);

  const handleFavorite = () => {
    props.onFavorite();
  };

  const handleUnfavorite = () => {
    props.onUnfavorite();
  };

  return (
    <React.Fragment>
      <ReportForm
        lgtm={props.lgtm}
        open={openReportForm}
        onClose={() => setOpenReportForm(false)}
      />
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <img src={`${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}`} className={classes.img} alt="LGTM" />
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup
            lgtm={props.lgtm}
            favorited={props.favorited}
            onFavorite={handleFavorite}
            onUnfavorite={handleUnfavorite}
            onReport={() => setOpenReportForm(true)}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
