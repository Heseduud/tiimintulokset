import {
  Collapse, List, ListItem, ListItemText, Divider,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';

const CustomizedListItem = ({ player }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button key={player.playerId} onClick={handleClick}>
        <ListItemText primary={player.username} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto'>
        <List>
          <ListItemText primary='textitesti' />
        </List>
      </Collapse>
      <Divider />
    </div>
  );
};

export default CustomizedListItem;
