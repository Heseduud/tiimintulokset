// import { TextField } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import playerService from '../services/players';
import PlayerInfo from './utils/playerInfo';

const useStyles = makeStyles(() => ({
  padding: {
    paddingBottom: '30px',
  },
}));

const PlayerPage = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [playerInfo, setInfo] = useState(null);

  const handleSearch = async (username) => {
    const data = await playerService.getPlayerInfo(username);
    setInfo(data);
  };

  if (playerInfo !== null) {
    return (
      <div>
        <Typography variant='h4' component='h4'>Add a player!</Typography>
        <SearchBar
          className={classes.padding}
          value={search}
          onChange={(v) => setSearch(v)}
          onRequestSearch={() => handleSearch(search)}
        />
        <Divider />
        <PlayerInfo data={playerInfo} />
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        className={classes.padding}
        value={search}
        onChange={(v) => setSearch(v)}
        onRequestSearch={() => handleSearch(search)}
      />
    </div>
  );
};

export default PlayerPage;
