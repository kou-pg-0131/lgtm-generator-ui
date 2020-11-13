import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Title } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: 16,
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
  }),
);

export const NotFoundPage: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title value='お探しのページは見つかりませんでした'/>
      <Typography className={classes.text} align='center'>お探しのページは見つかりませんでした</Typography>
    </React.Fragment>
  );
};
