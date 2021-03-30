import React from 'react';
import { Link } from '@material-ui/core';

type Props = {
  className?: string;
  children: React.ReactNode;
  href: string;
};

export const ExternalLink: React.FC<Props> = (props: Props) => {
  return (
    <Link className={props.className} href={props.href} target='_blank' rel='noopener noreferrer'>{props.children}</Link>
  );
};
