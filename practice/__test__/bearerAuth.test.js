'use strict'

const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
const {db} = require('../model')
const base64 = require('base-64')
const { expect, afterAll } = require('@jest/globals')

beforeAll(async () =>{
  await db.sync();
})
afterAll(async() =>{
  await db.drop();
})

describe('testing auth route', () => {
  let token = null
  it('should be able to create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'anthony',
      password: 'test',
    })
    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();
    token = response.body.token;
    expect(response.body.username).toEqual('anthony')
  })
  it('should be able to signin with test', async () => {
    let response = await request.get('/jokes').set({
      Authorization: `Bearer ${token}`,
    });
  
      expect(response.status).toBe(200);
    });
})

describe('testing test routes', () => {
});