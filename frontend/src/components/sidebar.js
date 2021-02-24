import React from 'react';
import {
  Drawer, Divider, ListItem, ListItemIcon, ListItemText, List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TrendingUp, AddBox, Home } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.grey['600'],
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

const ListItemLink = (props) => {
  const { icon, primary, to } = props;
  const renderLink = React.useMemo(
    // eslint-disable-next-line react/jsx-props-no-spreading
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        { icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List aria-label='main pages'>
        <ListItemLink to='/' primary='Home' icon={<Home />} />
        <ListItemLink to='/graph' primary='Graph' icon={<TrendingUp />} />
        <ListItemLink to='/players' primary='Add players' icon={<AddBox />} />
        <ListItemLink to='/matches' primary='Add matches' icon={<AddBox />} />
      </List>
    </Drawer>
  );
};

export default Sidebar;
