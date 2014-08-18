'use strict';

var fastBuffer = function(buffer) {
  if (!buffer) {
    throw new Error('must provide a buffer');
  }

  var len = buffer.length;

  if (!len) {
    this.arr = new Array(buffer);
    return this.arr;
  }

  this.arr = new Array(len);
  for (var i = 0; i < len; i++) {
    this.arr[i] = buffer[i] & 0xFF;
  }

  return this.arr;
};

module.exports = fastBuffer;

fastBuffer.prototype.toString = function() {
  var str = '';
  var i;
  while ( i = this.arr.shift() ) {
    str += String.fromCharCode(i);
  }
  return str;
};
