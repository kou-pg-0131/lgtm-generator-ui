import React from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import { Search } from '@material-ui/icons';

type Props = TextFieldProps;

export const SearchField: React.FC<Props> = (props: Props) => {
  return (
    <TextField
      {...props}
      type='search'
      placeholder='キーワード'
      InputProps={{ startAdornment: <InputAdornment position='start'><Search/></InputAdornment> }}
    />
  );
};
