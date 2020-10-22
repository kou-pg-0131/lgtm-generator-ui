import React from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    actions: {
      justifyContent: 'center',
    },
    media: {
      height: 140,
    },
    buttonGroup: {
      maxWidth: '100%',
    },
  }),
);

type Props = {
  lgtm: Lgtm;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
      <CardActions disableSpacing className={classes.actions}>
        <ButtonGroup color='primary' className={classes.buttonGroup}>
          <Button><FileCopyOutlined fontSize='small'/></Button>
          <Button><FavoriteBorder fontSize='small'/></Button>
          <Button><FlagOutlined fontSize='small'/></Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
