import React, { useEffect, useState } from 'react';
import { Button, ButtonProps, Popper } from '@material-ui/core';

type Props = ButtonProps & {
  popperContent: React.ReactNode;
  children: React.ReactNode;
};

export const ButtonWithPopper: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const closePopper = () => setAnchorEl(undefined);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(anchorEl ? undefined : e.currentTarget);

  useEffect(() => {
    if (anchorEl) {
      document.addEventListener('click', closePopper);
    } else {
      document.removeEventListener('click', closePopper);
    }
    return () => { document.removeEventListener('click', closePopper); };
  }, [anchorEl]);

  const { children, popperContent, ...attrs } = props;

  return (
    <React.Fragment>
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement='top' transition>
        {popperContent}
      </Popper>
      <Button {...attrs} onClick={handleClick}>{children}</Button>
    </React.Fragment>
  );
};
