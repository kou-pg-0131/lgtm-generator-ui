import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import * as uuid from 'uuid';
import { FabButton } from '../../../../components';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      marginRight: 8,
    },
    input: {
      display: 'none',
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

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFileKey(uuid.v4());
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (!file) return;
    props.onChange(file);
  };

  return (
    <FabButton color='primary' onClick={handleClick} variant='extended'>
      <input
        accept='image/*'
        className={classes.input}
        key={inputFileKey}
        onChange={handleChangeFile}
        ref={inputFileRef}
        type='file'
      />
      <AddCircle className={classes.icon}/>
      アップロード
    </FabButton>
  );
};
