import React from 'react';
import { Layout } from '../layout';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem } from '../components';

const Home: React.FC = () => {
  const { lgtms } = useLgtms();

  return (
    <Layout>
      <LgtmList>
        {lgtms.map(lgtm => (
          <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
        ))}
      </LgtmList>
    </Layout>
  );
};

export default Home;
