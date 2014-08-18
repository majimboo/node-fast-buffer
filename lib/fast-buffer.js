'use strict';

var fastBuffer = function(buffer) {
  if (!buffer) {
    throw new Error('must provide a buffer');
  }

  this.len = buffer.length;
  this.arr = new Array(this.len);

  for (var i = 0; i < this.len; i++) {
    this.arr[i] = buffer[i];
  }
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
