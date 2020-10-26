import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia, Divider, List, ListItem, ListItemText, Paper, Popper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import CopyToClipBoard from 'react-copy-to-clipboard';
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
  onFavorite: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onUnfavorite: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickCopy = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(anchorEl ? undefined : e.currentTarget);
  const closePopper = () => setAnchorEl(undefined);
  const handleClickHTMLOrMarkdownCopy = () => enqueueSnackbar('クリップボードにコピーしました');

  useEffect(() => {
    if (anchorEl) {
      document.addEventListener('click', closePopper);
    } else {
      document.removeEventListener('click', closePopper);
    }
    return () => { document.removeEventListener('click', closePopper); };
  }, [anchorEl]);

  const html = `<img src="${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id}"/>`;
  const markdown = `![LGTM](${process.env.REACT_APP_LGTMS_ORIGIN}/${props.lgtm.id})`;

  return (
    <React.Fragment>
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement='top' transition>
        <Paper>
          <List className={classes.list}>
            <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
              <CopyToClipBoard text={markdown}>
                <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
              </CopyToClipBoard>
            </ListItem>
            <Divider/>
            <ListItem button onClick={handleClickHTMLOrMarkdownCopy} className={classes.listItem}>
              <CopyToClipBoard text={html}>
                <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
              </CopyToClipBoard>
            </ListItem>
          </List>
        </Paper>
      </Popper>
      <Card className={classes.card}>
        <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup color='primary' className={classes.buttonGroup}>
            <Button onClick={handleClickCopy}>
              <FileCopyOutlined fontSize='small'/>
            </Button>
              {props.favorited ? (
                <Button onClick={props.onUnfavorite}>
                  <Favorite fontSize='small'/>
                </Button>
              ) : (
                <Button onClick={props.onFavorite}>
                  <FavoriteBorder fontSize='small'/>
                </Button>
              )}
            <Button>
              <FlagOutlined fontSize='small'/>
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};