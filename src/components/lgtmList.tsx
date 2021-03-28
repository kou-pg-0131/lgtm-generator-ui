import React from 'react';
import { Grid } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

export const LgtmList: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={1}>
      {props.children}
    </Grid>
  );
};
