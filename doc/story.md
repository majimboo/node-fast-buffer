Problem
-------

I needed a fast protocol for a **MMOG** server I was developing in **Node.JS**. My workflow was creating buffers, writing bits into it, encrypting,
then sent the data with `socket.write()`.

I noticed the performance difference when I was doing some benchmark which results can be seen [here](https://github.com/majimboo/node-benchmarks).

**How slow?**

    var buf = new Buffer([0x00, 0x01, 0x03, 0x04]);
    socket.write(buf);

When [benchmarked](https://github.com/majimboo/node-fast-buffer/blob/master/benchmark/buffer-vs-utf8.js#L21) gives:

    buffer x 112,474 ops/sec ±11.07% (52 runs sampled)

Solution
--------

As UTF-8 strings, it would be like

    var buf = '\x00\x01\x03\x04';
    socket.write(buf);

Now let us see some benchmark:

    utf-8  x 1,629,796 ops/sec ±29.13% (54 runs sampled)

You can try the benchmark [here]() by running

    node benchmark/buffer-vs-utf8

As you can see, there is a huge difference in speed, using utf-8 strings gives you about **x14 more performance** than using buffers.
