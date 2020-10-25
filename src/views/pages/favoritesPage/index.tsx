import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { lgtmsActions, States } from '../../modules';
import { LgtmCard } from '../lgtmsPage/lgtmCard';
import { Lgtm } from '../../../domain';

export const FavoritesPage: React.FC = () => {
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const toggleFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.toggleFavorite(lgtm));

  return (
    <Grid container spacing={1}>
      {lgtmsState.favorites.map(lgtm => (
        <Grid key={lgtm.id} item xs={6} sm={3} md={2}>
          <LgtmCard
            lgtm={lgtm}
            favorited={!!lgtmsState.favorites.find(e => e.id === lgtm.id)}
            onFavorite={() => toggleFavorite(lgtm)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
