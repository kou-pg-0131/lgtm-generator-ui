import React from 'react';
import { Button, ButtonGroup as MuiButtonGroup } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { orange, pink, red } from '@material-ui/core/colors';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { CopyPopper } from '../copyPopper';
import { ButtonWithPopper } from '../../';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    buttonGroup: {
      maxWidth: '100%',
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
  favorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
  onReport: () => void;
};

export const ButtonGroup: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <MuiButtonGroup variant='contained' color='primary' className={classes.buttonGroup}>
      <ButtonWithPopper className={classes.copyButton} popperContent={<CopyPopper lgtm={props.lgtm}/>}><FileCopyOutlined fontSize='small'/></ButtonWithPopper>
      {props.favorited ? (
        <Button className={classes.unfavoriteButton} onClick={props.onUnfavorite}><Favorite className={classes.unfavoriteIcon} fontSize='small'/></Button>
      ) : (
        <Button className={classes.favoriteButton} onClick={props.onFavorite}><FavoriteBorder className={classes.favoriteIcon} fontSize='small'/></Button>
      )}
      <Button className={classes.reportButton} onClick={props.onReport}><FlagOutlined fontSize='small'/></Button>
    </MuiButtonGroup>
  );
};
