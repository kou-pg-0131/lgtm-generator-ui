import React from 'react';
import { Button, ButtonGroup as MuiButtonGroup } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { CopyPopper } from '../copyPopper';
import { ButtonWithPopper } from '../../';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
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
  onReport: () => void;
};

export const ButtonGroup: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <MuiButtonGroup variant='contained' color='primary' className={classes.buttonGroup}>
      <ButtonWithPopper popperContent={<CopyPopper lgtm={props.lgtm}/>}>
        <FileCopyOutlined fontSize='small'/>
      </ButtonWithPopper>
      {props.favorited ? (
        <Button onClick={props.onUnfavorite} style={{ backgroundColor: 'pink', borderColor: 'pink' }}><Favorite style={{ color: 'red' }} fontSize='small'/></Button>
      ) : (
        <Button onClick={props.onFavorite} style={{ backgroundColor: 'white', borderColor: 'white' }}><FavoriteBorder style={{ color: 'pink' }} fontSize='small'/></Button>
      )}
      <Button onClick={props.onReport} style={{ backgroundColor: 'orange' }}><FlagOutlined fontSize='small'/></Button>
    </MuiButtonGroup>
  );
};
