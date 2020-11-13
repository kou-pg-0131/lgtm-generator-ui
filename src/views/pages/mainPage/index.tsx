import React, { useEffect, useState } from 'react';
import * as qs from 'query-string';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import { GenerateConfirm, ModalLoading, Message, Title } from '../../components';
import { Image, Lgtm, FileTooLargeError } from '../../../domain';
import { ApiClientFactory, DataStore, DataUrl, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { MoreButton } from './moreButton';
import { UploadButton } from './uploadButton';
import { Tabs, TabValue } from './tabs';
import { SearchImageForm } from './searchImageForm';
import { LgtmList } from './lgtmList';
import { LgtmListItem } from './lgtmListItem';
import { ImageList } from './imageList';

export const MainPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = qs.parse(location.search);
  const getTab = () => (['lgtms', 'search_images', 'favorites'].find((e) => e === params.tab) || 'lgtms') as TabValue;
  const dataStore = new DataStore();

  const [tab, setTab] = useState<TabValue>(getTab());
  const [images, setImages] = useState<Image[]>([]);
  const [imagesNotFound, setImagesNotFound] = useState<boolean>(false);
  const [image, setImage] = useState<Image>();
  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [imageFileLoading, setImageFileLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<ImageFile>();
  const [fetchingLgtms, setFetchingLgtms] = useState<boolean>(false);
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [favorites, setFavorites] = useState<Lgtm[]>(dataStore.getFavorites());
  const [evaluatedId, setEvaluatedId] = useState<string>();

  const apiClient = new ApiClientFactory().create();

  const { enqueueSnackbar } = useSnackbar();

  const handleFavoriteLgtm = (lgtm: Lgtm) => {
    const after = [lgtm, ...favorites];
    dataStore.setFavorites(after);
    setFavorites(after);
  };

  const handleUnfavoriteLgtm = (lgtm: Lgtm) => {
    const after = favorites.filter(f => f.id !== lgtm.id);
    dataStore.setFavorites(after);
    setFavorites(after);
  };

  const loadLgtms = (evaluatedId?: string) => {
    setFetchingLgtms(true);
    apiClient.getLgtms(evaluatedId).then(response => {
      setLgtms(prev => [...prev, ...response.lgtms]);
      setEvaluatedId(response.evaluated_id);
    }).finally(() => {
      setFetchingLgtms(false);
    });
  };
  const reloadLgtms = () => {
    setLgtms(() => []);
    setEvaluatedId(undefined);
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
    if (query.length === 0) return;

    setSearching(true);
    setImagesNotFound(false);
    apiClient.searchImages({ q: query }).then(images => {
      setImages(images);
      setImagesNotFound(images.length === 0);
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
    loadLgtms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Title/>
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
        <LgtmList>
          {lgtms.map(lgtm => (
            <LgtmListItem key={lgtm.id} lgtm={lgtm} favorited={!!favorites.find(e => e.id === lgtm.id)} onFavorite={() => handleFavoriteLgtm(lgtm)} onUnfavorite={() => handleUnfavoriteLgtm(lgtm)}/>
          ))}
        </LgtmList>
        <MoreButton
          processing={fetchingLgtms}
          visible={Boolean(evaluatedId || fetchingLgtms)}
          onClick={() => loadLgtms(evaluatedId)}
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
        {imagesNotFound && <Message>画像が見つかりませんでした</Message>}
        <ImageList images={images} searching={searching} onClick={handleClickImage}/>
      </Box>

      <Box hidden={tab !== 'favorites'}>
        <LgtmList>
          {favorites.map(lgtm => (
            <LgtmListItem key={lgtm.id} lgtm={lgtm} favorited={!!favorites.find(e => e.id === lgtm.id)} onFavorite={() => handleFavoriteLgtm(lgtm)} onUnfavorite={() => handleUnfavoriteLgtm(lgtm)}/>
          ))}
        </LgtmList>
      </Box>
    </React.Fragment>
  );
};
