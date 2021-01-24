import React, { useEffect, useState } from 'react';
import {
  List,
} from '@material-ui/core';
import playerService from '../services/players';
import CustomizedListItem from './utils/customizedListItem';

// TODO: mark match as analyzed for backend --> search for only not parsed matches
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
        <List>
          {
            players.map((player) => <CustomizedListItem player={player} />)
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
