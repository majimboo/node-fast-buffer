'use strict';

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

fastBuffer.prototype.getUTF8 = function() {
  var str = '';
  for (var i = 0; i < this.length; i++) {
    str += String.fromCharCode(this[i]);
  }
  return str;
};

fastBuffer.prototype.writeUInt8 = function(value, offset) {
  this[offset++ || this.offset++] = value;
}

fastBuffer.prototype.writeUInt16LE = function(value, offset) {
  this[offset++ || this.offset++] = value & 0xFF;
  this[offset++ || this.offset++] = (value >>> 8);
}

fastBuffer.prototype.writeUInt16BE = function(value, offset) {
  this[offset++ || this.offset++] = (value >>> 8);
  this[offset++ || this.offset++] = value & 0xFF;
}
