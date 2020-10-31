import React from 'react';
import { Grid } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

export const GridItem: React.FC<Props> = (props: Props) => {
  return (
    <Grid item xs={6} sm={3} md={2}>
      {props.children}
    </Grid>
  );
};
