import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardMedia, Divider, List, ListItem, ListItemText, Paper, Popper, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import { Lgtm } from '../../../../domain';

const useStyles = makeStyles((theme: Theme) =>
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

  return (
    <React.Fragment>
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement='top' transition>
        <Paper>
          <List className={classes.list}>
            <ListItem button className={classes.listItem}>
              <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
            </ListItem>
            <Divider/>
            <ListItem button className={classes.listItem}>
              <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Popper>
      <Card className={classes.card}>
        <CardMedia image={`https://lgtm-generator-api-dev-lgtms.s3.amazonaws.com/${props.lgtm.id}`} title='LGTM' className={classes.media}/>
        <CardActions disableSpacing className={classes.actions}>
          <ButtonGroup color='primary' className={classes.buttonGroup}>
            <Tooltip arrow title='Copy' placement='top'>
              <Button onClick={handleClickCopy}>
                <FileCopyOutlined fontSize='small'/>
              </Button>
            </Tooltip>
            <Tooltip arrow title='Favorite' placement='top'>
              <Button>
                <FavoriteBorder fontSize='small'/>
              </Button>
            </Tooltip>
            <Tooltip arrow title='Report' placement='top'>
              <Button>
                <FlagOutlined fontSize='small'/>
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
