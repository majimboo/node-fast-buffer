'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite

.add('new Buffer from buffer', function() {
  var buf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]);
})

.add('new Buffer from byte array', function() {
  var buf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]);
})

.add('new Buffer from size', function() {
  // creating a buffer
  var buf = new Buffer(5);
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
