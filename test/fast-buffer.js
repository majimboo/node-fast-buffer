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

  describe('#writeUInt8', function () {

    it('should write uint8 with auto offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt8(0x01);
      buf.writeUInt8(0x02);
      buf.writeUInt8(0x03);
      buf.writeUInt8(0x04);
      buf.writeUInt8(0x05);
      buf[0].should.equal(0x01);
      buf[1].should.equal(0x02);
      buf[2].should.equal(0x03);
      buf[3].should.equal(0x04);
      buf[4].should.equal(0x05);
      buf.length.should.equal(5);
      done();
    });

    it('should write uint8 with manual offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt8(0x01, 0);
      buf.writeUInt8(0x02, 1);
      buf.writeUInt8(0x03, 2);
      buf.writeUInt8(0x04, 3);
      buf.writeUInt8(0x05, 4);
      buf[0].should.equal(0x01);
      buf[1].should.equal(0x02);
      buf[2].should.equal(0x03);
      buf[3].should.equal(0x04);
      buf[4].should.equal(0x05);
      buf.length.should.equal(5);
      done();
    });

  });

  describe('#writeUInt16LE', function () {

    it('should write uint16 littleEndian with auto offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt16LE(0x0100);
      buf.writeUInt16LE(0x0302);
      buf.writeUInt16LE(0x0504);
      buf[0].should.equal(0x00);
      buf[1].should.equal(0x01);
      buf[2].should.equal(0x02);
      buf[3].should.equal(0x03);
      buf[4].should.equal(0x04);
      buf.length.should.equal(5);
      done();
    });

    it('should write uint16 littleEndian with manual offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt16LE(0x0100, 0);
      buf.writeUInt16LE(0x0302, 2);
      buf.writeUInt16LE(0x0504, 4);
      buf[0].should.equal(0x00);
      buf[1].should.equal(0x01);
      buf[2].should.equal(0x02);
      buf[3].should.equal(0x03);
      buf[4].should.equal(0x04);
      buf.length.should.equal(5);
      done();
    });

  });

  describe('#writeUInt16BE', function () {

    it('should write uint16 bigEndian with auto offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt16BE(0x0001);
      buf.writeUInt16BE(0x0203);
      buf.writeUInt16BE(0x0405);
      buf[0].should.equal(0x00);
      buf[1].should.equal(0x01);
      buf[2].should.equal(0x02);
      buf[3].should.equal(0x03);
      buf[4].should.equal(0x04);
      buf.length.should.equal(5);
      done();
    });

    it('should write uint16 bigEndian with manual offset', function(done) {
      var buf = new fastBuffer(5);
      buf.writeUInt16BE(0x0001, 0);
      buf.writeUInt16BE(0x0203, 2);
      buf.writeUInt16BE(0x0405, 4);
      buf[0].should.equal(0x00);
      buf[1].should.equal(0x01);
      buf[2].should.equal(0x02);
      buf[3].should.equal(0x03);
      buf[4].should.equal(0x04);
      buf.length.should.equal(5);
      done();
    });

  });

  describe('#getUTF8', function () {
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
      socket.write(buf.getUTF8()).should.equal(true);

      var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
      socket.write(buf.getUTF8()).should.equal(true);

      var buf = new fastBuffer(5);
      socket.write(buf.getUTF8()).should.equal(true);
    });

  });

});
