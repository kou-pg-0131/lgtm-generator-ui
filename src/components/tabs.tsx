import React from 'react';
import { Paper, Tab, Tabs as MuiTabs } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginBottom: 24,
    },
    tab: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  }),
);

export type TabValue = 'lgtms' | 'search_images' | 'favorites';

type Props = {
  value: TabValue;
  onChange: (value: TabValue) => void;
};

export const Tabs: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    props.onChange(value as TabValue);
  };

  return (
    <Paper>
      <MuiTabs
        className={classes.tabs}
        variant='fullWidth'
        value={props.value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChangeTab}
      >
        <Tab className={classes.tab} label='LGTM 画像' value='lgtms'/>
        <Tab className={classes.tab} label='画像検索' value='search_images'/>
        <Tab className={classes.tab} label='お気に入り' value='favorites'/>
      </MuiTabs>
    </Paper>
  );
};
