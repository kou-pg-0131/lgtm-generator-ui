import React from 'react';
import { Box } from '@material-ui/core';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem } from '.';

export const LgtmsPanel: React.FC = () => {
  const { lgtms } = useLgtms();

  return (
    <Box>
      <LgtmList>
        {lgtms.map(lgtm => (
          <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
        ))}
      </LgtmList>
    </Box>
  );
};
