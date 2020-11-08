import React from 'react';
import { GridContainer } from '../../../components';

type Props = {
  children: React.ReactNode;
};

export const LgtmList: React.FC<Props> = (props: Props) => {
  return (
    <GridContainer>
      {props.children}
    </GridContainer>
  );
};
