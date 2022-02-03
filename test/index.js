/* eslint-disable no-sequences */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
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
import db from '../src/config/db';
import app from '../src/index';

const { PreparedStatement: PS } = require('pg-promise');

const { expect } = require('chai');
const request = require('supertest');

let admin_token, user_token, user_refresh_token, userId, user_first_name, purchase_id, item;
let userEmail = `richard.${uuid.v1()}@mail.com`;
let email = 'mike.scofield@gmail.com';
let password = '12345';

describe('', () => {
  before(async () => {
    const addAdminRole = new PS({ name: 'seed-role', text: 'INSERT INTO roles(role_code, role_name) VALUES($1, $2), ($3, $4)' });
    db.none(addAdminRole, ['ADM', 'ADMIN', 'SUP', 'SUPERVISOR']);

    const addApprovalStatus = new PS({ name: 'seed-approval', text: 'CREATE TYPE approval_status AS ENUM ($1, $2, $3,)' });
    db.none(addApprovalStatus, ['pending', 'approved', 'disapproved']);

    const addSchedule = new PS({ name: 'add-schedule', text: 'ALTER TABLE users ADD schedule timestamp' });
    db.none(addSchedule);
  });

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
  // AUTHENTICATION
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
    it('should register a user with the role of a user', (done) => {
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
          userId = res.body.data.id;
          user_first_name = res.body.data.first_name;
          expect(res.body.message).to.equal('User created successfully');
          expect(res.body.code).to.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('should login a user', (done) => {
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
    it('should return a new access and refresh token', (done) => {
      request(app)
        .post('/api/v1/auth/refresh_token')
        .set('x-access-token', `${user_token}`)
        .send({
          refresh_token: user_refresh_token,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  // USER ENDPOINTS
  describe('Get Users', () => {
    it('should return all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('x-access-token', `${admin_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Get User By Id', () => {
    it('should return a user by Id', (done) => {
      request(app)
        .get(`/api/v1/user/${userId}`)
        .set('x-access-token', `${admin_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`User ${userId} Gotten successfully`);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Update User By Id', () => {
    it('should update a user by Id', (done) => {
      request(app)
        .put(`/api/v1/users/update/${userId}`)
        .set('x-access-token', `${admin_token}`)
        .send({
          first_name: 'Richard',
          last_name: 'Catley',
          email: userEmail,
          image_url: 'www.updatedimages.com',
          phone_number: '09001234567',
          gender: 'Male',
          password: password,
          role: 'SUP',
          deleted: false,
          status: 'active',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User Updated successfully');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Update User Schedule By Id', () => {
    it('should update a user schedule by Id', (done) => {
      request(app)
        .put(`/api/v1/user/schedule/${userId}`)
        .set('x-access-token', `${admin_token}`)
        .send({
          schedule: '2022-02-28',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`A Schedule date has been added for ${user_first_name} successfully`);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Delete User By Id', () => {
    it('should delete a user by Id', (done) => {
      request(app)
        .delete(`/api/v1/users/delete/${userId}`)
        .set('x-access-token', `${admin_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User Deleted successfully');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  // PURCHASE ENDPOINTS
  describe('Create a Purchase Order', () => {
    it('should create a purchase order', (done) => {
      request(app)
        .post('/api/v1/purchase/create')
        .set('x-access-token', `${user_token}`)
        .send({
          item: 'Sneakers',
          quantity: 10,
          price: 8000,
          delivery_time: '12/10/2021',
        })
        .expect(201)
        .end((err, res) => {
          purchase_id = res.body.data.id;
          item = res.body.data.item;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Purchase Order created successfully');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Update the status of a Purchase Order to APPROVED', () => {
    it('should approve the status of a purchase order', (done) => {
      request(app)
        .put(`/api/v1/purchase/${purchase_id}/approved`)
        .set('x-access-token', `${user_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`${item.toUpperCase()} with id ${purchase_id} has been approved successfully`);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Cannot Update the status of an Approved Purchase Order to DISAPPROVED', () => {
    it('should disapprove the status of a purchase order', (done) => {
      request(app)
        .put(`/api/v1/purchase/${purchase_id}/disapproved`)
        .set('x-access-token', `${user_token}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Item already approved');
          done();
        });
    });
  });

  // STOCK ENDPOINTS
  describe('Get a product available in Stock By Item Name', () => {
    it('should get a product available in stock', (done) => {
      request(app)
        .get(`/api/v1/stock?item=${item}`)
        .set('x-access-token', `${user_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`${item} fetched successfully`);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('Get items available in stock', () => {
    it('should get total products available in stock', (done) => {
      request(app)
        .get('/api/v1/stocks')
        .set('x-access-token', `${user_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Stocks Gotten successfully');
          expect(res.body.stocks).to.be.an('array');
          done();
        });
    });
  });

  // SALES ENDPOINTS
  describe('Create a Sales Order', () => {
    it('should create a sales order', (done) => {
      request(app)
        .post('/api/v1/sales/create')
        .set('x-access-token', `${user_token}`)
        .send({
          item: `${item}`,
          quantity: 10,
          price: 8000,
          customer_name: 'Kate Beckely',
          customer_email: `kate.${uuid.v1()}@mail.com`,
        })
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Sales Order created successfully');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('Get all Sales Order', () => {
    it('should get the total sales order', (done) => {
      request(app)
        .get('/api/v1/sales')
        .set('x-access-token', `${user_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Sales Gotten successfully');
          expect(res.body.sales).to.be.an('array');
          done();
        });
    });
  });

  // REFUND ENDPOINTS
  describe('Refund Order for sales', () => {
    it('should create a refund order for sold items', (done) => {
      request(app)
        .post('/api/v1/item/refund')
        .set('x-access-token', `${user_token}`)
        .send({
          item: `${item}`,
          quantity: 5,
          reason: 'NON-FAULTY',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Item refund successfully');
          expect(res.body.refundedItem).to.be.an('object');
          done();
        });
    });
  });

  describe('Get All Refunded Orders', () => {
    it('should return all refunded items', (done) => {
      request(app)
        .get('/api/v1/refunded_items')
        .set('x-access-token', `${user_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Refunds Gotten successfully');
          expect(res.body.refunds).to.be.an('array');
          done();
        });
    });
  });
});
