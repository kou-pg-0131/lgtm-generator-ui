import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { States, lgtmsActions } from '../../../modules';
import { GenerateConfirm, GridContainer, GridItem, LgtmCard, ModalLoading } from '../../../components';
import { Lgtm } from '../../../../domain';
import { ApiClientFactory, DataUrl, ImageFile, ImageFileLoader } from '../../../../infrastructures';
import { MoreButton } from './moreButton';
import { UploadButton } from './uploadButton';

export const LgtmsPanel: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile>();
  const [imageFileLoading, setImageFileLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const lgtmsState = useSelector((states: States) => states.lgtms);

  const dispatch = useDispatch();
  const addLgtms = (lgtms: Lgtm[]) => dispatch(lgtmsActions.addLgtms(lgtms));
  const clearLgtms = () => dispatch(lgtmsActions.clearLgtms());
  const setEvaluatedId = (evaluatedId?: string) => dispatch(lgtmsActions.setEvaluatedId(evaluatedId));
  const clearEvaluatedId = () => dispatch(lgtmsActions.clearEvaluatedId());
  const setFetchingLgtms = (fetching: boolean) => dispatch(lgtmsActions.setFetchingLgtms(fetching));

  const apiClient = new ApiClientFactory().create();

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

  const handleChangeFile = (file: File) => {
    const imageFileLoader = new ImageFileLoader();
    imageFileLoader.load(file).then(imageFile => {
      setImageFile(imageFile);
    }).catch(() => {
      enqueueSnackbar(`対応していない画像形式です: ${file.name}`, { variant: 'warning' });
    }).finally(() => {
      setImageFileLoading(false);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <ModalLoading open={imageFileLoading} text='画像を読込中'/>
      <UploadButton onChange={handleChangeFile}/>
      {imageFile && (
        <GenerateConfirm
          imageName={imageFile.name}
          imageSrc={DataUrl.fromBase64({ imageType: imageFile.type, base64: imageFile.base64 }).toString()}
          open={!!imageFile}
          onGenerate={() => generateLgtm(imageFile)}
          generating={uploading}
          onClose={() => setImageFile(undefined)}
        />
      )}
      <GridContainer>
        {lgtmsState.lgtms.map(lgtm => (
          <GridItem key={lgtm.id}>
            <LgtmCard lgtm={lgtm}/>
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
