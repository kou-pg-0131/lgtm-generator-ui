import React from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { ButtonWithPopper } from '..';
import { Lgtm } from '../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      border: '1px solid #eeeeee',
    },
    actions: {
      justifyContent: 'center',
    },
    media: {
      backgroundSize: 'contain',
      height: 140,
    },
    list: {
      padding: 0,
    },
    listItem: {
      height: 34,
      padding: '0 12px',
    },
    listItemText: {
      fontSize: 12,
      textAlign: 'center',
    },
    buttonGroup: {
      maxWidth: '100%',
    },
  }),
);

type Props = {
  lgtm: Lgtm;
  favorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickHTMLOrMarkdownCopy = () => enqueueSnackbar('クリップボードにコピーしました');

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup color='primary' className={classes.buttonGroup}>
            <ButtonWithPopper
              popperContent={
                <Paper>
                  <List className={classes.list}>
                    <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
                      <CopyToClipBoard text={`![LGTM](${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id})`}>
                        <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
                      </CopyToClipBoard>
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
                      <CopyToClipBoard text={`<img src="${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}"/>`}>
                        <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
                      </CopyToClipBoard>
                    </ListItem>
                  </List>
                </Paper>
              }
            >
              <FileCopyOutlined fontSize='small'/>
            </ButtonWithPopper>
              {props.favorited ? (
                <Button onClick={props.onUnfavorite}><Favorite fontSize='small'/></Button>
              ) : (
                <Button onClick={props.onFavorite}><FavoriteBorder fontSize='small'/></Button>
              )}
            <Button><FlagOutlined fontSize='small'/></Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
