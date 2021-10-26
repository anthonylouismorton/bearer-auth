'use strict'

const express = require('express');
const app = express();
const basicAuth = require('./basicAuth.js');
const {users} = require('../model');
const bearerAuth = require('./bearerAuth.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/signup', async (req, res) => {
  const newUser = await users.create(req.body);
  console.log(newUser.token)
  res.status(201)
  res.send(newUser);
});

app.post('/signin', basicAuth, async (req, res) => {
  console.log('you are in the signin route')
  res.send('ok')
});

app.post('/test', bearerAuth, async (req, res) => {
  console.log('you are in the test route')
  res.send('ok')
});

module.exports = app;