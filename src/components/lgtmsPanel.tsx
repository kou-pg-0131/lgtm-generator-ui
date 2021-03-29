import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem, UploadButton, GenerateConfirm, ModalLoading, Loading } from '.';
import { ImageFile, ImageFileLoader, DataUrl } from '../infrastructures';
import { FileTooLargeError } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    more: {
      marginTop: theme.spacing(2),
      textAlign: 'center',
    },
  }),
);

export const LgtmsPanel: React.FC = () => {
  const classes = useStyles();

  const { lgtms, loading, loadable, loadMore, create, reload } = useLgtms();
  const { enqueueSnackbar } = useSnackbar();
  const [generating, setGenerating] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<ImageFile>();
  const [loadingImageFile, setLoadingImageFile] = useState<boolean>(false);

  const handleCloseConfirm = () => {
    if (generating) return;
    setImageFile(undefined);
  };

  const handleGenerate = () => {
    setGenerating(true);
    create({ base64: imageFile?.base64 }).then(() => {
      enqueueSnackbar('LGTM 画像を生成しました');
    }).catch(() => {
      enqueueSnackbar('LGTM 画像の生成に失敗しました');
    }).finally(() => {
      setGenerating(false);
      setImageFile(undefined);
      reload();
    });
  };

  const handleChangeFile = (file: File) => {
    setLoadingImageFile(true);
    const imageFileLoader = new ImageFileLoader();
    imageFileLoader.load(file).then(imageFile => {
      setImageFile(imageFile);
    }).catch(err => {
      switch (err.constructor) {
        case FileTooLargeError:
          enqueueSnackbar(`ファイルサイズが大きすぎます: ${file.name}`, { variant: 'warning' });
          return;
        default:
          enqueueSnackbar(`対応していない画像形式です: ${file.name}`, { variant: 'warning' });
          return;
      }
    }).finally(() => {
      setLoadingImageFile(false);
    });
  };

  return (
    <Box>
      <LgtmList>
        {lgtms.map(lgtm => (
          <LgtmListItem key={lgtm.id} lgtm={lgtm}/>
        ))}
      </LgtmList>
      {(loading || loadable) && (
        <Box className={classes.more}>
          {loading ? (
            <Loading/>
          ) : (
            <Button variant='contained' color='primary' onClick={loadMore}>MORE</Button>
          )}
        </Box>
      )}

      <ModalLoading open={loadingImageFile} text='画像を読込中'/>
      <UploadButton onChange={handleChangeFile}/>
      <GenerateConfirm
        disabled={generating}
        open={!!imageFile}
        onGenerate={handleGenerate}
        onClose={handleCloseConfirm}
        imgSrc={imageFile && DataUrl.fromBase64({ imageType: imageFile.type, base64: imageFile.base64 }).toString('dataurl')}
      />
    </Box>
  );
};
