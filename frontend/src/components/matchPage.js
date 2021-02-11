import React, { useEffect, useState } from 'react';
import {
  List, Typography,
} from '@material-ui/core';
import playerService from '../services/players';
import MatchListItem from './utils/matchListItem';

const MatchPage = () => {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerData = await playerService.getAll();
      setPlayers(playerData);
    };

    fetchPlayers();
  }, []);

  if (players !== null) {
    return (
      <div>
        <Typography variant='h4' component='h4'>Add a match!</Typography>
        <List>
          {
            players.map((player) => <MatchListItem key={player.username} player={player} />)
          }
        </List>
      </div>
    );
  }

  return (
    <div>
      <p>loading...</p>
    </div>
  );
};

export default MatchPage;
