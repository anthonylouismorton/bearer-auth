'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }
  let basicHeaderParts = req.headers.authorization.split(' ').pop();
  let basicDecoded = base64.decode(basicHeaderParts)
  let [username, pass] = basicDecoded.split(':');
  


  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

