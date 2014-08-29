'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite('showdown');
var net   = require('net');
var fs    = require('fs');
var fastBuffer = require('../').fastBuffer;
var fasterBuffer = require('../').fasterBuffer;

var crypto = require('crypto');
var server = new net.Server();
var socket = new net.Socket();

var sock = '/tmp/buffer-showdown.sock';

if (fs.existsSync(sock)) fs.unlinkSync(sock);
server.listen(sock);
socket.connect(sock);

var byteArray = [];
for (var i = 0; i < 1000; i++) {
  byteArray.push(i);
}

var fasterBuf = new fasterBuffer(byteArray);
var fastBuf = new fastBuffer(byteArray);
var Buf     = new Buffer(byteArray);

// add tests
suite

.add('new fasterBuffer', function() {
  // create new buffer
  new fasterBuffer(byteArray);
})

.add('new fastBuffer', function() {
  // create new buffer
  new fastBuffer(byteArray);
})

.add('new buffer', function() {
  // create new buffer
  new Buffer(byteArray);
})

.add('fasterBuffer index', function() {
  for (var i = 0; i < fasterBuf.length; i++) {
    var idx = fasterBuf[i];
  }
})


.add('fastBuffer index', function() {
  for (var i = 0; i < fastBuf.length; i++) {
    var idx = fastBuf[i];
  }
})

.add('buffer index', function() {
  for (var i = 0; i < Buf.length; i++) {
    var idx = Buf[i];
  }
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
