import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

type Props = ButtonProps & {
  loading: boolean;
};

export const LoadableButton: React.FC<Props> = (props: Props) => {
  const { loading, children, ...attrs } = props;

  return (
    <Button {...attrs} disabled={loading}>
      {loading ? (
        <CircularProgress size={24}/>
      ) : (
        children
      )}
    </Button>
  );
};
