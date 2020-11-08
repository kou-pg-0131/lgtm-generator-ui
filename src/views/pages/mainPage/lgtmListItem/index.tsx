import React from 'react';
import { GridItem, LgtmCard } from '../../../components';
import { Lgtm } from '../../../../domain';

type Props = {
  lgtm: Lgtm;
  onFavorite: () => void;
  onUnfavorite: () => void;
  favorited: boolean;
};

export const LgtmListItem: React.FC<Props> = (props: Props) => {
  const handleFavorite = () => {
    props.onFavorite();
  };

  const handleUnfavorite = () => {
    props.onUnfavorite();
  };

  return (
    <GridItem>
      <LgtmCard
        lgtm={props.lgtm}
        onFavorite={handleFavorite}
        onUnfavorite={handleUnfavorite}
        favorited={props.favorited}
      />
    </GridItem>
  );
};
