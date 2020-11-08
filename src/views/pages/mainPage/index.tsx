import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box, Card, CardActionArea, CardMedia, CircularProgress, InputAdornment, Paper, Tab, Tabs, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lgtmsActions, States } from '../../modules';
import { GenerateConfirm, GridContainer, GridItem, Form, LgtmCard, ModalLoading } from '../../components';
import { Image, Lgtm, FileTooLargeError } from '../../../domain';
import { ApiClientFactory, DataUrl, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { MoreButton } from './lgtmsPanel/moreButton';
import { UploadButton } from './lgtmsPanel/uploadButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 38,
    },
    tab: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    tabs: {
      marginBottom: 24,
    },
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

export const MainPage: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const params = qs.parse(location.search);
  const getTab = () => ['lgtms', 'search_images', 'favorites'].find((e) => e === params.tab) || 'lgtms';

  const [tab, setTab] = useState<string>(getTab());
  const [images, setImages] = useState<Image[]>([]);
  const [image, setImage] = useState<Image>();
  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [imageFileLoading, setImageFileLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<ImageFile>();
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const apiClient = new ApiClientFactory().create();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const addLgtms = (lgtms: Lgtm[]) => dispatch(lgtmsActions.addLgtms(lgtms));
  const clearLgtms = () => dispatch(lgtmsActions.clearLgtms());
  const setEvaluatedId = (evaluatedId?: string) => dispatch(lgtmsActions.setEvaluatedId(evaluatedId));
  const clearEvaluatedId = () => dispatch(lgtmsActions.clearEvaluatedId());
  const setFetchingLgtms = (fetching: boolean) => dispatch(lgtmsActions.setFetchingLgtms(fetching));

  const loadLgtms = (evaluatedId?: string) => {
    setFetchingLgtms(true);
    apiClient.getLgtms(evaluatedId).then(response => {
      addLgtms(response.lgtms);
      setEvaluatedId(response.evaluated_id);
    }).finally(() => {
      setFetchingLgtms(false);
    });
  };
  const reloadLgtms = () => {
    clearLgtms();
    clearEvaluatedId();
    loadLgtms();
  };

  const handleChangeTab = (e: React.ChangeEvent<unknown>, value: string) => {
    history.replace({ search: `?tab=${value}` });
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleClickImage = (image: Image) => {
    setImage(image);
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
  const handleChangeFile = (file: File) => {
    setImageFileLoading(true);
    const imageFileLoader = new ImageFileLoader();
    imageFileLoader.load(file).then(imageFile => {
      setImageFile(imageFile);
    }).catch((err) => {
      switch (true) {
        case err instanceof FileTooLargeError:
          enqueueSnackbar(`ファイルサイズが大きすぎます: ${file.name}`, { variant: 'warning' });
          break;
        default:
          enqueueSnackbar(`対応していない画像形式です: ${file.name}`, { variant: 'warning' });
          break;
      }
    }).finally(() => {
      setImageFileLoading(false);
    });
  };


  useEffect(() => {
    setTab(getTab);
  }, [params.tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lgtmsState.lgtms.length === 0) loadLgtms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Paper>
        <Tabs
          className={classes.tabs}
          variant='fullWidth'
          value={tab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChangeTab}
        >
          <Tab className={classes.tab} label='LGTM 画像' value='lgtms'/>
          <Tab className={classes.tab} label='画像検索' value='search_images'/>
          <Tab className={classes.tab} label='お気に入り' value='favorites'/>
        </Tabs>
      </Paper>

      <Box hidden={tab !== 'lgtms'}>
        <ModalLoading open={imageFileLoading} text='画像を読込中'/>
        <UploadButton onChange={handleChangeFile}/>
        {imageFile && (
          <GenerateConfirm
            imageSrc={{ dataUrl: DataUrl.fromBase64({ imageType: imageFile.type, base64: imageFile.base64 }) }}
            imageName={imageFile.name}
            open={!!imageFile}
            onGenerate={reloadLgtms}
            onClose={() => setImageFile(undefined)}
          />
        )}
        <GridContainer>
          {lgtmsState.lgtms.map(lgtm => (
            <GridItem key={lgtm.id}>
              <LgtmCard lgtm={lgtm}/>
            </GridItem>
          ))}
        </GridContainer>

        <MoreButton
          processing={lgtmsState.fetchingLgtms}
          visible={Boolean(lgtmsState.evaluatedId || lgtmsState.fetchingLgtms)}
          onClick={() => loadLgtms(lgtmsState.evaluatedId)}
        />
      </Box>

      <Box hidden={tab !== 'search_images'}>
        <GenerateConfirm
          imageSrc={{ url: image?.url }}
          imageName={image?.title}
          open={!!image}
          onClose={() => setImage(undefined)}
          onGenerate={reloadLgtms}
        />
        <Form onSubmit={handleSearch}>
          <TextField
            type='search'
            className={classes.input}
            disabled={searching}
            fullWidth
            variant='outlined'
            value={query}
            onChange={handleChangeQuery}
            placeholder='キーワード'
            inputProps={{ maxLength: 255 }}
            InputProps={{ startAdornment: <InputAdornment position='start'><Search/></InputAdornment> }}
          />
        </Form>
        <Box className={classes.images}>
          {searching ? (
            <Box textAlign='center'><CircularProgress/></Box>
          ) : (
            <GridContainer>
              {images.map((image, i) => (
                <GridItem key={i}>
                  <Card>
                    <CardActionArea onClick={() => handleClickImage(image)}>
                      <CardMedia className={classes.media} image={image.url}/>
                    </CardActionArea>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          )}
        </Box>
      </Box>

      <Box hidden={tab !== 'favorites'}>
        <GridContainer>
          {lgtmsState.favorites.map(lgtm => (
            <GridItem key={lgtm.id}>
              <LgtmCard lgtm={lgtm}/>
            </GridItem>
          ))}
        </GridContainer>
      </Box>
    </React.Fragment>
  );
};
