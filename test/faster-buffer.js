'use strict';

var should = require('chai').should();
var net    = require('net');

var fasterBuffer = require('../').fasterBuffer;

describe('fasterBuffer', function () {

  describe('#new', function () {

    it('should create from buffer', function (done) {
      var buf = new fasterBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
      buf.should.be.instanceof(fasterBuffer);
      buf.bytes[0].should.equal(0x01);
      buf.bytes[1].should.equal(0x02);
      buf.bytes[2].should.equal(0x03);
      buf.bytes[3].should.equal(0x04);
      buf.bytes[4].should.equal(0x05);
      buf.bytes.length.should.equal(5);
      done();
    });

    it('should create from byte array', function (done) {
      var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
      buf.should.be.instanceof(fasterBuffer);
      buf.bytes[0].should.equal(0x01);
      buf.bytes[1].should.equal(0x02);
      buf.bytes[2].should.equal(0x03);
      buf.bytes[3].should.equal(0x04);
      buf.bytes[4].should.equal(0x05);
      buf.bytes.length.should.equal(5);
      done();
    });

    it('should create from size', function (done) {
      var buf = new fasterBuffer(5);
      // buf.bytes.should.be.instanceof(fasterBuffer);
      buf.bytes.length.should.equal(5);
      done();
    });

    it('should error if fasterBuffer is created with input', function(done) {
      (function () {
        new fasterBuffer();
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

      var buf = new fasterBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
      socket.write(buf.toString()).should.equal(true);

      var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
      socket.write(buf.toString()).should.equal(true);

      var buf = new fasterBuffer(5);
      socket.write(buf.toString()).should.equal(true);
    });

  });

});
