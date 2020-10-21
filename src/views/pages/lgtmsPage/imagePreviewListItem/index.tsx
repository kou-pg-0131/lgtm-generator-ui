import React from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { ImageFile } from '../../../../infrastructures';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    preview: {
      border: '1px solid #eeeeee',
      height: 70,
      marginRight: 24,
      width: 70,
      [theme.breakpoints.down('xs')]: {
        height: 40,
        width: 40,
      },
    },
  }),
);

type Props = {
  imageFile: ImageFile;
  onDelete: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const ImagePreviewListItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar variant='square' src={props.imageFile.dataUrl} className={classes.preview}/>
      </ListItemAvatar>
      <ListItemText primary={props.imageFile.name} primaryTypographyProps={{ style: { display: 'inline' } }} className={classes.fileName}/>
      <ListItemSecondaryAction>
        <IconButton onClick={props.onDelete}><Delete/></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
