import React from 'react';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Toolbar, AppBar, Typography, CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GraphPage from './components/graphPage';
import MatchPage from './components/matchPage';
import PlayerPage from './components/playerPage';
import Sidebar from './components/sidebar';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.grey['600'],
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  appBar: {
    backgroundColor: theme.palette.grey['900'],
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.Root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' noWrap>
              Tiimin Tulokset Beta 0.0.1
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/graph'>
              <GraphPage />
            </Route>
            <Route path='/players'>
              <PlayerPage />
            </Route>
            <Route path='/matches'>
              <MatchPage />
            </Route>
            <Route path='/'>
              <div>
                <p>Main page</p>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
