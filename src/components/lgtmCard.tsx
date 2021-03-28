import React from 'react';
import { Divider, Paper, Card, CardActions, CardContent, Button, ButtonGroup, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopyOutlined, FlagOutlined } from '@material-ui/icons';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { useFavorites } from '../contexts';
import { Lgtm } from '../domain';
import { ButtonWithPopper } from '.';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      border: '1px solid #eee',
    },
    actions: {
      justifyContent: 'center',
    },
    content: {
      height: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 8px 0',
    },
    img: {
      border: '1px solid #eee',
      maxHeight: 140,
      maxWidth: '100%',
    },
    buttonGroup: {
      maxWidth: '100%',
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
  }),
);

type Props = {
  lgtm: Lgtm;
};

export const LgtmCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { favorites, add, remove } = useFavorites();

  const handleClickFavorite = () => {
    add(props.lgtm);
  };

  const handleClickUnfavorite = () => {
    remove(props.lgtm.id);
  };

  return (
    <Card>
      <CardContent className={classes.content}>
        <img
          className={classes.img}
          src={`${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}`}
          alt="LGTM"
        />
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <ButtonGroup className={classes.buttonGroup} variant='contained' color='primary'>
          <ButtonWithPopper
            popperContent={(
              <Paper>
                <List className={classes.list}>
                  <ListItem className={classes.listItem} button>
                    <CopyToClipBoard text={`[![LGTM](${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id})](https://lgtm-generator.kou-pg.com)`}>
                      <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>Markdown</ListItemText>
                    </CopyToClipBoard>
                  </ListItem>
                  <Divider/>
                  <ListItem className={classes.listItem} button>
                    <CopyToClipBoard text={`<a href="https://lgtm-generator.kou-pg.com"><img src="${process.env.NEXT_PUBLIC_LGTMS_ORIGIN}/${props.lgtm.id}" alt="LGTM"/></a>`}>
                      <ListItemText primaryTypographyProps={{ className: classes.listItemText }}>HTML</ListItemText>
                    </CopyToClipBoard>
                  </ListItem>
                </List>
              </Paper>
            )}
          >
            <FileCopyOutlined fontSize='small'/>
          </ButtonWithPopper>
          {favorites.some(favorite => favorite.id === props.lgtm.id) ? (
            <Button onClick={handleClickUnfavorite}><Favorite fontSize='small'/></Button>
          ) : (
            <Button onClick={handleClickFavorite}><FavoriteBorder fontSize='small'/></Button>
          )}
          <Button><FlagOutlined fontSize='small'/></Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
