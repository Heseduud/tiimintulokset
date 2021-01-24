import React, { useState } from 'react';
import {
  makeStyles, FormControl, FormLabel,
  FormGroup, FormControlLabel, Checkbox,
  RadioGroup, Radio, Button,
} from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  checkBoxFix: {
    '& .Mui-focused': {
      color: 'white',
      fontWeight: 'bold',
    },
  },
}));

const GraphForm = ({ initialState, callbackData }) => {
  const [playerCheck, setPlayerCheck] = useState(initialState);
  const [radioValue, setRadioValue] = useState('kd');
  const classes = useStyles();

  // Need to check if player is defined in state, otherwise React throws uncontrolled input err
  const handleCheckBox = (e) => {
    if (playerCheck[e.target.name] !== undefined) {
      setPlayerCheck({ ...playerCheck, [e.target.name]: e.target.checked });
    } else {
      setPlayerCheck({ ...playerCheck });
    }
  };

  const handleRadioButton = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSubmit = () => {
    const dataToSend = {
      players: [],
      dataKey: radioValue,
    };

    Object.keys(playerCheck).forEach((key) => {
      if (playerCheck[key] === true) {
        dataToSend.players.push(key);
      }
    });

    callbackData(dataToSend);
  };

  return (
    <FormControl className={classes.checkBoxFix} component='fieldset'>
      <FormLabel component='legend'>Select players for graph</FormLabel>
      <FormGroup>
        {
          Object.keys(playerCheck).map((key) => (
            <FormControlLabel
              control={
                <Checkbox checked={playerCheck[key]} onChange={handleCheckBox} name={key} />
            }
              label={key}
              key={key}
            />
          ))
        }
      </FormGroup>
      <FormLabel component='legend'>Stat for graph</FormLabel>
      <RadioGroup name='stat' value={radioValue} onChange={handleRadioButton}>
        <FormControlLabel value='kd' control={<Radio />} label='kd' />
        <FormControlLabel value='kr' control={<Radio />} label='kr' />
      </RadioGroup>
      <Button onClick={() => { handleSubmit(); }}>Form graph</Button>
    </FormControl>
  );
};

export default GraphForm;
