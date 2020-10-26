import React from 'react';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export const Form: React.FC<Props> = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
};
