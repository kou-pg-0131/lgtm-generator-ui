import React, { useState } from 'react';
import { Card, CardActions, CardContent, Divider, List, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoadableButton } from '../../../components';
import { ImageFile, ImageFileLoader } from '../../../../infrastructures';
import { ImageFileDropzone } from './imageFileDropzone';
import { ImagePreviewListItem } from './../imagePreviewListItem';

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
  }),
);

type Props = {
  open: boolean;
  onClose: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  uploading: boolean;
  onUpload: (imageFiles: ImageFile[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const UploadForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    const imageFileLoader = new ImageFileLoader();
    const newImageFiles = await Promise.all(acceptedFiles.map(async acceptedFile => await imageFileLoader.load(acceptedFile)));
    setImageFiles(imageFiles.concat(newImageFiles));
  };
  const deleteImageFileAt = (index: number) => {
    if (props.uploading) return;
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setImageFiles([]);
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.card}>
        <CardContent>
          <ImageFileDropzone onDrop={onDrop} disabled={props.uploading}/>
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
          <LoadableButton fullWidth loading={props.uploading} disabled={props.uploading} color='primary' variant='contained' onClick={() => props.onUpload(imageFiles)}>Upload</LoadableButton>
        </CardActions>
      </Card>
    </Modal>
  );
};
