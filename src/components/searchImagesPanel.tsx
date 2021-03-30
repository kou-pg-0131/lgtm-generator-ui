import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Form, ImageList, ImageListItem, Loading } from '.';
import { useApi, useImages } from '../contexts';
import { Image } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      backgroundColor: '#fff',
      marginBottom: theme.spacing(2),
    },
  }),
);

export const SerachImagesPanel: React.FC = () => {
  const classes = useStyles();

  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const { images, setImages } = useImages();
  const { apiClient } = useApi();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleClickImage = (image: Image) => {
    console.log(image);
  };

  const handleSearch = () => {
    setSearching(true);
    apiClient.searchImages(query).then(images => {
      setImages(images);
    }).finally(() => {
      setSearching(false);
    });
  };

  return (
    <Box>
      <Form onSubmit={handleSearch}>
        <TextField
          className={classes.input}
          fullWidth
          variant='outlined'
          value={query}
          onChange={handleChangeQuery}
          type='search'
          placeholder='キーワード'
          InputProps={{
            startAdornment: <InputAdornment position='start'><Search/></InputAdornment>,
          }}
        />
      </Form>
      {searching && <Loading/>}
      {!searching && (
        <ImageList>
          {images.map((image, i) => (
            <ImageListItem key={i} image={image} onClick={() => handleClickImage(image)}/>
          ))}
        </ImageList>
      )}
    </Box>
  );
};
