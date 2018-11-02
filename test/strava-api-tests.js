'use strict';
const assert = require('assert');
const pg = require('pg');
// const stravaFactory = require('../services/strava-app-factory');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/strava_app_database_test';
const pool = new Pool({
    connectionString
});

let app = require('../index');

let chai = require('chai');
let request = require('supertest');
let expect = chai.expect;

describe('The Strava App API Tests', function () {
    it('the strava_data function should return a status code of 200', function (done) {
        request(app)
            .get('https://www.strava.com/api/v3/athletes/35612273/stats?page=1&per_page=30&access_token=3c40c8bad7f991734db910d02d1c58bfb411bf1a')
            .end(function (err, res) {
                console.log(res);
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
});