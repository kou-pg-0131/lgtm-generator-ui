import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lgtmsActions, States } from '../../../modules';
import { GridContainer, GridItem, LgtmCard } from '../../../components';
import { Lgtm } from '../../../../domain';

export const FavoritesPanel: React.FC = () => {
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.addFavorite(lgtm));
  const removeFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.removeFavorite(lgtm));

  return (
    <GridContainer>
      {lgtmsState.favorites.map(lgtm => (
        <GridItem key={lgtm.id}>
          <LgtmCard
            lgtm={lgtm}
            favorited={!!lgtmsState.favorites.find(e => e.id === lgtm.id)}
            onFavorite={() => addFavorite(lgtm)}
            onUnfavorite={() => removeFavorite(lgtm)}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
};
