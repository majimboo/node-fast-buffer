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
}

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

fastBuffer.prototype.encode = function() {
  var str = '';
  for (var i = 0; i < this.length; i++) {
    str += String.fromCharCode(this[i]);
  }
  return str;
};

fastBuffer.prototype.decode = function() {
  var backer = new Buffer(this.length);
  for (var i = 0; i < this.length; i++) {
    backer[i] = this[i];
  }
  return backer;
};

fastBuffer.prototype.writeUInt8 = function(value, offset) {
  this[offset++ || this.offset++] = value;
};

fastBuffer.prototype.writeUInt16LE = function(value, offset) {
  this[offset++ || this.offset++] = value & 0xFF;
  this[offset++ || this.offset++] = (value >>> 8);
};

fastBuffer.prototype.writeUInt16BE = function(value, offset) {
  this[offset++ || this.offset++] = (value >>> 8);
  this[offset++ || this.offset++] = value & 0xFF;
};
