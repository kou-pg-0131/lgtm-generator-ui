import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { LgtmsPanel } from './lgtmsPanel';
import { SearchImagesPanel } from './searchImagesPanel';
import { FavoritesPanel } from './favoritesPanel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 38,
    },
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

export const MainPage: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const params = qs.parse(location.search);
  const getTab = () => ['lgtms', 'search_images', 'favorites'].find((e) => e === params.tab) || 'lgtms';

  const [tab, setTab] = useState<string>(getTab());

  const handleChange = (e: React.ChangeEvent<unknown>, value: string) => {
    history.replace({ search: `?tab=${value}` });
  };

  useEffect(() => {
    setTab(getTab);
  }, [params.tab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Paper>
        <Tabs
          variant='fullWidth'
          value={tab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label='LGTM 画像' className={classes.tab} value='lgtms'/>
          <Tab label='画像検索' className={classes.tab} value='search_images'/>
          <Tab label='お気に入り' className={classes.tab} value='favorites'/>
        </Tabs>
      </Paper>

      <Box hidden={tab !== 'lgtms'}><LgtmsPanel/></Box>
      <Box hidden={tab !== 'search_images'}><SearchImagesPanel/></Box>
      <Box hidden={tab !== 'favorites'}><FavoritesPanel/></Box>
    </React.Fragment>
  );
};
