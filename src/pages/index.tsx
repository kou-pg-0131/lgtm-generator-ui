import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';
import { Layout } from '../layout';
import { Title, LgtmsPanel, SerachImagesPanel, FavoritesPanel, Tabs, TabValue } from '../components';

const Home: React.FC = () => {
  const router = useRouter();

  const getTab = (): TabValue => {
    return (['lgtms', 'search_images', 'favorites'] as TabValue[]).find((e) => e === router.query.tab) || 'lgtms';
  };
  const [currentTab, setCurrentTab] = useState<TabValue>('lgtms');

  const handleTabChange = (value: TabValue) => {
    setCurrentTab(value);
    router.replace({ search: `?tab=${value}` });
  };

  useEffect(() => {
    setCurrentTab(getTab());
  }, [router.query.tab]);

  return (
    <Layout>
      <Title/>
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
