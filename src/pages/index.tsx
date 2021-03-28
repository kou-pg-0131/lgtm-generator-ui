import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Layout } from '../layout';
import { useLgtms } from '../contexts';
import { LgtmsPanel, SerachImagesPanel, FavoritesPanel, Tabs, TabValue, LgtmList, LgtmListItem } from '../components';

const Home: React.FC = () => {
  const { lgtms } = useLgtms();
  const [currentTab, setCurrentTab] = useState<TabValue>('lgtms');

  const handleTabChange = (value: TabValue) => {
    setCurrentTab(value);
  };

  return (
    <Layout>
      <Tabs value={currentTab} onChange={handleTabChange}/>
      <Box hidden={currentTab !== 'lgtms'}>
        <LgtmsPanel/>
      </Box>
      <Box hidden={currentTab !== 'search_images'}>
        <SerachImagesPanel/>
      </Box>
      <Box hidden={currentTab !== 'favorites'}>
        <FavoritesPanel/>
      </Box>
    </Layout>
  );
};

export default Home;
