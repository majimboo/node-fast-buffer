'use strict';

var fastBuffer = function(buffer) {
  if (!buffer) {
    throw new Error('must provide a buffer');
  }

  this.length = buffer.length || buffer;

  for (var i = 0; i < this.length; i++) {
    this[i] = buffer[i] & 0xFF;
  }
};

module.exports = fastBuffer;

fastBuffer.prototype.toString = function() {
  var str = '';
  for (var i = 0; i < this.length; i++) {
    str += String.fromCharCode(this[i]);
  }
  return str;
};
