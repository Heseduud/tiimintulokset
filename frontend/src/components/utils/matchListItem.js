import {
  Collapse, List, ListItem, ListItemText, Divider,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import playerService from '../../services/players';
import MatchDetailsItem from './matchDetailsItem';

const MatchListItem = ({ player }) => {
  const [open, setOpen] = useState(false);
  // Need state for this as we don't fetch all players' histories automatically to avoid unnecessary
  // api calls
  const [matches, setMatches] = useState(null);

  const handleClick = async (id) => {
    if (matches === null) {
      const data = await playerService.getHistory(id);
      setMatches(data);
    }

    setOpen(!open);
  };

  /*
  Opening collapse gives findDOMNode warning from React (StrictMode),
  apparently an issue with MaterialUI, shouldn't affect production build, see:
  https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
  */
  return (
    <div>
      <ListItem button key={player.playerId} onClick={() => handleClick(player.playerId)}>
        <ListItemText primary={player.username} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto'>
        <List>
          {
            matches
              ? matches.map((match) => (
                <MatchDetailsItem
                  key={match.id}
                  style={{ paddingLeft: 30 }}
                  match={match}
                />
              ))
              : null
          }
        </List>
      </Collapse>
      <Divider />
    </div>
  );
};

export default MatchListItem;
