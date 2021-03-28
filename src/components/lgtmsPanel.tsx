import React from 'react';
import { Box } from '@material-ui/core';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem, UploadButton } from '.';

export const LgtmsPanel: React.FC = () => {
  const { lgtms } = useLgtms();

  const handleChangeFile = (file: File) => {
    console.log(file);
  };

  return (
    <Box>
      <LgtmList>
        {lgtms.map(lgtm => (
          <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
        ))}
      </LgtmList>
      <UploadButton onChange={handleChangeFile}/>
    </Box>
  );
};
