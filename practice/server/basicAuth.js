'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

const {users} = require('../model')

async function basicAuth(req, res, next) {
  if(!req.headers.authorization){
    res.status(403)
    res.send('no auther header')
  }
  let encodedUserPass = req.headers.authorization.split(' ')[1];
  let decodedUserPass = base64.decode(encodedUserPass);
  let [username, password] = decodedUserPass.split(':');

  let userQuery = await users.findOne({where: {username}})
  let validPass = await bcrypt.compare(password, userQuery.password)
  if(validPass){
    req.user = userQuery;
    next();
  }
  else{
    res.status(403);
    res.send('auth error')
  }
}

module.exports = basicAuth;