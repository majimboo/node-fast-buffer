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
for (var i = 0; i < 100; i++) {
  byteArray.push(i & 0xFF);
}

// add tests
suite

.add('fasterBuffer', function() {
  // create new buffer
  var buf = new fasterBuffer(byteArray);

  // do some processing like
  // - encrypt the buffer
  for (var i = 0; i < buf.length; i++) {
    buf.bytes[i] ^= 0x02;
    buf.bytes[i] ^= 0x03;
    buf.bytes[i] ^= 0x01;
    buf.bytes[i] ^= 0x02;
    buf.bytes[i] ^= 0x03;
  }

  // - append the size
  var buf_w_size = new fasterBuffer(byteArray.length + 2);
  buf.copy(buf_w_size, 2);
  buf_w_size.writeUInt16LE(buf_w_size.length, 0);

  socket.write(buf_w_size.encode());
})

.add('fastBuffer', function() {
  // create new buffer
  var buf = new fastBuffer(byteArray);

  // do some processing like
  // - encrypt the buffer
  for (var i = 0; i < buf.length; i++) {
    buf[i] ^= 0x02;
    buf[i] ^= 0x03;
    buf[i] ^= 0x01;
    buf[i] ^= 0x02;
    buf[i] ^= 0x03;
  }
  // - append the size
  var buf_w_size = new fastBuffer(byteArray.length + 2);
  buf.copy(buf_w_size, 2);
  buf_w_size.writeUInt16LE(buf_w_size.length, 0);

  socket.write(buf_w_size.encode());
})

.add('buffer', function() {
  // create new buffer
  var buf = new Buffer(byteArray);

  // do some processing like
  // - encrypt the buffer
  for (var i = 0; i < buf.length; i++) {
    buf[i] ^= 0x02;
    buf[i] ^= 0x03;
    buf[i] ^= 0x01;
    buf[i] ^= 0x02;
    buf[i] ^= 0x03;
  }
  // - append the size
  var buf_w_size = new Buffer(byteArray.length + 2);
  buf.copy(buf_w_size, 2);
  buf_w_size.writeUInt16LE(buf_w_size.length, 0);

  socket.write(buf_w_size);
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
