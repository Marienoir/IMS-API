/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
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
let userEmail = `richard.${uuid.v1()}@mail.com`;
let email = 'mike.scofield@gmail.com';
let password = '12345';

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

describe('Admin Registration', () => {
  it('should register a user with the role of an admin', (done) => {
    request(app)
      .post('/api/v1/auth/admin_register')
      .send({
        first_name: 'Michael',
        last_name: 'Scofield',
        email: email,
        image_url: 'www.images.com',
        phone_number: '09028430564',
        gender: 'Male',
        password: password,
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.message).to.equal('Admin created successfully');
        expect(res.body.code).to.equal(201);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});

describe('Admin Login', () => {
  it('should login an admin', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: email,
        password: password,
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
  it.skip('should register a user with the role of a user', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .set('x-access-token', `${admin_token}`)
      .send({
        first_name: 'Richard',
        last_name: 'Castle',
        email: userEmail,
        image_url: 'www.images.com',
        phone_number: '09028430564',
        gender: 'Male',
        password: password,
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

describe('User Login', () => {
  it.skip('should login a user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: userEmail,
        password: password,
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

describe('Refresh Token', () => {
  it.skip('should return a new access and refresh token', (done) => {
    request(app)
      .post('/api/v1/auth/refresh_token')
      .set('x-access-token', `${user_token}`)
      .send({
        refresh_token: user_refresh_token,
      })
      .expect(200)
      .end((err, res) => {
        // expect(res.body.message).to.equal('Login successful');
        expect(res.status).to.equal(200);
        // expect(res.body).to.be.an('object');
        done();
      });
  });
});
