import React, { useState } from 'react';
import { Box, Card, CardMedia, CardActionArea, CircularProgress, Grid, InputAdornment, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { lgtmsActions } from '../../../modules';
import { Form, GenerateConfirm } from '../../../components';
import { Image, Lgtm } from '../../../../domain';
import { ApiClient } from '../../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      backgroundColor: '#fff',
    },
    images: {
      marginTop: 24,
    },
    media: {
      backgroundSize: 'contain',
      height: 140,
    },
  }),
);

export const SearchImagesPanel: React.FC = () => {
  const classes = useStyles();

  const [images, setImages] = useState<Image[]>([]);
  const [image, setImage] = useState<Image>();
  const [generating, setGenerating] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);

  const dispatch = useDispatch();
  const addLgtms = (lgtms: Lgtm[]) => dispatch(lgtmsActions.addLgtms(lgtms));
  const clearLgtms = () => dispatch(lgtmsActions.clearLgtms());
  const setEvaluatedId = (evaluatedId?: string) => dispatch(lgtmsActions.setEvaluatedId(evaluatedId));
  const clearEvaluatedId = () => dispatch(lgtmsActions.clearEvaluatedId());

  const apiClient = new ApiClient();

  const { enqueueSnackbar } = useSnackbar();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value);

  const reloadLgtms = () => {
    // setFetching(true); // TODO
    clearLgtms();
    clearEvaluatedId();
    apiClient.getLgtms().then(response => {
      addLgtms(response.lgtms);
      setEvaluatedId(response.evaluated_id);
    }).finally(() => {
      // setFetching(false); // TODO
    });
  };

  const handleSearch = () => {
    setSearching(true);
    apiClient.searchImages({ q: query }).then(images => {
      setImages(images);
    }).catch(() => {
      enqueueSnackbar('画像検索に失敗しました', { variant: 'error' });
    }).finally(() => {
      setSearching(false);
    });
  };

  const handleClickImage = (image: Image) => {
    setImage(image);
  };

  const generateLgtm = (image: Image) => {
    setGenerating(true);
    apiClient.createLgtm({ url: image.url }).then(() => {
      enqueueSnackbar('LGTM 画像を生成しました');
      setImage(undefined);
      reloadLgtms();
    }).catch(() => {
      enqueueSnackbar('LGTM 画像の生成に失敗しました', { variant: 'error' });
    }).finally(() => {
      setGenerating(false);
    });
  };

  return (
    <React.Fragment>
      {image && (
        <GenerateConfirm
          imageSrc={image.url}
          open={!!image}
          generating={generating}
          onClose={() => setImage(undefined)}
          onGenerate={() => generateLgtm(image)}
        />
      )}
      <Form onSubmit={handleSearch}>
        <TextField
          className={classes.input}
          disabled={searching}
          fullWidth
          variant='outlined'
          value={query}
          onChange={handleChangeQuery}
          placeholder='キーワード'
          inputProps={{
            maxLength: 255,
          }}
          InputProps={{
            startAdornment: <InputAdornment position='start'><Search/></InputAdornment>,
          }}
        />
      </Form>
      <Box className={classes.images}>
        {searching ? (
          <Box textAlign='center'><CircularProgress/></Box>
        ) : (
          <Grid container spacing={2}>
            {images.map((image, i) => (
              <Grid key={i} item xs={6} sm={3} md={2}>
                <Card>
                  <CardActionArea onClick={() => handleClickImage(image)}>
                    <CardMedia className={classes.media} image={image.url}/>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
};
