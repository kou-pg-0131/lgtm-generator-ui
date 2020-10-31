import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { lgtmsActions, States } from '../../../modules';
import { LgtmCard } from '../../../components';
import { Lgtm } from '../../../../domain';

export const FavoritesPanel: React.FC = () => {
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.addFavorite(lgtm));
  const removeFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.removeFavorite(lgtm));

  return (
    <Grid container spacing={1}>
      {lgtmsState.favorites.map(lgtm => (
        <Grid key={lgtm.id} item xs={6} sm={3} md={2}>
          <LgtmCard
            lgtm={lgtm}
            favorited={!!lgtmsState.favorites.find(e => e.id === lgtm.id)}
            onFavorite={() => addFavorite(lgtm)}
            onUnfavorite={() => removeFavorite(lgtm)}
          />
        </Grid>
      ))}
    </Grid>
  );
};