import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  value?: string;
};

export const Title: React.FC<Props> = (props: Props) => {
  const site = 'LGTM Generator';

  return (
    <Helmet>
      <title>{props.value ? `${props.value} | ${site}` : site}</title>
    </Helmet>
  );
};
