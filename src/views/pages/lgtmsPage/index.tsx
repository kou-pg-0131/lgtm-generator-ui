import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import { Lgtm } from '../../../domain';
import { ApiClient, ImageFile, ImageFileLoader } from '../../../infrastructures';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    dropzone: {
      alignItems: 'center',
      backgroundColor: '#fafafa',
      border: '2px dashed #eee',
      borderRadius: 2,
      color: '#bdbdbd',
      cursor: 'pointer',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      outline: 'none',
      padding: 40,
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
    fileName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    preview: {
      border: '1px solid #eeeeee',
      height: 70,
      marginRight: 24,
      width: 70,
      [theme.breakpoints.down('xs')]: {
        height: 40,
        width: 40,
      },
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
    setImageFiles(newImageFiles);
  };
  const { getInputProps, getRootProps } = useDropzone({ onDrop: addImageFiles });

  const openDropzone = () => setOpen(true);
  const closeDropzone = () => !uploading && setOpen(false);
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
      const base64 = imageFile.dataUrl.replace(/data:.*\/.*;base64,/, '');
      await apiClient.createLgtm({ base64 });
    }));
    getLgtms();

    setUploading(false);
  };

  useEffect(() => {
    getLgtms();
  }, []);

  return (
    <div>
      <Modal open={open} onClose={closeDropzone}>
        <Card className={classes.root}>
          <CardContent>
            <div {...getRootProps({ className: classes.dropzone })}>
              <input {...getInputProps()}/>
              <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
            </div>
            <List className={classes.list}>
              {imageFiles.map((imageFile, i) => (
                <React.Fragment key={i}>
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar variant='square' src={imageFile.dataUrl} className={classes.preview}/>
                    </ListItemAvatar>
                    <ListItemText primary={imageFile.name} primaryTypographyProps={{ style: { display: 'inline' } }} className={classes.fileName}/>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => deleteImage(i)}><Delete/></IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Button fullWidth disabled={uploading} color='primary' variant='contained' onClick={uploadLgtms}>Upload</Button>
          </CardActions>
        </Card>
      </Modal>
      <button onClick={openDropzone}>upload</button>
      {fetching ? (
        <CircularProgress/>
      ) : (
        lgtms.map(lgtm => (
          <img key={lgtm.id} src={lgtm.url} alt="LGTM" height={80} width={80} />
        ))
      )}
    </div>
  );
};
