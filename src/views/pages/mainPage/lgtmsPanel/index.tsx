import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { States, lgtmsActions } from '../../../modules';
import { FabButton, GenerateConfirm, GridContainer, GridItem, LgtmCard } from '../../../components';
import { Lgtm } from '../../../../domain';
import { ApiClient, ImageFile, ImageFileLoader } from '../../../../infrastructures';
import { MoreButton } from './moreButton';

const useStyles = makeStyles(() =>
  createStyles({
    addIcon: {
      marginRight: 8,
    },
  }),
);

export const LgtmsPanel: React.FC = () => {
  const classes = useStyles();

  const inputFileRef = React.createRef<HTMLInputElement>();

  const [imageFile, setImageFile] = useState<ImageFile>();
  const [uploading, setUploading] = useState<boolean>(false);
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addLgtms = (lgtms: Lgtm[]) => dispatch(lgtmsActions.addLgtms(lgtms));
  const clearLgtms = () => dispatch(lgtmsActions.clearLgtms());
  const setEvaluatedId = (evaluatedId?: string) => dispatch(lgtmsActions.setEvaluatedId(evaluatedId));
  const clearEvaluatedId = () => dispatch(lgtmsActions.clearEvaluatedId());
  const addFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.addFavorite(lgtm));
  const removeFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.removeFavorite(lgtm));
  const setFetchingLgtms = (fetching: boolean) => dispatch(lgtmsActions.setFetchingLgtms(fetching));

  const apiClient = new ApiClient();

  const { enqueueSnackbar } = useSnackbar();

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

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || !e.currentTarget.files[0]) return;

    const file = e.currentTarget.files[0];
    const imageFileLoader = new ImageFileLoader();
    imageFileLoader.load(file).then(imageFile => {
      setImageFile(imageFile);
    }).catch(() => {
      enqueueSnackbar(`対応していない画像形式です: ${file.name}`, { variant: 'warning' });
    });
  };

  const generateLgtm = async (imageFile: ImageFile) => {
    setUploading(true);
    apiClient.createLgtm({ base64: imageFile.base64 }).then(() => {
      enqueueSnackbar('LGTM 画像を生成しました');
      setImageFile(undefined);
    }).catch(() => {
      enqueueSnackbar('LGTM 画像の生成に失敗しました', { variant: 'warning' });
    }).finally(() => {
      reloadLgtms();
      setUploading(false);
    });
  };

  useEffect(() => {
    if (lgtmsState.lgtms.length === 0) loadLgtms();
  }, []);

  return (
    <React.Fragment>
      <FabButton color='primary' onClick={() => inputFileRef.current?.click()} variant='extended'>
        <input onChange={handleChangeFile} type='file' ref={inputFileRef} style={{display:'none'}}/>
        <AddCircle className={classes.addIcon}/>
        アップロード
      </FabButton>
      {imageFile && (
        <GenerateConfirm
          imageName={imageFile.name}
          imageSrc={`data:${imageFile.type};base64,${imageFile.base64}`}
          open={!!imageFile}
          onGenerate={() => generateLgtm(imageFile)}
          generating={uploading}
          onClose={() => setImageFile(undefined)}
        />
      )}
      <GridContainer>
        {lgtmsState.lgtms.map(lgtm => (
          <GridItem key={lgtm.id}>
            <LgtmCard
              lgtm={lgtm}
              favorited={!!lgtmsState.favorites.find(e => e.id === lgtm.id)}
              onFavorite={() => addFavorite(lgtm)}
              onUnfavorite={() => removeFavorite(lgtm)}
            />
          </GridItem>
        ))}
      </GridContainer>

      <MoreButton
        processing={lgtmsState.fetchingLgtms}
        visible={Boolean(lgtmsState.evaluatedId || lgtmsState.fetchingLgtms)}
        onClick={() => loadLgtms(lgtmsState.evaluatedId)}
      />
    </React.Fragment>
  );
};
