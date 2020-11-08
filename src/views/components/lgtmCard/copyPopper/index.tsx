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

  const handleClickHTMLOrMarkdownCopy = () => {
    enqueueSnackbar('クリップボードにコピーしました');
  };

  const items = [
    { text: 'Markdown', url: `[![LGTM](${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id})](https://lgtm-generator.kou-pg.com)` },
    { text: 'HTML',     url: `<a href="https://lgtm-generator.kou-pg.com"><img src="${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}" alt="LGTM"/></a>` },
  ];

  return (
    <Paper>
      <List className={classes.list}>
        {items.map((item, i) => (
          <React.Fragment key={item.text}>
            <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
              <CopyToClipBoard text={item.url}>
                <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>{item.text}</ListItemText>
              </CopyToClipBoard>
            </ListItem>
            {items.length !== i + 1 && <Divider/>}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
