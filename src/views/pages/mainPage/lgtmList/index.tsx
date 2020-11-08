import React from 'react';
import { GridContainer, GridItem, LgtmCard } from '../../../components';
import { Lgtm } from '../../../../domain';

type Props = {
  lgtms: Lgtm[];
};

export const LgtmList: React.FC<Props> = (props: Props) => {
  return (
    <GridContainer>
      {props.lgtms.map(lgtm => (
        <GridItem key={lgtm.id}>
          <LgtmCard lgtm={lgtm}/>
        </GridItem>
      ))}
    </GridContainer>
  );
};
