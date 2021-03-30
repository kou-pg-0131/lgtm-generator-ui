import React from 'react';
import { Box } from '@material-ui/core';
import { useFavorites } from '../contexts/favoritesProvider';
import { LgtmList } from './lgtmList';
import { LgtmListItem } from './lgtmListItem';

export const FavoritesPanel: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <Box>
      <LgtmList>
        {favorites.map(lgtm => (
          <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
        ))}
      </LgtmList>
    </Box>
  );
};
