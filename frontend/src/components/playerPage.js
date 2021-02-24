import SearchBar from 'material-ui-search-bar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import playerService from '../services/players';
import PlayerInfo from './utils/playerInfo';

const useStyles = makeStyles(() => ({
  margin: {
    marginBottom: 60,
  },
  searchBox: {
    paddingTop: 30,
    paddingBottom: 30,
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
        <Typography variant='h5' className={classes.margin}>Add a player!</Typography>
        <Divider />
        <div className={classes.searchBox}>
          <SearchBar
            className={classes.padding}
            value={search}
            onChange={(v) => setSearch(v)}
            onRequestSearch={() => handleSearch(search)}
          />
        </div>
        <Divider />
        <PlayerInfo data={playerInfo} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant='h5'>
        Add a player!
      </Typography>
      <Divider />
      <SearchBar
        className={classes.margin}
        value={search}
        onChange={(v) => setSearch(v)}
        onRequestSearch={() => handleSearch(search)}
      />
    </div>
  );
};

export default PlayerPage;
