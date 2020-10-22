import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia, Divider, List, ListItem, ListItemText, Paper, Popper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { Lgtm } from '../../../../domain';

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
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleClickCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? undefined : e.currentTarget);
  };
  const closePopper = () => setAnchorEl(undefined);

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
            <ListItem button className={classes.listItem}>
              <CopyToClipBoard text={markdown}>
                <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
              </CopyToClipBoard>
            </ListItem>
            <Divider/>
            <ListItem button className={classes.listItem}>
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
            <Button>
              <FavoriteBorder fontSize='small'/>
            </Button>
            <Button>
              <FlagOutlined fontSize='small'/>
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
