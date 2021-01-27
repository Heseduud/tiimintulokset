import {
  Collapse, List, ListItem, ListItemText, Divider, Button,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import matchService from '../../services/matches';

const MatchDetailsItem = ({ match }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const handleClick = async (id) => {
    if (details === null) {
      const data = await matchService.getDetails(id);
      setDetails(data);
    }

    setOpen(!open);
  };

  const handleAddClick = async (id) => {
    await matchService.analyzeMatch(id);
    setAnalyzed(true);
  };

  const dateFormat = (unix) => {
    // eslint-disable-next-line radix
    const d = new Date(unix * 1000);
    const dS = d.toLocaleString('fi-FI');
    return dS;
  };

  /*
  Opening collapse gives findDOMNode warning from React (StrictMode),
  apparently an issue with MaterialUI, shouldn't affect production build, see:
  https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
  */
  return (
    <div>
      <ListItem button key={match.id} onClick={() => handleClick(match.id)}>
        <ListItemText primary={match.id} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto'>
        <Divider />
        <List>
          {
            details
              ? (
                <div style={{ paddingLeft: 60 }}>
                  <ListItemText primary={`${match.teams.faction1} vs ${match.teams.faction2} - ${dateFormat(match.finished)}`} />
                  <ListItemText primary={`Map: ${details.map} - Score: ${details.score}`} />
                  {
                    details.inDb || analyzed
                      ? <Button variant='contained' disabled>Match is already in database</Button>
                      : <Button variant='contained' onClick={() => handleAddClick(match.id)}>Add</Button>
                  }
                </div>
              )
              : null
          }
        </List>
      </Collapse>
      <Divider />
    </div>
  );
};

export default MatchDetailsItem;
