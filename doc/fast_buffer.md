Usage - fastBuffer
------------------

    var fastBuffer = require('fast-buffer').fastBuffer;
    var buf = new fastBuffer(5);
    buf.writeUInt8(0x01);
    buf.writeUInt8(0x02);
    buf.writeUInt8(0x03);
    buf.writeUInt8(0x04);
    buf.writeUInt8(0x05);

    var buf = new fastBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
    var buf = new fastBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));

    // create new buffer
    var buf = new fastBuffer([0x05, 0x07, 0x02, 0x05, 0x09]);

    // do some processing like
    // - encrypt the buffer
    for (var i = 0; i < buf.length; i++) {
      buf[i] ^= 0x02;
      buf[i] ^= 0x03;
      buf[i] ^= 0x01;
      buf[i] ^= 0x02;
      buf[i] ^= 0x03;
    }
    // - append the size
    var buf_w_size = new fastBuffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    buf.copy(buf_w_size, 1);
    buf_w_size.writeUInt8(buf_w_size.length, 0);

    // send data
    socket.write(buf_w_size.encode());
