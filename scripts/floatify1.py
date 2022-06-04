#!/usr/bin/env python
import struct
import sys

upper16  = sys.argv[1]
lower16  = sys.argv[2]

first = int(upper16,16)
second = int(lower16,16)


sample = int(first) << 16 | int(second)

def convert(i):
    s = struct.pack('=i', i)
    return struct.unpack('=f', s)[0]

print 5*(convert(sample)/1024)
