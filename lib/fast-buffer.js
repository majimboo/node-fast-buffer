'use strict';

/**
 * Creates a new fastBuffer.
 *
 * @example Example creating from buffer.
 * var nodeBuf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]);
 * var buf = new fastBuffer(nodeBuf);
 *
 * @example Example creating from byte array.
 * var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
 *
 * @example Example creating with size.
 * var buf = new fastBuffer(5);
 *
 * @class
 * @param {(array|number|buffer)} subject - The subject to be wrapped.
 */
var fastBuffer = function(buffer) {
  if (!buffer) {
    throw new Error('must provide a buffer');
  }

  this.length = buffer.length || buffer;

  for (var i = 0; i < this.length; i++) {
    this[i] = buffer[i] & 0xFF;
  }

  this.offset = 0;
};

module.exports = fastBuffer;

/**
 * Copies a buffer into another buffer with offsets.
 *
 * @example
 * buf1 = new fastBuffer(26);
 * buf2 = new fastBuffer(26);
 *
 * for (var i = 0 ; i < 26 ; i++) {
 *   buf1[i] = i + 97; // 97 is ASCII a
 *   buf2[i] = 33; // ASCII !
 * }
 * buf1.copy(buf2, 8, 16, 20);
 *
 * var encoded = buf2.encode();
 * //=> !!!!!!!!qrst!!!!!!!!!!!!!!
 *
 * @param   {fastBuffer} targetBuffer - Buffer to copy into.
 * @param   {Number} [targetStart=0]  - offset to start writing into.
 * @param   {Number} [sourceStart=0]  - offset to start copying from.
 * @param   {Number} [sourceStart=buffer.length] - offset to stop copying from.
 * @returns {fastBuffer}
 */
fastBuffer.prototype.copy = function(buf, tStart, sStart, sEnd) {
  if (!buf) {
    throw new Error('must provide a buffer');
  }

  tStart = tStart || 0;
  sStart = sStart || 0;
  sEnd   = sEnd   || this.length;

  var length = sEnd - sStart;

  for (var i = 0; i < length; i++) {
    buf.writeUInt8(this[i + sStart] || buf[i + sStart], i + tStart);
  }

  return buf;
};

/**
 * Creates a new buffer from specific offsets of another buffer.
 *
 * @example
 * var buf1 = new fastBuffer(26);
 *
 * for (var i = 0 ; i < 26 ; i++) {
 *   buf1[i] = i + 97; // 97 is ASCII a
 * }
 *
 * var buf2 = buf1.slice(0, 3);
 *
 * var encoded = buf2.encode();
 * //=> abc
 *
 * @param   {Number} [start=0] - offset to start slicing from.
 * @param   {Number} [end=buffer.length] - offset to stop slicing from.
 * @returns {fastBuffer}
 */
fastBuffer.prototype.slice = function(start, end) {
  start = start || 0;
  end   = end || this.length;

  var length = end - start;
  var buf    = new fastBuffer(length);

  for (var i = 0; i < length; i++) {
    buf.writeUInt8(this[i + start]);
  }

  return buf;
};

/**
 * Converts fastBuffer to UTF-8 string.
 *
 * @example
 * var buf = new fastBuffer([0x61, 0x62, 0x63, 0x64, 0x65]);
 * var encoded = buf.encode();
 * //=> abcde
 *
 * @returns {String}
 */
fastBuffer.prototype.encode = function() {
  var str = '';
  for (var i = 0; i < this.length; i++) {
    str += String.fromCharCode(this[i]);
  }
  return str;
};

/**
 * Converts fastBuffer to node Buffer.
 *
 * @example
 * var buf = new fastBuffer([0x61, 0x62, 0x63, 0x64, 0x65]);
 * var decoded = buf.decode();
 * //=> <Buffer 61 62 63 64 65>
 *
 * @returns {Buffer}
 */
fastBuffer.prototype.decode = function() {
  var backer = new Buffer(this.length);
  for (var i = 0; i < this.length; i++) {
    backer[i] = this[i];
  }
  return backer;
};

/**
 * Writes value to the buffer at the specified offset. Note, value must be a
 * valid unsigned 8 bit integer.
 *
 * @example
 * var buf = new fastBuffer(4);
 * buf.writeUInt8(0x01, 0);
 * buf.writeUInt8(0x02, 1);
 * buf.writeUInt8(0x03, 2);
 * buf.writeUInt8(0x04, 3);
 * //=> 01 02 03 04
 *
 * @param  {Number} value - value to be written into buffer.
 * @param  {Number} [offset=currentOffset] - offset to write value at.
 */
fastBuffer.prototype.writeUInt8 = function(value, offset) {
  this[offset++ || this.offset++] = value;
};

/**
 * Writes unsigned 16 bit integer to the buffer at the specified offset in
 * little endian format.
 *
 * @example
 * var buf = new fastBuffer(4);
 * buf.writeUInt16LE(0x0100, 0);
 * buf.writeUInt16LE(0x0302, 2);
 * //=> 00 01 02 03
 *
 * @param  {Number} value - value to be written into buffer.
 * @param  {Number} [offset=currentOffset] - offset to write value at.
 */
fastBuffer.prototype.writeUInt16LE = function(value, offset) {
  this[offset++ || this.offset++] = value & 0xFF;
  this[offset++ || this.offset++] = (value >>> 8);
};

/**
 * Writes unsigned 16 bit integer to the buffer at the specified offset in
 * big endian format.
 *
 * @example
 * var buf = new fastBuffer(4);
 * buf.writeUInt16BE(0x0001);
 * buf.writeUInt16BE(0x0203);
 * //=> 00 01 02 03
 *
 * @param  {Number} value - value to be written into buffer.
 * @param  {Number} [offset=currentOffset] - offset to write value at.
 */
fastBuffer.prototype.writeUInt16BE = function(value, offset) {
  this[offset++ || this.offset++] = (value >>> 8);
  this[offset++ || this.offset++] = value & 0xFF;
};

/**
 * Writes unsigned 32 bit integer to the buffer at the specified offset in
 * little endian format.
 *
 * @example
 * var buf = new fastBuffer(4);
 * buf.writeUInt32LE(0x0100, 0);
 * //=> 00 01 00 00
 *
 * @param  {Number} value - value to be written into buffer.
 * @param  {Number} [offset=currentOffset] - offset to write value at.
 */
fastBuffer.prototype.writeUInt32LE = function(value, offset) {
  this[offset++ || this.offset++] = value & 0xFF;
  this[offset++ || this.offset++] = (value >>> 8);
  this[offset++ || this.offset++] = (value >>> 16);
  this[offset++ || this.offset++] = (value >>> 24);
};

/**
 * Writes unsigned 32 bit integer to the buffer at the specified offset in
 * big endian format.
 *
 * @example
 * var buf = new fastBuffer(4);
 * buf.writeUInt32BE(0x0100);
 * //=> 00 00 01 00
 *
 * @param  {Number} value - value to be written into buffer.
 * @param  {Number} [offset=currentOffset] - offset to write value at.
 */
fastBuffer.prototype.writeUInt32BE = function(value, offset) {
  this[offset++ || this.offset++] = (value >>> 24);
  this[offset++ || this.offset++] = (value >>> 16);
  this[offset++ || this.offset++] = (value >>> 8);
  this[offset++ || this.offset++] = value & 0xFF;
};
