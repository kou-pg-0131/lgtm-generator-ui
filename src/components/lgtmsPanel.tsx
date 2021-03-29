import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useLgtms } from '../contexts';
import { LgtmList, LgtmListItem, UploadButton, GenerateConfirm, ModalLoading } from '.';
import { ImageFile, ImageFileLoader, DataUrl } from '../infrastructures';
import { FileTooLargeError } from '../domain';

export const LgtmsPanel: React.FC = () => {
  const { lgtms } = useLgtms();
  const { enqueueSnackbar } = useSnackbar();
  const [imageFile, setImageFile] = useState<ImageFile>();
  const [loadingImageFile, setLoadingImageFile] = useState<boolean>(false);

  const clearImageFile = () => setImageFile(undefined);

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
      <ModalLoading open={loadingImageFile} text='画像を読込中'/>
      <UploadButton onChange={handleChangeFile}/>
      <GenerateConfirm
        open={!!imageFile}
        onClose={clearImageFile}
        imgSrc={imageFile && DataUrl.fromBase64({ imageType: imageFile.type, base64: imageFile.base64 }).toString('dataurl')}
      />
    </Box>
  );
};
