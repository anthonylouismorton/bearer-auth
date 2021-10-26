'use strict'

const { expect, beforeAll } = require('@jest/globals')
const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
const {db} = require('../model')
const base64 = require('base-64')

beforeAll(async () =>{
  await db.sync();
})
afterAll(async() =>{
  await db.drop();
})

describe('testing auth route', () => {
  it('should be able to create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'anthony',
      password: 'test',
    })
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual('anthony')
  })
})

describe('testing signin route', () => {
  it('should be able to signin a user', async () => {
    let userPassEncoded = base64.encode('anthony:test')
    const response = await request.post('/signin').set({
      Authorization: `Basic ${userPassEncoded}`
    })
    expect(response.status).toBe(200);
  })
})