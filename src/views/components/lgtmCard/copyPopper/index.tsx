import React from 'react';
import { Divider, List, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CopyListItem } from './copyListItem';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      padding: 0,
    },
  }),
);

type Props = {
  lgtm: Lgtm;
};

export const CopyPopper: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const items: { text: string; url: string; }[] = [
    { text: 'Markdown', url: `[![LGTM](${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id})](https://lgtm-generator.kou-pg.com)` },
    { text: 'HTML',     url: `<a href="https://lgtm-generator.kou-pg.com"><img src="${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}" alt="LGTM"/></a>` },
  ];

  return (
    <Paper>
      <List className={classes.list}>
        {items.map((item, i) => (
          <React.Fragment key={item.text}>
            <CopyListItem text={item.text} url={item.url}/>
            {items.length !== i + 1 && <Divider/>}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
