import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box, CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lgtmsActions, States } from '../../modules';
import { ClickableImageCard, GenerateConfirm, GridContainer, GridItem, ModalLoading } from '../../components';
import { Image, Lgtm, FileTooLargeError } from '../../../domain';
import { ApiClientFactory, DataUrl, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { MoreButton } from './moreButton';
import { UploadButton } from './uploadButton';
import { Tabs, TabValue } from './tabs';
import { SearchImageForm } from './searchImageForm';
import { LgtmList } from './lgtmList';

const useStyles = makeStyles(() =>
  createStyles({
    images: {
      marginTop: 24,
    },
  }),
);

export const MainPage: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const params = qs.parse(location.search);
  const getTab = () => (['lgtms', 'search_images', 'favorites'].find((e) => e === params.tab) || 'lgtms') as TabValue;

  const [tab, setTab] = useState<TabValue>(getTab());
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

  const handleChangeTab = (value: TabValue) => {
    history.replace({ search: `?tab=${value}` });
  };

  const handleChangeQuery = (query: string) => {
    setQuery(query);
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
      <Tabs value={tab} onChange={handleChangeTab}/>

      <Box hidden={tab !== 'lgtms'}>
        <ModalLoading open={imageFileLoading} text='画像を読込中'/>
        <UploadButton onChange={handleChangeFile}/>
        <GenerateConfirm
          imageSrc={{ dataUrl: imageFile && DataUrl.fromBase64({ imageType: imageFile.type, base64: imageFile.base64 }) }}
          imageName={imageFile?.name}
          open={!!imageFile}
          onGenerate={reloadLgtms}
          onClose={() => setImageFile(undefined)}
        />
        <LgtmList lgtms={lgtmsState.lgtms}/>

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
        <SearchImageForm
          query={query}
          onChange={handleChangeQuery}
          searching={searching}
          onSubmit={handleSearch}
        />
        <Box className={classes.images}>
          {searching ? (
            <Box textAlign='center'><CircularProgress/></Box>
          ) : (
            <GridContainer>
              {images.map((image, i) => (
                <GridItem key={i}>
                  <ClickableImageCard src={image.url} onClick={() => handleClickImage(image)}/>
                </GridItem>
              ))}
            </GridContainer>
          )}
        </Box>
      </Box>

      <Box hidden={tab !== 'favorites'}>
        <LgtmList lgtms={lgtmsState.favorites}/>
      </Box>
    </React.Fragment>
  );
};
