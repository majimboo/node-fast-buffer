'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var fastBuffer = require('../');

// add tests
suite

.add('new fastBuffer from buffer', function() {
  var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
})

.add('new fastBuffer from byte array', function() {
  var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
})

.add('new fastBuffer from size', function() {
  // creating a buffer
  var buf = new fastBuffer(5);
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
