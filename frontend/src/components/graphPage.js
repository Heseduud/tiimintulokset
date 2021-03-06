import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, CircularProgress,
} from '@material-ui/core';
import GraphComponent from './graph';
import GraphForm from './graphForm';
import playerService from '../services/players';

// https://stackoverflow.com/questions/52615530/materialui-changing-the-color-textfield-on-focus
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  checkBoxFix: {
    '& .Mui-focused': {
      color: 'white',
      fontWeight: 'bold',
    },
  },
  graphContainer: {
    marginTop: '30px',
  },
}));

const GraphPage = () => {
  const classes = useStyles();

  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [playerCheck, setPlayerCheck] = useState({});
  const [dataToGraph, setDataToGraph] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerData = await playerService.getAll();
      playerData.forEach((player) => {
        setPlayerCheck((prevState) => ({
          ...prevState,
          [player.username]: false,
        }));
      });
      setLoadingPlayers(false);
    };

    fetchPlayers();
  }, []);

  const handleFormCallback = (data) => {
    setDataToGraph(data);
  };

  // TODO: make this look cleaner (load circle etc)
  if (loadingPlayers) {
    return (
      <div>
        <Typography variant='h5'>
          Loading...
          <CircularProgress />
        </Typography>
      </div>
    );
  }

  if (dataToGraph !== null) {
    return (
      <div>
        <Typography variant='h5'>
          Graph Page
        </Typography>
        <GraphForm initialState={playerCheck} callbackData={handleFormCallback} />
        <div className={classes.graphContainer}>
          <GraphComponent data={dataToGraph} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Typography variant='h5'>
        Graph Page
      </Typography>
      <div className={classes.graphContainer}>
        <GraphForm
          className={classes.graphBox}
          initialState={playerCheck}
          callbackData={handleFormCallback}
        />
      </div>
    </div>
  );
};

export default GraphPage;
