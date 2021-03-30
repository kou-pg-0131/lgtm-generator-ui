import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Form, ImageList, ImageListItem, Loading, GenerateConfirm } from '.';
import { useApi, useImages, useLgtms } from '../contexts';
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
  const [generating, setGenerating] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image>();
  const { reload } = useLgtms();
  const { images, setImages } = useImages();
  const { apiClient } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleClickImage = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseConfirm = () => {
    setSelectedImage(undefined);
  };

  const handleSearch = () => {
    setSearching(true);
    apiClient.searchImages(query).then(images => {
      setImages(images);
    }).finally(() => {
      setSearching(false);
    });
  };

  const handleGenerate = () => {
    setGenerating(true);
    apiClient.createLgtm({ url: selectedImage?.url }).then(() => {
      enqueueSnackbar('LGTM 画像を生成しました');
    }).catch(() => {
      enqueueSnackbar('LGTM 画像の生成に失敗しました');
    }).finally(() => {
      setGenerating(false);
      setSelectedImage(undefined);
      reload();
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

      <GenerateConfirm
        disabled={generating}
        open={!!selectedImage}
        onGenerate={handleGenerate}
        onClose={handleCloseConfirm}
        imgSrc={selectedImage?.url}
      />
    </Box>
  );
};
