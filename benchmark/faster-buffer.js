'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var fasterBuffer = require('../').fasterBuffer;

// add tests
suite

.add('new fasterBuffer from buffer', function() {
  var buf = new fasterBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
})

.add('new fasterBuffer from byte array', function() {
  var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
})

.add('new fasterBuffer from size', function() {
  var buf = new fasterBuffer(5);
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
