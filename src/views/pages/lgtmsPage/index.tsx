import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { FabButton } from '../../components';
import { Lgtm } from '../../../domain';
import { ApiClient, ImageFile } from '../../../infrastructures';
import { LgtmCard } from './lgtmCard';
import { UploadForm } from './uploadForm';

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
  const [open, setOpen] = useState<boolean>(false);

  const apiClient = new ApiClient();

  const openModal = () => setOpen(true);
  const closeModal = () => !uploading && setOpen(false);

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

  const uploadLgtms = async (imageFiles: ImageFile[]) => {
    setUploading(true);

    await Promise.all(imageFiles.map(async imageFile => {
      const base64 = imageFile.dataUrl.slice(imageFile.dataUrl.indexOf(',') + 1);
      await apiClient.createLgtm({ base64 });
    }));
    loadLgtms();
    setUploading(false);
    closeModal();
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
      <UploadForm
        open={open}
        onClose={closeModal}
        uploading={uploading}
        onUpload={uploadLgtms}
      />
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
