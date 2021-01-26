import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, CircularProgress,
} from '@material-ui/core';
import GraphComponent from './graph';
import GraphForm from './graphForm';
import playerService from '../services/players';

// TODO: rest of "form" for graph, maybe refactor to another component
// Graph submit button --> pass data to graph component --> render it, needs loading indic?
// Graph component gonna need some work, like different color lines for each player?

// https://stackoverflow.com/questions/52615530/materialui-changing-the-color-textfield-on-focus
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  checkBoxFix: {
    '& .Mui-focused': {
      color: 'white',
      fontWeight: 'bold',
    },
  },
}));

const GraphPage = () => {
  // const [players, setPlayers] = useState();
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  // const [showGraph, setShowGraph] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);
  const [playerCheck, setPlayerCheck] = useState({});
  const [dataToGraph, setDataToGraph] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerData = await playerService.getAll();
      // setPlayers(playerData);
      console.log(playerData);
      playerData.forEach((player) => {
        setPlayerCheck((prevState) => ({
          ...prevState,
          [player.username]: false,
        }));
      });
      // for (const player of playerData) {
      //   setPlayerCheck(prevState => ({
      //     ...prevState,
      //     [player.username]: false
      //   }))
      // }
      setLoadingPlayers(false);
    };

    fetchPlayers();
  }, []);

  // const classes = useStyles();

  const handleFormCallback = (data) => {
    setDataToGraph(data);
    console.log(dataToGraph);
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
        <GraphForm initialState={playerCheck} callbackData={handleFormCallback} />
        <Typography variant='h5'>
          Graph Page
        </Typography>
        <GraphComponent data={dataToGraph} />
      </div>
    );
  }

  return (
    <div>
      <GraphForm initialState={playerCheck} callbackData={handleFormCallback} />
      <Typography variant='h5'>
        Graph Page
      </Typography>
    </div>
  );
};

export default GraphPage;
