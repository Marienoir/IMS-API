/* eslint-disable no-unused-vars */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable no-import-assign */
/* eslint-disable no-undef */
import * as uuid from 'uuid';
import app from '../src/index';

const { expect } = require('chai');
const request = require('supertest');

let admin_token, user_token, user_refresh_token;

describe('base url', () => {
  it('baseurl', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('Welcome to Inventory Management System');
        expect(res.body.status).to.equal('Success');
        expect(res.body.code).to.equal(200);
        done();
      });
  });
});

describe('User Login', () => {
  it('should login a user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'timileyin@enyata.com',
        password: '12345',
      })
      .expect(200)
      .end((err, res) => {
        user_token = res.body.access_token;
        user_refresh_token = res.body.refresh_token;
        expect(res.body.message).to.equal('Login successful');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Admin Login', () => {
  it('should login an admin', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mary@enyata.com',
        password: '12345',
      })
      .expect(200)
      .end((err, res) => {
        admin_token = res.body.access_token;
        expect(res.body.message).to.equal('Login successful');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('User Registration', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .set('x-access-token', `${admin_token}`)
      .send({
        first_name: 'Michael',
        last_name: 'Scofield',
        email: `mike.${uuid.v1()}@gmail.com`,
        image_url: 'www.images.com',
        phone_number: '09028430564',
        gender: 'Male',
        password: '123456',
        role: 'SUP',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.message).to.equal('User created successfully');
        expect(res.body.code).to.equal(201);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
