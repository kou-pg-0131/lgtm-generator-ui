import React from 'react';
import { Grid, Card, CardActionArea, CardMedia } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Image } from '../domain';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      backgroundSize: 'contain',
      height: 140,
    },
  }),
);

type Props = {
  image: Image;
  onClick: () => void;
};

export const ImageListItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card>
        <CardActionArea onClick={props.onClick}>
          <CardMedia className={classes.media} image={props.image.url}/>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
