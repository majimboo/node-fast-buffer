'use strict';

var should = require('chai').should();
var net    = require('net');

var fastBuffer = require('../').fastBuffer;

describe('fastBuffer', function () {

  describe('#new', function () {

    it('should create from buffer', function (done) {
      var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
      buf.should.be.instanceof(fastBuffer);
      buf[0].should.equal(0x01);
      buf[1].should.equal(0x02);
      buf[2].should.equal(0x03);
      buf[3].should.equal(0x04);
      buf[4].should.equal(0x05);
      buf.length.should.equal(5);
      done();
    });

    it('should create from byte array', function (done) {
      var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
      buf.should.be.instanceof(fastBuffer);
      buf[0].should.equal(0x01);
      buf[1].should.equal(0x02);
      buf[2].should.equal(0x03);
      buf[3].should.equal(0x04);
      buf[4].should.equal(0x05);
      buf.length.should.equal(5);
      done();
    });

    it('should create from size', function (done) {
      var buf = new fastBuffer(5);
      buf.should.be.instanceof(fastBuffer);
      buf.length.should.equal(5);
      done();
    });

    it('should error if fastBuffer is created with input', function(done) {
      (function () {
        new fastBuffer();
      }).should.throw(Error);
      done();
    });

  });

  describe('#toString', function () {
    var socket, server;

    beforeEach(function (done) {
      server = new net.Server();
      socket = new net.Socket();
      server.listen('/tmp/node-fast-buffer.sock', done);
    });

    afterEach(function (done) {
      server.close();
      socket.destroy();
      done();
    });

    it('should write buffer on socket', function (done) {
      server.on('connection', function(client) {
        client.on('data', function(data) {
          done();
        });
      });

      socket.connect('/tmp/node-fast-buffer.sock');

      var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
      socket.write(buf.toString()).should.equal(true);

      var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
      socket.write(buf.toString()).should.equal(true);

      var buf = new fastBuffer(5);
      socket.write(buf.toString()).should.equal(true);
    });

  });

});
