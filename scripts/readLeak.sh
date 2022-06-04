#!/bin/sh

cansend can0 200#0322E01600000000
sleep 0.2
OUTPUT=$(cut -c 32-36 <<< $(tail -1 /tmp/chinmay/CANlog.txt))
HIBYTE=$(echo $OUTPUT | cut -c1-2)
LOWBYTE=$(echo $OUTPUT | cut -c4-5)
VALUE=$(echo "$HIBYTE$LOWBYTE")
LEAKDEC=$(echo "obase=10; ibase=16; $VALUE" | bc)
#echo $LEAKDEC

#convert DEC to Voltage value
VOLTLEAK=$(echo "scale=3; ($LEAKDEC/1024)*5" | bc)
echo $VOLTLEAK
