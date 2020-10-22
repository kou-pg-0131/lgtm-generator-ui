import React from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { Lgtm } from '../../../../domain';

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
    <Card className={classes.card}>
      <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
      <CardActions disableSpacing className={classes.actions}>
        <ButtonGroup color='primary' className={classes.buttonGroup}>
          <Tooltip arrow title='Copy' placement='top'>
            <Button>
              <FileCopyOutlined fontSize='small'/>
            </Button>
          </Tooltip>
          <Tooltip arrow title='Favorite' placement='top'>
            <Button>
              <FavoriteBorder fontSize='small'/>
            </Button>
          </Tooltip>
          <Tooltip arrow title='Report' placement='top'>
            <Button>
              <FlagOutlined fontSize='small'/>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
