import React from 'react';
import { Grid } from '@material-ui/core';
import { Lgtm } from '../domain/lgtm';
import { LgtmCard } from './lgtmCard';

type Props = {
  lgtm: Lgtm;
};

export const LgtmListItem: React.FC<Props> = (props: Props) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <LgtmCard lgtm={props.lgtm}/>
    </Grid>
  );
};
