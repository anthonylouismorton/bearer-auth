'use strict'


const {users} = require('../model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstringfortesting'

async function basicAuth(req, res, next) {
  if(!req.headers.authorization){
    res.status(403)
    res.send('no auther header')
  }
  let encodedToken = req.headers.authorization.split(' ')[1];
  let isValidUser = jwt.verify(encodedToken, SECRET);
  let userQuery = await users.findOne({where: {username: isValidUser.username}})
  if(userQuery){
    req.user = userQuery;
    next();
  }
  else{
    res.status(403);
    res.send('auth error')
  }
}

module.exports = basicAuth;