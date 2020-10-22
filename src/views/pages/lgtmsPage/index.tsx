import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, List, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { FabButton, LoadableButton } from '../../components';
import { Lgtm } from '../../../domain';
import { ApiClient, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { ImageFileDropzone } from './imageFileDropzone';
import { ImagePreviewListItem } from './imagePreviewListItem';
import { LgtmCard } from './lgtmCard';

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

  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [evaluatedId, setEvaluatedId] = useState<string>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const apiClient = new ApiClient();

  const addImageFiles = async (acceptedFiles: File[]) => {
    const imageFileLoader = new ImageFileLoader();
    const newImageFiles = await Promise.all(acceptedFiles.map(async acceptedFile => await imageFileLoader.load(acceptedFile)));
    setImageFiles(imageFiles.concat(newImageFiles));
  };

  const openModal = () => setOpen(true);
  const closeModal = () => !uploading && setOpen(false);
  const deleteImage = (index: number) => setImageFiles(imageFiles.filter((_, i) => i !== index));

  // TODO: refactor
  const loadLgtms = async () => {
    setFetching(true);
    const response = await apiClient.getLgtms();
    setLgtms(response.lgtms);
    setEvaluatedId(response.evaluated_id);
    setFetching(false);
  };
  const moreLgtms = async () => {
    setFetching(true);
    const response = await apiClient.getLgtms(evaluatedId);
    setLgtms([...lgtms, ...response.lgtms]);
    setEvaluatedId(response.evaluated_id);
    setFetching(false);
  };

  const uploadLgtms = async () => {
    setUploading(true);

    await Promise.all(imageFiles.map(async imageFile => {
      const base64 = imageFile.dataUrl.slice(imageFile.dataUrl.indexOf(',') + 1);
      await apiClient.createLgtm({ base64 });
    }));
    loadLgtms();
    setUploading(false);
    closeModal();
    setImageFiles([]);
  };

  useEffect(() => {
    loadLgtms();
  }, []);

  return (
    <React.Fragment>
      <FabButton color='primary' onClick={openModal} variant='extended'>
        <AddCircle className={classes.addIcon}/>
        Upload
      </FabButton>
      <Modal open={open} onClose={closeModal}>
        <Card className={classes.card}>
          <CardContent>
            <ImageFileDropzone onDrop={addImageFiles}/>
            <List className={classes.list}>
              {imageFiles.map((imageFile, i) => (
                <React.Fragment key={i}>
                  <ImagePreviewListItem imageFile={imageFile} onDelete={() => deleteImage(i)}/>
                  <Divider/>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <LoadableButton fullWidth loading={uploading} disabled={uploading} color='primary' variant='contained' onClick={uploadLgtms}>Upload</LoadableButton>
          </CardActions>
        </Card>
      </Modal>
      <Grid container spacing={1}>
        {lgtms.map(lgtm => (
          <Grid key={lgtm.id} item xs={6} sm={3} md={2}>
            <LgtmCard lgtm={lgtm}/>
          </Grid>
        ))}
      </Grid>

      {fetching && (
        <Box style={{textAlign: 'center'}}>
          <CircularProgress/>
        </Box>
      )}

      {!fetching && evaluatedId && (
        <Box style={{textAlign: 'center'}}>
          <Button color='primary' variant='contained' disabled={fetching} onClick={moreLgtms}>More</Button>
        </Box>
      )}
    </React.Fragment>
  );
};
