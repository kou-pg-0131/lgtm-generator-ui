import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Divider, Grid, List, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { States, lgtmsActions } from '../../modules';
import { FabButton, LgtmCard, LoadableButton } from '../../components';
import { Lgtm } from '../../../domain';
import { ApiClient, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { MoreButton } from './moreButton';
import { ImagePreviewListItem } from './imagePreviewListItem';
import { ImageFileDropzone } from './imageFileDropzone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      left: '50%',
      outline: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '75%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    list: {
      border: '1px solid #eee',
      height: 220,
      marginTop: 24,
      overflow: 'auto',
      [theme.breakpoints.down('xs')]: {
        height: 150,
      },
    },
    addIcon: {
      marginRight: 8,
    },
  }),
);

export const LgtmsPage: React.FC = () => {
  const classes = useStyles();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addLgtms = (lgtms: Lgtm[]) => dispatch(lgtmsActions.addLgtms(lgtms));
  const clearLgtms = () => dispatch(lgtmsActions.clearLgtms());
  const setEvaluatedId = (evaluatedId?: string) => dispatch(lgtmsActions.setEvaluatedId(evaluatedId));
  const clearEvaluatedId = () => dispatch(lgtmsActions.clearEvaluatedId());
  const addFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.addFavorite(lgtm));
  const removeFavorite = (lgtm: Lgtm) => dispatch(lgtmsActions.removeFavorite(lgtm));

  const apiClient = new ApiClient();

  const { enqueueSnackbar } = useSnackbar();

  const loadLgtms = (evaluatedId?: string) => {
    setFetching(true);
    apiClient.getLgtms(evaluatedId).then(response => {
      addLgtms(response.lgtms);
      setEvaluatedId(response.evaluated_id);
    }).finally(() => {
      setFetching(false);
    });
  };

  const reloadLgtms = () => {
    clearLgtms();
    clearEvaluatedId();
    loadLgtms();
  };

  const deleteImageFileAt = (index: number) => setImageFiles(imageFiles.filter((_, i) => i !== index));

  const uploadLgtms = async () => {
    setUploading(true);
    let uploadFailed = false;
    await Promise.all(imageFiles.map(async imageFile => {
      await apiClient.createLgtm({ base64: imageFile.base64 }).catch(() => {
        enqueueSnackbar(`アップロードに失敗しました: ${imageFile.name}`, { variant: 'warning' });
        uploadFailed = true;
      });
    })).then(() => {
      setOpen(uploadFailed);
    }).finally(() => {
      reloadLgtms();
      setUploading(false);
    });
  };

  const addImageFiles = async (acceptedFiles: File[]) => {
    if (uploading) return;
    const imageFileLoader = new ImageFileLoader();
    await Promise.all(acceptedFiles.map(async acceptedFile => {
      await imageFileLoader.load(acceptedFile).then(imageFile => {
        setImageFiles((prev) => [...prev, imageFile]);
      }).catch(() => {
        enqueueSnackbar(`対応していない画像形式です: ${acceptedFile.name}`, { variant: 'warning' });
      });
    }));
  };

  useEffect(() => {
    if (lgtmsState.lgtms.length === 0) loadLgtms();
  }, []);

  return (
    <React.Fragment>
      <FabButton color='primary' onClick={() => setOpen(true)} variant='extended'>
        <AddCircle className={classes.addIcon}/>
        Upload
      </FabButton>
      <Modal open={open} onClose={() => !uploading && setOpen(false)}>
        <Card className={classes.card}>
          <CardContent>
            <ImageFileDropzone onDrop={addImageFiles} disabled={uploading}/>
            <List className={classes.list}>
              {imageFiles.map((imageFile, i) => (
                <React.Fragment key={i}>
                  <ImagePreviewListItem imageFile={imageFile} onDelete={() => deleteImageFileAt(i)}/>
                  <Divider/>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <LoadableButton
              fullWidth
              loading={uploading}
              disabled={uploading}
              color='primary'
              variant='contained'
              onClick={uploadLgtms}
            >
              Upload
            </LoadableButton>
          </CardActions>
        </Card>
      </Modal>
      <Grid container spacing={1}>
        {lgtmsState.lgtms.map(lgtm => (
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
        visible={Boolean(lgtmsState.evaluatedId || fetching)}
        onClick={() => loadLgtms(lgtmsState.evaluatedId)}
      />
    </React.Fragment>
  );
};
