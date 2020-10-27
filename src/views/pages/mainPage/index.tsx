import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { FavoritesPage, LgtmsPage, SearchImagesPage } from '../../pages';

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
  }, [params.tab]);

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
          <Tab label='LGTM 画像' value='lgtms' className={classes.tab}/>
          <Tab label='画像検索' value='search_images' className={classes.tab}/>
          <Tab label='お気に入り' value='favorites' className={classes.tab}/>
        </Tabs>
      </Paper>

      <Box hidden={tab !== 'lgtms'}>
        <LgtmsPage/>
      </Box>
      <Box hidden={tab !== 'search_images'}>
        <SearchImagesPage/>
      </Box>
      <Box hidden={tab !== 'favorites'}>
        <FavoritesPage/>
      </Box>
    </React.Fragment>
  );
};
