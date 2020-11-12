import React from 'react';
import { Box, Typography } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

export const Message: React.FC<Props> = (props: Props) => {
  return (
    <Box mt={2} textAlign='center'>
      <Typography>
        {props.children}
      </Typography>
    </Box>
  );
};
