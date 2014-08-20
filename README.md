Node Fast Buffer [![Build Status](https://travis-ci.org/majimboo/node-fast-buffer.svg)](https://travis-ci.org/majimboo/node-fast-buffer)
================

[![NPM](https://nodei.co/npm/fast-buffer.png?downloads=true)](https://nodei.co/npm/fast-buffer/)

A faster way of handling Buffers, or so I say.

> **Notice**: This is **NOT** a real buffer. But works faster for certain use cases.

Performance
-----------

#### Node Buffer ####

    new Buffer from buffer     x 260,001 ops/sec ±2.06% (79 runs sampled)
    new Buffer from byte array x 215,698 ops/sec ±2.31% (73 runs sampled)
    new Buffer from size       x 277,193 ops/sec ±2.09% (91 runs sampled)

#### Fast Buffer ####

    new fastBuffer from buffer     x   189,329 ops/sec ±2.73% (74 runs sampled)
    new fastBuffer from byte array x 3,486,441 ops/sec ±0.28% (93 runs sampled)
    new fastBuffer from size       x 1,726,193 ops/sec ±0.40% (97 runs sampled)

#### Faster Buffer ####

    new fasterBuffer from buffer     x    212,569 ops/sec ±2.41% (81 runs sampled)
    new fasterBuffer from byte array x  7,866,879 ops/sec ±0.19% (99 runs sampled)
    new fasterBuffer from size       x 14,760,543 ops/sec ±0.42% (100 runs sampled)

Installing
----------

    $ npm install fast-buffer --save

Installing the latest version

    $ npm install git+https://github.com/majimboo/node-fast-buffer.git

or for those without git

    $ npm install http://github.com/majimboo/node-fast-buffer/tarball/master

Usage - fastBuffer
------------------

    var fastBuffer = require('fast-buffer').fastBuffer;
    var buf = new fastBuffer(5);
    buf.writeUInt8(0x01);
    buf.writeUInt8(0x02);
    buf.writeUInt8(0x03);
    buf.writeUInt8(0x04);
    buf.writeUInt8(0x05);

    var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
    var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));

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

    // send data
    socket.write(buf_w_size.encode());

Usage - fasterBuffer
--------------------

    var fasterBuffer = require('fast-buffer').fasterBuffer;
    var mainBuf = new fasterBuffer(5);
    var buf = mainBuf.bytes;
    buf.writeUInt8(0x01);
    buf.writeUInt8(0x02);
    buf.writeUInt8(0x03);
    buf.writeUInt8(0x04);
    buf.writeUInt8(0x05);

    var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
    var buf = new fasterBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));

Problem
-------

I needed a fast protocol for a **MMOG** server I was developing in **Node.JS**. My workflow was creating buffers, writing bits into it, encrypting,
then sent the data with `socket.write()`.

I noticed the performance difference when I was doing some benchmark which results can be seen [here](https://github.com/majimboo/node-benchmarks).

**How slow?**

    var buf = new Buffer([0x00, 0x01, 0x03, 0x04]);
    socket.write(buf);

When [benchmarked](https://github.com/majimboo/node-fast-buffer/blob/master/benchmark/buffer-vs-utf8.js#L21) gives:

    buffer x 112,474 ops/sec ±11.07% (52 runs sampled)

Solution
--------

As UTF-8 strings, it would be like

    var buf = '\x00\x01\x03\x04';
    socket.write(buf);

Now let us see some benchmark:

    utf-8  x 1,629,796 ops/sec ±29.13% (54 runs sampled)

You can try the benchmark [here]() by running

    node benchmark/buffer-vs-utf8

As you can see, there is a huge difference in speed, using utf-8 strings gives you about **x14 more performance** than using buffers.

# WORK IN PROGRESS - TBC#
