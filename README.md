Node Fast Buffer [![Build Status](https://travis-ci.org/majimboo/node-fast-buffer.svg)](https://travis-ci.org/majimboo/node-fast-buffer)
================
[![NPM](https://nodei.co/npm/fast-buffer.png?downloads=true)](https://nodei.co/npm/fast-buffer/)

A faster way of handling Buffers, or so I say. [`see`](doc/story.md)

> **Warning**: This is technically **NOT** a real buffer.

Performance
-----------
You can find the benchmark code [here](benchmark/showdown.js).

    Buffer     x 467,927 ops/sec ±40.33% (65 runs sampled)
    fastBuffer x 611,158 ops/sec ±23.73% (68 runs sampled)

Installing
----------

    $ npm install fast-buffer --save

Installing the latest version

    $ npm install git+https://github.com/majimboo/node-fast-buffer.git

or for those without git

    $ npm install http://github.com/majimboo/node-fast-buffer/tarball/master

Usage
-----

    var fastBuffer = require('fast-buffer').fastBuffer;

Documentation
-------------

- [fastBuffer](doc/fast_buffer.md)
  - [#new fastBuffer(buffer)](doc/fast_buffer.md)
  - [#new fastBuffer(array)](doc/fast_buffer.md)
  - [#new fastBuffer(size)](doc/fast_buffer.md)

# WORK IN PROGRESS - TBC#
