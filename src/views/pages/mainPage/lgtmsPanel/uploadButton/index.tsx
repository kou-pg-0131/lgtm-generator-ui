import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import * as uuid from 'uuid';
import { FabButton } from '../../../../components';

const useStyles = makeStyles(() =>
  createStyles({
    addIcon: {
      marginRight: 8,
    },
  }),
);

type Props = {
  onChange: (file: File) => void;
};

export const UploadButton: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const inputFileRef = React.createRef<HTMLInputElement>();
  const [inputFileKey, setInputFileKey] = useState<string>(uuid.v4());

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFileKey(uuid.v4());
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (!file) return;
    props.onChange(file);
  };

  return (
    <FabButton color='primary' onClick={() => inputFileRef.current?.click()} variant='extended'>
      <input key={inputFileKey} accept='image/*' onChange={handleChangeFile} type='file' ref={inputFileRef} style={{display:'none'}}/>
      <AddCircle className={classes.addIcon}/>
      アップロード
    </FabButton>
  );
};
