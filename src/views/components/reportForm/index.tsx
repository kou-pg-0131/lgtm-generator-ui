import React from 'react';
import { CardActions, CardContent, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { LoadableButton, ModalCard } from '..';
import { ReportType } from '../../../domain';

type Props = {
  open: boolean;
  processing: boolean;
  type?: ReportType;
  text: string;
  onClose: () => void;
  onReport: () => void;
  onChangeType: (type: ReportType) => void;
  onChangeText: (text: string) => void;
};

export const ReportForm: React.FC<Props> = (props: Props) => {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(e.currentTarget.value);
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => props.onChangeType(e.currentTarget.value as ReportType);

  const isValid = () => {
    if (props.type == undefined) return false;
    return true;
  };

  return (
    <ModalCard open={props.open} onClose={() => !props.processing && props.onClose()}>
      <CardContent>
        <RadioGroup value={props.type} onChange={handleChangeType}>
          <FormControlLabel disabled={props.processing} value='illegal' label='法律違反（著作権侵害、プライバシー侵害、名誉棄損等）' control={<Radio value='illegal'/>}/>
          <FormControlLabel disabled={props.processing} value='inappropriate' label='不適切なコンテンツ' control={<Radio value='inappropriate'/>}/>
          <FormControlLabel disabled={props.processing} value='other' label='その他' control={<Radio value='other'/>}/>
        </RadioGroup>
        <TextField
          disabled={props.processing}
          fullWidth
          multiline
          value={props.text}
          placeholder='補足（任意）'
          variant='outlined'
          rows={7}
          onChange={handleChangeText}
        />
      </CardContent>
      <CardActions>
        <LoadableButton
          fullWidth
          loading={props.processing}
          color='primary'
          variant='contained'
          onClick={props.onReport}
          disabled={!isValid()}
        >
          送信
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};
