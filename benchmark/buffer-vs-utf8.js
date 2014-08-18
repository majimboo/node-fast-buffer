'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var net   = require('net');

var server = new net.Server();
var socket = new net.Socket();

server.listen('/tmp/buffer-vs-utf8.sock');
socket.connect('/tmp/buffer-vs-utf8.sock');

// add tests
suite

.add('utf-8', function() {
  var buf = '\x00\x01\x03\x04';
  socket.write(buf);
})

.add('buffer', function() {
  var buf = new Buffer([0x00, 0x01, 0x03, 0x04]);
  socket.write(buf);
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  server.close();
  socket.destroy();
})
// run async
.run({ 'async': true });
