import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { States, lgtmsActions } from '../../../modules';
import { FabButton, GenerateConfirm, LgtmCard } from '../../../components';
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
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [evaluatedId, setEvaluatedId] = useState<string>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.addFavorite(lgtm));
  const removeFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.removeFavorite(lgtm));

  const apiClient = new ApiClient();

  const { enqueueSnackbar } = useSnackbar();

  const loadLgtms = (evaluatedId?: string) => {
    setFetching(true);
    apiClient.getLgtms(evaluatedId).then(response => {
      setLgtms((prev) => [...prev, ...response.lgtms]);
      setEvaluatedId(response.evaluated_id);
    }).finally(() => {
      setFetching(false);
    });
  };
  const reloadLgtms = () => {
    setLgtms([]);
    setEvaluatedId(undefined);
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
      enqueueSnackbar('LGTM 画像の生成に失敗しました', { variant: 'error' });
    }).finally(() => {
      reloadLgtms();
      setUploading(false);
    });
  };

  useEffect(() => {
    loadLgtms();
  }, []);

  return (
    <React.Fragment>
      <FabButton color='primary' onClick={() => inputFileRef.current?.click()} variant='extended'>
        <input onChange={handleChangeFile} type='file' ref={inputFileRef} style={{display:'none'}}/>
        <AddCircle className={classes.addIcon}/>
        Upload
      </FabButton>
      {imageFile && (
        <GenerateConfirm
          imageSrc={`data:${imageFile.type};base64,${imageFile.base64}`}
          open={!!imageFile}
          onGenerate={() => generateLgtm(imageFile)}
          generating={uploading}
          onClose={() => setImageFile(undefined)}
        />
      )}
      <Grid container spacing={1}>
        {lgtms.map(lgtm => (
          <Grid key={lgtm.id} item xs={6} sm={3} md={2}>
            <LgtmCard
              lgtm={lgtm}
              favorited={!!lgtmsState.favorites.find(e => e.id === lgtm.id)}
              onFavorite={() => addFavorite(lgtm)}
              onUnfavorite={() => removeFavorite(lgtm)}
            />
          </Grid>
        ))}
      </Grid>

      <MoreButton
        processing={fetching}
        visible={Boolean(evaluatedId || fetching)}
        onClick={() => loadLgtms(evaluatedId)}
      />
    </React.Fragment>
  );
};
