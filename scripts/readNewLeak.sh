#!/bin/sh

cansend can0 200#0322E01600000000
sleep 0.2

ISLEAK=$(cut -c 20-30 <<< $(tail -1 CANlog.txt))
OUTPUT=$(cut -c 32-42 <<< $(tail -1 CANlog.txt))

if [ "$ISLEAK" = "07 62 E0 16" ]
then
   UPHIBYTE=$(echo $OUTPUT | cut -c1-2)
   UPLOWBYTE=$(echo $OUTPUT | cut -c4-5)
   UPVALUE=$(echo "$UPHIBYTE$UPLOWBYTE")
#   LEAKDEC=$(echo "obase=10; ibase=16; $VALUE" | bc)
   LOWHIBYTE=$(echo $OUTPUT | cut -c7-8)
   LOWLOWBYTE=$(echo $OUTPUT | cut -c10-11)
   LOWVALUE=$(echo "$LOWHIBYTE$LOWLOWBYTE")

   python floatify1.py "$UPVALUE" "$LOWVALUE"	
	
   #echo $OUTPUT
else
   echo "DATA is not from a leak sensor"
fi

