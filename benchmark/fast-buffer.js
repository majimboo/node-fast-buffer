'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var fastBuffer = require('../').fastBuffer;

// add tests
suite

.add('new from buffer', function() {
  var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
})

.add('new from bytes', function() {
  var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
})

.add('new from size', function() {
  var buf = new fastBuffer(5);
  buf.writeUInt8(0x01);
  buf.writeUInt8(0x02);
  buf.writeUInt8(0x03);
  buf.writeUInt8(0x04);
  buf.writeUInt8(0x05);
})

.add('encode', function() {
  var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
  var encoded = buf.encode();
})

.add('decode', function() {
  var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
  var decoded = buf.decode();
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  //
})
// run async
.run({ 'async': true });
