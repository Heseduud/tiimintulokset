import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import playerService from '../../services/players';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flex: '1 0 auto',
  },
  button: {
    marginTop: 120,
  },
}));

/*
  TODO: make card look prettier, have actual info, button placement style,
  confirmation for adding player
*/
const playerInfo = (data) => {
  const classes = useStyles();
  const playerData = data.data;

  const handleButton = async () => {
    await playerService.addPlayer(playerData.nickname, playerData.player_id);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component='h5' variant='h5'>
          {playerData.nickname}
        </Typography>
        <Typography component='p' variant='subtitle2'>
          Lorem ipsum dolor sit amet
        </Typography>
        <Button className={classes.button} onClick={() => handleButton()}>Add player</Button>
      </CardContent>
      <CardMedia>
        <img
          src={playerData.avatar}
          alt='test'
        />
      </CardMedia>
    </Card>
  );
};

export default playerInfo;
