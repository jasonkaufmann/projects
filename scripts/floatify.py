#!/usr/bin/env python
import struct
import sys

first  = sys.argv[1]
second = sys.argv[2]

sample = int(first) << 16 | int(second)

def convert(i):
    s = struct.pack('=i', i)
    return struct.unpack('=f', s)[0]

print convert(sample)


