import React, { useState } from 'react';
import 'date-fns';
import {
  makeStyles, FormControl,
  FormGroup, FormControlLabel, Checkbox,
  RadioGroup, Radio, Button,
} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

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
  const [activeStep, setActiveStep] = useState(0);
  const [playerCheck, setPlayerCheck] = useState(initialState);
  const [radioValue, setRadioValue] = useState('kd');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  // const classes = useStyles();
  const steps = ['Select players...', 'Select stat...', 'Select time...'];

  // Need to check if player is defined in state, otherwise React throws uncontrolled input err
  const handleCheckBox = (e) => {
    if (playerCheck[e.target.name] !== undefined) {
      setPlayerCheck({ ...playerCheck, [e.target.name]: e.target.checked });
    } else {
      setPlayerCheck({ ...playerCheck });
    }
  };

  // Stepper handlers
  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Form handlers
  const handleRadioButton = (e) => {
    setRadioValue(e.target.value);
  };

  const handleStartChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = () => {
    const startTimestamp = Date.parse(selectedStartDate);
    const endTimestamp = Date.parse(selectedEndDate);

    const dataToSend = {
      players: [],
      dataKey: radioValue,
      startAt: startTimestamp,
      endAt: endTimestamp,
    };

    Object.keys(playerCheck).forEach((key) => {
      if (playerCheck[key] === true) {
        dataToSend.players.push(key);
      }
    });

    callbackData(dataToSend);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <RadioGroup name='stat' value={radioValue} onChange={handleRadioButton}>
            <FormControlLabel value='kd' control={<Radio />} label='kd' />
            <FormControlLabel value='kr' control={<Radio />} label='kr' />
          </RadioGroup>
        );
      case 2:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                disableToolbar
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-dialog-start'
                label='Starting from...'
                value={selectedStartDate}
                onChange={handleStartChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-dialog-end'
                label='Ending at...'
                value={selectedEndDate}
                onChange={handleEndChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        );
      case 3:
        return 'Select something...';
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <FormControl>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBackStep}
            >
              Back
            </Button>
            <Button variant='contained' color='primary' onClick={handleNextStep}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </FormControl>
  );
};

export default GraphForm;
