import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as uuid from 'uuid';

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      bottom: 24,
      position: 'fixed',
      right: 24,
      zIndex: 999,
    },
    input: {
      display: 'none',
    },
    icon: {
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
    <Fab className={classes.fab} color='primary' onClick={handleClick} variant='extended'>
      <input
        className={classes.input}
        key={inputFileKey}
        ref={inputFileRef}
        type='file'
        onChange={handleChangeFile}
      />
      <AddCircle className={classes.icon}/>
      アップロード
    </Fab>
  );
};
