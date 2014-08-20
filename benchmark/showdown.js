'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite('showdown');
var net   = require('net');
var fs    = require('fs');
var fastBuffer = require('../').fastBuffer;

var crypto = require('crypto');
var server = new net.Server();
var socket = new net.Socket();

var sock = '/tmp/buffer-showdown.sock';

if (fs.existsSync(sock)) fs.unlinkSync(sock);
server.listen(sock);
socket.connect(sock);

// add tests
suite

.add('fastBuffer', function() {
  // create new buffer
  var buf = new fastBuffer([0x05, 0x07, 0x02, 0x05, 0x09]);

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
  var buf_w_size = new fastBuffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  buf.copy(buf_w_size, 1);
  buf_w_size.writeUInt8(buf_w_size.length, 0);

  socket.write(buf_w_size.encode());
})

.add('buffer', function() {
  // create new buffer
  var buf = new Buffer([0x05, 0x07, 0x02, 0x05, 0x09]);

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
  var buf_w_size = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  buf.copy(buf_w_size, 1);
  buf_w_size.writeUInt8(buf_w_size.length, 0);

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
