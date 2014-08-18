'use strict';

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

fasterBuffer.prototype.toString = function() {
  var str = '';
  var i;
  while ( i = this.bytes.shift() ) {
    str += String.fromCharCode(i);
  }
  return str;
};
