'use strict';

/**
 * Creates a new fasterBuffer.
 *
 * @example Example creating from buffer.
 * var nodeBuf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]);
 * var buf = new fasterBuffer(nodeBuf);
 *
 * @example Example creating from byte array.
 * var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
 *
 * @example Example creating with size.
 * var buf = new fasterBuffer(5);
 *
 * @class
 * @param {(array|number|buffer)} subject - The subject to be wrapped.
 */
var fasterBuffer = function(buffer) {
  if (!buffer) {
    throw new Error('must provide a buffer');
  }

  var len = buffer.length;

  if (!len) {
  // isNumber
    this.bytes = new Array(buffer);
  }
  // isArray isBuffer
  else {
    this.bytes = new Array(len);
    for (var i = 0; i < len; i++) {
      this.bytes[i] = buffer[i] & 0xFF;
    }
  }

  this.offset = 0;
  this.length = this.bytes.length;
};

module.exports = fasterBuffer;

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
fasterBuffer.prototype.copy = function(buf, tStart, sStart, sEnd) {
  if (!buf) {
    throw new Error('must provide a buffer');
  }

  tStart = tStart || 0;
  sStart = sStart || 0;
  sEnd   = sEnd   || this.bytes.length;

  var length = sEnd - sStart;

  for (var i = 0; i < length; i++) {
    buf.writeUInt8(this.bytes[i + sStart] || buf.bytes[i + sStart], i + tStart);
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
fasterBuffer.prototype.slice = function(start, end) {
  start = start || 0;
  end   = end || this.bytes.length;

  var length = end - start;
  var buf    = new fasterBuffer(length);

  for (var i = 0; i < length; i++) {
    buf.writeUInt8(this.bytes[i + start]);
  }

  return buf;
};

/**
 * Converts fasterBuffer to UTF-8 string.
 *
 * @example
 * var buf = new fasterBuffer([0x61, 0x62, 0x63, 0x64, 0x65]);
 * var encoded = buf.encode();
 * console.log(encoded);
 * //=> abcde
 *
 * @returns {String}
 */
fasterBuffer.prototype.encode = function() {
  var str = '';
  for (var i = 0; i < this.length; i++) {
    str += String.fromCharCode(this.bytes[i]);
  }
  return str;
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
fasterBuffer.prototype.writeUInt8 = function(value, offset) {
  this.bytes[offset++ || this.offset++] = value;
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
fasterBuffer.prototype.writeUInt16LE = function(value, offset) {
  this.bytes[offset++ || this.offset++] = value & 0xFF;
  this.bytes[offset++ || this.offset++] = (value >>> 8);
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
fasterBuffer.prototype.writeUInt32LE = function(value, offset) {
  this.bytes[offset++ || this.offset++] = value & 0xFF;
  this.bytes[offset++ || this.offset++] = (value >>> 8);
  this.bytes[offset++ || this.offset++] = (value >>> 16);
  this.bytes[offset++ || this.offset++] = (value >>> 24);
};
