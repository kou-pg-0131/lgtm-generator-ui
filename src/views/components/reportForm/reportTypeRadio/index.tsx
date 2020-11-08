import React from 'react';
import { FormControlLabel, Radio, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ReportType } from '../../../../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  }),
);

type Props = {
  text: string;
  value: ReportType;
  disabled: boolean;
};

export const ReportTypeRadio: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      value={props.value}
      control={<Radio value={props.value}/>}
      label={<Typography className={classes.text}>{props.text}</Typography>}
      disabled={props.disabled}
    />
  );
};
