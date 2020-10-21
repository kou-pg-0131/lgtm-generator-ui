import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles(() =>
  createStyles({
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
  }),
);

type Props = {
  children: React.ReactElement | React.ReactElement[];
  onDrop: (acceptedFiles: File[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const ImageFileDropzone: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { getInputProps, getRootProps } = useDropzone({ onDrop: props.onDrop });

  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input {...getInputProps()}/>
      {props.children}
    </div>
  );
};
