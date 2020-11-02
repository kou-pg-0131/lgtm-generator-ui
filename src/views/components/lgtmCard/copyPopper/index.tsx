import React from 'react';
import { Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
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
  }),
);

type Props = {
  lgtm: Lgtm;
};

export const CopyPopper: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickHTMLOrMarkdownCopy = () => enqueueSnackbar('クリップボードにコピーしました');

  return (
    <Paper>
      <List className={classes.list}>
        <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
          <CopyToClipBoard text={`[![LGTM](${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id})](https://lgtm-generator.kou-pg.com)`}>
            <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
          </CopyToClipBoard>
        </ListItem>
        <Divider/>
        <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
          <CopyToClipBoard text={`<a href="https://lgtm-generator.kou-pg.com"><img src="${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}" alt="LGTM"/></a>`}>
            <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
          </CopyToClipBoard>
        </ListItem>
      </List>
    </Paper>
  );
};
