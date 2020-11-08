import React from 'react';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      backgroundSize: 'contain',
      height: 140,
    },
  }),
);

type Props = {
  onClick: () => void;
  src: string;
};

export const ClickableImageCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleClick = () => {
    props.onClick();
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={props.src}/>
      </CardActionArea>
    </Card>
  );
};
