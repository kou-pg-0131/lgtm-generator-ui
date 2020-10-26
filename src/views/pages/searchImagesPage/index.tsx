import React, { useState } from 'react';
import { Box, Button, Card, CardMedia, CardActionArea, CircularProgress, Grid, InputAdornment, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Form } from '../../components';
import { Image } from '../../../domain';
import { ApiClient } from '../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      backgroundSize: 'contain',
      height: 140,
    },
  }),
);

export const SearchImagesPage: React.FC = () => {
  const classes = useStyles();

  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);

  const apiClient = new ApiClient();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value);

  const handleSearch = () => {
    setSearching(true);
    apiClient.searchImages({ q: query }).then(images => {
      setImages(images);
    }).finally(() => {
      setSearching(false);
    });
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSearch}>
        <TextField
          fullWidth
          variant='outlined'
          value={query}
          onChange={handleChangeQuery}
          placeholder='キーワード'
          InputProps={{
            startAdornment: <InputAdornment position='start'><Search/></InputAdornment>,
          }}
        />
      </Form>
      {searching ? (
        <Box alignItems='center'><CircularProgress/></Box>
      ) : (
        <Grid container spacing={2}>
          {images.map((image, i) => (
            <Grid key={i} item xs={6} sm={3} md={2}>
              <Card>
                <CardActionArea>
                  <CardMedia className={classes.media} image={image.url}/>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
