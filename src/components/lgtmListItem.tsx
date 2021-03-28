import React from 'react';
import { Grid } from '@material-ui/core';
import { Lgtm } from '../domain';

type Props = {
  lgtm: Lgtm;
};

export const LgtmListItem: React.FC<Props> = (props: Props) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <img src={`${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}`} alt="LGTM"/>
    </Grid>
  );
};
