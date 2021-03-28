import React from 'react';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem } from '.';

export const LgtmsPanel: React.FC = () => {
  const { lgtms } = useLgtms();

  return (
    <LgtmList>
      {lgtms.map(lgtm => (
        <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
      ))}
    </LgtmList>
  );
};
