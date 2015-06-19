'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../server'),
    agent = request.agent(app);

describe('test', function () {
    it('test', function (done) {
        (1 === 1).should.be.true;
        done();
    });
});