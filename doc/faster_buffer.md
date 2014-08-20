Usage - fasterBuffer
--------------------

    var fasterBuffer = require('fast-buffer').fasterBuffer;
    var mainBuf = new fasterBuffer(5);
    var buf = mainBuf.bytes;
    buf.writeUInt8(0x01);
    buf.writeUInt8(0x02);
    buf.writeUInt8(0x03);
    buf.writeUInt8(0x04);
    buf.writeUInt8(0x05);

    var buf = new fasterBuffer([0x01, 0x02, 0x03, 0x04, 0x05]);
    var buf = new fasterBuffer(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05]));
