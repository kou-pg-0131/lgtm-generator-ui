import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import CopyToClipBoard from 'react-copy-to-clipboard';

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      height: 34,
      padding: '0 12px',
    },
    listItemText: {
      fontSize: 12,
      textAlign: 'center',
    },
  }),
);

type Props = {
  text: string;
  url: string;
};

export const CopyListItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickHTMLOrMarkdownCopy = () => {
    enqueueSnackbar('クリップボードにコピーしました');
  };

  return (
    <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
      <CopyToClipBoard text={props.url}>
        <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>{props.text}</ListItemText>
      </CopyToClipBoard>
    </ListItem>
  );
};
