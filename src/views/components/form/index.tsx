import React from 'react';

type Props = {
  children: React.ReactNode;
  onSubmit: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
