import React from 'react';
import { useSelector } from 'react-redux';
import { States } from '../../../modules';
import { GridContainer, GridItem, LgtmCard } from '../../../components';

export const FavoritesPanel: React.FC = () => {
  const lgtmsState = useSelector((states: States) => states.lgtms);

  return (
    <GridContainer>
      {lgtmsState.favorites.map(lgtm => (
        <GridItem key={lgtm.id}>
          <LgtmCard lgtm={lgtm}/>
        </GridItem>
      ))}
    </GridContainer>
  );
};
