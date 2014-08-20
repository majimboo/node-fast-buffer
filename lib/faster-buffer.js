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
};

module.exports = fasterBuffer;

/**
 * Converts fasterBuffer to UTF-8 string.
 *
 * @example
 * var buf = new fasterBuffer([0x61, 0x62, 0x63, 0x64, 0x65]);
 * var encoded = buf.encode();
 * console.log(encoded);
 * //=> abcd
 *
 * @returns {String}
 */
fasterBuffer.prototype.encode = function() {
  var str = '';
  var i;
  while ( i = this.bytes.shift() ) {
    str += String.fromCharCode(i);
  }
  return str;
};
