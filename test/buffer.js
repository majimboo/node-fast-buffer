'use strict';

var should = require('chai').should();
var fastBuffer = require('../');

var someBuf = new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);

describe('#fastBuffer', function () {
  describe('new fastBuffer', function () {

    it('should create new fastBuffer from buffer', function (done) {
      var buf = new fastBuffer(someBuf);
      buf.should.be.instanceof(fastBuffer);
      done();
    });

    it('should error if fastBuffer is created with no buffer', function(done) {
      (function () {
        new fastBuffer();
      }).should.throw(Error);
      done();
    });

  });
});
