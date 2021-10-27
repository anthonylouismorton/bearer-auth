'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
const app = require('express')
const {start} = require('./src/server.js')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3021
db.sync()
  .then(() => {
    start(PORT);
  });

