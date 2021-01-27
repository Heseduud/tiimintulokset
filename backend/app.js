const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const playerRouter = require('./controllers/players');
const matchRouter = require('./controllers/matches');
const statsRouter = require('./controllers/stats');
const mongoose = require('mongoose');
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDb: ', err);
  });

// Middleware config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Endpoints
app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);
app.use('/api/stats', statsRouter);

module.exports = app;