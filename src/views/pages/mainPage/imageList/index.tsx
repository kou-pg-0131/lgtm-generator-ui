import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ClickableImageCard, GridContainer, GridItem } from '../../../components';
import { Image } from '../../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    images: {
      marginTop: 24,
    },
  }),
);

type Props = {
  images: Image[];
  searching: boolean;
  onClick: (image: Image) => void;
};

export const ImageList: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleClickImage = (image: Image) => {
    props.onClick(image);
  };

  return (
    <Box className={classes.images}>
      {props.searching ? (
        <Box textAlign='center'><CircularProgress/></Box>
      ) : (
        <GridContainer>
          {props.images.map((image, i) => (
            <GridItem key={i}>
              <ClickableImageCard src={image.url} onClick={() => handleClickImage(image)}/>
            </GridItem>
          ))}
        </GridContainer>
      )}
    </Box>
  );
};
