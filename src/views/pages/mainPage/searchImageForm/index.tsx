import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Form, SearchField } from '../../../components';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      backgroundColor: '#fff',
    },
  }),
);

type Props = {
  query: string;
  onChange: (query: string) => void;
  searching: boolean;
  onSubmit: () => void;
};

export const SearchImageForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleSubmit = () => {
    props.onSubmit();
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchField
        fullWidth
        className={classes.input}
        disabled={props.searching}
        variant='outlined'
        value={props.query}
        onChange={handleChangeQuery}
        inputProps={{ maxLength: 255 }}
      />
    </Form>
  );
};
