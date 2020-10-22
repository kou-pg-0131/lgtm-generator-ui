import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, CircularProgress, Divider, Grid, IconButton, List, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { LoadableButton } from '../../components';
import { Lgtm } from '../../../domain';
import { ApiClient, ImageFile, ImageFileLoader } from '../../../infrastructures';
import { ImageFileDropzone } from './imageFileDropzone';
import { ImagePreviewListItem } from './imagePreviewListItem';

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
    media: {
      height: 140,
    },
  }),
);

export const LgtmsPage: React.FC = () => {
  const classes = useStyles();

  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
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

  const getLgtms = async () => {
    setFetching(true);
    const fetchedLgtms = await apiClient.getLgtms();
    setLgtms(fetchedLgtms.lgtms);
    setFetching(false);
  };

  const uploadLgtms = async () => {
    setUploading(true);

    await Promise.all(imageFiles.map(async imageFile => {
      const base64 = imageFile.dataUrl.slice(imageFile.dataUrl.indexOf(',') + 1);
      await apiClient.createLgtm({ base64 });
    }));
    getLgtms();

    setUploading(false);
    closeModal();
    setImageFiles([]);
  };

  useEffect(() => {
    getLgtms();
  }, []);

  return (
    <React.Fragment>
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
      <button onClick={openModal}>upload</button>
      {fetching ? (
        <CircularProgress/>
      ) : (
        <Grid container spacing={1}>
          {lgtms.map(lgtm => (
            <Grid key={lgtm.id} item xs={6} sm={3} md={2}>
              <Card>
                <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${lgtm.id}`} title='LGTM' className={classes.media}/>
                <CardActions disableSpacing>
                  <ButtonGroup color='primary'>
                    <Button><FileCopyOutlined/></Button>
                    <Button><FavoriteBorder/></Button>
                    <Button><FlagOutlined/></Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
