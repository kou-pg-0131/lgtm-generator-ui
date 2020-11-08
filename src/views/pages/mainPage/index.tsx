import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { FavoritesPanel } from './favoritesPanel';
import { LgtmsPanel } from './lgtmsPanel';
import { useSelector } from 'react-redux';
import { States } from '../../modules';
import { SearchImagesPanel } from './searchImagesPanel';
import { GridContainer, GridItem, LgtmCard } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 38,
    },
    tab: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    tabs: {
      marginBottom: 24,
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
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const handleChangeTab = (e: React.ChangeEvent<unknown>, value: string) => {
    history.replace({ search: `?tab=${value}` });
  };

  useEffect(() => {
    setTab(getTab);
  }, [params.tab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Paper>
        <Tabs
          className={classes.tabs}
          variant='fullWidth'
          value={tab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChangeTab}
        >
          <Tab className={classes.tab} label='LGTM 画像' value='lgtms'/>
          <Tab className={classes.tab} label='画像検索' value='search_images'/>
          <Tab className={classes.tab} label='お気に入り' value='favorites'/>
        </Tabs>
      </Paper>

      <Box hidden={tab !== 'lgtms'}><LgtmsPanel/></Box>
      <Box hidden={tab !== 'search_images'}><SearchImagesPanel/></Box>

      <Box hidden={tab !== 'favorites'}>
        <GridContainer>
          {lgtmsState.favorites.map(lgtm => (
            <GridItem key={lgtm.id}>
              <LgtmCard lgtm={lgtm}/>
            </GridItem>
          ))}
        </GridContainer>
      </Box>
    </React.Fragment>
  );
};
